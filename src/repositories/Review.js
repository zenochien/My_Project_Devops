const { STATUS } = require('../const/Constants');
const { OBJECT_NOT_FOUND } = require('../const/Errors');

const ReviewRepo = {};
module.exports = ReviewRepo;

class ReviewRepository {
  constructor(logger, client) {
    this.__logger = logger;
    this.__client = client;
  }

  async insert(
    context,
    reviewId,
    customerId,
    stylistId,
    bookingId,
    createdAt,
    generalScore,
    styleScore,
    serviceScore,
    comment,
    customer,
    stylist,
    salon,
    platform,
    session,
  ) {
    await this.__client
      .db()
      .collection('Review')
      .insertOne(
        {
          _id: reviewId,
          customerId,
          stylistId,
          bookingId,
          _p_booking: `Booking$${bookingId}`,
          _created_at: createdAt,
          generalScore,
          styleScore,
          serviceScore,
          comment,
          customer,
          stylist,
          salon,
          status: STATUS.ACTIVE,
          platform,
        },
        { session },
      );

    return Promise.resolve({ result: true });
  }

  async get(reviewId, conditions = {}) {
    const review = await this.__client
      .db()
      .collection('Review')
      .findOne({
        _id: reviewId,
        ...conditions,
      });
    if (!review) {
      const { code, message } = OBJECT_NOT_FOUND;
      throw new Parse.Error(code, message);
    }
    return review;
  }

  async update(reviewId, attributes, session) {
    const result = await this.__client.db().collection('Review').updateOne(
      {
        _id: reviewId,
      },
      {
        $set: attributes,
      },
      { session },
    );
    if (result.modifiedCount === 0) {
      const { code, message } = OBJECT_NOT_FOUND;
      throw new Parse.Error(code, message);
    }

    return Promise.resolve({ result: true });
  }
}

ReviewRepo.NewReviewMongoRepository = (logger, client) => {
  return new ReviewRepository(logger, client);
};
