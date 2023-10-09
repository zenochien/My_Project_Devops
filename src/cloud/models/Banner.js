const BannerModel = {};
module.exports = BannerModel;

const BaseQuery = require('../BaseQuery');
const ImageModel = require('./Image');

const { STATUS } = require('../../const/Constants');
const Errors = require('../../const/Errors');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const Helper = require('../../utils/helper');

const buildBannerInfo = (bannerParse, includeFields, unsetFields) => {
  return Helper.convertParseObjectToJson(bannerParse, includeFields, unsetFields);
};

const getBannerById = async (id) => {
  const bannertQuery = BaseQuery.getBannerQuery();
  bannertQuery.equalTo('objectId', id);
  const bannerParse = await bannertQuery.first({ useMasterKey: true });
  if (!bannerParse) {
    const { code, message } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  return bannerParse;
};

BannerModel.getBannerList = async (params) => {
  const { status } = params;
  const bannertQuery = BaseQuery.getBannerQuery();
  bannertQuery.containedIn('status', status);
  bannertQuery.ascending('sortOrder');
  const [bannerParses, total] = await Promise.all([bannertQuery.find({ useMasterKey: true }), bannertQuery.count()]);
  return {
    total,
    list: bannerParses.map((bannerParse) => buildBannerInfo(bannerParse, DefaultSelectFields.BANNER, ['imageId'])),
  };
};

BannerModel.createBanner = async (params) => {
  const { imageId, sortOrder = 1, status = STATUS.PUBLISHED } = params;
  const bannerParse = new Parse.Object('Banner');
  const imageObjects = await ImageModel.activeAndGetImageObjs([imageId]);
  const atributes = {
    imageId,
    sortOrder,
    status,
    image: imageObjects[0],
  };

  Helper.updateDataToParseObj(bannerParse, atributes, ['imageId', 'sortOrder', 'status', 'image']);
  await bannerParse.save(null, { useMasterKey: true });
  return buildBannerInfo(bannerParse, DefaultSelectFields.BANNER, ['imageId']);
};

BannerModel.updateBanner = async (params) => {
  const { id, imageId, sortOrder = 1, status = STATUS.PUBLISHED } = params;
  const bannerParse = await getBannerById(id);
  const atributes = {
    imageId: null,
    sortOrder,
    status,
    image: null,
  };
  if (imageId) {
    const imageObjects = await ImageModel.activeAndGetImageObjs([imageId]);
    atributes.image = imageObjects[0];
    atributes.imageId = imageId;
  }

  Helper.updateDataToParseObj(bannerParse, atributes, ['imageId', 'sortOrder', 'status', 'image']);
  await bannerParse.save(null, { useMasterKey: true });
  return buildBannerInfo(bannerParse, DefaultSelectFields.BANNER, ['imageId']);
};
