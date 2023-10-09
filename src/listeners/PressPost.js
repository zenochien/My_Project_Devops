const mongoDB = require('../db/mongoDB');
const _ = require('lodash');
const { STATUS } = require('../const/Constants');
module.exports = {
  stylistChangeProfile: async ({ dirtyKeys, objectData }) => {
    console.log('data: ', dirtyKeys, objectData);
    const requireFields = ['status', 'userStatus'];
    const db = await mongoDB.getMongoDB();
    const invalidStylist = objectData.status !== STATUS.PUBLISHED || objectData.userStatus === STATUS.DELETED;
    if (_.intersection(dirtyKeys, requireFields).length && invalidStylist) {
      await db.collection('Stylist').updateMany(
        {
          _id: objectData.objectId,
        },
        {
          $set: {
            totalPressPost: 0,
          },
        },
      );
      await db.collection('PressPost').updateMany(
        {
          'stylists.objectId': objectData.objectId,
        },
        {
          $pull: {
            stylists: {
              objectId: objectData.objectId,
            },
          },
        },
      );
    }
  },
};
