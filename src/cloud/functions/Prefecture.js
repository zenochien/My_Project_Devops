const PrefectureFunctions = {};
module.exports = PrefectureFunctions;

const { PrefectureModel } = require('../models');

Object.assign(PrefectureFunctions, {
  getPrefectureList: async (request) => {
    return PrefectureModel.getPrefectureList(request.user);
  },
});
