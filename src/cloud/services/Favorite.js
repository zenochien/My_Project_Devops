const StylistModel = require('../models/Stylist');
const FavoriteModel = require('../models/Favorite');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const { ORDER } = require('../../const/Constants');

const _ = require('lodash');
const FavoriteService = {};

FavoriteService.favoriteStylist = async ({ customer, stylistId }) => {
  const stylist = await StylistModel.getStylistById({ stylistId });
  const salon = await stylist.get('salon').fetch({ useMasterKey: true });
  await FavoriteModel.favoriteStylist({ customer, salon, stylist });
};

FavoriteService.unfavoriteStylist = async ({ customerId, stylistId }) => {
  await FavoriteModel.unfavoriteStylist({ customerId, stylistId });
};

FavoriteService.getFavoritedStylistsByCustomer = async (params) => {
  const { customerId, ...pagingParams } = params;
  const selectFields = DefaultSelectFields.FAVORITED_STYLIST;
  const order = !_.isNil(pagingParams.order) ? ORDER[pagingParams.order] : -1;
  const orderBy = !_.isNil(pagingParams.orderBy) ? pagingParams.orderBy : '_created_at';
  const page = !_.isNil(pagingParams.page) ? Number(pagingParams.page) : 1;
  const limit = !_.isNil(pagingParams.limit) ? Number(pagingParams.limit) : 10;
  const skip = limit * (page - 1);

  const db = await FavoriteModel.getColection();

  const query = {
    customerId,
  };

  const listPromise = db
    .collection('FavoritedStylist')
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ [orderBy]: order })
    .project(selectFields)
    .toArray();
  const totalPromise = db.collection('FavoritedStylist').count(query);
  const [list, total] = await Promise.all([listPromise, totalPromise]);
  return {
    list,
    total,
  };
};

module.exports = FavoriteService;
