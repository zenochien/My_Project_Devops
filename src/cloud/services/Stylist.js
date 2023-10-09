const bookingModel = require('../models/Booking');
const moment = require('moment-timezone');
const mongoDB = require('../../db/mongoDB');
const userModel = require('../models/User');
const stylistModel = require('../models/Stylist');
const Errors = require('../../const/Errors');
const Helper = require('../../utils/helper');
const { generalConfig } = require('../../config');
const { USER_STATUS, STATUS, EVENTS, SALON_STATUS, DEFAULT_CLEARED_FIELDS } = require('../../const/Constants');
const { OBJECT_NOT_FOUND } = require('../../const/Errors');
const { parseServerConfig } = require('../../config/parseServerConfig');
const eventManager = require('../../utils/Event');
const controllerBoardListener = require('../../listeners/ControllerBoard');
const controllerBoardModel = require('./../models/ControllerBoard');
const salonModel = require('./../models/Salon');
const menuService = require('./Menu');
const PostService = require('./Post');
const postModel = require('./../models/Post');
const menuModel = require('./../models/Menu');

const _pick = require('lodash/pick');
const _ = require('lodash');
const BaseQuery = require('../BaseQuery');
const stylistService = {
  requestDeleteStylist: async ({ userId, stylistId, reasons, email }) => {
    const hasIncompleteBooking = await bookingModel.countInCompletedBooking({ stylistId });
    if (hasIncompleteBooking) {
      const { code, message } = Errors.HAS_IMCOMPLETE_BOOKING;
      throw new Parse.Error(code, message);
    }
    const deletedAt = moment().add(generalConfig.expiredRequestDeletingAccount, 'hours').toDate();
    const requestDeletingAccount = {
      reasons,
      requestedAt: moment().toDate(),
      expiredAt: deletedAt,
      deletedAt,
    };
    const mongodbClient = await mongoDB.getClient();
    await Helper.executeInTransaction(async (session) => {
      const db = await mongoDB.getMongoDB();
      const executedData = [
        db.collection('Stylist').updateOne(
          {
            _id: stylistId,
          },
          {
            $set: {
              requestDeletingAccount,
            },
          },
          {
            session,
          },
        ),
        db.collection('Post').updateMany(
          {
            _p_stylist: `Stylist$${stylistId}`,
          },
          {
            $set: {
              requestDeleting: true,
            },
          },
          {
            session,
          },
        ),
        userModel.forceLogout({ session, db, userId }),
      ];

      await Promise.all(executedData);
    }, mongodbClient);

    // send email
    parseServerConfig.emailAdapter.sendMailByTemplate('stylist-request-delete-account', { to: email });
  },

  deleteStylist: async ({ userId, stylistId, email, cbStaffId }) => {
    const mongodbClient = await mongoDB.getClient();
    await Helper.executeInTransaction(async (session) => {
      const db = await mongoDB.getMongoDB();
      const newEmail = `${userId}@generate.com`;
      const executedData = [
        db.collection('Stylist').updateOne(
          {
            _id: stylistId,
          },
          {
            $set: {
              userStatus: USER_STATUS.DELETED,
              firstName: '----',
              lastName: '----',
              fullName: '----',
              phoneticFirstName: '----',
              phoneticLastName: '----',
              phoneticFullName: '----',
              nickName: '----',
              gender: '無回答',
              stylistEmail: newEmail,
              //
              phone: '',
              stylistSNS: {},
              slug: '',
              profileText: '',
              deletedAt: moment().toDate(),
              updatedStaffInfoAfterDeleteStylist: {
                email: newEmail,
              },
              triggerChangeProfile: { dirtyKeys: DEFAULT_CLEARED_FIELDS.STYLIST },
            },
            $unset: {
              profileImages: '',
              profileImageIds: '',
              newEmail: '',
            },
          },
          {
            session,
          },
        ),
        db.collection('_User').updateOne(
          {
            _id: userId,
          },
          {
            $set: {
              status: USER_STATUS.DELETED,
              email: newEmail,
              username: newEmail,
            },
          },
          {
            session,
          },
        ),
        db.collection('Post').updateMany(
          {
            _p_stylist: `Stylist$${stylistId}`,
          },
          {
            $set: {
              status: STATUS.DELETED,
            },
            $unset: {
              requestDeleting: '',
            },
          },
          {
            session,
          },
        ),
        userModel.forceLogout({ session, db, userId }),
      ];
      await Promise.all(executedData);
      eventManager.emit(EVENTS.DELETED_STYLIST, { email: newEmail, objectId: stylistId, cbStaffId, nickName: '----' });
    }, mongodbClient);

    // send email
    parseServerConfig.emailAdapter.sendMailByTemplate('delete-stylist-account-success', { to: email });
  },

  revokeDeleteAccountRequest: async ({ stylist }) => {
    if (!stylist.has('requestDeletingAccount') || stylist.get('userStatus') === USER_STATUS.DELETED) {
      throw new Parse.Error(Errors.INVALID_ACTION.code, Errors.INVALID_ACTION.message);
    }
    const expiredAt = stylist.get('requestDeletingAccount').expiredAt;
    if (moment(expiredAt).isBefore(moment())) {
      throw new Parse.Error(Errors.DELETE_ACCOUNT_REQUEST_ERROR.code, Errors.DELETE_ACCOUNT_REQUEST_ERROR.message);
    }
    const mongodbClient = await mongoDB.getClient();
    await Helper.executeInTransaction(async (session) => {
      const db = await mongoDB.getMongoDB();
      const executedData = [
        db.collection('Stylist').updateOne(
          {
            _id: stylist.id,
          },
          {
            $unset: {
              requestDeletingAccount: '',
            },
          },
        ),
        db.collection('Post').updateMany(
          {
            _p_stylist: `Stylist$${stylist.id}`,
          },
          {
            $unset: {
              requestDeleting: '',
            },
          },
          {
            session,
          },
        ),
      ];
      await Promise.all(executedData);
    }, mongodbClient);

    // send email
    parseServerConfig.emailAdapter.sendMailByTemplate('revoke-stylist-account-request', {
      to: stylist.get('stylistEmail'),
    });
  },

  updateStaffInfoAfterDeleteStylist: async () => {
    const updatedIds = [];
    const unUpdatedIds = [];
    const result = await stylistModel.deletedStylistNotUpdateStaffInfo();
    for (let i = 0; i < result.length; i++) {
      const stylist = result[i];
      try {
        await controllerBoardListener.deleteStylist({
          email: stylist.get('stylistEmail'),
          cbStaffId: stylist.get('cbStaffId'),
          objectId: stylist.id,
          nickName: stylist.get('nickName'),
          job: true,
        });
        updatedIds.push(stylist.id);
      } catch (error) {
        unUpdatedIds.push(stylist.id);
        console.error('[StylistService][updateStaffInfoAfterDeleteStylist]', error);
      }
    }
    return {
      updatedIds,
      unUpdatedIds,
    };
  },

  adminDeleteSalon: async ({ salonId }) => {
    const hasIncompleteBooking = await bookingModel.countInCompletedBooking({ salonId });
    if (hasIncompleteBooking) {
      const { code, message } = Errors.HAS_IMCOMPLETE_BOOKING;
      throw new Parse.Error(code, message);
    }
    const [mongodbClient, salonUserParse, stylists, salonObject] = await Promise.all([
      mongoDB.getClient(),
      userModel.getUserFromSalonId(salonId),
      stylistModel.getStylistBelongtoASalon({ salonId }),
      salonModel.getSalonById(salonId),
    ]);
    const userId = salonUserParse.id;
    const newEmail = `${userId}@generate.com`;
    await controllerBoardModel.updateSalonInfo({
      email: newEmail,
      cbSalonId: salonObject.get('cbSalonId'),
      salonName: salonObject.get('salonName'),
      postalCode: salonObject.get('postalCode'),
      salonAddress1: salonObject.get('salonAddress1'),
      salonAddress2: salonObject.get('salonAddress2'),
      salonAddress3: salonObject.get('salonAddress3'),
      salonAddress4: salonObject.get('salonAddress4'),
    });

    const deletedStylists = [];
    for (let i = 0; i < stylists.length; i++) {
      const stylist = stylists[i];
      const params = {
        userId: stylist.user._id,
        stylistId: stylist._id,
        email: stylist.stylistEmail,
        cbStaffId: stylist.cbStaffId,
      };
      deletedStylists.push(stylistService.deleteStylist(params));
    }
    await Promise.all(deletedStylists);

    await Helper.executeInTransaction(async (session) => {
      const db = await mongoDB.getMongoDB();
      const executedData = [
        db.collection('Salon').updateOne(
          {
            _id: salonId,
          },
          {
            $set: {
              status: SALON_STATUS.DELETED,
              deletedAt: moment().toDate(),
              salonEmail: newEmail,
              salonDirection: '----',
              salonName: '----',
              slug: '----',
              phone: '----',
              salonNote: '----',
              salonNameKatakana: '----',
              salonCatchphrase: '----',
              salonAddress1: '----',
              salonAddress2: '----',
              salonAddress3: '----',
              salonAddress4: '----',
              triggerChangeProfile: { dirtyKeys: DEFAULT_CLEARED_FIELDS.SALON },
            },
          },
        ),
        db.collection('_User').updateMany(
          {
            _id: userId,
          },
          {
            $set: {
              status: USER_STATUS.DELETED,
              email: newEmail,
              username: newEmail,
            },
          },
          {
            session,
          },
        ),
        userModel.forceLogout({ session, db, userId }),
      ];
      await Promise.all(executedData);
      eventManager.emit(EVENTS.DELETED_SALON, { objectId: salonId });
    }, mongodbClient);
  },

  checkUnAssignMenuInPublishedPost: async (unassignedMenuIds) => {
    const posts = await PostService.getPostIdByMenuIdsByStatus(unassignedMenuIds, STATUS.PUBLISHED);
    if (posts.length > 0) {
      const { code, message } = Errors.UNASSIGN_MENU_IN_PUBLISHED_POST;
      throw new Parse.Error(code, message);
    }
  },

  assignMenusToStylist: async (params, stylist) => {
    const { menuIds = [], isForceUpdate = false } = params;
    const stylistId = stylist.id;
    const status = [STATUS.PUBLISHED];
    const { salonId, remove, add, curentMenus } = await menuService.processMenusIds(menuIds, stylist, status);

    const unassignedMenus = curentMenus.filter((menu) => remove.includes(menu._id));
    const unassignedMenuIds = unassignedMenus.map((value) => value._id);

    if (!isForceUpdate && unassignedMenus.length > 0) {
      await stylistService.checkUnAssignMenuInPublishedPost(unassignedMenuIds);
    }
    await menuService.assignMenus(stylistId, add, remove, salonId, status, false);
    return menuService.getStylistMenusParse(stylist, status);
  },

  setMaxConfirmedBookingCount: async ({ stylistId, max }) => {
    const stylist = await stylistModel.getStylistById({ stylistId });
    stylist.set('maxConfirmedBookingCount', max);
    await stylist.save(null, { useMasterKey: true });
  },

  setRecommendation: async ({ stylistId, recommendationNumber, lastContributor, lastRecommendations }) => {
    const stylist = await stylistModel.getStylistById({ stylistId });
    stylist.set('recommendationNumber', recommendationNumber);
    stylist.set('lastContributor', lastContributor);
    stylist.set('lastRecommendations', lastRecommendations);
    await stylist.save(null, { useMasterKey: true });
  },

  updateLastPosts: async ({ stylistId }) => {
    const db = await mongoDB.getMongoDB();
    const posts = await postModel.getLastPosts({ stylistId });
    const postsInfo = posts.map((item) => ({
      objectId: item.id,
      images: item.get('images'),
      totalPrice: item.get('totalPrice'),
      updatedAt: item.get('updatedAt'),
    }));
    await db.collection('Stylist').updateOne({ _id: stylistId }, { $set: { lastPosts: postsInfo } });
  },

  migrateLastPost: async () => {
    const stylistIds = await postModel.getStylistIdsHasAvailablePost();
    for (let i = 0; i < stylistIds.length; i++) {
      await stylistService.updateLastPosts({ stylistId: stylistIds[i]._id });
    }
    return stylistIds;
  },

  customerGetStylistDetailPage: async (params, requestUser) => {
    const { stylistId, limit = 10, status } = params;
    const stylistSelect = [
      'salon',
      'salon.salonName',
      'salon.salonSchedules',
      'salon.stationName',
      'salon.distanceNearestStation',
      'salon.slug',
      'salon.salonAddress1',
      'salon.salonAddress2',
      'salon.salonAddress3',
      'fullName',
      'nickName',
      'slug',
      'stylistSNS',
      'profileImages',
      'profileText',
      'generalScore',
      'styleScore',
      'serviceScore',
      'reviewCount',
      'isOfficial',
      'profile',
      'status',
    ];
    const stylistDetailPromise = stylistModel.getStylistDetail({ objectId: stylistId, status }, requestUser, {
      selectFields: stylistSelect,
    });

    const paramsWithPaging = { stylistId, limit, page: 1 };

    const stylistPostListPromise = postModel.getPostList(paramsWithPaging, requestUser, {
      selectFields: [
        'images',
        'stylist',
        'stylist.fullName',
        'stylist.profileImages',
        'stylist.slug',
        'tags',
        'totalPrice',
        'menus',
        'menus.status',
        'menus.assignedStylistIds',
        'menus.amount',
        'favoriteCustomers',
      ],
    });

    const categoriesPromise = await menuModel.getPublishedMenusGroupedByCategory({ stylistId });
    const [stylist, stylistPostList, categories] = await Promise.all([
      stylistDetailPromise,
      stylistPostListPromise,
      categoriesPromise,
    ]);
    return {
      stylist,
      posts: stylistPostList.list,
      categories,
    };
  },
  salonChangeProfile: async ({ dirtyKeys, objectData, requireFields }) => {
    console.log('data: ', dirtyKeys, objectData);
    if (_.intersection(dirtyKeys, requireFields).length) {
      const db = await mongoDB.getMongoDB();
      await db.collection('Stylist').updateMany(
        {
          _p_salon: `Salon$${objectData.objectId}`,
        },
        {
          $set: {
            'salonObject.salonName': objectData.salonName,
          },
        },
      );
    }
  },

  migrateSalonDataForOldStylist: async () => {
    const db = await mongoDB.getMongoDB();
    const stylists = await db
      .collection('Stylist')
      .find()
      .project({
        salonId: '$_p_salon',
      })
      .toArray();
    const allsalonIds = new Set();
    stylists.forEach((salon) => {
      const salonId = salon.salonId.split('$')[1];
      if (salonId) {
        allsalonIds.add(salonId);
      }
    });

    const salonQuery = BaseQuery.getSalonQuery();
    salonQuery.containedIn('objectId', [...allsalonIds]);
    salonQuery.limit(200000);

    const salons = await salonQuery.find({ useMasterKey: true });

    console.log('List stylist need updated: ', [...allsalonIds], salons);

    const salonPromise = salons.map((stylist) => {
      const dirtyKeys = ['salonName'];
      const requireFields = ['salonName'];
      return stylistService.salonChangeProfile({ dirtyKeys, objectData: stylist.toJSON(), requireFields });
    });

    await Promise.all(salonPromise);
    return {
      listUpdated: [...allsalonIds],
    };
  },
};

module.exports = stylistService;
