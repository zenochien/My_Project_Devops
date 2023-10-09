const BaseQuery = {};
module.exports = BaseQuery;

const COLLECTION_NAME = {
  USER: '_User',
  SALON: 'Salon',
  CATEGORY: 'Category',
  MENU: 'Menu',
  STYLIST: 'Stylist',
  PRODUCT: 'Product',
  POST: 'Post',
  IMAGE: 'Image',
  CUSTOMER: 'Customer',
  BOOKING: 'Booking',
  PAYMENT: 'Payment',
  CLOSING_DATE: 'ClosingDate',
  NOTIFICATION: 'Notification',
  PREFECTURE: 'Prefecture',
  REVIEW: 'Review',
  BANNER: 'Banner',
  FAVORITE_STYLIST: 'FavoritedStylist',
  BANK: 'Bank',
  BANK_BRANCH: 'BankBranch',
  SALON_EARNING: 'SalonEarning',
  HASHTAG: 'Hashtag',
  HOLDING_COMPANY: 'HoldingCompany',
  PRESS_POST: 'PressPost',
};

BaseQuery.getCollection = (collection) => COLLECTION_NAME[collection] || COLLECTION_NAME;

BaseQuery.getInstallationQuery = () => {
  return new Parse.Query(Parse.Installation);
};

BaseQuery.getUserQuery = () => {
  return new Parse.Query(Parse.User);
};

BaseQuery.getSalonQuery = () => {
  return new Parse.Query(COLLECTION_NAME.SALON);
};

BaseQuery.getCategoryQuery = () => {
  return new Parse.Query(COLLECTION_NAME.CATEGORY);
};

BaseQuery.getMenuQuery = () => {
  return new Parse.Query(COLLECTION_NAME.MENU);
};

BaseQuery.getStylistQuery = () => {
  return new Parse.Query(COLLECTION_NAME.STYLIST);
};
BaseQuery.getProductQuery = () => {
  return new Parse.Query(COLLECTION_NAME.PRODUCT);
};

BaseQuery.getPostQuery = () => {
  return new Parse.Query(COLLECTION_NAME.POST);
};

BaseQuery.getImageQuery = () => {
  return new Parse.Query(COLLECTION_NAME.IMAGE);
};

BaseQuery.getCustomerQuery = () => {
  return new Parse.Query(COLLECTION_NAME.CUSTOMER);
};

BaseQuery.getBookingQuery = () => {
  return new Parse.Query(COLLECTION_NAME.BOOKING);
};

BaseQuery.getPaymentQuery = () => {
  return new Parse.Query(COLLECTION_NAME.PAYMENT);
};

BaseQuery.getClosingDateQuery = () => {
  return new Parse.Query(COLLECTION_NAME.CLOSING_DATE);
};

BaseQuery.getNotificationQuery = () => {
  return new Parse.Query(COLLECTION_NAME.NOTIFICATION);
};

BaseQuery.getPrefectureQuery = () => {
  return new Parse.Query(COLLECTION_NAME.PREFECTURE);
};

BaseQuery.getReviewQuery = () => {
  return new Parse.Query(COLLECTION_NAME.REVIEW);
};

BaseQuery.getBannerQuery = () => {
  return new Parse.Query(COLLECTION_NAME.BANNER);
};

BaseQuery.getFavoritedStylistQuery = () => {
  return new Parse.Query(COLLECTION_NAME.FAVORITE_STYLIST);
};

BaseQuery.getBankQuery = () => {
  return new Parse.Query(COLLECTION_NAME.BANK);
};

BaseQuery.getBankBranchQuery = () => {
  return new Parse.Query(COLLECTION_NAME.BANK_BRANCH);
};

BaseQuery.getSalonEarningQuery = () => {
  return new Parse.Query(COLLECTION_NAME.SALON_EARNING);
};

BaseQuery.getHashtagQuery = () => {
  return new Parse.Query(COLLECTION_NAME.HASHTAG);
};

BaseQuery.getHoldingCompanyQuery = () => {
  return new Parse.Query(COLLECTION_NAME.HOLDING_COMPANY);
};

BaseQuery.getPressPostQuery = () => {
  return new Parse.Query(COLLECTION_NAME.PRESS_POST);
};
