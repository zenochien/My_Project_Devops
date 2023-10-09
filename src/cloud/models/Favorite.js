const helper = require('../../utils/helper');
const mongoDB = require('./../../db/mongoDB');
const moment = require('moment-timezone');
const { FAVORITED_STYLIST_ERROR } = require('./../../const/Errors');
const FavoriteModel = {};

FavoriteModel.getFavoritedStylist = async ({ customerId, stylistId }) => {
  const db = await mongoDB.getMongoDB();
  return await db
    .collection('FavoritedStylist')
    .findOne({ 'customer.objectId': customerId, 'stylist.objectId': stylistId });
};
FavoriteModel.prepareCustomerAndStylistInfo = ({ customer, stylist, salon }) => {
  console.log('customer:', customer);
  const result = {};
  if (customer) {
    result.customerInfo = {
      objectId: customer.objectId,
      fullName: customer.fullName,
      nickName: customer.nickName,
      profileImages: customer.profileImages,
    };
  }
  if (stylist) {
    result.stylistInfo = {
      objectId: stylist.objectId,
      fullName: stylist.fullName,
      nickName: stylist.nickName,
      profileImages: stylist.profileImages,
      isOfficial: stylist.isOfficial,
    };
  }
  if (salon) {
    result.salonInfo = {
      objectId: salon.objectId,
      salonName: salon.salonName,
      salonNameKatakana: salon.salonNameKatakana,
    };
  }
  return result;
};

FavoriteModel.favoriteStylist = async ({ customer, stylist, salon }) => {
  const favoritedStylist = await FavoriteModel.getFavoritedStylist({ customerId: customer.id, stylistId: stylist.id });
  if (favoritedStylist) {
    throw new Parse.Error(FAVORITED_STYLIST_ERROR.code, FAVORITED_STYLIST_ERROR.message);
  }
  const toDay = moment().toDate();
  const { customerInfo, stylistInfo, salonInfo } = FavoriteModel.prepareCustomerAndStylistInfo({
    customer: customer.toJSON(),
    stylist: stylist.toJSON(),
    salon: salon.toJSON(),
  });
  const mongodbClient = await mongoDB.getClient();
  const id = await helper.getAnNanoId();
  try {
    await helper.executeInTransaction(async (session) => {
      const db = await mongoDB.getMongoDB();
      const executedData = [
        db.collection('FavoritedStylist').insertOne(
          {
            _id: id,
            _created_at: toDay,
            _updated_at: toDay,
            stylist: stylistInfo,
            customer: customerInfo,
            salon: salonInfo,
            customerId: customer.id,
            stylistId: stylist.id,
          },
          {
            session,
          },
        ),
        db.collection('Stylist').updateOne(
          { _id: stylist.id, favoriteCustomers: { $ne: customer.id } },
          {
            $inc: { favoriteTotal: 1 },
            $addToSet: {
              favoriteCustomers: customer.id,
            },
          },
          {
            session,
          },
        ),
      ];
      await Promise.all(executedData);
    }, mongodbClient);
  } catch (error) {
    console.error('[FavoriteModel][favoriteStylist]:error:', error);
    throw error;
  }
};

FavoriteModel.unfavoriteStylist = async ({ customerId, stylistId }) => {
  const favoritedStylist = await FavoriteModel.getFavoritedStylist({ customerId, stylistId });
  if (!favoritedStylist) {
    return true;
  }
  const mongodbClient = await mongoDB.getClient();
  try {
    await helper.executeInTransaction(async (session) => {
      const db = await mongoDB.getMongoDB();
      const executedData = [
        db.collection('FavoritedStylist').deleteOne({ _id: favoritedStylist._id }, { session }),
        db.collection('Stylist').updateOne(
          { _id: stylistId, favoriteCustomers: customerId },
          {
            $inc: { favoriteTotal: -1 },
            $pull: {
              favoriteCustomers: customerId,
            },
          },
          {
            session,
          },
        ),
      ];
      await Promise.all(executedData);
    }, mongodbClient);
  } catch (error) {
    console.error('[FavoriteModel][unfavoriteStylist]:error:', error);
    throw error;
  }
};

FavoriteModel.getColection = async () => {
  return mongoDB.getMongoDB();
};

module.exports = FavoriteModel;
