const moment = require('moment-timezone');
const mongoDB = require('../../db/mongoDB');
const _ = require('lodash');

const BaseQuery = require('../BaseQuery');
const { getPayoutService } = require('../../services/PayoutService');

const Errors = require('../../const/Errors');
const helper = require('../../utils/helper');
const { EARNINGS_PAYOUT_STATUS, STATUS } = require('../../const/Constants');

const salonEarningService = {};
module.exports = salonEarningService;

salonEarningService.makeCurrentAndNextEarning = async ({
  salonId,
  startCycle,
  endCycle,
  payoutAccount,
  nextStartCycle,
  nextEndCycle,
}) => {
  const momentStartCycle = moment(startCycle);
  const momentEndCycle = moment(endCycle);
  const currentEarning = await salonEarningService.getEarning({
    salonId,
    momentStartCycle,
    momentEndCycle,
    payoutAccount,
  });
  let nextEarning;
  // consider generate next earning if current time is next to end of day
  if (moment().add(2, 'minutes').isAfter(momentEndCycle)) {
    nextEarning = await salonEarningService.getEarning({
      salonId,
      momentStartCycle: moment(nextStartCycle),
      momentEndCycle: moment(nextEndCycle),
      payoutAccount,
    });
  }
  return { currentEarning, nextEarning };
};

salonEarningService.getEarning = async ({ salonId, momentStartCycle, momentEndCycle, payoutAccount }) => {
  const query = BaseQuery.getSalonEarningQuery();
  query.equalTo('salonId', salonId);
  query.equalTo('cycleId', helper.getCycleIdFromStartCycle(momentStartCycle));
  let earning = await query.first({ useMasterKey: true });

  const salonQuery = BaseQuery.getSalonQuery();
  const salon = await salonQuery.get(salonId, { useMasterKey: true });
  const salonObject = {
    objectId: salon.id,
    salonName: salon.get('salonName'),
    salonNameKatakana: salon.get('salonNameKatakana'),
    holdingCompany: salon.get('holdingCompany'),
  };

  if (!earning) {
    const originalEarning = await salonEarningService.getEarningFromPayoutService({
      momentStartCycle,
      momentEndCycle,
      payoutAccount,
    });
    earning = new Parse.Object('SalonEarning');
    earning.set('salonId', salonId);
    earning.set('salonObject', salonObject);
    earning.set('cycleId', helper.getCycleIdFromStartCycle(momentStartCycle));
    earning.set('startCycle', momentStartCycle.toDate());
    earning.set('endCycle', momentEndCycle.toDate());
    earning.set('payoutEarningId', originalEarning.id);
    earning.set('isGeneratePayout', false);
    await earning.save(null, { useMasterKey: true });
  }
  return earning;
};

salonEarningService.getEarningFromPayoutService = async ({ momentStartCycle, momentEndCycle, payoutAccount }) => {
  const payoutService = getPayoutService();
  const earnings = await payoutService.getEarnings({
    from: momentStartCycle.toISOString(),
    to: momentEndCycle.toISOString(),
    accountIds: payoutAccount.accountId,
    type: 'cycle',
    page: 1,
    limit: 10,
  });
  if (earnings.total === 1) {
    return {
      id: earnings.data[0].id,
      startCycle: momentStartCycle,
      endCycle: momentEndCycle,
    };
  }
  if (!earnings.total) {
    const result = await payoutService.createEarning({
      accountId: payoutAccount.accountId,
      from: momentStartCycle.toISOString(),
      to: momentEndCycle.toISOString(),
      currency: payoutAccount.currency,
    });
    return {
      id: result.id,
      startCycle: momentStartCycle,
      endCycle: momentEndCycle,
    };
  }
  throw new Parse.Error(Errors.INVALID_EARNING.code, Errors.INVALID_EARNING.message);
};

salonEarningService.getEarningByCycleIdBySalonId = (cycleId, salonId) => {
  const query = BaseQuery.getSalonEarningQuery();
  query.equalTo('salonId', salonId);
  query.equalTo('cycleId', cycleId);
  return query.first({ useMasterKey: true });
};

salonEarningService.salonChangeProfile = async ({ dirtyKeys, objectData, requireFields }) => {
  console.log('data: ', dirtyKeys, objectData);
  if (_.intersection(dirtyKeys, requireFields).length) {
    const db = await mongoDB.getMongoDB();
    let update = {
      $set: {
        'salonObject.salonName': objectData.salonName,
        'salonObject.salonNameKatakana': objectData.salonNameKatakana,
      },
    };
    let filter = {
      salonId: objectData.objectId,
    };

    if (objectData.holdingCompany) {
      update = {
        ...update,
        $set: {
          ...update.$set,
          'salonObject.holdingCompany': objectData.holdingCompany,
        },
      };
      filter = {
        ...filter,
        isGeneratePayout: false,
      };
    }
    await db.collection('SalonEarning').updateMany(filter, update);
  }
};

salonEarningService.migratePayoutIdChangeTranferFee = async () => {
  const db = await mongoDB.getMongoDB();
  const salonEarnings = await db
    .collection('SalonEarning')
    .find({
      isGeneratePayout: true,
    })
    .project({ payoutEarningId: 1, payoutId: 1 })
    .toArray();
  let ids = '';
  salonEarnings.forEach((salonEarning, index) => {
    if (index === 0) {
      ids = salonEarning.payoutId;
    } else {
      ids = ids + ',' + salonEarning.payoutId;
    }
  });
  const payoutServices = getPayoutService();
  const result = await payoutServices.getPayouts({
    page: 1,
    limit: 100,
    status: [EARNINGS_PAYOUT_STATUS.CANCELED, EARNINGS_PAYOUT_STATUS.CANCELED],
    ids,
  });

  const { data: payouts } = result;
  const updateds = [];

  for (let i = 0; i < payouts.length; i++) {
    const earningId = payouts[i].metadata.earningId;
    const result = await payoutServices.getPayouts({
      page: 1,
      limit: 100,
      status: [
        EARNINGS_PAYOUT_STATUS.PENDING,
        EARNINGS_PAYOUT_STATUS.SCHEDULED,
        EARNINGS_PAYOUT_STATUS.COMPLETED,
        EARNINGS_PAYOUT_STATUS.REVERTED,
      ],
      metaKeywords: earningId,
    });

    if (result.data[0]) {
      updateds.push({
        updateOne: {
          filter: { payoutEarningId: earningId },
          update: {
            $set: {
              payoutId: result.data[0].id,
            },
          },
        },
      });
    }
  }
  if (updateds.length > 0) {
    await db.collection('SalonEarning').bulkWrite(updateds);
  }

  console.log('total cancle payout:', payouts.length);
  console.log('total update salon earning:', updateds.length);
};
