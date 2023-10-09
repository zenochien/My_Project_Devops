const StylistRepo = {};
module.exports = StylistRepo;
const { STATUS } = require('../const/Constants');
const { OBJECT_NOT_FOUND } = require('../const/Errors');

class StylistRepository {
  constructor(logger, client) {
    this.__logger = logger;
    this.__client = client;
  }

  async recalculateReviewScore(context, stylistId, _generalScore, _styleScore, _serviceScore, session) {
    await this.__client
      .db()
      .collection('Stylist')
      .updateOne(
        {
          _id: stylistId,
        },
        [
          {
            $set: {
              reviewCount: {
                $cond: [
                  { $lt: ['$reviewCount', 1] },
                  1,
                  {
                    $add: ['$reviewCount', 1],
                  },
                ],
              },
              generalScore: {
                $cond: [
                  { $lt: ['$reviewCount', 1] },
                  _generalScore,
                  {
                    $round: [
                      {
                        $add: [
                          '$generalScore',
                          {
                            $divide: [{ $subtract: [_generalScore, '$generalScore'] }, { $add: ['$reviewCount', 1] }],
                          },
                        ],
                      },
                      1,
                    ],
                  },
                ],
              },
              styleScore: {
                $cond: [
                  { $lt: ['$reviewCount', 1] },
                  _styleScore,
                  {
                    $round: [
                      {
                        $add: [
                          '$styleScore',
                          {
                            $divide: [{ $subtract: [_styleScore, '$styleScore'] }, { $add: ['$reviewCount', 1] }],
                          },
                        ],
                      },
                      1,
                    ],
                  },
                ],
              },
              serviceScore: {
                $cond: [
                  { $lt: ['$reviewCount', 1] },
                  _serviceScore,
                  {
                    $round: [
                      {
                        $add: [
                          '$serviceScore',
                          {
                            $divide: [{ $subtract: [_serviceScore, '$serviceScore'] }, { $add: ['$reviewCount', 1] }],
                          },
                        ],
                      },
                      1,
                    ],
                  },
                ],
              },
            },
          },
        ],
        { session },
      );
    return Promise.resolve({ result: true });
  }

  async updateScore(stylistId, generalScore, styleScore, serviceScore, reviewCount, session) {
    const result = await this.__client
      .db()
      .collection('Stylist')
      .updateOne(
        {
          _id: stylistId,
        },
        [
          {
            $set: {
              reviewCount,
              generalScore,
              styleScore,
              serviceScore,
            },
          },
        ],
        { session },
      );
    if (result.modifiedCount === 0) {
      const { code, message } = OBJECT_NOT_FOUND;
      throw new Parse.Error(code, message);
    }
    return Promise.resolve({ result: true });
  }
  async getCurentScore(stylistId, session) {
    const styliststyleScore = await this.__client
      .db()
      .collection('Review')
      .aggregate(
        [
          {
            $match: {
              stylistId,
              status: {
                $ne: STATUS.DELETED,
              },
            },
          },
          {
            $group: {
              _id: '$stylistId',
              generalScoreAvg: { $avg: '$generalScore' },
              styleScoreAvg: { $avg: '$styleScore' },
              serviceScoreAvg: { $avg: '$serviceScore' },
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              generalScoreAvg: { $round: ['$generalScoreAvg', 1] },
              styleScoreAvg: { $round: ['$styleScoreAvg', 1] },
              serviceScoreAvg: { $round: ['$serviceScoreAvg', 1] },
              count: 1,
            },
          },
        ],
        { session },
      );
    const result = await styliststyleScore.toArray();
    if (result && result.length === 0) {
      // reset data if stylist have no review
      return {
        count: 0,
        generalScoreAvg: 0,
        styleScoreAvg: 0,
        serviceScoreAvg: 0,
      };
    }
    return result[0];
  }
}

StylistRepo.NewStylistMongoRepository = (logger, client) => {
  return new StylistRepository(logger, client);
};
