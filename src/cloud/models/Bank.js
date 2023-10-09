const BankModel = {};
module.exports = BankModel;

const BaseQuery = require('../BaseQuery');
const Helper = require('../../utils/helper');

const buildBankInfo = (bankParse, selectField) => {
  return Helper.convertParseObjectToJson(bankParse, selectField);
};

const buildBranchInfo = (branchParse, selectField) => {
  return Helper.convertParseObjectToJson(branchParse, selectField);
};

BankModel.getBankList = async (params) => {
  const selectFields = ['objectId', 'createdAt', 'bankName', 'bankCode', 'bankNameHiragana'];
  const { keyword, ...pagingParams } = params;
  const query = BaseQuery.getBankQuery();
  query.select(selectFields);
  if (keyword) {
    const regExp = new RegExp(Helper.escapeRegExp(keyword).toLowerCase(), 'i');
    query.matches('bankName', regExp);
  }
  Helper.queryPagingHandler(query, pagingParams);

  const [banks, total] = await Promise.all([query.find({ useMasterKey: true }), query.count()]);
  return {
    total,
    list: banks.map((bank) => buildBankInfo(bank, selectFields)),
  };
};

BankModel.getBranchList = async (params) => {
  const selectFields = ['objectId', 'createdAt', 'branchName', 'branchCode', 'branchNameHiragana', 'bank'];
  const { bankId, keyword, ...pagingParams } = params;
  const query = BaseQuery.getBankBranchQuery();
  query.select(selectFields);
  query.equalTo('bank', Helper.getPointerValue('Bank', bankId));
  if (keyword) {
    const regExp = new RegExp(Helper.escapeRegExp(keyword).toLowerCase(), 'i');
    const searchQuery = BaseQuery.getCustomerQuery()._orQuery([
      BaseQuery.getBankBranchQuery().matches('branchName', regExp),
      BaseQuery.getBankBranchQuery().matches('branchCode', regExp),
    ]);
    query._andQuery([searchQuery]);
  }
  Helper.queryPagingHandler(query, pagingParams);

  const [banks, total] = await Promise.all([query.find({ useMasterKey: true }), query.count()]);
  return {
    total,
    list: banks.map((branch) => buildBranchInfo(branch, selectFields)),
  };
};

BankModel.getBankInfo = async ({ bankId }) => {
  try {
    const query = BaseQuery.getBankQuery();
    return await query.get(bankId, { useMasterKey: true });
  } catch (error) {
    if (error.code === 101) {
      throw new Parse.Error(101, 'Bank not foud');
    }
    throw error;
  }
};

BankModel.getBranchInfo = async ({ bankId, branchId }) => {
  try {
    const query = BaseQuery.getBankBranchQuery();
    query.equalTo('bank', Helper.getPointerValue('Bank', bankId));
    return await query.get(branchId, { useMasterKey: true });
  } catch (error) {
    if (error.code === 101) {
      throw new Parse.Error(101, 'Branch not foud');
    }
    throw error;
  }
};
