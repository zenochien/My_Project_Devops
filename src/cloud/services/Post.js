const moment = require('moment-timezone');
const mongoDB = require('../../db/mongoDB');
const Errors = require('../../const/Errors');
const { PostModel } = require('../models');
const { STATUS, USER_STATUS } = require('../../const/Constants');
const _ = require('lodash');
const BaseQuery = require('../BaseQuery');

const PostService = {};

PostService.favoritePost = async ({ customerId, postId }) => {
  const db = await mongoDB.getMongoDB();
  const result = await db
    .collection('Post')
    .updateOne(
      { _id: postId, 'favoriteCustomers.customerId': { $ne: customerId } },
      { $push: { favoriteCustomers: { customerId, createdDate: moment().toDate() } } },
    );
  if (result.modifiedCount === 0) {
    const { code, message } = Errors.FAVORITE_POST_ERROR;
    throw new Parse.Error(code, message);
  }
};

PostService.unfavoritePost = async ({ customerId, postId }) => {
  const db = await mongoDB.getMongoDB();
  const result = await db
    .collection('Post')
    .updateOne({ _id: postId }, { $pull: { favoriteCustomers: { customerId } } });
  if (result.modifiedCount === 0) {
    const { code, message } = Errors.UNFAVORITE_POST_ERROR;
    throw new Parse.Error(code, message);
  }
};

PostService.getPostIdByMenuIdsByStatus = async (menuIds, status) => {
  return PostModel.getPostIdByMenuIdsByStatus(menuIds, status);
};

PostService.stylistChangeProfile = async ({ dirtyKeys, objectData, requireFields }) => {
  // console.log('PostService.stylistChangeProfile data: ', dirtyKeys, objectData);
  if (_.intersection(dirtyKeys, requireFields).length) {
    const db = await mongoDB.getMongoDB();
    const { objectId, status, userStatus } = objectData;
    console.log(objectId, status, userStatus);
    if (userStatus === USER_STATUS.DELETED) {
      await db.collection('Post').updateMany(
        { _p_stylist: `Stylist$${objectId}` },
        {
          $set: {
            'stylistObject.status': STATUS.UNPUBLISHED,
          },
        },
      );
    } else {
      await db.collection('Post').updateMany(
        { _p_stylist: `Stylist$${objectId}` },
        {
          $set: {
            'stylistObject.status': status,
          },
        },
      );
    }
  }
};
PostService.migrateStylistStatusForOldPost = async () => {
  const db = await mongoDB.getMongoDB();
  const stylists = await db
    .collection('Post')
    .find({})
    .project({
      stylistId: '$_p_stylist',
    })
    .toArray();
  const allStylistIds = new Set();
  stylists.forEach((stylist) => {
    const stylistId = stylist.stylistId.split('$')[1];
    if (stylistId) {
      allStylistIds.add(stylistId);
    }
  });
  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.containedIn('objectId', [...allStylistIds]);
  const stylistParsers = await stylistQuery.findAll({ useMasterKey: true });
  console.log('List stylist need updated: ', [...allStylistIds]);
  const stylitPromise = stylistParsers.map((stylist) => {
    const dirtyKeys = ['status'];
    const requireFields = ['status'];
    return PostService.stylistChangeProfile({ dirtyKeys, objectData: stylist.toJSON(), requireFields });
  });
  await Promise.all(stylitPromise);
  return {
    listUpdated: [...allStylistIds],
  };
};
module.exports = PostService;
