const StylistModel = require('../models/Stylist');
const RecommendationModel = require('../models/Recommendation');
const { ORDER, STATUS, DEFAULT_TIMEZONE, USER_STATUS, MAX_STYLIST_CONTRIBUTOR } = require('../../const/Constants');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const { processOrderAndPaginationMongo } = require('../../utils/helper');
const _ = require('lodash');
const {
  DELETED_STYLIST,
  OBJECT_NOT_FOUND,
  RECOMMENTDATION_TOP_BANNER_HAVE_STYLIST_DELETE,
} = require('../../const/Errors');
const helper = require('../../utils/helper');
const moment = require('moment-timezone');
const mongoDB = require('../../db/mongoDB');
const controllerBoardModel = require('../models/ControllerBoard');
const closingDateModel = require('../models/ClosingDate');
const closedSlotsModel = require('../models/ClosedSlots');
const stylistService = require('./Stylist');
const BaseQuery = require('../BaseQuery');
const RecommendationService = {};

RecommendationService.prepareStylistInfo = ({ stylist, salon }) => {
  const result = {};
  if (stylist) {
    result.stylistInfo = {
      objectId: stylist.objectId,
      fullName: stylist.fullName,
      nickName: stylist.nickName,
      userStatus: stylist.userStatus,
      profileImages: stylist.profileImages,
      catchPhrase: stylist.profile && stylist.profile.catchPhrase ? stylist.profile.catchPhrase : '',
      reviewCount: stylist.reviewCount,
      generalScore: stylist.generalScore,
      styleScore: stylist.styleScore,
      serviceScore: stylist.serviceScore,
      isOfficial: stylist.isOfficial,
      status: stylist.status,
    };
  }
  if (salon) {
    result.salonInfo = {
      objectId: salon.objectId,
      salonName: salon.salonName,
      salonNameKatakana: salon.salonNameKatakana,
      distanceNearestStation: salon.distanceNearestStation,
      stationName: salon.stationName,
      salonAddress1: salon.salonAddress1,
      salonAddress2: salon.salonAddress2,
    };
  }
  return result;
};

RecommendationService.getStylistInfo = async (stylistId) => {
  const stylistParser = await StylistModel.getStylistById({ stylistId });
  if (stylistParser.get('userStatus') === STATUS.DELETED) {
    const { code, message } = DELETED_STYLIST;
    throw new Parse.Error(code, message);
  }
  const salonParser = await stylistParser.get('salon').fetch({ useMasterKey: true });
  return RecommendationService.prepareStylistInfo({
    stylist: stylistParser.toJSON(),
    salon: salonParser.toJSON(),
  });
};

RecommendationService.create = async (payload) => {
  const { contributorId, receiverId, title, content } = payload;

  const [receiver, contributor] = await Promise.all([
    RecommendationService.getStylistInfo(receiverId),
    RecommendationService.getStylistInfo(contributorId),
  ]);

  const result = await RecommendationModel.create({
    contributorStylistInfo: contributor.stylistInfo,
    contributorSalonInfo: contributor.salonInfo,
    receiverStylistInfo: receiver.stylistInfo,
    receiverSalonInfo: receiver.salonInfo,
    title,
    content,
  });

  await RecommendationService.updateRecommendationForStylist(receiverId);

  return result;
};

const processAttributeRecommendation = (attributes, contributor, receiver) => {
  if (receiver) {
    attributes['receiverStylistInfo'] = receiver.stylistInfo;
    attributes['receiverSalonInfo'] = receiver.salonInfo;
  }

  if (contributor) {
    attributes['contributorStylistInfo'] = contributor.stylistInfo;
    attributes['contributorSalonInfo'] = contributor.salonInfo;
  }
};

RecommendationService.update = async (payload) => {
  const { recommendationId, contributorId, receiverId, title, content } = payload;

  const recommendation = await RecommendationModel.getRecommendationById(recommendationId);

  const { receiverId: oldReceiverId, contributorId: oldContributorId } = recommendation;
  const stylisPromise = [undefined, undefined];
  if (receiverId && receiverId !== oldReceiverId) {
    stylisPromise[0] = RecommendationService.getStylistInfo(receiverId);
  }

  if (contributorId && contributorId !== oldContributorId) {
    stylisPromise[1] = RecommendationService.getStylistInfo(contributorId);
  }
  const [receiver, contributor] = await Promise.all(stylisPromise);

  const attributes = {
    title,
    content,
  };

  processAttributeRecommendation(attributes, contributor, receiver);

  const result = await RecommendationModel.update({
    recommendationId,
    attributes,
  });
  if (receiver) {
    await Promise.all([
      RecommendationService.updateRecommendationForStylist(oldReceiverId),
      RecommendationService.updateRecommendationForStylist(receiverId),
    ]);
  }
  return result;
};

