const FavoriteService = require('../services/Favorite');
const { USER_ROLE } = require('./../../const/Constants');
const Validation = require('../../utils/validation');
const yup = require('yup');

const FavoriteFunctions = {};
FavoriteFunctions.favoriteStylist = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
  const { stylistId } = Validation.checkRequestParams(request, {
    stylistId: yup.string().trim().required(),
  });
  const customer = await request.user.get('customer').fetch({ useMasterKey: true });
  await FavoriteService.favoriteStylist({ customer, stylistId });
  return { status: 'success' };
};

FavoriteFunctions.unfavoriteStylist = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
  const { stylistId } = Validation.checkRequestParams(request, {
    stylistId: yup.string().trim().required(),
  });
  await FavoriteService.unfavoriteStylist({ customerId: request.user.get('customer').id, stylistId });
  return { status: 'success' };
};

FavoriteFunctions.getFavoritedStylistsByCustomer = async (request) => {
  Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
  const payload = Validation.checkRequestParams(request, {
    orderBy: yup.string().trim().optional(),
    order: yup.string().trim().optional(),
    page: yup.number().integer().min(1).required(),
    limit: yup.number().integer().min(1).required(),
  });

  const customerId = request.user.get('customer').id;

  return FavoriteService.getFavoritedStylistsByCustomer({ ...payload, customerId });
};
module.exports = FavoriteFunctions;
