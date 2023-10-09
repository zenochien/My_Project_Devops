const mongoDB = require('../db/mongoDB');
const _ = require('lodash');
const RecommendationService = require('../cloud/services/Recommendation');
const { STATUS, USER_STATUS } = require('../const/Constants');
module.exports = {
  stylistChangeProfile: async ({ dirtyKeys, objectData }) => {
    const requireFields = [
      'fullName',
      'nickName',
      'profileImages',
      'userStatus',
      'profile',
      'reviewCount',
      'generalScore',
      'styleScore',
      'serviceScore',
      'isOfficial',
      'status',
    ];

    await RecommendationService.stylistChangeProfile({ dirtyKeys, objectData, requireFields });
  },

  salonChangeProfile: async ({ dirtyKeys, objectData }) => {
    const requireFields = [
      'salonName',
      'salonNameKatakana',
      'distanceNearestStation',
      'stationName',
      'salonAddress1',
      'salonAddress2',
    ];
    await RecommendationService.salonChangeProfile({ dirtyKeys, objectData, requireFields });
  },
};
