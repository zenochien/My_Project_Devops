const PressPostModel = {};
module.exports = PressPostModel;

const _get = require('lodash/get');
const mongoDB = require('./../../db/mongoDB');

const DefaultSelectFields = require('../../const/DefaultSelectFields');
const BaseQuery = require('../BaseQuery');
const Helper = require('../../utils/helper');
const Errors = require('../../const/Errors');
const { STATUS, MAX_PRESS_POST_FOR_STYLIST, PRESS_TYPE } = require('../../const/Constants');

const buildPressPostItemInfo = (parsePressPostItem, selectField = DefaultSelectFields.PRESS_POST) => {
  return Helper.convertParseObjectToJson(parsePressPostItem, selectField);
};

PressPostModel.getPressPostListByCustomer = async (params) => {
  const { types = [PRESS_TYPE.DEFAULT], ...pagingParams } = params;

  const pressPostQuery = BaseQuery.getPressPostQuery();
  pressPostQuery.containedIn('type', types);
  pressPostQuery.select(DefaultSelectFields.PRESS_POST);

  Helper.queryPagingHandler(pressPostQuery, pagingParams);

  const [pressPosts, total] = await Promise.all([pressPostQuery.find({ useMasterKey: true }), pressPostQuery.count()]);
  return {
    total,
    list: pressPosts.map((pressPost) => buildPressPostItemInfo(pressPost)),
  };
};

PressPostModel.getPressPostListByAdmin = async (params) => {
  const { searchKey = '', types = [PRESS_TYPE.DEFAULT], ...pagingParams } = params;
  const { order, orderBy, limit, skip } = Helper.processOrderAndPaginationMongo(pagingParams);
  const db = await mongoDB.getMongoDB();
  const result = await db
    .collection('PressPost')
    .aggregate([
      {
        $match: {
          type: {
            $in: types,
          },
        },
      },
      {
        $addFields: {
          ids: {
            $map: {
              input: '$stylists',
              in: '$$this.objectId',
            },
          },
        },
      },
      {
        $lookup: {
          from: 'Stylist',
          let: { stylistIds: '$ids' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $ne: ['$$stylistIds', null],
                    },
                    {
                      $in: ['$_id', '$$stylistIds'],
                    },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                objectId: '$_id',
                fullName: 1,
                nickName: 1,
                profileImages: 1,
                'salon.salonName': '$salonObject.salonName',
              },
            },
          ],
          as: 'stylists',
        },
      },
      {
        $match: {
          $or: [
            {
              title: { $regex: Helper.convertSpecialCharacterForMongo(searchKey), $options: 'i' },
            },
            {
              'stylists.fullName': { $regex: Helper.convertSpecialCharacterForMongo(searchKey), $options: 'i' },
            },
          ],
        },
      },
      {
        $facet: {
          list: [
            { $sort: { [orderBy]: order } },
            { $skip: skip },
            { $limit: limit },
            { $project: DefaultSelectFields.PRESS_POST_ADMIN },
          ],
          count: [
            {
              $count: 'total',
            },
          ],
        },
      },
    ])
    .toArray();
  return Helper.processResultMongoFacet(result);
};

PressPostModel.resetRankOrder = async () => {
  const db = await mongoDB.getMongoDB();
  await db.collection('PressPost').updateMany(
    {},
    {
      $set: {
        rank: 99999,
        order: 99999,
      },
    },
  );
};

PressPostModel.createPressPosts = async (pressPosts) => {
  const db = await mongoDB.getMongoDB();
  const pressPostsParser = pressPosts.map((pressPost) => {
    return {
      updateOne: {
        filter: { _id: pressPost.id },
        update: {
          $set: {
            title: pressPost.title,
            image: pressPost.image,
            type: pressPost.type,
            description: pressPost.description,
            rank: pressPost.rank,
            order: pressPost.order,
            detailURL: pressPost.detailURL,
            _created_at: pressPost.createdAt,
            _updated_at: pressPost.updatedAt,
          },
        },
        upsert: true,
      },
    };
  });
  if (pressPostsParser.length === 0) {
    return;
  }
  await db.collection('PressPost').bulkWrite(pressPostsParser);
};

