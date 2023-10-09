const functions = {};
module.exports = functions;

const UserCloud = require('./User');
const SalonCloud = require('./Salon');
const ImageCloud = require('./Image');
const CategoryCloud = require('./Category');
const MenuCloud = require('./Menu');
const StylistCloud = require('./Stylist');
const ProductCloud = require('./Product');
const PostCloud = require('./Post');
const CustomerCloud = require('./Customer');
const BookingCloud = require('./Booking');
const EmailCloud = require('./Email');
const ClosingDateCloud = require('./ClosingDate');
const Notification = require('./Notification');
const ContactUs = require('./ContactUs');
const Prefecture = require('./Prefecture');
const Review = require('./Review');
const Coupon = require('./Coupon');
const BannerCloud = require('./Banner');
const ClosedSlotClound = require('./ClosedSlot');
const FavoriteClound = require('./Favorite');
const RecommendationClound = require('./Recommendation');
const BankCloud = require('./Bank');
const PayoutCloud = require('./Payout');
const HashtagCloud = require('./Hashtag');
const HoldingCompanyCloud = require('./HoldingCompany');
const PressPostCloud = require('./PressPost');
const { getCurrentParseConfig, refreshParseConfig } = require('../ParseConfig');

Object.assign(
  functions,
  UserCloud,
  SalonCloud,
  ImageCloud,
  CategoryCloud,
  StylistCloud,
  MenuCloud,
  ProductCloud,
  PostCloud,
  CustomerCloud,
  BookingCloud,
  EmailCloud,
  ClosingDateCloud,
  Notification,
  ContactUs,
  Prefecture,
  Review,
  Coupon,
  BannerCloud,
  ClosedSlotClound,
  FavoriteClound,
  RecommendationClound,
  BankCloud,
  PayoutCloud,
  HashtagCloud,
  HoldingCompanyCloud,
  PressPostCloud,
  { getCurrentParseConfig, refreshParseConfig },
);
