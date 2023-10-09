const _ = require('lodash');

const { getInstance } = require('../../utils/Rabbitmq');
const { EVENTS } = require('../../const/Constants');

const HoldingCompanyTrigger = {};
module.exports = HoldingCompanyTrigger;

const triggerFields = ['name', 'status'];
Object.assign(HoldingCompanyTrigger, {
  beforeSaveHoldingCompany: {
    class: 'HoldingCompany',
    handler: async (request) => {
      const HoldingCompanyObject = request.object;

      // check if trigger change profile event
      request.context.dirtyKeys = HoldingCompanyObject.dirtyKeys();
      if (_.intersection(request.context.dirtyKeys, triggerFields).length) {
        request.context.triggerChangeProfile = true;
      }
    },
  },
  afterSaveHoldingCompany: {
    class: 'HoldingCompany',
    handler: async () => {},
  },
});