RecommendationService.getRecommendationByAdmin = async (params) => {
  const { fillter, fillterBy, ...pagingParams } = params;
  const selectFields = DefaultSelectFields.RECOMMENDATION_STYLIST;
  const { order, orderBy, limit, skip } = processOrderAndPaginationMongo({
    ...pagingParams,
    order: pagingParams.order || 'descending',
    orderBy: pagingParams.orderBy || 'updateAt',
  });

  const query = {};
  if (fillter && fillterBy) {
    query[fillterBy] = fillter;
  }

  const db = await RecommendationModel.getColection();
  const listPromise = db
    .collection('Recommendation')
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ [orderBy]: order })
    .project(selectFields)
    .toArray();
  const totalPromise = db.collection('Recommendation').count(query);
  const [list, total] = await Promise.all([listPromise, totalPromise]);
  return {
    total,
    list,
  };
};

RecommendationService.deleteRecommendationByAdmin = async ({ recommendationId }) => {
  const recommendation = await RecommendationModel.getRecommendationById(recommendationId);
  const result = await RecommendationModel.deleteRecommendationByAdmin(recommendationId);
  await RecommendationService.updateRecommendationForStylist(recommendation.receiverId);
  return result;
};

const processFavoriteStylist = (object, favoriteStylistIds = []) => {
  if (!object) return;
  object['isFavorite'] = favoriteStylistIds.includes(object.objectId);
};

RecommendationService.getRecommendationByCustomer = async (params) => {
  const { customerId, ...pagingParams } = params;
  const selectFields = DefaultSelectFields.RECOMMENDATION_STYLIST;
  const { order, orderBy, limit, skip } = processOrderAndPaginationMongo({
    ...pagingParams,
    ...pagingParams,
    order: pagingParams.order || 'descending',
    orderBy: pagingParams.orderBy || 'updateAt',
  });

  const db = await RecommendationModel.getColection();

  const query = {
    'receiver.status': { $eq: STATUS.PUBLISHED },
    'receiver.userStatus': { $ne: STATUS.DELETED },
    'contributor.userStatus': { $ne: STATUS.DELETED },
  };

  const listPromise = db
    .collection('Recommendation')
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ [orderBy]: order })
    .project(selectFields)
    .toArray();
  let favoriteStylistPromise = undefined;
  const totalPromise = db.collection('Recommendation').count(query);
  const promiseALl = [listPromise, totalPromise];

  if (customerId) {
    favoriteStylistPromise = db
      .collection('FavoritedStylist')
      .find({
        customerId,
      })
      .project({
        _id: 0,
        stylistId: 1,
      })
      .toArray();
    promiseALl.push(favoriteStylistPromise);
  }
  const [list, total, favoriteStylist] = await Promise.all(promiseALl);

  if (customerId) {
    const favoriteStylistIds = favoriteStylist.map((value) => value.stylistId);
    list.forEach((element) => {
      processFavoriteStylist(element.receiver, favoriteStylistIds);
      processFavoriteStylist(element.contributor, favoriteStylistIds);
    });
  }

  return {
    total,
    list,
  };
};

RecommendationService.getRecommendationForAStylist = async (params) => {
  const { stylistId, ...pagingParams } = params;
  const { order, orderBy, limit, skip } = processOrderAndPaginationMongo({
    ...pagingParams,
    order: pagingParams.order || 'descending',
    orderBy: pagingParams.orderBy || 'updateAt',
  });
  const db = await RecommendationModel.getColection();
  const selectFields = {
    _id: 0,
    objectId: '$_id',
    receiver: 1,
    salonReceiver: 1,
    contributor: 1,
    salonContributor: 1,
    createdAt: { $dateToString: { date: '$_created_at' } },
    updatedAt: { $dateToString: { date: '$_updated_at' } },
    title: 1,
    content: 1,
  };
  const [total, list] = await Promise.all([
    db
      .collection('Recommendation')
      .find({
        receiverId: stylistId,
      })
      .count(),
    db
      .collection('Recommendation')
      .find({
        receiverId: stylistId,
      })
      .skip(skip)
      .limit(limit)
      .sort({ [orderBy]: order })
      .project(selectFields)
      .toArray(),
  ]);
  return {
    total,
    list,
  };
};

