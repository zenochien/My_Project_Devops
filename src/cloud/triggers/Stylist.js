const _ = require('lodash');
const { EVENTS } = require('./../../const/Constants');
const eventManager = require('./../../utils/Event');
const StylistTrigger = {};
module.exports = StylistTrigger;

const Validation = require('../../utils/validation');
const triggerFields = [
  'firstName',
  'lastName',
  'fullName',
  'stylistEmail',
  'gender',
  'profileImages',
  'status',
  'profileText',
  'stylistSNS',
  'nickName',
  'userStatus',
  'profile',
  'reviewCount',
  'generalScore',
  'styleScoreAvg',
  'serviceScoreAvg',
  'isOfficial',
];
Object.assign(StylistTrigger, {
  beforeSaveStylist: {
    class: 'Stylist',
    handler: async (request) => {
      const stylistObject = request.object;
      Validation.checkRequireFields(['firstName', 'lastName'], stylistObject);

      if (stylistObject.dirty('firstName') || stylistObject.dirty('lastName')) {
        const firstName = stylistObject.get('firstName');
        const lastName = stylistObject.get('lastName');
        stylistObject.set('fullName', `${lastName} ${firstName}`);
      }

      // check if trigger event change profile
      request.context.dirtyKeys = stylistObject.dirtyKeys();
      if (_.intersection(request.context.dirtyKeys, triggerFields).length) {
        stylistObject.set('triggerChangeProfile', { dirtyKeys: request.context.dirtyKeys });
        request.context.triggerChangeProfile = true;
      }
    },
  },
  afterSaveStylist: {
    class: 'Stylist',
    handler: async (request) => {
      const stylistObject = request.object;
      if (request.context.triggerChangeProfile) {
        eventManager.emit(EVENTS.STYLIST_CHANGE_PROFILE, {
          dirtyKeys: request.context.dirtyKeys,
          objectData: stylistObject.toJSON(),
        });
      }
    },
  },
});
