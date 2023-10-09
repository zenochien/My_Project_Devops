const mongoDB = require('../db/mongoDB');
const _ = require('lodash');
const reviewModel = require('./../cloud/models/Review');
module.exports = {
  customerChangeProfile: async ({ dirtyKeys, objectData }) => {
    console.log('data: ', dirtyKeys, objectData);
    const requireFields = ['nickName', 'profileImages', 'fullName'];
    if (_.intersection(dirtyKeys, requireFields).length) {
      const db = await mongoDB.getMongoDB();
      const { customerInfo } = reviewModel.prepareDataForReview({ customer: objectData });
      await db.collection('Review').updateMany(
        {
          customerId: objectData.objectId,
        },
        {
          $set: {
            customer: customerInfo,
          },
        },
      );
    }
  },

  stylistChangeProfile: async ({ dirtyKeys, objectData }) => {
    console.log('data: ', dirtyKeys, objectData);
    const requireFields = ['nickName', 'profileImages', 'isOfficial', 'fullName'];
    const db = await mongoDB.getMongoDB();
    if (_.intersection(dirtyKeys, requireFields).length) {
      const { stylistInfo } = reviewModel.prepareDataForReview({ stylist: objectData });
      await db.collection('Review').updateMany(
        {
          stylistId: objectData.objectId,
        },
        {
          $set: {
            stylist: stylistInfo,
          },
        },
      );
    }

    // update for migrate old data
    if (_.intersection(dirtyKeys, ['salon', 'salon.salonName']).length) {
      const { salonInfo } = reviewModel.prepareDataForReview({ salon: objectData.salon });
      await db.collection('Review').updateMany(
        {
          stylistId: objectData.objectId,
        },
        {
          $set: {
            salon: salonInfo,
          },
        },
      );
    }
  },

  salonChangeProfile: async ({ dirtyKeys, objectData }) => {
    console.log('data: ', dirtyKeys, objectData);
    const requireFields = ['salonName'];
    if (_.intersection(dirtyKeys, requireFields).length) {
      const db = await mongoDB.getMongoDB();
      const { salonInfo } = reviewModel.prepareDataForReview({ salon: objectData });
      await db.collection('Review').updateMany(
        {
          'salon.objectId': objectData.objectId,
        },
        {
          $set: {
            salon: salonInfo,
          },
        },
      );
    }
  },
};
