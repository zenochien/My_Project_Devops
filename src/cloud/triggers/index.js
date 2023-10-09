const triggers = {};
module.exports = triggers;

const UserTrigger = require('./User');
const ImageTrigger = require('./Image');
const StylistTrigger = require('./Stylist');
const CategoryTrigger = require('./Category');
const CustomerTrigger = require('./Customer');
const SalonTrigger = require('./Salon');
const HoldingCompanyTrigger = require('./HoldingCompany');

Object.assign(
  triggers,
  UserTrigger,
  ImageTrigger,
  StylistTrigger,
  CategoryTrigger,
  CustomerTrigger,
  SalonTrigger,
  HoldingCompanyTrigger,
);
