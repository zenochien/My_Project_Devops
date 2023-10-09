const BaseQuery = require('../BaseQuery');
const menuService = require('./Menu');
const BankModel = require('../models/Bank');
const SalonModel = require('../models/Salon');
const UserModel = require('../models/User');
const HoldingCompanyModel = require('../models/HoldingCompany');
const salonEarningModel = require('../models/SalonEarning');
const mongoDB = require('../../db/mongoDB');
const _ = require('lodash');
const Errors = require('../../const/Errors');
const { STATUS, EVENTS } = require('../../const/Constants');
const { getPayoutService } = require('../../services/PayoutService');
const holdingCompanyService = require('./HoldingCompany');
const helper = require('../../utils/helper');
const moment = require('moment-timezone');
const eventManager = require('./../../utils/Event');

const salonService = {
  assignMenusToStylist: async (params) => {
    const { stylistId, menuIds = [] } = params;
    const stylistquery = BaseQuery.getStylistQuery();
    stylistquery.equalTo('objectId', stylistId);
    const stylistParse = await stylistquery.first({ useMasterKey: true });
    if (!stylistParse) {
      const { code, message } = Errors.OBJECT_NOT_FOUND;
      throw new Parse.Error(code, message);
    }
    const status = [STATUS.PUBLISHED, STATUS.UNPUBLISHED];
    const { salonId, remove, add } = await menuService.processMenusIds(menuIds, stylistParse, status);
    await menuService.assignMenus(stylistId, add, remove, salonId, status, true);
    return {
      success: true,
    };
  },

  updateBankInfo: async ({ bankId, branchId, type, accountName, accountNumber, salonId }) => {
    const [bank, branch] = await Promise.all([
      BankModel.getBankInfo({ bankId }),
      BankModel.getBranchInfo({ bankId, branchId }),
    ]);
    const bankInfo = {
      bank: _.pick(bank.toJSON(), ['objectId', 'bankName', 'bankCode', 'bankNameHiragana']),
      branch: _.pick(branch.toJSON(), [
        'objectId',
        'branchName',
        'branchCode',
        'branchNameHiragana',
        'telephone',
        'postalCode',
        'address',
      ]),
      type,
      accountName,
      accountNumber,
    };
    const db = await mongoDB.getMongoDB();
    await db.collection('Salon').updateOne({ _id: salonId }, { $set: { bankInfo } });
    return bankInfo;
  },

  createAnPayoutAccount: async () => {
    const payoutService = getPayoutService();
    const account = await payoutService.createAccount();
    const accountId = _.get(account, 'id');
    const balanceId = _.get(account, 'balance.id');
    const currency = _.get(account, 'balance.currency');
    if (accountId && balanceId && currency) {
      return {
        accountId,
        balanceId,
        currency,
      };
    }
    throw new Parse.Error(Errors.UNAVAILABLE_PAYOUT_SERVICE.code, Errors.UNAVAILABLE_PAYOUT_SERVICE.message);
  },

  syncSalonToPayout: async (salon) => {
    if (!salon.has('payoutAccount')) {
      try {
        const payoutAccount = await salonService.createAnPayoutAccount();
        const db = await mongoDB.getMongoDB();
        await db.collection('Salon').updateOne({ _id: salon.id }, { $set: { payoutAccount } });
      } catch (error) {
        console.error('[SalonService][syncSalonToPayout]:error:', error);
        throw error;
      }
    }
  },

  syncAllSalonToPayoutService: async () => {
    const limit = 50;
    const total = await SalonModel.countSalonWithoutPayoutAccount();
    const stop = total + limit;
    let start = 0;
    const salonIds = [];
    do {
      const salons = await SalonModel.getSalonWithoutPayoutAccount(limit);
      for (let i = 0; i < salons.length; i++) {
        await salonService.syncSalonToPayout(salons[i]);
        salonIds.push(salons[i].id);
        console.log(`[syncAllSalonToPayoutService]:${salons[i].id}`);
      }
      start = start + limit;
    } while (start < stop);
    return salonIds;
  },

  createSalonOperator: async (payload) => {
    const { holdingCompanyId } = payload;
    const payoutAccount = await salonService.createAnPayoutAccount();
    let salonData = {
      ...payload,
      payoutAccount,
    };
    if (holdingCompanyId) {
      const holdingCompany = await HoldingCompanyModel.getHoldingCompanyById(holdingCompanyId);
      salonData = {
        ...salonData,
        holdingCompany: {
          objectId: holdingCompany.id,
          name: holdingCompany.get('name'),
          status: holdingCompany.get('status'),
        },
      };
    }
    return await UserModel.createSalonOperator(salonData);
  },

  generatePayout: async ({ startDate, salonId }) => {
    // salonService.checkGeneratingpayout({ startDate });
    const limit = 10;
    const cycleId = helper.getCycleIdFromStartCycle(startDate);
    const total = (await salonEarningModel.getTotalEarningWithoutPayoutInACycle({ cycleId, salonId })) + limit;
    let updatedItemsTotal = 0;
    let earningIds = [];
    do {
      const localEarnings = await salonEarningModel.getEarningWithoutPayoutInACycle({ limit, cycleId, salonId });
      const earnings = await salonService.getEarningFromPayoutService(localEarnings);
      for (let i = 0; i < earnings.length; i++) {
        await salonService.createPayout({ earning: earnings[i], cycleId });
      }

      updatedItemsTotal = updatedItemsTotal + limit;
      earningIds = _.union(
        earningIds,
        localEarnings.map((item) => item._id),
      );
    } while (updatedItemsTotal < total);
    console.log('[salonService][generatePayout]', earningIds);
    return earningIds;
  },

  checkGeneratingpayout: ({ startDate }) => {
    const { startCycle } = helper.getCurrentCycle();
    if (moment(startCycle).isSameOrBefore(moment(startDate))) {
      throw new Parse.Error(Errors.INVALID_TIME_GENERATE_PAYOUT.code, Errors.INVALID_TIME_GENERATE_PAYOUT.message);
    }
  },

  getEarningFromPayoutService: async (localEarnings) => {
    if (!localEarnings.length) {
      return [];
    }
    const momentStartCycle = moment(localEarnings[0].startCycle);
    const momentEndCycle = moment(localEarnings[0].endCycle);
    const accountIds = [];
    localEarnings.forEach((item) => {
      const accountId = _.get(item, 'salon.payoutAccount.accountId');
      if (accountId) {
        accountIds.push(accountId);
      }
    });
    const payoutService = getPayoutService();
    const { data } = await payoutService.getEarnings({
      from: momentStartCycle.toISOString(),
      to: momentEndCycle.toISOString(),
      accountIds,
      type: 'cycle',
      page: 1,
      limit: 100,
    });
    return data.map((item) => {
      const localData = _.find(localEarnings, { payoutEarningId: item.id });
      item.localData = {
        salonId: localData.salonId,
        earningId: localData._id,
        payoutAccount: localData.salon.payoutAccount,
      };
      return item;
    });
  },

  createPayout: async ({ earning, cycleId }) => {
    const updatedData = {
      isGeneratePayout: true,
    };
    const fee = salonService.getBankTransferFee(earning.net);
    if (earning.net >= fee) {
      const payoutService = getPayoutService();
      const data = {
        balanceId: earning.localData.payoutAccount.balanceId,
        amount: earning.net,
        currency: earning.currency,
        description: 'Payout',
        fee,
        feeDetails: {
          type: 'string',
        },
        metadata: {
          salonId: earning.localData.salonId,
          earningId: earning.id,
          cycleId,
          gross: earning.gross,
          fee: earning.fee,
          net: earning.net,
        },
      };
      const payout = await payoutService.createPayout(data);
      updatedData.payoutId = payout.id;
    }

    const db = await mongoDB.getMongoDB();
    await db.collection('SalonEarning').updateOne({ _id: earning.localData.earningId }, { $set: updatedData });
  },

  getBankTransferFee: (amount) => {
    if (amount < 100000) {
      return 229;
    }
    return 0;
  },

  migratedSalonForSalonEarning: async () => {
    const db = await mongoDB.getMongoDB();
    const salonEarnings = await db.collection('SalonEarning').find({}).project({ salonId: 1 }).toArray();
    const salonEarningIDs = new Set();
    salonEarnings.forEach((salon) => salonEarningIDs.add(salon.salonId));
    const salons = await db
      .collection('Salon')
      .find({ _id: { $in: [...salonEarningIDs] } })
      .project({ _id: 1, salonName: 1, salonNameKatakana: 1, holdingCompany: 1 })
      .toArray();
    const updateds = salons.map((item) => {
      const filter = {
        salonId: item._id,
      };
      let salonObject = {
        objectId: item._id,
        salonName: item.salonName,
        salonNameKatakana: item.salonNameKatakana,
      };

      if (item.holdingCompany) {
        salonObject = {
          ...salonObject,
          holdingCompany: item.holdingCompany,
        };
      }

      const update = {
        $set: {
          salonObject,
        },
      };
      return {
        updateMany: {
          filter,
          update,
        },
      };
    });
    await db.collection('SalonEarning').bulkWrite(updateds);
  },
};

module.exports = salonService;
