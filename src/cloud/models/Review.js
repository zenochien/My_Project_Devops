const ReviewModel = {};
module.exports = ReviewModel;

const _ = require('lodash');
const { NOTIFICATION_TEMPLATES, USER_ROLE, BOOKING_STATUS, STATUS, ORDER } = require('../../const/Constants');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const Errors = require('../../const/Errors');
const Helper = require('../../utils/helper');
const BaseQuery = require('../BaseQuery');
const mongoDB = require('../../db/mongoDB');

let reviewService;
let notificationService;
ReviewModel.init = (_reviewService, _notificationService) => {
  reviewService = _reviewService;
  notificationService = _notificationService;
};

const buildReviewInfo = (reviewParse, includeFields = DefaultSelectFields.REVIEW, unsetFields) => {
  return Helper.convertParseObjectToJson(reviewParse, includeFields, unsetFields);
};

const getShortBookingInfo = async (bookingId) => {
  if (!bookingId) {
    return undefined;
  }
  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.select(
    'isReviewed',
    'customer',
    'customer.nickName',
    'customer.profileImages',
    'customer.fullName',
    'serviceDateTime',
    'bookingStatus',
    'stylist',
    'stylist.nickName',
    'stylist.profileImages',
    'stylist.fullName',
    'stylist.generalScore',
    'stylist.styleScore',
    'stylist.serviceScore',
    'salon',
    'salon.salonNameKatakana',
    'salon.salonName',
  );
  bookingQuery.equalTo('objectId', bookingId);
  const bookingParse = await bookingQuery.first({ useMasterKey: true });
  if (!bookingParse) {
    const { code, message } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  return bookingParse;
};

ReviewModel.prepareDataForReview = ({ customer, stylist, salon }) => {
  const result = {};
  if (customer) {
    result.customerInfo = {
      searching: `${customer.objectId} ${customer.fullName}`,
      profileImages: customer.profileImages,
      fullName: customer.fullName,
      nickName: customer.nickName,
      objectId: customer.objectId,
    };
  }
  if (stylist) {
    result.stylistInfo = {
      searching: `${stylist.objectId} ${stylist.fullName}`,
      profileImages: stylist.profileImages,
      isOfficial: stylist.isOfficial,
      fullName: stylist.fullName,
      nickName: stylist.nickName,
      objectId: stylist.objectId,
    };
  }
  if (salon) {
    result.salonInfo = {
      searching: `${salon.salonName}`,
      salonNameKatakana: salon.salonNameKatakana,
      salonName: salon.salonName,
      objectId: salon.objectId,
    };
  }
  return result;
};
ReviewModel.checkIsReviewedBooking = async (bookingId) => {
  const bookingQuery = BaseQuery.getBookingQuery();
  bookingQuery.select('isReviewed');
  bookingQuery.equalTo('objectId', bookingId);
  const bookingParse = await bookingQuery.first({ useMasterKey: true });
  if (!bookingParse) {
    const { code, message } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  return {
    isReviewed: bookingParse.get('isReviewed') || false,
  };
};

ReviewModel.getReviewDetail = async (params, requestUser) => {
  const { reviewId } = params;

  const reviewQuery = BaseQuery.getReviewQuery();
  reviewQuery.select(DefaultSelectFields.REVIEW);

  if (requestUser.get('role') === USER_ROLE.CUSTOMER) {
    reviewQuery.equalTo('customerId', requestUser.get('customer').id);
  }

  const reviewParse = await reviewQuery.get(reviewId, { useMasterKey: true });

  return buildReviewInfo(reviewParse);
};

ReviewModel.getReviewList = async (params, opts = {}) => {
  const { stylistId, ...pagingParams } = params;
  const { selectFields = DefaultSelectFields.REVIEW } = opts;

  const reviewQuery = BaseQuery.getReviewQuery();
  reviewQuery.select(selectFields);
  Helper.queryPagingHandler(reviewQuery, pagingParams);

  reviewQuery.equalTo('stylistId', stylistId);
  reviewQuery.equalTo('status', STATUS.ACTIVE);

  const reviewParses = await reviewQuery.find({ useMasterKey: true });

  return reviewParses.map((reviewParse) => buildReviewInfo(reviewParse));
};

const procssSearchKey = (searchKeys, value) => {
  return searchKeys.map((searchKey) => {
    return {
      [searchKey]: {
        $regex: value,
        $options: 'i',
      },
    };
  });
};

ReviewModel.getReviewListByAdmin = async (params, opts = {}) => {
  const { searchKey = '', ...pagingParams } = params;
  const { selectFields = DefaultSelectFields.REVIEW_ADMIN } = opts;
  const order = !_.isNil(pagingParams.order) ? ORDER[pagingParams.order] : -1;
  const orderBy = !_.isNil(pagingParams.orderBy) ? pagingParams.orderBy : '_created_at';
  const page = !_.isNil(pagingParams.page) ? Number(pagingParams.page) : 1;
  const limit = !_.isNil(pagingParams.limit) ? Number(pagingParams.limit) : 10;
  const skip = limit * (page - 1);

  const query = {
    status: STATUS.ACTIVE,
  };

  if (searchKey !== '') {
    const searchPipeline = procssSearchKey(DefaultSelectFields.REVIEW_ADMIN_SEARCH_KEY, searchKey);
    query['$or'] = searchPipeline;
  }

  const db = await mongoDB.getMongoDB();
  const listPromise = db
    .collection('Review')
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ [orderBy]: order })
    .project(selectFields)
    .toArray();
  const totalPromise = db.collection('Review').count(query);
  const [list, total] = await Promise.all([listPromise, totalPromise]);
  return {
    total,
    list,
  };
};

