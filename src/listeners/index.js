const { getInstance } = require('./../utils/Rabbitmq');
const { EVENTS } = require('../const/Constants');
const eventManager = require('../utils/Event');
const rabbitmqManager = getInstance();

/**
 * internal event
 *
 */
eventManager.subcribe({
  event: EVENTS.CANCEL_BOOKING,
  handler: 'Booking.cancelBooking',
});
eventManager.subcribe({
  event: EVENTS.FINISH_BOOKING,
  handler: 'ClosedSlot.handleFinishBooking',
});
eventManager.subcribe({
  event: EVENTS.CANCEL_BOOKING,
  handler: 'ClosedSlot.cancelBooking',
});
eventManager.subcribe({
  event: EVENTS.DELETED_STYLIST,
  handler: 'ControllerBoard.deleteStylist',
});
eventManager.subcribe({
  event: EVENTS.CUSTOMER_VERIFY_EMAIL,
  handler: 'Customer.sendEmailVerificationSuccessfully',
});
eventManager.subcribe({
  event: EVENTS.STYLIST_SET_FIRST_PASSWORD,
  handler: 'Stylist.sendEmailWhenSettingFirstPassword',
});
eventManager.subcribe({
  event: EVENTS.STYLIST_CHANGE_PROFILE,
  handler: 'User.stylistChangeProfile',
});
eventManager.subcribe({
  event: EVENTS.CUSTOMER_CHANGE_PROFILE,
  handler: 'User.customerChangeProfile',
});
eventManager.subcribe({
  event: EVENTS.SALON_CHANGE_PROFILE,
  handler: 'User.salonChangeProfile',
});
eventManager.subcribe({
  event: EVENTS.DELETED_STYLIST,
  handler: 'Stylist.deleteStylist',
});
eventManager.subcribe({
  event: EVENTS.DELETED_CUSTOMER,
  handler: 'Customer.deleteCustomer',
});
eventManager.subcribe({
  event: EVENTS.DELETED_SALON,
  handler: 'Salon.deleteSalon',
});
eventManager.subcribe({
  event: EVENTS.PAYMENT_SUCCESS,
  handler: 'Payout.depositPayment',
});

eventManager.subcribe({
  event: EVENTS.CHANGE_POST_INFO,
  handler: 'Post.changePostInfo',
});
eventManager.subcribe({
  event: EVENTS.CREATE_POST,
  handler: 'Post.createPost',
});

/**
 * external event
 */
// update notification when customer update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.CUSTOMER_CHANGE_PROFILE],
  queueName: `NOTIFICATION_${EVENTS.CUSTOMER_CHANGE_PROFILE}`,
  handler: 'Notification.customerChangeProfile',
});

// update notification when stylist update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.STYLIST_CHANGE_PROFILE],
  queueName: `NOTIFICATION_${EVENTS.STYLIST_CHANGE_PROFILE}`,
  handler: 'Notification.stylistChangeProfile',
});

// update notification when salon update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.SALON_CHANGE_PROFILE],
  queueName: `NOTIFICATION_${EVENTS.SALON_CHANGE_PROFILE}`,
  handler: 'Notification.salonChangeProfile',
});

// update FavoritedStylist when customer update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.CUSTOMER_CHANGE_PROFILE],
  queueName: `FavoritedStylist_${EVENTS.CUSTOMER_CHANGE_PROFILE}`,
  handler: 'FavoritedStylist.customerChangeProfile',
});

// update FavoritedStylist when stylist update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.STYLIST_CHANGE_PROFILE],
  queueName: `FavoritedStylist_${EVENTS.STYLIST_CHANGE_PROFILE}`,
  handler: 'FavoritedStylist.stylistChangeProfile',
});

// update FavoritedStylist when salon update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.SALON_CHANGE_PROFILE],
  queueName: `FavoritedStylist_${EVENTS.SALON_CHANGE_PROFILE}`,
  handler: 'FavoritedStylist.salonChangeProfile',
});

// update Recommendation when stylist update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.STYLIST_CHANGE_PROFILE],
  queueName: `Recommendation_${EVENTS.STYLIST_CHANGE_PROFILE}`,
  handler: 'Recommendation.stylistChangeProfile',
});

// update Recommendation when salon update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.SALON_CHANGE_PROFILE],
  queueName: `Recommendation_${EVENTS.SALON_CHANGE_PROFILE}`,
  handler: 'Recommendation.salonChangeProfile',
});

// update review when customer update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.CUSTOMER_CHANGE_PROFILE],
  queueName: `REVIEW_${EVENTS.CUSTOMER_CHANGE_PROFILE}`,
  handler: 'Review.customerChangeProfile',
});

// update review when stylist update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.STYLIST_CHANGE_PROFILE],
  queueName: `REVIEW_${EVENTS.STYLIST_CHANGE_PROFILE}`,
  handler: 'Review.stylistChangeProfile',
});

// update press post when stylist update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.STYLIST_CHANGE_PROFILE],
  queueName: `PRESS_POST_${EVENTS.STYLIST_CHANGE_PROFILE}`,
  handler: 'PressPost.stylistChangeProfile',
});

// update review when salon update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.SALON_CHANGE_PROFILE],
  queueName: `REVIEW_${EVENTS.SALON_CHANGE_PROFILE}`,
  handler: 'Review.salonChangeProfile',
});

// update last post for stylist
rabbitmqManager.subcribe({
  eventName: [EVENTS.EXTERNAL_CHANGE_POST_INFO, EVENTS.EXTERNAL_CREATE_POST],
  queueName: `STYLIST_${EVENTS.EXTERNAL_CHANGE_POST_INFO}`,
  handler: 'Stylist.updateLastPost',
});

// update stylist when salon update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.SALON_CHANGE_PROFILE],
  queueName: `STYLIST_${EVENTS.SALON_CHANGE_PROFILE}`,
  handler: 'Stylist.salonChangeProfile',
});

// update salon earning when salon update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.SALON_CHANGE_PROFILE],
  queueName: `SALON_EARNING_${EVENTS.SALON_CHANGE_PROFILE}`,
  handler: 'SalonEarning.salonChangeProfile',
});

// update review when stylist update profile
rabbitmqManager.subcribe({
  eventName: [EVENTS.STYLIST_CHANGE_PROFILE],
  queueName: `POST_${EVENTS.STYLIST_CHANGE_PROFILE}`,
  handler: 'Post.stylistChangeProfile',
});
