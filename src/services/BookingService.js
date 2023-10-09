const BookingService = {};
module.exports = BookingService;

const { INTERNAL } = require('../const/Errors');
const Helper = require('../utils/helper');

class BookingServiceV1 {
  constructor(mongoClient, logger, bookingRepository) {
    this.__mongoClient = mongoClient;
    this.__logger = logger;
    this.__bookingRepository = bookingRepository;
  }

  async updateBooking(context, filter, setParams, pushParams, session) {
    this.__logger.info(`updateBooking(BookingService):
      filter=${JSON.stringify(filter)}
      setParams=${JSON.stringify(setParams)}
      pushParams=${JSON.stringify(pushParams)}
    `);

    await this.__bookingRepository.update(context, filter, setParams, pushParams, session).catch((e) => {
      const contextError = {
        context,
        filter,
        setParams,
        pushParams,
      };
      this.__logger.error('updateBooking bookingRepository.update error', JSON.stringify(contextError), e);

      const { code, message } = INTERNAL;
      throw new Parse.Error(code, message);
    });
  }
}

BookingService.newBookingService = (mongoClient, logger, bookingRepository) => {
  return new BookingServiceV1(mongoClient, logger, bookingRepository);
};
