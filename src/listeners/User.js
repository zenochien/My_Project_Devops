const { getInstance } = require('../utils/Rabbitmq');
const mongoDB = require('../db/mongoDB');
const { EVENTS } = require('../const/Constants');
module.exports = {
  stylistChangeProfile: async ({ dirtyKeys, objectData }) => {
    const rabbitmqManager = getInstance();
    try {
      await rabbitmqManager.publish({
        data: {
          dirtyKeys,
          objectData,
        },
        eventName: EVENTS.STYLIST_CHANGE_PROFILE,
      });
      const db = await mongoDB.getMongoDB();
      await db.collection('Stylist').updateOne({ _id: objectData.objectId }, { $unset: { triggerChangeProfile: '' } });
    } catch (error) {
      console.error('[User][stylistChangeProfile]', error);
    }
  },

  customerChangeProfile: async ({ dirtyKeys, objectData }) => {
    const rabbitmqManager = getInstance();
    try {
      await rabbitmqManager.publish({
        data: {
          dirtyKeys,
          objectData,
        },
        eventName: EVENTS.CUSTOMER_CHANGE_PROFILE,
      });
      const db = await mongoDB.getMongoDB();
      await db.collection('Customer').updateOne({ _id: objectData.objectId }, { $unset: { triggerChangeProfile: '' } });
    } catch (error) {
      console.error('[User][customerChangeProfile]', error);
    }
  },

  salonChangeProfile: async ({ dirtyKeys, objectData }) => {
    const rabbitmqManager = getInstance();
    try {
      await rabbitmqManager.publish({
        data: {
          dirtyKeys,
          objectData,
        },
        eventName: EVENTS.SALON_CHANGE_PROFILE,
      });
      const db = await mongoDB.getMongoDB();
      await db.collection('Salon').updateOne({ _id: objectData.objectId }, { $unset: { triggerChangeProfile: '' } });
    } catch (error) {
      console.error('[User][salonChangeProfile]', error);
    }
  },
};
