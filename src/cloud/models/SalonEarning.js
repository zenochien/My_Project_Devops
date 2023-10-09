const mongoDB = require('../../db/mongoDB');

const BaseQuery = require('../BaseQuery');
const Errors = require('../../const/Errors');
const Helper = require('../../utils/helper');

const salonEarningModel = {};
module.exports = salonEarningModel;

salonEarningModel.getEarningBySalonAndDate = async ({ salonId, date }) => {
  const query = BaseQuery.getSalonEarningQuery();
  query.equalTo('salonId', salonId);
  query.lessThanOrEqualTo('startCycle', date);
  query.greaterThanOrEqualTo('endCycle', date);
  const earning = await query.first({ useMasterKey: true });
  if (earning) {
    return earning;
  }
  throw new Parse.Error(Errors.EMPTY_REANING.code, Errors.EMPTY_REANING.message);
};

salonEarningModel.getTotalEarningWithoutPayoutInACycle = async ({ cycleId, salonId }) => {
  const query = BaseQuery.getSalonEarningQuery();
  query.equalTo('cycleId', cycleId);
  query.equalTo('isGeneratePayout', false);
  if (salonId) {
    query.equalTo('salonId', salonId);
  }
  return query.count({ useMasterKey: true });
};

salonEarningModel.getEarningWithoutPayoutInACycle = async ({ cycleId, limit, salonId }) => {
  const filter = {
    cycleId,
    isGeneratePayout: false,
  };
  if (salonId) {
    filter.salonId = salonId;
  }
  const db = await mongoDB.getMongoDB();
  return await db
    .collection('SalonEarning')
    .aggregate([
      {
        $match: filter,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'Salon',
          localField: 'salonId',
          foreignField: '_id',
          as: 'salon',
        },
      },
      {
        $project: {
          _id: 1,
          payoutEarningId: 1,
          salon: { $arrayElemAt: ['$salon', 0] },
          startCycle: 1,
          endCycle: 1,
          salonId: 1,
        },
      },
    ])
    .toArray();
};

salonEarningModel.getSalonEarningByAdmin = async (params) => {
  const { cycleId, holdingCompanyIds, notBelongToCompany = false, ...pagingParams } = params;

  const salonEarningQuery = BaseQuery.getSalonEarningQuery();
  if (cycleId) {
    salonEarningQuery.equalTo('cycleId', cycleId);
  }

  const query = [];
  if (holdingCompanyIds && holdingCompanyIds.length > 0) {
    query.push(BaseQuery.getSalonEarningQuery().containedIn('salonObject.holdingCompany.objectId', holdingCompanyIds));
  }
  if (notBelongToCompany) {
    query.push(BaseQuery.getSalonEarningQuery().doesNotExist('salonObject.holdingCompany.objectId'));
  }
  if (query.length > 0) {
    const searchQuery = BaseQuery.getSalonEarningQuery()._orQuery(query);
    salonEarningQuery._andQuery([searchQuery]);
  }

  Helper.queryPagingHandler(salonEarningQuery, pagingParams);
  const [salonEarnings, total] = await Promise.all([
    salonEarningQuery.find({ useMasterKey: true }),
    salonEarningQuery.count({ useMasterKey: true }),
  ]);
  return {
    total,
    list: salonEarnings.map((salon) => salon.toJSON()),
  };
};

salonEarningModel.getPayoutIdsForPayoutSummaryByAdmin = async (params) => {
  const { cycleId, holdingCompanyIds, notBelongToCompany = false } = params;

  const salonEarningQuery = BaseQuery.getSalonEarningQuery();
  salonEarningQuery.limit(10000);
  salonEarningQuery.select(['payoutId']);
  if (cycleId) {
    salonEarningQuery.equalTo('cycleId', cycleId);
  }

  const query = [];
  if (holdingCompanyIds && holdingCompanyIds.length > 0) {
    query.push(BaseQuery.getSalonEarningQuery().containedIn('salonObject.holdingCompany.objectId', holdingCompanyIds));
  }
  if (notBelongToCompany) {
    query.push(BaseQuery.getSalonEarningQuery().doesNotExist('salonObject.holdingCompany.objectId'));
  }
  if (query.length > 0) {
    const searchQuery = BaseQuery.getSalonEarningQuery()._orQuery(query);
    salonEarningQuery._andQuery([searchQuery]);
  }

  const salonEarnings = await salonEarningQuery.find({ useMasterKey: true });
  return {
    salonEarnings: salonEarnings.map((salon) => salon.toJSON()),
  };
};

salonEarningModel.updateNewPayoutId = async (earningId, newPayoutId) => {
  const salonEarningQuery = BaseQuery.getSalonEarningQuery();
  salonEarningQuery.equalTo('payoutEarningId', earningId);
  const salonEarning = await salonEarningQuery.first({ useMasterKey: true });
  if (salonEarning) {
    salonEarning.set('payoutId', newPayoutId);
    await salonEarning.save({ useMasterKey: true });
  }
};
