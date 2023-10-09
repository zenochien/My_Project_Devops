const mongoDB = require('../db/mongoDB');
const _ = require('lodash');
module.exports = {
  customerChangeProfile: async ({ dirtyKeys, objectData }) => {
    console.log('data: ', dirtyKeys, objectData);
    const requireFields = ['fullName', 'profileImages'];
    if (_.intersection(dirtyKeys, requireFields).length) {
      const db = await mongoDB.getMongoDB();
      const removedData = {};
      const updatedData = {
        'data.customerNickName': objectData.fullName,
        'data.isToRecompile': true,
      };
      if (objectData.profileImages) {
        updatedData['data.customerProfileImage'] = objectData.profileImages;
      } else {
        removedData['data.customerProfileImage'] = '';
      }
      await db.collection('Notification').updateMany(
        {
          'data.customerId': objectData.objectId,
          'data.createdBy': { $exists: true },
        },
        {
          $set: updatedData,
          $unset: removedData,
        },
      );
    }
  },

  stylistChangeProfile: async ({ dirtyKeys, objectData }) => {
    console.log('data: ', dirtyKeys, objectData);
    const requireFields = ['nickName', 'profileImages'];
    if (_.intersection(dirtyKeys, requireFields).length) {
      const db = await mongoDB.getMongoDB();
      const removedData = {};
      const updatedData = {
        'data.stylistNickName': objectData.nickName,
        'data.isToRecompile': true,
      };
      if (objectData.profileImages) {
        updatedData['data.stylistProfileImage'] = objectData.profileImages;
      } else {
        removedData['data.stylistProfileImage'] = '';
      }
      await db.collection('Notification').updateMany(
        {
          'data.stylistId': objectData.objectId,
          'data.createdBy': { $exists: true },
        },
        {
          $set: updatedData,
          $unset: removedData,
        },
      );
    }
  },

  salonChangeProfile: async ({ dirtyKeys, objectData }) => {
    console.log('data: ', dirtyKeys, objectData);
    const requireFields = ['salonName', 'salonImage'];
    if (_.intersection(dirtyKeys, requireFields).length) {
      const db = await mongoDB.getMongoDB();
      await db.collection('Notification').updateMany(
        {
          'data.salonId': objectData.objectId,
          'data.createdBy': { $exists: true },
        },
        {
          $set: {
            'data.salonName': objectData.salonName,
            'data.salonImage': {
              thumbSmall: _.get(objectData.salonImage, 'thumbSmall.url', ''),
              thumbMedium: _.get(objectData.salonImage, 'thumbMedium.url', ''),
              thumbLarge: _.get(objectData.salonImage, 'thumbLarge.url', ''),
            },
            'data.isToRecompile': true,
          },
        },
      );
    }
  },
};
