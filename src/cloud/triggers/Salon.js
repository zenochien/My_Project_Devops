const _ = require('lodash');
const { EVENTS } = require('../../const/Constants');
const eventManager = require('./../../utils/Event');
const SalonTrigger = {};
module.exports = SalonTrigger;

const triggerFields = [
  'salonName',
  'salonImage',
  'salonNameKatakana',
  'distanceNearestStation',
  'stationName',
  'salonAddress1',
  'salonAddress2',
  'holdingCompany',
];
Object.assign(SalonTrigger, {
  beforeSaveSalon: {
    class: 'Salon',
    handler: async (request) => {
      const SalonObject = request.object;

      // check if trigger change profile event
      request.context.dirtyKeys = SalonObject.dirtyKeys();
      if (_.intersection(request.context.dirtyKeys, triggerFields).length) {
        SalonObject.set('triggerChangeProfile', { dirtyKeys: request.context.dirtyKeys });
        request.context.triggerChangeProfile = true;
      }
    },
  },
  afterSaveSalon: {
    class: 'Salon',
    handler: async (request) => {
      const SalonObject = request.object;
      if (SalonObject.get('salonImage')) {
        await SalonObject.get('salonImage').fetch({ useMasterKey: true });
      }
      if (request.context.triggerChangeProfile) {
        eventManager.emit(EVENTS.SALON_CHANGE_PROFILE, {
          dirtyKeys: request.context.dirtyKeys,
          objectData: SalonObject.toJSON(),
        });
      }
    },
  },
});