PressPostModel.getPressPostDetailByAdmin = async (params) => {
  const { pressPostId } = params;
  const pressPostQuery = BaseQuery.getPressPostQuery();
  pressPostQuery.include('stylists', 'stylists.salon', 'stylists.salon.salonImage');
  pressPostQuery.select(DefaultSelectFields.PRESS_POST_DETAIL_ADMIN);
  const pressPostParser = await pressPostQuery.get(pressPostId, { useMasterKey: true });
  const pressPost = buildPressPostItemInfo(pressPostParser, DefaultSelectFields.PRESS_POST_DETAIL_ADMIN);

  let stylists = [];
  if (pressPostParser.get('stylists')) {
    stylists = pressPostParser.get('stylists').map((stylist) => {
      const newStylist = Helper.convertParseObjectToJson(stylist, [
        'objectId',
        'fullName',
        'profileImages',
        'salon',
        'salon.objectId',
        'salon.salonName',
        'salon.salonNameKatakana',
        'salon.salonImage',
      ]);

      if (newStylist.salon.salonImage) {
        newStylist.salon.salonImage = {
          objectId: newStylist.salon.salonImage.objectId,
          thumbLarge: _get(newStylist.salon.salonImage, 'thumbLarge.url'),
          thumbSmall: _get(newStylist.salon.salonImage, 'thumbSmall.url'),
          file: _get(newStylist.salon.salonImage, 'file.url'),
        };
      }
      return newStylist;
    });
  }

  return {
    ...pressPost,
    stylists,
  };
};

PressPostModel.getPressPostListByStylistId = async (params) => {
  const { stylistId, ...pagingParams } = params;

  const pressPostQuery = BaseQuery.getPressPostQuery();
  pressPostQuery.equalTo('stylists.objectId', stylistId);
  pressPostQuery.select(DefaultSelectFields.PRESS_POST);

  Helper.queryPagingHandler(pressPostQuery, pagingParams);

  const [pressPosts, total] = await Promise.all([pressPostQuery.find({ useMasterKey: true }), pressPostQuery.count()]);
  return {
    total,
    list: pressPosts.map((pressPost) => buildPressPostItemInfo(pressPost)),
  };
};

