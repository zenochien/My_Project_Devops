const HashtagModel = {};
module.exports = HashtagModel;

const BaseQuery = require('../BaseQuery');
const ImageModel = require('./Image');
const mongoDB = require('../../db/mongoDB');

const { STATUS, PLATFORM } = require('../../const/Constants');
const Errors = require('../../const/Errors');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const Helper = require('../../utils/helper');

const buildHashtagInfo = (hashtagParse, includeFields, unsetFields) => {
  return Helper.convertParseObjectToJson(hashtagParse, includeFields, unsetFields);
};

const getHashtagById = async (id) => {
  const hashtagQuery = BaseQuery.getHashtagQuery();
  hashtagQuery.equalTo('objectId', id);
  const hashtagParse = await hashtagQuery.first({ useMasterKey: true });
  if (!hashtagParse) {
    const { code, message } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  return hashtagParse;
};

HashtagModel.getHashtagList = async (params) => {
  const { status = [STATUS.PUBLISHED], platform = [PLATFORM.WEB, PLATFORM.MOBILE], ...pagingParams } = params;
  const hashtagQuery = BaseQuery.getHashtagQuery();
  hashtagQuery.containedIn('status', status);
  hashtagQuery.containedIn('platform', platform);
  hashtagQuery.select(DefaultSelectFields.HASHTAG);

  Helper.queryPagingHandler(hashtagQuery, {
    ...pagingParams,
    orderBy: pagingParams.page || 'sortOrder',
    order: pagingParams.pag || 'descending',
    page: pagingParams.page || 1,
    limit: pagingParams.limit || 500,
  });
  const [hashtagParses, total] = await Promise.all([hashtagQuery.find({ useMasterKey: true }), hashtagQuery.count()]);
  return {
    total,
    list: hashtagParses.map((hashtagParse) => buildHashtagInfo(hashtagParse, DefaultSelectFields.HASHTAG, [])),
  };
};

HashtagModel.createHashtag = async (params) => {
  const {
    imageId,
    totalPost = 0,
    name,
    sortOrder,
    platform = [PLATFORM.WEB, PLATFORM.MOBILE],
    status = STATUS.PUBLISHED,
  } = params;
  const hashtagParse = new Parse.Object('Hashtag');
  const imageObjects = await ImageModel.activeAndGetImageObjs([imageId]);
  const atributes = {
    imageId,
    totalPost,
    status,
    name,
    platform,
    sortOrder: sortOrder || (await HashtagModel.getNewSortOrder()),
    image: imageObjects[0],
  };

  Helper.updateDataToParseObj(hashtagParse, atributes, [
    'imageId',
    'totalPost',
    'status',
    'name',
    'sortOrder',
    'platform',
    'image',
  ]);
  await hashtagParse.save(null, { useMasterKey: true });
  return buildHashtagInfo(hashtagParse, DefaultSelectFields.HASHTAG, ['imageId']);
};

HashtagModel.updateHashtag = async (params) => {
  const {
    id,
    imageId,
    totalPost = 0,
    sortOrder,
    name,
    platform = [PLATFORM.WEB, PLATFORM.MOBILE],
    status = STATUS.PUBLISHED,
  } = params;
  const hashtagParse = await getHashtagById(id);
  const atributes = {
    imageId: null,
    totalPost,
    status,
    sortOrder,
    name,
    platform,
    image: null,
  };
  if (imageId) {
    const imageObjects = await ImageModel.activeAndGetImageObjs([imageId]);
    atributes.image = imageObjects[0];
    atributes.imageId = imageId;
  }

  Helper.updateDataToParseObj(hashtagParse, atributes, [
    'imageId',
    'totalPost',
    'status',
    'name',
    'platform',
    'sortOrder',
    'image',
  ]);
  await hashtagParse.save(null, { useMasterKey: true });
  return buildHashtagInfo(hashtagParse, DefaultSelectFields.HASHTAG, ['imageId']);
};

HashtagModel.getNewSortOrder = async () => {
  const db = await mongoDB.getMongoDB();
  const hashtags = await db
    .collection('Hashtag')
    .find({
      sortOrder: {
        $exists: true,
      },
    })
    .sort({
      sortOrder: -1,
    })
    .limit(1)
    .toArray();
  if (hashtags.length === 0) {
    return 1;
  }
  return hashtags[0].sortOrder + 1;
};