RecommendationService.setTopBannerForStylist = async ({ stylistId, recommendationId }) => {
  const mongodbClient = await mongoDB.getClient();
  const db = await mongoDB.getMongoDB();

  // just update if recommendationId is not top banner
  const topBanner = await db
    .collection('Recommendation')
    .findOne({ _id: recommendationId, topBanner: { $exists: true } });
  if (!topBanner) {
    await helper.executeInTransaction(async (session) => {
      await db
        .collection('Recommendation')
        .updateMany(
          { receiverId: stylistId, topBanner: { $exists: true } },
          { $unset: { topBanner: '' } },
          { session },
        );
      const result = await db.collection('Recommendation').updateOne(
        { _id: recommendationId, receiverId: stylistId },
        {
          $set: {
            topBanner: {
              createdDate: moment().toDate(),
              status: STATUS.PUBLISHED,
            },
          },
        },
        {
          session,
        },
      );
      if (result.modifiedCount === 0) {
        const { code, message } = OBJECT_NOT_FOUND;
        throw new Parse.Error(code, message);
      }
    }, mongodbClient);
  }
};

RecommendationService.getStylistBannersByAdmin = async (pagingParams) => {
  const { limit, skip } = processOrderAndPaginationMongo({
    ...pagingParams,
  });
  const db = await RecommendationModel.getColection();
  const selectFields = {
    _id: 0,
    objectId: '$_id',
    stylist: '$receiver',
    salon: '$salonReceiver',
    createdAt: { $dateToString: { date: '$topBanner.createdDate' } },
    status: '$topBanner.status',
  };
  const query = {
    topBanner: {
      $exists: true,
    },
  };
  const listPromise = db
    .collection('Recommendation')
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ 'topBanner.createdDate': -1 })
    .project(selectFields)
    .toArray();

  const totalPromise = db.collection('Recommendation').count(query);
  const [list, total] = await Promise.all([listPromise, totalPromise]);
  return {
    total,
    list,
  };
};

