const mongoDB = require('../../db/mongoDB');
const _ = require('lodash');
const CustomerModel = require('../models/Customer');
const ReviewListener = require('../../listeners/Review');
const StylistModel = require('../models/Stylist');
const ReviewService = {};

ReviewService.migrateOldReview = async () => {
  const [customerIds, stylistIds] = await Promise.all([
    ReviewService.migrateCustomerInfo(),
    ReviewService.migrateStylistInfo(),
  ]);
  return { customerIds, stylistIds };
};

ReviewService.migrateCustomerInfo = async () => {
  const db = await mongoDB.getMongoDB();
  const items = await db
    .collection('Review')
    .aggregate([
      {
        $match: {
          customer: { $exists: false },
        },
      },
      {
        $group: {
          _id: '$customerId',
        },
      },
    ])
    .toArray();
  const customerIds = items.map((item) => item._id);
  const chunks = _.chunk(customerIds, 50);
  const selectedFields = ['nickName', 'profileImages', 'fullName'];
  for (let i = 0; i < chunks.length; i++) {
    const updatedData = [];
    const customers = await CustomerModel.getCustomerByIds({ ids: chunks[i], selectedFields });
    customers.forEach((customer) => {
      updatedData.push(
        ReviewListener.customerChangeProfile({
          dirtyKeys: selectedFields,
          objectData: customer.toJSON(),
        }),
      );
    });
    await Promise.all(updatedData);
  }
  return customerIds;
};

ReviewService.migrateStylistInfo = async () => {
  const db = await mongoDB.getMongoDB();
  const items = await db
    .collection('Review')
    .aggregate([
      {
        $match: {
          stylist: { $exists: false },
        },
      },
      {
        $group: {
          _id: '$stylistId',
        },
      },
    ])
    .toArray();
  const stylistIds = items.map((item) => item._id);
  const chunks = _.chunk(stylistIds, 10);
  const selectedFields = ['nickName', 'profileImages', 'fullName', 'salon', 'salon.salonName'];
  for (let i = 0; i < chunks.length; i++) {
    const updatedData = [];
    const stylists = await StylistModel.getStylistByIds({ ids: chunks[i], selectedFields });
    stylists.forEach((stylist) => {
      updatedData.push(
        ReviewListener.stylistChangeProfile({
          dirtyKeys: selectedFields,
          objectData: stylist.toJSON(),
        }),
      );
    });
    await Promise.all(updatedData);
  }
  return stylistIds;
};

module.exports = ReviewService;
