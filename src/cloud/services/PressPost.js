const cheerio = require('cheerio');
const axios = require('axios');
const uuid = require('uuid');

const moment = require('moment-timezone');
const { PressPostModel } = require('../models');

const { DEFAULT_TIMEZONE, PRESS_TYPE } = require('../../const/Constants');

const baseURL = 'https://press.hairlie.jp/';
const selectionURL = 'https://press.hairlie.jp/category/%E3%82%B3%E3%83%A9%E3%83%A0';
const postClass = '.l-contentsMain .p-latestsPosts__list .p-latestsPosts__listItem';
const postRankClass = '.c-ranking__list .c-ranking__item';
const postClassTitle = '.p-latestsPosts__title';
const postRankClassTitle = '.c-ranking__text .title';
const postClassImage = '.p-latestsPosts__thumb div';
const postRankClassImage = '.c-ranking__thumb div';
const postClassId = '.p-latestsPosts__thumb';
const postRankClassId = '.c-ranking__link';
const postClassDescription = '.p-latestsPosts__description p';
const postClassCreatedAt = '.p-latestsPosts__date';
const postRankClassCreatedAt = '.c-ranking__text .date';

const PressPostService = {};

const processDate = (dateString) => {
  let date;
  try {
    let newDateString = dateString;
    newDateString = newDateString.replace('年', '/');
    newDateString = newDateString.replace('月', '/');
    newDateString = newDateString.replace('日', '');
    date = moment(newDateString).tz(DEFAULT_TIMEZONE);
    if (!date.isValid()) {
      throw new Error();
    }
  } catch (error) {
    date = moment().tz(DEFAULT_TIMEZONE);
  }
  return date.toDate();
};
const processDescription = (description) => {
  const newDescription = description || '';
  return newDescription.trim();
};

const processImageURL = (imageAttributes) => {
  let url = imageAttributes.style.match(/url\(["']?([^"']*)["']?\)/)[1];
  url = url ? url.replace('//', '') : '';
  if (url.indexOf('thumb') > 0) {
    url = url.replace('thumb', 'medium');
  }
  return {
    file: url,
  };
};

const processId = (idElement) => {
  if (!idElement) {
    return uuid.v4();
  }
  const stringId = idElement.href;
  if (stringId) {
    return Number(stringId.replace('/posts/', ''));
  }
  return uuid.v4();
};
PressPostService.getPressPostFromURL = async (URL = baseURL, type) => {
  const newData = new Map();
  try {
    const res = await axios.get(URL);
    const $ = cheerio.load(res.data);
    let curentOrder = 1;
    $(postClass).each((index, element) => {
      const title = $(element).find(postClassTitle).text();
      const imageAttributes = $(element).find(postClassImage).attr();
      const idElement = $(element).find(postClassId).attr();
      const description = $(element).find(postClassDescription).text();
      const updatedAt = $(element).find(postClassCreatedAt).text();
      const id = processId(idElement);
      newData.set(id, {
        id,
        title,
        type,
        image: processImageURL(imageAttributes),
        description: processDescription(description),
        order: curentOrder,
        createdAt: processDate(updatedAt),
        updatedAt: processDate(updatedAt),
        detailURL: `https://press.hairlie.jp/posts/${id}`,
        rank: 99999,
      });
      curentOrder += 1;
    });

    $(postRankClass).each((index, element) => {
      const idElement = $(element).find(postRankClassId).attr();
      if (idElement) {
        const id = processId(idElement);
        if (typeof id === 'number' && newData.has(id)) {
          newData.set(id, {
            ...newData.get(id),
            type,
            rank: index + 1,
          });
        }
        if (typeof id === 'number' && !newData.has(id)) {
          const title = $(element).find(postRankClassTitle).text();
          const imageAttributes = $(element).find(postRankClassImage).attr();
          const updatedAt = $(element).find(postRankClassCreatedAt).text();
          newData.set(id, {
            id,
            title,
            type,
            order: curentOrder,
            image: processImageURL(imageAttributes),
            createdAt: processDate(updatedAt),
            updatedAt: processDate(updatedAt),
            detailURL: `https://press.hairlie.jp/posts/${id}`,
            rank: index + 1,
          });
          curentOrder += 1;
        }
      }
    });
  } catch (error) {
    console.log('-------->error:', error);
  }
  return PressPostModel.createPressPosts([...newData.values()]);
};

PressPostService.getPressPosts = async () => {
  await PressPostModel.resetRankOrder();
  await PressPostService.getPressPostFromURL(baseURL, PRESS_TYPE.DEFAULT);
  await PressPostService.getPressPostFromURL(selectionURL, PRESS_TYPE.SELECTION);
  await PressPostModel.removePressPostDeleted();
};

module.exports = PressPostService;
