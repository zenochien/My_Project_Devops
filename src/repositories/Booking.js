const { OBJECT_NOT_FOUND } = require('../const/Errors');
const BookingRepo = {};
module.exports = BookingRepo;

class BookingRepository {
  constructor(logger, client) {
    this.__logger = logger;
    this.__client = client;
  }

  async addReview(context, bookingId, reviewId, session) {
    await this.__client
      .db()
      .collection('Booking')
      .updateOne(
        { _id: bookingId },
        {
          $set: { isReviewed: true, _p_review: `Review$${reviewId}`, reviewId, _updated_at: new Date() },
        },
        { session },
      );

    return Promise.resolve({ result: true });
  }

  async update(context, filter, setParams, pushParams, session) {
    const result = await this.__client.db().collection('Booking').updateOne(
      filter,
      {
        $set: setParams,
        $push: pushParams,
      },
      { session },
    );
    if (result.modifiedCount === 0) {
      const { message } = OBJECT_NOT_FOUND;
      throw new Error(message);
    }
    return Promise.resolve({ result: true });
  }
}

BookingRepo.NewBookingMongoRepository = (logger, client) => {
  return new BookingRepository(logger, client);
};
