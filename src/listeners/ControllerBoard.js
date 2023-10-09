const mongoDB = require('../db/mongoDB');
const controllerBoard = require('./../cloud/models/ControllerBoard');
module.exports = {
  deleteStylist: async ({ cbStaffId, objectId, job = false }) => {
    const db = await mongoDB.getMongoDB();
    try {
      await controllerBoard.deleteStaff({ cbStaffId });
      await db
        .collection('Stylist')
        .updateOne({ _id: objectId }, { $unset: { updatedStaffInfoAfterDeleteStylist: '' } });
    } catch (error) {
      console.error('[ControllerBoard][deleteStylist]', error);
      await db
        .collection('Stylist')
        .updateOne({ _id: objectId }, { $set: { 'updatedStaffInfoAfterDeleteStylist.handledByJob': job } });
    }
  },
};