ReviewModel.getReviewDetail = async (params) => {
  const { reviewId } = params;

  const reviewQuery = BaseQuery.getReviewQuery();
  reviewQuery.select(DefaultSelectFields.REVIEW);

  const reviewParse = await reviewQuery.get(reviewId, { useMasterKey: true });

  return buildReviewInfo(reviewParse);
};

ReviewModel.createReview = async (params, request) => {
  const { bookingId, generalScore, styleScore, serviceScore, comment, platform } = params;
  const customer = request.user.get('customer');

  const bookingParse = await getShortBookingInfo(bookingId);
  const stylistId = bookingParse.get('stylist').id;
  if (bookingParse.get('isReviewed')) {
    const { code, message } = Errors.ALREADY_REVIEW_ERROR;
    throw new Parse.Error(code, message);
  }
  if (bookingParse.get('bookingStatus') !== BOOKING_STATUS.COMPLETED) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, 'Booking status is not COMPLETED');
  }
  if (bookingParse.get('customer').id !== customer.id) {
    const { code } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, 'This booking is not for this customer');
  }

  const ctx = Helper.createContextFromRequest(request);
  const reviewId = Helper.randomString();
  const { customerInfo, stylistInfo, salonInfo } = ReviewModel.prepareDataForReview({
    customer: bookingParse.get('customer').toJSON(),
    stylist: bookingParse.get('stylist').toJSON(),
    salon: bookingParse.get('salon').toJSON(),
  });
  await reviewService.createReview(
    ctx,
    reviewId,
    customer.id,
    stylistId,
    bookingId,
    generalScore,
    styleScore,
    serviceScore,
    comment,
    customerInfo,
    stylistInfo,
    salonInfo,
    platform,
  );

  if (notificationService) {
    const stylistUserParse = await Helper.getStylistUser(stylistId);
    const stylistReceiver = { id: stylistUserParse.id, role: USER_ROLE.STYLIST };
    const templateName = NOTIFICATION_TEMPLATES.REVIEWED_BY_CUSTOMER_FOR_STYLIST;
    notificationService.saveAndSendNotificationWithTemplate(
      Helper.createContextFromRequestUser(request.user),
      [stylistReceiver],
      templateName,
      {
        booking: bookingParse,
      },
      {
        isPush: false,
        isSave: true,
      },
    );
  }

  return ReviewModel.getReviewDetail({ reviewId: reviewId });
};

ReviewModel.deleteReview = async (params) => {
  const { reviewId } = params;
  await reviewService.deleteReview(reviewId);
  return {
    success: true,
  };
};
