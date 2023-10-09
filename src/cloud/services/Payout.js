const SalonModel = require('../models/Salon');
const SalonEarningModel = require('../models/SalonEarning');

const { getPayoutService } = require('../../services/PayoutService');
const PayoutTranferHistoryService = require('../services/PayoutTranferHistory');
const SalonEarningService = require('./SalonEarning');
const { BookingModel } = require('../models');
const Helper = require('../../utils/helper');
const { PAYOUT_TRANSFER_STATUS, EARNINGS_PAYOUT_STATUS, STATUS } = require('../../const/Constants');
const {
  PAYOUT_SERVICE_PAYOUT_STATUS_IS_COMPLETED,
  PAYOUT_SERVICE_PAYOUT_STATUS_IS_CANCELED,
  PAYOUT_SERVICE_PAYOUT_FEE_IS_SAME_DATA,
  PAYOUT_SERVICE_PAYOUT_FEE_GREATER_AMOUNT,
} = require('../../const/Errors');

const payoutService = {
  mapSalonToData: async (payouts, salonEarnings) => {
    const salonIds = new Set();
    payouts.map((value) => {
      if (value.metadata && value.metadata.salonId) {
        salonIds.add(value.metadata.salonId);
      }
    });
    const salons = await SalonModel.getSalonByIds([...salonIds]);
    const salonsData = new Map();
    salons.forEach((value) => {
      salonsData.set(value.objectId, value);
    });

    const salonEarning = new Map();
    salonEarnings.forEach((value) => {
      if (value.salonObject && value.salonObject.objectId && value.salonObject.holdingCompany) {
        salonEarning.set(value.salonObject.objectId, value.salonObject.holdingCompany);
      }
    });

    return payouts.map((value) => {
      let salonInfo;
      let holdingCompany;
      if (value.metadata && value.metadata.salonId) {
        salonInfo = salonsData.has(value.metadata.salonId) ? salonsData.get(value.metadata.salonId) : undefined;
        holdingCompany = salonEarning.has(value.metadata.salonId)
          ? salonEarning.get(value.metadata.salonId)
          : undefined;
      }
      return {
        ...value,
        salonInfo: salonInfo
          ? {
              ...salonInfo,
              holdingCompany,
            }
          : undefined,
      };
    });
  },
  processPayoutInfo: (payouts) => {
    return payouts.map((payout) => {
      return {
        payoutId: payout.id,
        earningId: payout.metadata ? payout.metadata.earningId : undefined,
        salonInfo: payout.salonInfo ? payout.salonInfo : undefined,
        totalSales: payout.metadata ? payout.metadata.gross : 0,
        commission: payout.metadata ? payout.metadata.fee : 0,
        subtotal: payout.metadata ? payout.metadata.net : 0,
        transferFee: payout.fee || 0,
        transferAmount: payout.net || 0,
        status: payout.status === 'completed' ? 'paid' : 'unpaid',
        action: 'view',
      };
    });
  },

  processPayoutSummaryInfo: (payout) => {
    return {
      totalSales: payout.metadata ? payout.metadata.totalGross : 0,
      commission: payout.metadata ? payout.metadata.totalFee : 0,
      subtotal: payout.metadata ? payout.metadata.totalNet : 0,
      transferFee: payout.totalFee || 0,
      transferAmount: payout.totalNet || 0,
    };
  },
  getPayouts: async (params) => {
    const {
      startCycle,
      status = [
        EARNINGS_PAYOUT_STATUS.PENDING,
        EARNINGS_PAYOUT_STATUS.SCHEDULED,
        EARNINGS_PAYOUT_STATUS.COMPLETED,
        EARNINGS_PAYOUT_STATUS.REVERTED,
      ],
    } = params;
    let input = { ...params };
    if (startCycle) {
      const cycleId = Helper.getCycleIdFromStartCycle(startCycle);

      input = {
        ...input,
        cycleId,
      };
    }

    const salonEarnings = await SalonEarningModel.getSalonEarningByAdmin(input);
    const payoutServices = getPayoutService();
    if (salonEarnings.list.length === 0) {
      return {
        total: 0,
        list: [],
      };
    }

    let ids = '';
    salonEarnings.list.forEach((salonEarning, index) => {
      if (index === 0) {
        ids = salonEarning.payoutId;
      } else {
        ids = ids + ',' + salonEarning.payoutId;
      }
    });
    const result = await payoutServices.getPayouts({
      page: 1,
      limit: 100,
      status,
      ids,
    });
    const payoutsFromService = result.data;
    const payoutWithSalon = await payoutService.mapSalonToData(payoutsFromService, salonEarnings.list);
    const list = await payoutService.processPayoutInfo(payoutWithSalon);
    return {
      total: salonEarnings.total,
      list,
    };
  },

  getNumbersPayout: async (params) => {
    const {
      startCycle,
      status = [
        EARNINGS_PAYOUT_STATUS.PENDING,
        EARNINGS_PAYOUT_STATUS.SCHEDULED,
        EARNINGS_PAYOUT_STATUS.COMPLETED,
        EARNINGS_PAYOUT_STATUS.REVERTED,
      ],
    } = params;
    let query = { page: 1, limit: 100, status };
    if (startCycle) {
      const cycleId = Helper.getCycleIdFromStartCycle(startCycle);
      query = {
        ...query,
        metaKeywords: cycleId,
      };
    }
    const payoutServices = getPayoutService();
    const result = await payoutServices.getPayouts(query);
    const { total = 0 } = result;
    return {
      total,
    };
  },

  getPayoutSummary: async (params) => {
    const { startCycle } = params;
    let input = { ...params };
    if (startCycle) {
      const cycleId = Helper.getCycleIdFromStartCycle(startCycle);
      input = {
        ...input,
        cycleId,
      };
    }

    const { salonEarnings } = await SalonEarningModel.getPayoutIdsForPayoutSummaryByAdmin(input);
    const payoutServices = getPayoutService();
    if (salonEarnings && salonEarnings.length === 0) {
      return {
        payoutSummary: {
          totalSales: 0,
          commission: 0,
          subtotal: 0,
          transferFee: 0,
          transferAmount: 0,
        },
      };
    }

    let ids = '';
    salonEarnings.forEach((salonEarning, index) => {
      if (index === 0) {
        ids = salonEarning.payoutId;
      } else {
        ids = ids + ',' + salonEarning.payoutId;
      }
    });
    const result = await payoutServices.getPayoutSummary({
      ids,
    });
    const payoutSummary = await payoutService.processPayoutSummaryInfo(result);
    return {
      payoutSummary,
    };
  },

  getSalonInfoForResponeData: (responeData, salonInfo) => {
    if (!salonInfo) {
      return {
        ...responeData,
        salon: null,
      };
    }
    responeData = {
      ...responeData,
      salon: {
        objectId: salonInfo.objectId || '',
        salonEmail: salonInfo.salonEmail || '',
        salonName: salonInfo.salonName || '',
        phone: salonInfo.phone || '',
        salonNameKatakana: salonInfo.salonNameKatakana || '',
      },
      bankInfo: salonInfo.bankInfo || null,
    };
    return responeData;
  },

  getPayoutInfoForResponeData: async (responeData, payout) => {
    if (payout.metadata && payout.metadata.salonId && payout.metadata.cycleId) {
      const { salonId, cycleId } = payout.metadata;
      const salonEarning = await SalonEarningService.getEarningByCycleIdBySalonId(cycleId, salonId);
      responeData = {
        ...responeData,
        salon: {
          ...responeData.salon,
          holdingCompany:
            salonEarning.attributes.salonObject && salonEarning.attributes.salonObject.holdingCompany
              ? salonEarning.attributes.salonObject.holdingCompany
              : undefined,
        },
        startCycle: salonEarning.get('startCycle').toISOString(),
        endCycle: salonEarning.get('endCycle').toISOString(),
      };
    }
    responeData = {
      ...responeData,
      totalSales: payout.metadata ? payout.metadata.gross : 0,
      commission: payout.metadata ? payout.metadata.fee : 0,
      subtotal: payout.metadata ? payout.metadata.net : 0,
    };
    return responeData;
  },

  getPayoutDetailByAdmin: async (params) => {
    const { payoutId } = params;
    const payoutServices = getPayoutService();
    const result = await payoutServices.getPayoutById(payoutId);
    let salonInfo = null;
    let responeData = {
      objectId: payoutId,
    };
    if (result.metadata && result.metadata.salonId) {
      salonInfo = await SalonModel.getSalonDetail({ objectId: result.metadata.salonId });
    }

    responeData = payoutService.getSalonInfoForResponeData(responeData, salonInfo);
    responeData = payoutService.getPayoutInfoForResponeData(responeData, result);
    return responeData;
  },

  getPayoutDetailBookinsByAdmin: async (params) => {
    const { earningId, ...pagingParams } = params;
    return BookingModel.getBookingByEarningId(earningId, pagingParams);
  },

  completePayoutsByAdmin: async (params) => {
    const { payoutIds } = params;
    const payoutServices = getPayoutService();
    const completePromise = payoutIds.map((payoutId) => {
      return payoutServices.completePayout(payoutId);
    });
    await Promise.all(completePromise);
    return {
      success: true,
    };
  },
  createPayout: async (payoutHistory, newFee) => {
    const { payout } = payoutHistory;
    try {
      const payoutServices = getPayoutService();
      const { amount, currency, description, feeDetails, metadata, balance: balanceId } = payout;
      const newPayoutData = await payoutServices.makePayoutById(balanceId, {
        amount,
        currency,
        description,
        fee: newFee,
        feeDetails,
        metadata,
      });
      return {
        payout: newPayoutData,
      };
    } catch (error) {
      console.error('createPayout', error);
      throw error;
    }
  },

  cancelPayout: async (payoutId, payoutHistoryId) => {
    try {
      const payoutServices = getPayoutService();
      await payoutServices.cancelPayoutById(payoutId);
    } catch (error) {
      await PayoutTranferHistoryService.deleteById(payoutHistoryId);
      throw error;
    }
  },

  checkStatusPayout: (status) => {
    switch (status) {
      case 'completed':
        throw new Parse.Error(
          PAYOUT_SERVICE_PAYOUT_STATUS_IS_COMPLETED.code,
          PAYOUT_SERVICE_PAYOUT_STATUS_IS_COMPLETED.message,
        );
      case 'canceled':
        throw new Parse.Error(
          PAYOUT_SERVICE_PAYOUT_STATUS_IS_CANCELED.code,
          PAYOUT_SERVICE_PAYOUT_STATUS_IS_CANCELED.message,
        );
      default:
        break;
    }
  },

  processTranferFee: async (payout, transferFee) => {
    const inputData = {
      payoutId: payout.id,
      payout,
      newTranferFee: transferFee,
      status: PAYOUT_TRANSFER_STATUS.PROCESS,
    };

    const payoutHistory = await PayoutTranferHistoryService.create(inputData);
    const { _id: payoutHistoryId } = payoutHistory;

    await payoutService.cancelPayout(payout.id, payoutHistoryId);

    const result = await payoutService.createPayout(payoutHistory, transferFee);

    await PayoutTranferHistoryService.updateStatus({
      id: payoutHistoryId,
      status: PAYOUT_TRANSFER_STATUS.DONE,
    });

    if (payout && payout.metadata && payout.metadata.earningId) {
      await SalonEarningModel.updateNewPayoutId(payout.metadata.earningId, result.payout.id);
    }
  },

  changePayoutTransferFeeByAdmin: async (params) => {
    const { payoutId, transferFee } = params;
    const PayoutServices = getPayoutService();
    const result = await PayoutServices.getPayoutById(payoutId);
    if (result && result.status) {
      payoutService.checkStatusPayout(result.status);
    }

    if (result && result.fee === transferFee) {
      const { code, message } = PAYOUT_SERVICE_PAYOUT_FEE_IS_SAME_DATA;
      throw new Parse.Error(code, message);
    }

    if (result && transferFee > result.amount) {
      const { code, message } = PAYOUT_SERVICE_PAYOUT_FEE_GREATER_AMOUNT;
      throw new Parse.Error(code, message);
    }

    await payoutService.processTranferFee(result, transferFee);

    return {
      success: true,
    };
  },

  processPayoutHistoryStatusError: async (earningId, payoutHistory, newTranferFee) => {
    const payoutServices = getPayoutService();
    const { _id: payoutHistoryId } = payoutHistory;
    const newPayout = await payoutServices.getPayouts({
      metaKeywords: `"earningId":"${earningId}"`,
      status: [EARNINGS_PAYOUT_STATUS.PENDING, EARNINGS_PAYOUT_STATUS.SCHEDULED, EARNINGS_PAYOUT_STATUS.REVERTED],
      page: 1,
      limit: 10,
    });

    if (newPayout.total > 0 && newPayout.data[0].status === EARNINGS_PAYOUT_STATUS.SCHEDULED) {
      await PayoutTranferHistoryService.updateStatus({
        id: payoutHistoryId,
        status: PAYOUT_TRANSFER_STATUS.DONE,
      });
    }

    if (!newPayout.total || newPayout.total === 0) {
      await payoutService.createPayout(payoutHistory, newTranferFee);
      await PayoutTranferHistoryService.updateStatus({
        id: payoutHistoryId,
        status: PAYOUT_TRANSFER_STATUS.DONE,
      });
    }
  },

  processPayoutChangeTranferFeeNotDone: async () => {
    const payoutHistoryIsProcess = await PayoutTranferHistoryService.getProcessPayoutHistory();
    if (payoutHistoryIsProcess.length > 0) {
      for (let i = 0; i < payoutHistoryIsProcess.length; i++) {
        const payoutHistory = payoutHistoryIsProcess[i];
        const { payout, newTranferFee } = payoutHistory;
        const { id: payoutId } = payout;
        const { earningId } = payout.metadata;
        const PayoutServices = getPayoutService();
        const oldPayout = await PayoutServices.getPayoutById(payoutId);
        if (oldPayout && oldPayout.status === EARNINGS_PAYOUT_STATUS.CANCELED) {
          await payoutService.processPayoutHistoryStatusError(earningId, payoutHistory, newTranferFee);
        }
      }
    }
  },
  completeCyclePayoutsByAdmin: async (params) => {
    const payoutServices = getPayoutService();
    const { startCycle, status = [EARNINGS_PAYOUT_STATUS.PENDING, EARNINGS_PAYOUT_STATUS.SCHEDULED] } = params;
    const pagingParams = {
      limit: 10,
      page: 1,
    };
    const cycleId = Helper.getCycleIdFromStartCycle(startCycle);
    let continueLoop = false;
    const maxLoop = 200;
    let step = 0;
    do {
      const query = {
        ...pagingParams,
        status,
        metaKeywords: cycleId,
      };
      const payoutRespone = await payoutServices.getPayouts(query);
      const { hasMore, data } = payoutRespone;
      if (data && data.length > 0) {
        const completePromise = data.map((payout) => {
          return payoutServices.completePayout(payout.id);
        });
        await Promise.all(completePromise);
      }
      pagingParams.page += 1;
      step += 1;
      continueLoop = hasMore || false;
    } while (continueLoop && step < maxLoop);
    return {
      success: true,
    };
  },
};
module.exports = payoutService;