PressPostModel.getPressPostById = async (id) => {
  const db = await mongoDB.getMongoDB();
  const pressPost = db.collection('PressPost').findOne({
    _id: id,
  });
  if (!pressPost) {
    const { code, message } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  return pressPost;
};

const verifyStylists = async (stylistIds) => {
  if (stylistIds.length > 0) {
    const db = await mongoDB.getMongoDB();
    const stylists = await db
      .collection('Stylist')
      .find({
        _id: {
          $in: stylistIds,
        },
        status: {
          $in: [STATUS.PUBLISHED],
        },
        userStatus: {
          $ne: STATUS.DELETED,
        },

        $or: [
          {
            totalPressPost: {
              $lt: MAX_PRESS_POST_FOR_STYLIST,
            },
          },
          {
            totalPressPost: {
              $exists: false,
            },
          },
        ],
      })
      .toArray();
    if (stylists.length !== stylistIds.length) {
      const { code, message } = Errors.ASSIGNED_STYLIST_FOR_PRESS_POST_ERROR;
      throw new Parse.Error(code, message);
    }
  }
};

const increaseTotalPressPostForStylist = async (assigned, db, session, changeNumner = 1) => {
  await db.collection('Stylist').updateMany(
    {
      _id: {
        $in: assigned,
      },
      $or: [
        {
          totalPressPost: {
            $lt: MAX_PRESS_POST_FOR_STYLIST,
          },
        },
        {
          totalPressPost: {
            $exists: false,
          },
        },
      ],
    },
    [
      {
        $set: {
          totalPressPost: {
            $min: [
              MAX_PRESS_POST_FOR_STYLIST,
              {
                $add: ['$totalPressPost', changeNumner],
              },
            ],
          },
        },
      },
    ],
    { session },
  );
};

const decreaseTotalPressPostForStylist = async (assigned = [], db, session, changeNumner = 1) => {
  if (assigned === []) return true;
  console.log(assigned, changeNumner);
  await db.collection('Stylist').updateMany(
    {
      _id: {
        $in: assigned,
      },
    },
    [
      {
        $set: {
          totalPressPost: {
            $max: [
              0,
              {
                $subtract: ['$totalPressPost', changeNumner],
              },
            ],
          },
        },
      },
    ],
    { session },
  );
};

PressPostModel.assignedStylistsPressPosts = async (params) => {
  const { pressPostId, assignedStylistIds = [] } = params;
  const db = await mongoDB.getMongoDB();
  const mongodbClient = await mongoDB.getClient();

  const pressPost = await PressPostModel.getPressPostById(pressPostId);
  let oldPressPostIds = [];
  if (pressPost && pressPost.stylists) {
    oldPressPostIds = pressPost.stylists.map((item) => item.objectId);
  }

  const { assigned, unassigned } = Helper.getChangeArrayId(oldPressPostIds, assignedStylistIds);

  await verifyStylists(assigned);

  const newStylist = assignedStylistIds.map((id) => {
    return {
      __type: 'Pointer',
      className: 'Stylist',
      objectId: id,
    };
  });

  await Helper.executeInTransaction(async (session) => {
    await db.collection('PressPost').updateMany(
      {
        _id: pressPostId,
      },
      {
        $set: {
          stylists: newStylist,
        },
      },
      { session },
    );

    if (assigned.length > 0) {
      await increaseTotalPressPostForStylist(assigned, db, session);
    }

    if (unassigned.length > 0) {
      await decreaseTotalPressPostForStylist(unassigned, db, session);
    }
  }, mongodbClient);
  return {
    success: true,
  };
};

PressPostModel.removePressPostDeleted = async () => {
  const db = await mongoDB.getMongoDB();
  const mongodbClient = await mongoDB.getClient();

  const deletedPressPost = await db
    .collection('PressPost')
    .find({
      rank: 99999,
      order: 99999,
    })
    .project({ _id: 1, 'stylists.objectId': 1 })
    .toArray();

  let stylistIds = [];
  const pressPostIds = [];
  deletedPressPost.forEach((pressPost) => {
    pressPostIds.push(pressPost._id);
    if (pressPost.stylists) {
      stylistIds = stylistIds.concat(pressPost.stylists.map((item) => item.objectId));
    }
  });

  const stylistMorePressPost = new Map();
  stylistIds.forEach((item) => {
    if (stylistMorePressPost.has(item)) {
      stylistMorePressPost.set(item, stylistMorePressPost.get(item) + 1);
    } else {
      stylistMorePressPost.set(item, 1);
    }
  });

  await Helper.executeInTransaction(async (session) => {
    await db.collection('PressPost').deleteMany(
      {
        _id: {
          $in: pressPostIds,
        },
      },
      { session },
    );

    const promise = [...stylistMorePressPost.entries()].map((item) => {
      return decreaseTotalPressPostForStylist([item[0]], db, session, item[1]);
    });
    await Promise.all(promise);
  }, mongodbClient);

  return {
    pressPostIds,
    stylistIds,
    stylistMorePressPost: [...stylistMorePressPost],
  };
};

const updateTotalPressPostForStylist = async (assigned, db, changeNumner = 1) => {
  await db.collection('Stylist').updateMany(
    {
      _id: {
        $in: assigned,
      },
    },
    [
      {
        $set: {
          totalPressPost: changeNumner,
        },
      },
    ],
  );
};

PressPostModel.migratedPressPostForStylist = async () => {
  const db = await mongoDB.getMongoDB();

  const pressPosts = await db.collection('PressPost').find({}).project({ _id: 1, 'stylists.objectId': 1 }).toArray();

  let stylistIds = [];
  pressPosts.forEach((pressPost) => {
    if (pressPost.stylists) {
      stylistIds = stylistIds.concat(pressPost.stylists.map((item) => item.objectId));
    }
  });

  const stylistMorePressPost = new Map();
  stylistIds.forEach((item) => {
    if (stylistMorePressPost.has(item)) {
      stylistMorePressPost.set(item, stylistMorePressPost.get(item) + 1);
    } else {
      stylistMorePressPost.set(item, 1);
    }
  });

  await db.collection('Stylist').updateMany({}, [
    {
      $set: {
        totalPressPost: 0,
      },
    },
  ]);

  const promise = [...stylistMorePressPost.entries()].map((item) => {
    return updateTotalPressPostForStylist([item[0]], db, item[1]);
  });
  await Promise.all(promise);

  return {
    stylistIds,
    stylistMorePressPost: [...stylistMorePressPost],
  };
};
