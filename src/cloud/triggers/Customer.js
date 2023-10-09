const _ = require('lodash');
const eventManager = require('./../../utils/Event');
const { EVENTS } = require('./../../const/Constants');
const CustomerTrigger = {};
module.exports = CustomerTrigger;

const triggerFields = [
  'firstName',
  'lastName',
  'nickName',
  'gender',
  'phoneticFirstName',
  'phoneticLastName',
  'birthDate',
  'profileImages',
  'phone',
  'fullName',
  'userStatus',
];
Object.assign(CustomerTrigger, {
  beforeSaveCustomer: {
    class: 'Customer',
    handler: async (request) => {
      const customerObject = request.object;

      // check if trigger change profile event
      request.context.dirtyKeys = customerObject.dirtyKeys();
      if (_.intersection(request.context.dirtyKeys, triggerFields).length) {
        customerObject.set('triggerChangeProfile', { dirtyKeys: request.context.dirtyKeys });
        request.context.triggerChangeProfile = true;
      }
    },
  },
  afterSaveCustomer: {
    class: 'Customer',
    handler: async (request) => {
      const customerObject = request.object;
      if (request.context.triggerChangeProfile) {
        eventManager.emit(EVENTS.CUSTOMER_CHANGE_PROFILE, {
          dirtyKeys: request.context.dirtyKeys,
          objectData: customerObject.toJSON(),
        });
      }
    },
  },
});
