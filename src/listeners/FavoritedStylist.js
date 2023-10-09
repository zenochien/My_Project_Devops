const mongoDB = require('../db/mongoDB');
const _ = require('lodash');
const FavoriteModel = require('./../cloud/models/Favorite');
module.exports = {
  customerChangeProfile: async ({ dirtyKeys, objectData }) => {
    console.log('data: ', dirtyKeys, objectData);
    const requireFields = ['fullName', 'nickName', 'profileImages'];
    if (_.intersection(dirtyKeys, requireFields).length) {
      const db = await mongoDB.getMongoDB();
      const { customerInfo } = FavoriteModel.prepareCustomerAndStylistInfo({ customer: objectData });
      await db.collection('FavoritedStylist').updateMany(
        {
          'cutomer.objectId': objectData.objectId,
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
    const requireFields = ['fullName', 'isOfficial', 'nickName', 'profileImages'];
    if (_.intersection(dirtyKeys, requireFields).length) {
      const db = await mongoDB.getMongoDB();
      const { stylistInfo } = FavoriteModel.prepareCustomerAndStylistInfo({ stylist: objectData });
      await db.collection('FavoritedStylist').updateMany(
        {
          'stylist.objectId': objectData.objectId,
        },
        {
          $set: {
            stylist: stylistInfo,
          },
        },
      );
    }
  },

  salonChangeProfile: async ({ dirtyKeys, objectData }) => {
    console.log('data: ', dirtyKeys, objectData);
    const requireFields = ['salonName', 'salonNameKatakana'];
    if (_.intersection(dirtyKeys, requireFields).length) {
      const db = await mongoDB.getMongoDB();
      const { salonInfo } = FavoriteModel.prepareCustomerAndStylistInfo({ salon: objectData });
      await db.collection('FavoritedStylist').updateMany(
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
