const ReviewService = {};
module.exports = ReviewService;

const { STATUS, EVENTS } = require('../const/Constants');
const { OBJECT_NOT_FOUND, INTERNAL } = require('../const/Errors');
const Helper = require('../utils/helper');
const BaseQuery = require('../cloud/BaseQuery');
const eventManager = require('../utils/Event');
class ReviewServiceV1 {
  constructor(mongoClient, logger, reviewRepository, bookingRepository, stylistRepository) {
    this.__mongoClient = mongoClient;
    this.__logger = logger;
    this.__reviewRepository = reviewRepository;
    this.__bookingRepository = bookingRepository;
    this.__stylistRepository = stylistRepository;
  }

  async createReview(
    context,
    reviewId,
    customerId,
    stylistId,
    bookingId,
    generalScore,
    styleScore,
    serviceScore,
    comment,
    customer,
    stylist,
    salon,
    platform,
  ) {
    this.__logger.info(`createReview(ReviewService):
      stylistId=${stylistId}
      bookingId=${bookingId}
      reviewId=${reviewId}
      generalScore=${generalScore}
      styleScore=${styleScore}
      serviceScore=${serviceScore}
      comment=${comment}
      platform=${platform}
    `);

    const createReviewWithSession = async (session) => {
      await this.__reviewRepository
        .insert(
          context,
          reviewId,
          customerId,
          stylistId,
          bookingId,
          new Date(),
          generalScore,
          styleScore,
          serviceScore,
          comment,
          customer,
          stylist,
          salon,
          platform,
          session,
        )
        .catch((e) => {
          const contextError = {
            context,
            reviewId,
            stylistId,
            bookingId,
            generalScore,
            styleScore,
            serviceScore,
            comment,
          };
          this.__logger.error('createReview reviewRepository.insert error', JSON.stringify(contextError), e);

          const { code, message } = INTERNAL;
          throw new Parse.Error(code, message);
        });

      await this.__bookingRepository.addReview(context, bookingId, reviewId, session).catch((e) => {
        const contextError = {
          context,
          reviewId,
          stylistId,
          bookingId,
          generalScore,
          styleScore,
          serviceScore,
          comment,
        };
        this.__logger.error('createReview bookingRepository.addReview error', JSON.stringify(contextError), e);

        const { code, message } = INTERNAL;
        throw new Parse.Error(code, message);
      });

      await this.__stylistRepository
        .recalculateReviewScore(context, stylistId, generalScore, styleScore, serviceScore, session)
        .catch((e) => {
          const contextError = {
            context,
            reviewId,
            stylistId,
            bookingId,
            generalScore,
            styleScore,
            serviceScore,
            comment,
          };
          this.__logger.error(
            'createReview stylistRepository.recalculateReviewScore error',
            JSON.stringify(contextError),
            e,
          );

          const { code, message } = INTERNAL;
          throw new Parse.Error(code, message);
        });
    };

    await Helper.executeInTransaction(createReviewWithSession, this.__mongoClient);
    await this.stylistChangeProfile(stylistId);
  }

  async deleteReview(reviewId) {
    this.__logger.info(`deleteReview(ReviewService): reviewId=${reviewId} `);
    const review = await this.__reviewRepository.get(reviewId, { status: STATUS.ACTIVE });
    const { stylistId } = review;
    const deleteReviewWithSession = async (session) => {
      try {
        const attributes = {
          status: STATUS.DELETED,
        };
        await this.__reviewRepository.update(reviewId, attributes, session);
        const stylist = await this.__stylistRepository.getCurentScore(stylistId, session);
        const { count, generalScoreAvg, styleScoreAvg, serviceScoreAvg } = stylist;
        await this.__stylistRepository.updateScore(
          stylistId,
          generalScoreAvg,
          styleScoreAvg,
          serviceScoreAvg,
          count,
          session,
        );
      } catch (e) {
        this.__logger.error(`deleteReview(ReviewService): reviewId=${reviewId} `, e);
        const { code, message } = INTERNAL;
        throw new Parse.Error(code, message);
      }
    };
    await Helper.executeInTransaction(deleteReviewWithSession, this.__mongoClient);
    await this.stylistChangeProfile(stylistId);
  }

  async stylistChangeProfile(stylistId) {
    const stylistQuery = BaseQuery.getStylistQuery();
    const stylistObject = await stylistQuery.get(stylistId, { useMasterKey: true });
    const dirtyKeys = ['generalScore', 'styleScore', 'serviceScore', 'reviewCount'];
    eventManager.emit(EVENTS.STYLIST_CHANGE_PROFILE, {
      dirtyKeys,
      objectData: stylistObject.toJSON(),
    });
  }
}

ReviewService.newReviewService = (mongoClient, logger, reviewRepository, bookingRepository, stylistRepository) => {
  return new ReviewServiceV1(mongoClient, logger, reviewRepository, bookingRepository, stylistRepository);
};
