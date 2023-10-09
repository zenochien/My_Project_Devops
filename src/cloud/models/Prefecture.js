const DefaultSelectFields = require('../../const/DefaultSelectFields');
const Helper = require('../../utils/helper');
const BaseQuery = require('../BaseQuery');

const PrefectureModel = {};
module.exports = PrefectureModel;

const buildPrefectureInfo = (pref, selectFields = DefaultSelectFields.PREFECTURE) => {
  const prefInfo = Helper.convertParseObjectToJson(pref, selectFields);
  delete prefInfo.objectId;
  delete prefInfo.createdAt;
  return prefInfo;
};

PrefectureModel.getPrefectureList = async (requestUser) => {
  const prefectureQuery = BaseQuery.getPrefectureQuery();
  const prefectures = await prefectureQuery.find({ useMasterKey: true });

  return prefectures.map((pref) => buildPrefectureInfo(pref));
};
