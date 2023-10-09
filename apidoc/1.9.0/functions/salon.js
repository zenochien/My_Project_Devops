/**
  * @api {post} /updateSalonInfo updateSalonInfo
  * @apiVersion 1.9.0
  * @apiName updateSalonInfo
  * @apiGroup Web-Salon
  * @apiPermission Required Login as Salon
  * @apiDescription Update Salon Details
  *
  * @apiParam {String} objectId         objectId of Salon
  * @apiParam {String} salonName        Name of Salon
  * @apiParam {String} slug             Slug
  * @apiParam {String} salonNameKatakana        Katakana Name of Salon
  * @apiParam {String} salonImage       objectId of Image
  * @apiParam {String} phone
  * @apiParam {String} postalCode       Post code of the salon, format: ###-####
  * @apiParam {String} salonAddress1    Prefecture
  * @apiParam {String} salonAddress2    Cities, towns, villages (or island name)
  * @apiParam {String} salonAddress3    District
  * @apiParam {String} [salonAddress4]    Building name + Room number of the salon
  * @apiParam {String} [salonCatchphrase]    Slogan
  * @apiParam {String} [salonDirection]   Direction to Salon
  * @apiParam {String} [salonNote]
  * @apiParam {Object} [salonSchedules] Salon schedules
  * @apiParam {Object} [salonHolidays]
  * @apiParam {Array}  [salonHolidays.weekdays] List of closed weekdays (0 sunday - 6 saturday)
  * @apiParam {Array}  [salonHolidays.holidays] List of closed holidays (MM/DD)
  * @apiParam {Array}  [salonHolidays.texts]  Free text
  * @apiParam {Number} [salonSeatsNumber]
  * @apiParam {String} [salonOtherNote]
  * @apiParam {Object}  [salonSNS]       Social media username (or profile path)
  * @apiParam {String}  [salonSNS.facebook]
  * @apiParam {String}  [salonSNS.instagram]
  * @apiParam {String}  [salonSNS.tiktok]
  * @apiParam {String}  [salonSNS.youtube]
  * @apiParam {String}  [salonSNS.twitter]
  * @apiParam {Number}  [salonStaffsNumber]
  * @apiParam {String}  [stationName]
  * @apiParam {Number}  [distanceNearestStation]

  * @apiExample {json} Request example
  * {
  *     "objectId": "iEYQp8",
  *     "salonName": "Psycho Killer",
  *     "slug": "psycho-killer",
  *     "salonNameKatakana": "サイコー・キラー",
  *     "salonCatchphrase": "Saa, omae no tsumi o kazoero!",
  *     "salonImage": "J5ErkJggg",
  *     "phone": "09897452312",
  *     "postalCode": "123-4567",
  *     "salonAddress1": "北海道",
  *     "salonAddress2": "Tsukisamu Higashi 2 Jo",
  *     "salonAddress3": "Abuta District",
  *     "salonAddress4": "TOKYO SKYTREE",
  *     "salonDirection": "Jump off the bridge",
  *     "salonNote": "eg",
  *     "salonSchedules": {
  *       "0":
  *         {
  *           "startTime": "08:00",
  *           "endTime": "10:00"
  *         },
  *       "1":
  *         {
  *           "startTime": "08:00",
  *           "endTime": "10:00"
  *         }
  *     },
  *     "salonHolidays": {
  *         "weekdays": [1],
  *         "holidays": ["01/01"],
  *         "texts": "holiday"
  *     },
  *     "salonSeatsNumber": 50,
  *     "salonOtherNote": "eg eg",
  *     "salonSNS": {
  *         "facebook": "profile.php?id=100011002652350"
  *     },
  *     "salonStaffsNumber": 10,
  *     "stationName": "station",
  *     "distanceNearestStation": 20
  * }
  *
  * @apiSuccess {Object}  result
  * @apiSuccess {String}  result.salonName  Salon Name
  * @apiSuccess {String}  result.slug       Slug
  * @apiSuccess {String}  result.salonNameKatakana  Salon Katakana Name
  * @apiSuccess {String}  result.phone
  * @apiSuccess {String}  result.salonAddress1  salonAddress1  Prefecture
  * @apiSuccess {String}  result.salonAddress2  salonAddress2  Cities, towns, villages (or island name)
  * @apiSuccess {String}  result.salonAddress3  salonAddress3  District
  * @apiSuccess {String}  result.salonAddress4  salonAddress4  Building name + Room number of the salon
  * @apiSuccess {String}  result.salonCatchphrase  Slogan
  * @apiSuccess {String}  result.salonDirection  Direction to salon
  * @apiSuccess {Object}  result.salonSchedules  Salon Schedules
  * @apiSuccess {Object}  result.salonHolidays  Salon holidays
  * @apiSuccess {Array}   result.salonHolidays.weekdays List of closed weekdays (0 sunday - 6 saturday)
  * @apiSuccess {Array}   result.salonHolidays.holidays List of closed holidays (MM/DD)
  * @apiSuccess {Array}   result.salonHolidays.texts  Free text
  * @apiSuccess {Object}  result.salonSNS       Social media username (or profile path)
  * @apiSuccess {String}  result.salonSNS.facebook
  * @apiSuccess {String}  result.salonSNS.instagram
  * @apiSuccess {String}  result.salonSNS.tiktok
  * @apiSuccess {String}  result.salonSNS.youtube
  * @apiSuccess {String}  result.salonSNS.twitter
  * @apiSuccess {Number}  result.salonSeatsNumber Number of seat in salon
  * @apiSuccess {String}  result.objectId  Salon id
  * @apiSuccess {Object}  result.salonImage Links to images
  * @apiSuccess {Number}  result.salonStaffsNumber  Number of staffs
  * @apiSuccess {Number}  result.salonEmail  Email
  * @apiSuccess {String}  result.salonNote
  * @apiSuccess {String}  result.stationName
  * @apiSuccess {String}  result.distanceNearestStation
  *
  * @apiSuccessExample {json} Response example
  * {
  *   "result": {
  *     "salonName": "Psycho Killer",
  *     "slug": "psycho-killer",
  *     "salonNameKatakana": "サイコー・キラー",
  *     "phone": "09897452312",
  *     "postalCode": "123-4567",
  *     "salonAddress1": "北海道",
  *     "salonAddress2": "Tsukisamu Higashi 2 Jo",
  *     "salonAddress3": "Abuta District",
  *     "salonAddress4": "TOKYO SKYTREE",
  *     "salonCatchphrase": "Saa, omae no tsumi o kazoero!",
  *     "salonDirection": "Jump off the bridge",
  *     "salonNote": "eg",
  *     "salonSchedules": {
  *       "0":
  *         {
  *           "startTime": "08:00",
  *           "endTime": "10:00"
  *         },
  *       "1":
  *         {
  *           "startTime": "08:00",
  *           "endTime": "10:00"
  *         }
  *     },
  *     "salonHolidays": {
  *       "weekdays": [
  *         1
  *       ],
  *       "holidays": [
  *         "01/01"
  *       ],
  *       "texts": "holiday"
  *     },
  *     "salonSNS": {
  *       "facebook": "profile.php?id=100011002652350"
  *     },
  *     "salonSeatsNumber": 50,
  *     "salonOtherNote": "eg eg",
  *     "objectId": "iEYQp8",
  *     "salonStaffsNumber": "10",
  *     "salonEmail": "salon-1@abc.com",
  *     "salonImage": {
  *       "objectId": "oAulFLCVmA",
  *       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/c6f437fe510743f2c6a80c9a09800dfa_salon_250x250.jpg",
  *       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/ee9ddfaf3f839c8bedecab51d6d5c3ec_salon_800x800.jpg",
  *       "original": "https://hairlie-dev.s3.amazonaws.com/8c676aa2c5cbf692e5711b519b357ddc_PsychoKiller.png"
  *     }
  *     "stationName": "station",
  *     "distanceNearestStation": 20
  *   }
  * }
  *
  * @apiErrorExample  {json} AffectBookingError example
  * {
  *   "code": 9514,
  *   "error": [
  *       {
  *           "objectId": "U7uzFfN3yq",
  *           "serviceDateTime": "2021-04-29T09:30:00.000Z"
  *       }
  *   ]
  * }
  *
  * @apiUse ObjectNotFoundError
  * @apiUse InvalidParamsError
  * @apiUse InvalidParams
  * @apiUse InvalidSessionTokenError
  * @apiUse AffectBookingError
  * @apiUse ScheduleAtLeastError
  * @apiUse InvalidSalonNameError
  * @apiUse PermissionError
  * @apiUse LoginRequiredError
  */
function updateSalonInfo() {}