RecommendationService.updateStatusTopBannerByAdmin = async ({ recommendationId, status }) => {
  const db = await mongoDB.getMongoDB();
  const recommendations = await db
    .collection('Recommendation')
    .aggregate([
      {
        $match: {
          _id: recommendationId,
          topBanner: {
            $exists: true,
          },
        },
      },
      {
        $lookup: {
          from: 'Stylist',
          localField: 'receiverId',
          foreignField: '_id',
          as: 'receiverData',
        },
      },
      {
        $project: {
          _id: 1,
          receiver: { $arrayElemAt: ['$receiverData', 0] },
        },
      },
    ])
    .toArray();
  if (!recommendations.length < 0) {
    const { code, message } = OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  if (
    recommendations[0] &&
    recommendations[0].receiver &&
    recommendations[0].receiver.userStatus === USER_STATUS.DELETED
  ) {
    const { code, message } = RECOMMENTDATION_TOP_BANNER_HAVE_STYLIST_DELETE;
    throw new Parse.Error(code, message);
  }

  const result = await db.collection('Recommendation').updateOne(
    {
      _id: recommendationId,
      topBanner: {
        $exists: true,
      },
    },
    {
      $set: {
        'topBanner.status': status,
      },
    },
  );
  if (result.modifiedCount === 0) {
    const { code, message } = OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  return {
    success: true,
  };
};

RecommendationService.deleteTopBannerByAdmin = async ({ recommendationId }) => {
  const db = await mongoDB.getMongoDB();
  const result = await db
    .collection('Recommendation')
    .updateOne({ _id: recommendationId }, { $unset: { topBanner: '' } });
  if (result.modifiedCount === 0) {
    const { code, message } = OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  return {
    success: true,
  };
};

RecommendationService.getTopBannerDetail = async ({ stylistId, recommendationId }) => {
  const db = await mongoDB.getMongoDB();
  const recommendation = await db
    .collection('Recommendation')
    .findOne({ _id: recommendationId, receiverId: stylistId });
  if (!recommendation) {
    const { code, message } = OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  const stylist = await StylistModel.getStylistById({ stylistId, includes: ['salon'] });
  const stylistInfo = stylist.toJSON();
  return await RecommendationService.proccessDataForTopBannerDetail({ recommendation, stylistInfo });
};

RecommendationService.proccessDataForTopBannerDetail = async ({ recommendation, stylistInfo }) => {
  const schedules = await RecommendationService.getScheduleForNext7Days({
    cbSalonId: stylistInfo.salon.cbSalonId,
    cbStaffId: stylistInfo.cbStaffId,
    salonId: stylistInfo.salon.objectId,
    stylistId: stylistInfo.objectId,
    maxConfirmedBookingCount: stylistInfo.maxConfirmedBookingCount,
  });
  return {
    title: recommendation.title,
    content: recommendation.content,
    receiver: {
      fullName: _.get(stylistInfo, 'fullName'),
      nickName: _.get(stylistInfo, 'nickName'),
      catchPhrase: _.get(stylistInfo, 'profile.catchPhrase'),
      objectId: _.get(stylistInfo, 'objectId'),
      generalScore: _.get(stylistInfo, 'generalScore', 0),
      styleScore: _.get(stylistInfo, 'styleScore', 0),
      serviceScore: _.get(stylistInfo, 'serviceScore', 0),
      reviewCount: _.get(stylistInfo, 'reviewCount', 0),
      profileImages: _.get(stylistInfo, 'profileImages'),
      isOfficial: _.get(stylistInfo, 'isOfficial'),
    },
    salonReceiver: {
      objectId: _.get(stylistInfo, 'salon.objectId'),
      salonName: _.get(stylistInfo, 'salon.salonName'),
      stationName: _.get(stylistInfo, 'salon.stationName'),
      distanceNearestStation: _.get(stylistInfo, 'salon.distanceNearestStation'),
    },
    contributor: _.get(recommendation, 'contributor'),
    salonContributor: _.get(recommendation, 'salonContributor'),
    recommendationNumber: _.get(stylistInfo, 'recommendationNumber'),
    schedules,
  };
};

RecommendationService.getScheduleForNext7Days = async ({
  cbSalonId,
  cbStaffId,
  salonId,
  stylistId,
  maxConfirmedBookingCount,
}) => {
  const fromMoment = moment().tz(DEFAULT_TIMEZONE).startOf('day');
  const toMoment = fromMoment.clone().add(7, 'days').endOf('day');
  const [schedulesData, closingDateData, closedSlots] = await Promise.all([
    controllerBoardModel.getStaffScheduleOfSalon(
      {
        cbSalonId,
        cbStaffId,
        limit: 100,
        from: fromMoment.toISOString(),
        to: toMoment.toISOString(),
      },
      false,
    ),
    closingDateModel.getClosingDatesList(
      { from: fromMoment.format('YYYY-MM-DD'), to: toMoment.format('YYYY-MM-DD') },
      salonId,
    ),
    closedSlotsModel.getClosedSlotForStylistByDate({
      stylistId,
      from: fromMoment,
      to: toMoment,
      maxConfirmedBookingCount,
    }),
  ]);
  const closingDates = closingDateData.list;
  const schedules = _.get(schedulesData, 'data[0].schedules', []);
  const scheduleDailies = _.get(schedulesData, 'data[0].scheduleDailies', []);
  const startOfDay = fromMoment.clone();
  const scheduleData = [];
  for (let i = 1; i <= 7; i++) {
    scheduleData.push({
      date: startOfDay.toISOString(),
      available: RecommendationService.isAvailableDate({
        schedules,
        scheduleDailies,
        closingDates,
        startOfDay,
        closedSlots,
      }),
    });
    startOfDay.add(1, 'day');
  }
  return scheduleData;
};

RecommendationService.isAvailableDate = ({ schedules, scheduleDailies, closingDates, startOfDay, closedSlots }) => {
  // check closing date
  if (closingDates.indexOf(startOfDay.format('YYYY-MM-DD')) !== -1) {
    return false;
  }

  // get schedule in controller board
  const availableSlot = [];
  const schedulesInControllerBoard = _.filter(scheduleDailies, (item) => {
    return startOfDay.isSame(moment(item.startOfDay));
  });
  let availabeSchedulesInControllerBoard = _.filter(scheduleDailies, (item) => {
    return startOfDay.isSame(moment(item.startOfDay)) && !moment(item.startAt).isSame(moment(item.endAt));
  });
  // check if daily schedule is off
  if (availabeSchedulesInControllerBoard.length === 0 && schedulesInControllerBoard.length) {
    return false;
  }
  if (availabeSchedulesInControllerBoard.length === 0) {
    const weeklySchedules = _.filter(schedules, (item) => {
      return (
        startOfDay.isSameOrAfter(moment(item.startSchedule)) &&
        (item.endSchedule === null || startOfDay.isBefore(item.endSchedule)) &&
        !moment(item.startAt).isSame(moment(item.endAt)) &&
        item.dayOfWeek === startOfDay.day()
      );
    });
    if (weeklySchedules.length) {
      availabeSchedulesInControllerBoard = _.map(weeklySchedules, (item) => {
        return {
          dayOfWeek: item.dayOfWeek,
          startAt: item.startAt,
          endAt: item.endAt,
          startOfDay: startOfDay.toISOString(),
          endOfDay: startOfDay.clone().endOf('day').toISOString(),
          isWeekly: true,
        };
      });
    }
  }

  // convert segment time to slot
  availabeSchedulesInControllerBoard.forEach((item) => {
    const MAX_LOOP = 200;
    let loopStep = 0;
    const start = helper.procesStartTimeWithCurentTime(item.startAt, item.endAt);
    while (moment(item.endAt).isAfter(start) && loopStep < MAX_LOOP) {
      availableSlot.push(start.clone().format('HH:mm'));
      start.add(30, 'minutes');
      loopStep += 1;
    }
  });

  // get closed slot for startOfDay
  const closedSlotsForStartOfDay = _.filter(
    closedSlots,
    (item) => moment(item.slot).tz(DEFAULT_TIMEZONE).format('YYYY-MM-DD') === startOfDay.format('YYYY-MM-DD'),
  );

  // check avaliable slot
  if (availableSlot.length > 0 && availableSlot.length > closedSlotsForStartOfDay.length) {
    return true;
  }
  return false;
};

RecommendationService.getTopBannerStylistForHomePage = async () => {
  const db = await mongoDB.getMongoDB();
  const recommendations = await db
    .collection('Recommendation')
    .aggregate([
      {
        $match: {
          'topBanner.status': STATUS.PUBLISHED,
        },
      },
      {
        $lookup: {
          from: 'Salon',
          localField: 'salonReceiver.objectId',
          foreignField: '_id',
          as: 'salonReceiverData',
        },
      },
      {
        $lookup: {
          from: 'Stylist',
          localField: 'receiverId',
          foreignField: '_id',
          as: 'receiverData',
        },
      },
      {
        $match: {
          'receiverData.status': STATUS.PUBLISHED,
        },
      },
      { $sort: { 'topBanner.createdDate': -1 } },
      {
        $project: {
          _id: 1,
          receiver: { $arrayElemAt: ['$receiverData', 0] },
          salonReceiver: { $arrayElemAt: ['$salonReceiverData', 0] },
          contributor: 1,
          salonContributor: 1,
          content: 1,
          title: 1,
        },
      },
      {
        $project: {
          contributor: 1,
          salonContributor: 1,
          content: 1,
          title: 1,
          'stylistInfo.salon.cbSalonId': '$salonReceiver.cbSalonId',
          'stylistInfo.salon.objectId': '$salonReceiver._id',
          'stylistInfo.salon.salonName': '$salonReceiver.salonName',
          'stylistInfo.salon.stationName': '$salonReceiver.stationName',
          'stylistInfo.salon.distanceNearestStation': '$salonReceiver.distanceNearestStation',
          'stylistInfo.cbStaffId': '$receiver.cbStaffId',
          'stylistInfo.objectId': '$receiver._id',
          'stylistInfo.maxConfirmedBookingCount': '$receiver.maxConfirmedBookingCount',
          'stylistInfo.fullName': '$receiver.fullName',
          'stylistInfo.nickName': '$receiver.nickName',
          'stylistInfo.profile.catchPhrase': '$receiver.profile.catchPhrase',
          'stylistInfo.generalScore': '$receiver.generalScore',
          'stylistInfo.styleScore': '$receiver.styleScore',
          'stylistInfo.serviceScore': '$receiver.serviceScore',
          'stylistInfo.reviewCount': '$receiver.reviewCount',
          'stylistInfo.profileImages': '$receiver.profileImages',
          'stylistInfo.recommendationNumber': '$receiver.recommendationNumber',
          'stylistInfo.isOfficial': '$receiver.isOfficial',
        },
      },
    ])
    .toArray();
  const data = [];
  recommendations.forEach((item) => {
    data.push(
      RecommendationService.proccessDataForTopBannerDetail({
        recommendation: {
          title: item.title,
          content: item.content,
          contributor: item.contributor,
          salonContributor: item.salonContributor,
        },
        stylistInfo: item.stylistInfo,
      }),
    );
  });
  return await Promise.all(data);
};

RecommendationService.getRecommendationForStylist = async (stylistId) => {
  const db = await RecommendationModel.getColection();
  const recommendationQuery = db
    .collection('Recommendation')
    .find({
      receiverId: stylistId,
    })
    .sort({ _updated_at: -1 });
  const [recommendations, recommendationNumber] = await Promise.all([
    recommendationQuery.limit(MAX_STYLIST_CONTRIBUTOR).toArray(),
    recommendationQuery.count(),
  ]);

  const lastContributor = recommendations.map((recommendation) => {
    return helper.getPointerValue('Stylist', recommendation.contributorId);
  });
  const lastRecommendations = recommendations.map((recommendation) => {
    return {
      recommendationId: recommendation.objectId,
      contributor: {
        objectId: recommendation.contributorId,
      },
    };
  });
  return {
    stylistId,
    recommendationNumber,
    lastContributor,
    lastRecommendations,
  };
};

RecommendationService.updateRecommendationForStylist = async (stylistId) => {
  const { recommendationNumber, lastContributor, lastRecommendations } =
    await RecommendationService.getRecommendationForStylist(stylistId);
  await stylistService.setRecommendation({
    stylistId,
    recommendationNumber,
    lastContributor,
    lastRecommendations,
  });
};

RecommendationService.migrateRecommendationForStylist = async () => {
  const db = await mongoDB.getMongoDB();
  const stylists = await db
    .collection('Recommendation')
    .find()
    .project({
      receiverId: 1,
    })
    .toArray();
  const stylistPromise = stylists.map((stylist) => {
    return RecommendationService.getRecommendationForStylist(stylist.receiverId);
  });
  const stylistsData = await Promise.all(stylistPromise);
  stylistsData.forEach((stylistData) => console.log(`Update stylist ${stylistData.stylistId}`));

  const ops = stylistsData.map((stylistData) => ({
    updateOne: {
      filter: {
        _id: stylistData.stylistId,
      },
      update: {
        $set: {
          recommendationNumber: stylistData.recommendationNumber,
          lastContributor: stylistData.lastContributor.map((item) => {
            return {
              __type: 'Pointer',
              className: 'Stylist',
              objectId: item.id,
            };
          }),
          lastRecommendations: stylistData.lastRecommendations,
        },
      },
    },
  }));
  await db.collection('Stylist').bulkWrite(ops);
};

RecommendationService.stylistChangeProfile = async ({ dirtyKeys, objectData, requireFields }) => {
  console.log('data: ', dirtyKeys, objectData);
  if (_.intersection(dirtyKeys, requireFields).length) {
    const db = await mongoDB.getMongoDB();
    const promiseAllData = [];
    if (objectData.userStatus === USER_STATUS.DELETED) {
      const unPublishedTopBanerPromise = db.collection('Recommendation').updateMany(
        { receiverId: objectData.objectId, 'topBanner.status': STATUS.PUBLISHED },
        {
          $set: {
            'topBanner.status': STATUS.UNPUBLISHED,
          },
        },
      );
      promiseAllData.push(unPublishedTopBanerPromise);
    }

    const { stylistInfo } = RecommendationService.prepareStylistInfo({ stylist: objectData });
    const recevierPromise = db.collection('Recommendation').updateMany(
      {
        'receiver.objectId': objectData.objectId,
      },
      {
        $set: {
          receiver: stylistInfo,
        },
      },
    );
    promiseAllData.push(recevierPromise);

    const contributorPromise = db.collection('Recommendation').updateMany(
      {
        'contributor.objectId': objectData.objectId,
      },
      {
        $set: {
          contributor: stylistInfo,
        },
      },
    );
    promiseAllData.push(contributorPromise);
    await Promise.all(promiseAllData);
  }
};

RecommendationService.salonChangeProfile = async ({ dirtyKeys, objectData, requireFields }) => {
  console.log('data: ', dirtyKeys, objectData);
  if (_.intersection(dirtyKeys, requireFields).length) {
    const db = await mongoDB.getMongoDB();
    const { salonInfo } = RecommendationService.prepareStylistInfo({ salon: objectData });
    const recevierPromise = db.collection('Recommendation').updateMany(
      {
        'salonReceiver.objectId': objectData.objectId,
      },
      {
        $set: {
          salonReceiver: salonInfo,
        },
      },
    );
    const contributorPromise = db.collection('Recommendation').updateMany(
      {
        'salonContributor.objectId': objectData.objectId,
      },
      {
        $set: {
          salonContributor: salonInfo,
        },
      },
    );
    await Promise.all([recevierPromise, contributorPromise]);
  }
};
RecommendationService.migrateStylistDataForOldRecommendation = async () => {
  const db = await mongoDB.getMongoDB();
  const recommendations = await db
    .collection('Recommendation')
    .find()
    .project({
      receiverId: 1,
      contributorId: 1,
    })
    .toArray();
  const allStylistIds = new Set();
  recommendations.forEach((stylist) => {
    allStylistIds.add(stylist.receiverId);
    allStylistIds.add(stylist.contributorId);
  });

  const stylistQuery = BaseQuery.getStylistQuery();
  stylistQuery.containedIn('objectId', [...allStylistIds]);

  const stylists = await stylistQuery.findAll({ useMasterKey: true });

  console.log('List stylist need updated: ', [...allStylistIds]);

  const dirtyKeys = ['profile', 'status', 'reviewCount', 'generalScore', 'styleScore', 'serviceScore'];
  const requireFields = ['profile', 'status', 'reviewCount', 'generalScore', 'styleScore', 'serviceScore'];

  const stylistPromise = stylists.map((stylist) => {
    return RecommendationService.stylistChangeProfile({ dirtyKeys, objectData: stylist.toJSON(), requireFields });
  });

  await Promise.all(stylistPromise);
};

RecommendationService.migrateSalonDataForOldRecommendation = async () => {
  const db = await mongoDB.getMongoDB();
  const recommendations = await db
    .collection('Recommendation')
    .find()
    .project({
      salonContributorId: '$salonContributor.objectId',
      salonReceiverId: '$salonReceiver.objectId',
    })
    .toArray();
  const allsalonIds = new Set();
  recommendations.forEach((salon) => {
    allsalonIds.add(salon.salonContributorId);
    allsalonIds.add(salon.salonReceiverId);
  });

  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.containedIn('objectId', [...allsalonIds]);

  const salons = await salonQuery.find({ useMasterKey: true });

  console.log('List stylist need updated: ', [...allsalonIds], salons);

  const salonPromise = salons.map((stylist) => {
    const dirtyKeys = ['distanceNearestStation', 'stationName', 'salonAddress1', 'salonAddress2'];
    const requireFields = [
      'salonName',
      'salonNameKatakana',
      'distanceNearestStation',
      'stationName',
      'salonAddress1',
      'salonAddress2',
    ];

    return RecommendationService.salonChangeProfile({ dirtyKeys, objectData: stylist.toJSON(), requireFields });
  });

  await Promise.all(salonPromise);
};

RecommendationService.getStylistScheduleForNext7Days = async ({ stylistId }) => {
  const stylistParse = await StylistModel.getStylistById({ stylistId, includes: ['salon'] });
  if (!stylistParse) {
    throw new Parse.Error(OBJECT_NOT_FOUND.code, OBJECT_NOT_FOUND.message);
  }
  const salon = stylistParse.get('salon');
  return RecommendationService.getScheduleForNext7Days({
    cbSalonId: salon.get('cbSalonId'),
    cbStaffId: stylistParse.get('cbStaffId'),
    salonId: salon.id,
    stylistId: stylistParse.id,
    maxConfirmedBookingCount: stylistParse.get('maxConfirmedBookingCount'),
  });
};

module.exports = RecommendationService;
