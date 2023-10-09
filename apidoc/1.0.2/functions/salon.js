/**
 * @api {post} /getSalonDetail getSalonDetail
 * @apiVersion 1.0.0
 * @apiName getSalonDetail
 * @apiGroup Web-Salon
 *
 * @apiDescription Get Salon Details
 *
 * @apiParam {String} objectId objectId of Salon (same as salonId)
 *
 * @apiExample {json} Request example
 * {
 *   "objectId": "17fgt2",
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.salonName  Salon Name
 * @apiSuccess {String}  result.slug       Slug
 * @apiSuccess {String}  result.salonNameKatakana  Salon Katakana Name
 * @apiSuccess {String}  result.phone
 * @apiSuccess {String}  result.salonAddress1  salonAddress1  Prefecture
 * @apiSuccess {String}  result.salonAddress2  salonAddress2  City ward street address
 * @apiSuccess {String}  result.salonAddress3  salonAddress3  Building
 * @apiSuccess {String}  result.salonCatchphrase  Slogan
 * @apiSuccess {String}  result.salonDirection  Direction to salon
 * @apiSuccess {Object}  result.salonSchedules  Salon schedules
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
 * @apiSuccess {Number}  result.salonSeatsNumber  Number of seat in salon
 * @apiSuccess {String}  result.objectId  Salon id
 * @apiSuccess {Object}  result.salonImage  Links to images
 * @apiSuccess {Number}  result.salonStaffsNumber  Number of staffs
 * @apiSuccess {Number}  result.salonEmail  Email
 * @apiSuccess {String}  result.salonNote
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "salonName": "Psycho Killer",
 *     "slug": "psycho-killer",
 *     "salonNameKatakana": "サイコー・キラー",
 *     "phone": "09897452312",
 *     "salonAddress1": "北海道",
 *     "salonAddress2": "Tsukisamu Higashi 2 Jo",
 *     "salonAddress3": "4th floor",
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
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getSalonDetail() {}

/**
 * @api {post} /getSalonList getSalonList
 * @apiVersion 1.0.0
 * @apiName getSalonList
 * @apiGroup Web-Salon
 *
 * @apiDescription Get Salon List
 *
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} [orderBy]  Order key
 * @apiParam {String} [order]  Order direction ['ascending', 'descending']
 * @apiParam {String} [searchKey]  Search phrase
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 10,
 *   "orderBy": "createdAt",
 *   "order": "ascending"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total  Number of salons
 * @apiSuccess {Array}   result.lists  List of salons
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *       "salonName": "Psycho Killer",
 *       "slug": "psycho-killer",
 *       "salonNameKatakana": "サイコー・キラー",
 *       "phone": "09897452312",
 *       "salonAddress1": "北海道",
 *       "salonAddress2": "Tsukisamu Higashi 2 Jo",
 *       "salonAddress3": "4th floor",
 *       "salonCatchphrase": "Saa, omae no tsumi o kazoero!",
 *       "salonDirection": "Jump off the bridge",
 *       "salonSchedules": {
 *         "0":
 *           {
 *             "startTime": "08:00",
 *             "endTime": "10:00"
 *           },
 *         "1":
 *           {
 *             "startTime": "08:00",
 *             "endTime": "10:00"
 *           }
 *       },
 *       "salonHolidays": {
 *         "weekdays": [
 *           1
 *         ],
 *         "holidays": [
 *           "01/01"
 *         ],
 *         "texts": "holiday"
 *       },
 *       "salonSNS": {
 *         "facebook": "profile.php?id=100011002652350"
 *       },
 *       "salonSeatsNumber": 50,
 *       "objectId": "iEYQp8",
 *       "salonStaffsNumber": "10",
 *       "salonEmail": "salon-1@abc.com",
 *       "salonImage": {
 *         "objectId": "oAulFLCVmA",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/c6f437fe510743f2c6a80c9a09800dfa_salon_250x250.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/ee9ddfaf3f839c8bedecab51d6d5c3ec_salon_800x800.jpg",
 *         "original": "https://hairlie-dev.s3.amazonaws.com/8c676aa2c5cbf692e5711b519b357ddc_PsychoKiller.png"
 *       },
 *       "salonNote": "hello"
 *    ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getSalonList() {}

/**
 * @api {post} /adminUpdateSalonInfo adminUpdateSalonInfo
 * @apiVersion 1.0.0
 * @apiName adminUpdateSalonInfo
 * @apiGroup Web-Salon
 * @apiPermission Required Login as Admin
 * @apiDescription Update Salon Name
 *
 * @apiParam {String} objectId         objectId of Salon
 * @apiParam {String} salonName        Name of Salon
 *
 * @apiExample {json} Request example
 * {
 *     "objectId": "iEYQp8",
 *     "salonName": "Psycho Killer 2",
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.salonName  Salon Name
 * @apiSuccess {String}  result.slug       Slug
 * @apiSuccess {String}  result.salonNameKatakana  Salon katakana Name
 * @apiSuccess {String}  result.phone
 * @apiSuccess {String}  result.salonAddress1  salonAddress1  Prefecture
 * @apiSuccess {String}  result.salonAddress2  salonAddress2  City ward street address
 * @apiSuccess {String}  result.salonAddress3  salonAddress3  Building
 * @apiSuccess {String}  result.salonCatchphrase  Slogan
 * @apiSuccess {String}  result.salonDirection  Direction to salon
 * @apiSuccess {Object}  result.salonSchedules  Salon schedules
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
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "salonName": "Psycho Killer 2",
 *     "slug": "psycho-killer-2",
 *     "salonNameKatakana": "サイコー・キラー・トゥー",
 *     "phone": "09897452312",
 *     "salonAddress1": "北海道",
 *     "salonAddress2": "Tsukisamu Higashi 2 Jo",
 *     "salonAddress3": "4th floor",
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
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function adminUpdateSalonInfo() {}

/**
  * @api {post} /updateSalonInfo updateSalonInfo
  * @apiVersion 1.0.0
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
  *     "salonStaffsNumber": 10
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

/**
 * @api {post} /customerGetSalonDetailPage customerGetSalonDetailPage
 * @apiVersion 1.0.0
 * @apiName customerGetSalonDetailPage
 * @apiGroup Web-Customer-Salon
 *
 * @apiDescription Get Salon detail on Customer page with published stylist
 *
 * @apiParam {String} salonId
 *
 * @apiExample {json} Request example
 * {
 *   "salonId": "nyG1k8"
 * }
 *
 * @apiSuccess {Object}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "salon": {
 *       "salonName": "Psycho Killer",
 *       "slug": "psycho-killer",
 *       "salonNameKatakana": "サイコー・キラー",
 *       "salonEmail": "nhansalon@yopmail.com",
 *       "phone": "+811234567890",
 *       "postalCode": "123-4567",
 *       "salonAddress1": "北海道",
 *       "salonAddress2": "Tsukisamu Higashi 2 Jo",
 *       "salonAddress3": "Abuta District",
 *       "salonAddress4": "TOKYO SKYTREE",
 *       "salonCatchphrase": "Saa, omae no tsumi o kazoero!",
 *       "salonDirection": "Jump off the bridge",
 *       "salonHolidays": {
 *         "texts": "holiday"
 *       },
 *       "salonNote": "eg",
 *       "salonSchedules": {
 *         "0":
 *           {
 *             "startTime": "08:00",
 *             "endTime": "10:00"
 *           },
 *         "1":
 *           {
 *             "startTime": "08:00",
 *             "endTime": "10:00"
 *           }
 *       },
 *       "salonSNS": {
 *         "facebook": "profile.php?id=100011002652350"
 *       },
 *       "createdAt": "2020-08-13T04:13:02.491Z",
 *       "salonStaffsNumber": 10,
 *       "salonOtherNote": "eg eg",
 *       "salonSeatsNumber": 50,
 *       "objectId": "nyG1k8",
 *       "salonImage": {
 *         "objectId": "yz9GW9hciT",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/5d3317f3fc77749b1946ee54ab7eeaa0_salon_250x250.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/3ec081fd1f29a9c777351a17b1ff14e1_salon_800x800.jpg",
 *         "original": "https://hairlie-dev.s3.amazonaws.com/f95b7274c2be30844d8d699452dc9d21_hairlie_image.jpg"
 *       }
 *     },
 *     "categories": [
 *       {
 *         "name": "HEAD SPA",
 *         "menus": [
 *           {
 *             "objectId": "Cna3E9HdTR",
 *             "name": "menu ne",
 *             "amount": 111,
 *             "description": "description moi ne"
 *           }
 *         ],
 *         "objectId": "VMcx8Oyy37"
 *       },
 *     ],
 *     "stylists": [
 *       {
 *         "createdAt": "2020-09-08T03:29:29.306Z",
 *         "salon": {
 *           "salonName": "Psycho Killer",
 *           "objectId": "nyG1k8"
 *         },
 *         "profileImages": [
 *           {
 *             "objectId": "bNFjmC09pJ",
 *             "file": "https://hairlie-dev.s3.amazonaws.com/81c58cb2e6fed25a4e74a7ca8b0a3103_hairlie_image.jpg",
 *             "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/e1a1e5fce3a167f1a80e8f0a9a3d4fc8_post_250x250.jpg",
 *             "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/4f1689e5fd78fe4d4543dd646680ae29_post_600x600.jpg",
 *             "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/07f990b4e12a0aad494d4e6ce7c18c01_post_800x800.jpg"
 *           }
 *         ],
 *         "fullName": "Kiet Anh",
 *         "nickName": "anhkiet",
 *         "objectId": "MZCz5PnBgq"
 *       }
 *     ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function customerGetSalonDetailPage() {}

/**
 * @api {post} /getStaffsScheduleOfSalonDayView getStaffsScheduleOfSalonDayView
 * @apiVersion 0.5.0
 * @apiName getStaffsScheduleOfSalonDayView
 * @apiGroup Web-Salon
 * @apiPermission Login Required as Salon Operator or Admin
 *
 * @apiDescription Get staffs's schedules of a salon.
 *
 * @apiParam {String} salonId          objectId of Salon
 * @apiParam {String} date             YYYY-MM-DD
 * @apiParam {String} [page]           page of pagination of stylist's list (default: 1)
 * @apiParam {String} [limit]          limit of pagination of stylist's list (default: 20)
 * @apiParam {String} [sort]           sort criteria (default: 'createdAt desc,updatedAt desc')
 *
 * @apiExample {json} Request example
 * {
 *   "salonId":"rasGad",
 *   "from":"2021-04-01T00:00:00.000+09:00",
 *   "to":"2021-04-03T23:59:00.000+09:00"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.data
 * @apiSuccess {String}  result.data.objectId
 * @apiSuccess {String}  result.data.avatar
 * @apiSuccess {String}  result.data.name
 * @apiSuccess {Object}  result.data.sumSchedule
 * @apiSuccess {Array}   result.data.sumSchedule.availableSchedule                O
 * @apiSuccess {String}  result.data.sumSchedule.availableSchedule.startTime
 * @apiSuccess {String}  result.data.sumSchedule.availableSchedule.endTime
 * @apiSuccess {Array}   result.data.sumSchedule.unavailableSchedule              /
 * @apiSuccess {String}  result.data.sumSchedule.unavailableSchedule.startTime
 * @apiSuccess {String}  result.data.sumSchedule.unavailableSchedule.endTime
 * @apiSuccess {Boolean} result.data.sumSchedule.isClosingDate                    true if it is a closing date
 * @apiSuccess {Boolean} result.data.sumSchedule.isSalonClosedDate                true if it is a day that salon closed
 * @apiSuccess {Array}   result.data.profileImages
 * @apiSuccess {String}  result.data.profileImages.objectId
 * @apiSuccess {String}  result.data.profileImages.file
 * @apiSuccess {String}  result.data.profileImages.thumbSmall
 * @apiSuccess {String}  result.data.profileImages.thumbMedium
 * @apiSuccess {String}  result.data.profileImages.thumbLarge
 * @apiSuccess {Array}   result.data.bookings
 * @apiSuccess {Array}   result.data.bookings.menus
 * @apiSuccess {Number}  result.data.bookings.menus.amount
 * @apiSuccess {String}  result.data.bookings.menus.objectId
 * @apiSuccess {String}  result.data.bookings.menus.name
 * @apiSuccess {String}  result.data.bookings.bookingStatus
 * @apiSuccess {String}  result.data.bookings.paymentStatus
 * @apiSuccess {Object}  result.data.bookings.salon
 * @apiSuccess {String}  result.data.bookings.salon.salonName
 * @apiSuccess {String}  result.data.bookings.salon.objectId
 * @apiSuccess {Object}  result.data.bookings.stylist
 * @apiSuccess {Array}   result.data.bookings.stylist.profileImages
 * @apiSuccess {String}  result.data.bookings.stylist.profileImages.objectId
 * @apiSuccess {String}  result.data.bookings.stylist.profileImages.file
 * @apiSuccess {String}  result.data.bookings.stylist.profileImages.thumbSmall
 * @apiSuccess {String}  result.data.bookings.stylist.profileImages.thumbMedium
 * @apiSuccess {String}  result.data.bookings.stylist.profileImages.thumbLarge
 * @apiSuccess {String}  result.data.bookings.stylist.nickName
 * @apiSuccess {String}  result.data.bookings.stylist.objectId
 * @apiSuccess {Object}  result.data.bookings.customer
 * @apiSuccess {String}  result.data.bookings.customer.objectId
 * @apiSuccess {Array}   result.data.bookings.customer.profileImages
 * @apiSuccess {String}  result.data.bookings.customer.profileImages.objectId
 * @apiSuccess {String}  result.data.bookings.customer.profileImages.file
 * @apiSuccess {String}  result.data.bookings.customer.profileImages.thumbSmall
 * @apiSuccess {String}  result.data.bookings.customer.profileImages.thumbMedium
 * @apiSuccess {String}  result.data.bookings.customer.profileImages.thumbLarge
 * @apiSuccess {String}  result.data.bookings.customer.nickName
 * @apiSuccess {Object}  result.data.bookings.cardInfo
 * @apiSuccess {String}  result.data.bookings.cardInfo.cardId
 * @apiSuccess {String}  result.data.bookings.cardInfo.cardNumber
 * @apiSuccess {String}  result.data.bookings.cardInfo.cardType
 * @apiSuccess {Number}  result.data.bookings.totalPrice
 * @apiSuccess {Number}  result.data.bookings.totalDuration
 * @apiSuccess {String}  result.data.bookings.createdAt
 * @apiSuccess {String}  result.data.bookings.paymentNote
 * @apiSuccess {Object}  result.data.bookings.serviceDateTime
 * @apiSuccess {String}  result.data.bookings.serviceDateTime.iso
 * @apiSuccess {String}  result.data.bookings.lastBookingStatus
 * @apiSuccess {Array}   result.data.bookings.cardStatuses
 * @apiSuccess {String}  result.data.bookings.cardStatuses.status
 * @apiSuccess {String}  result.data.bookings.cardStatuses.createdAt
 * @apiSuccess {String}  result.data.bookings.cardStatuses.cardId
 * @apiSuccess {String}  result.data.bookings.cancelNote
 * @apiSuccess {String}  result.data.bookings.objectId
 * @apiSuccess {Array}   result.currentWeeklySchedule
 * @apiSuccess {String}  result.currentWeeklySchedule.objectId
 * @apiSuccess {String}  result.currentWeeklySchedule.avatar
 * @apiSuccess {String}  result.currentWeeklySchedule.name
 * @apiSuccess {String}  result.currentWeeklySchedule.active
 * @apiSuccess {Array}   result.currentWeeklySchedule.schedules
 * @apiSuccess {Number}  result.currentWeeklySchedule.schedules.dayOfWeek            (0: for Sunday)
 * @apiSuccess {String}  result.currentWeeklySchedule.schedules.startAt
 * @apiSuccess {Number}  result.currentWeeklySchedule.schedules.endAt
 * @apiSuccess {Number}  result.currentWeeklySchedule.schedules.startSchedule
 * @apiSuccess {Number}  result.currentWeeklySchedule.schedules.endSchedule
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "data": [
 *       {
 *         "avatar": null,
 *         "name": "Tran Duc",
 *         "active": true,
 *         "objectId": "JMO71YjQQt",
 *         "sumSchedule": {
 *         "availableSchedule": [
 *           {
 *             "startTime": "16:00",
 *             "endTime": "17:00"
 *           },
 *           {
 *             "startTime": "18:00",
 *             "endTime": "19:00"
 *           }
 *         ],
 *         "unavailableSchedule": [
 *           {
 *             "startTime": "09:00",
 *             "endTime": "10:00"
 *           },
 *           {
 *             "startTime": "21:00",
 *             "endTime": "23:00"
 *           }
 *         ]
 *         "profileImages": [
 *           {
 *             "objectId": "IWWbmGZ0MF",
 *             "file": "https://hairlie-dev.s3.amazonaws.com/dab5244d28ceed6c840a0b7909e4da37_hairlie_image.jpg",
 *             "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/cc5451e9d449223b6e38a367469ca9fe_post_250x250.jpg",
 *             "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/85cea3a429f72f1e4455880745b76b5b_post_600x600.jpg",
 *             "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/ce75047c52f21cade24f42bfd63aad63_post_800x800.jpg"
 *           }
 *         ]
 *         bookings: [
 *           {
 *             "menus": [
 *               {
 *                 "amount": 765,
 *                 "objectId": "ET4wBn39Dk",
 *                 "name": "abc",
 *               },
 *               {
 *                 "amount": 765,
 *                 "objectId": "iEFYxURrGy",
 *                 "name": "bcd",
 *               }
 *             ],
 *             "bookingStatus": "CANCELED_CUSTOMER",
 *             "paymentStatus": "FAILED",
 *             "salon": {
 *               "salonName": "duc salon 1 updated",
 *               "objectId": "rasGad"
 *             },
 *             "stylist": {
 *               "profileImages": [],
 *               "nickName": "duc stylist 1",
 *               "objectId": "Dk0EENPjcU"
 *             },
 *             "customer": {
 *               "objectId": "NjF1TX9U79",
 *               "profileImages": [],
 *               "nickName": "duc customer 1"
 *             },
 *             "cardId": "123456",
 *             "totalPrice": 246,
 *             "totalDuration": 0,
 *             "createdAt": "2020-12-23T07:55:45.511Z",
 *             "paymentNote": "Paid by cash",
 *             "serviceDateTime": {
 *               "iso": "2025-10-21T11:35:00.000Z"
 *             },
 *             "objectId": "gJQu5XT931",
 *             "cancelNote": "some reason",
 *             "lastBookingStatus": "REQUESTED"
 *           }
 *         ]
 *       },
 *     ],
 *     "currentWeeklySchedule": [
 *     {
 *       "avatar": null,
 *       "name": "stynickcb1",
 *       "active": true,
 *       "schedules": [
 *         {
 *           "dayOfWeek": 0,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         },
 *         {
 *           "dayOfWeek": 1,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         },
 *         {
 *           "dayOfWeek": 2,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         },
 *         {
 *           "dayOfWeek": 3,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         },
 *         {
 *           "dayOfWeek": 4,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         },
 *         {
 *           "dayOfWeek": 5,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         },
 *         {
 *           "dayOfWeek": 6,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         }
 *       ],
 *       "objectId": "1iXwGj7KQM"
 *     },
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 *
 */
function getStaffsScheduleOfSalonDayView() {}

/**
 * @api {post} /getStaffsScheduleOfSalonWeekView getStaffsScheduleOfSalonWeekView
 * @apiVersion 0.5.0
 * @apiName getStaffsScheduleOfSalonWeekView
 * @apiGroup Web-Salon
 * @apiPermission Login Required as Salon Operator or Admin
 *
 * @apiDescription Get staffs's schedules of a salon for a week.
 *
 * @apiParam {String} salonId          objectId of Salon
 * @apiParam {String} from             YYYY-MM-DD
 * @apiParam {String} to               YYYY-MM-DD
 * @apiParam {String} [page]           page of pagination of stylist's list (default: 1)
 * @apiParam {String} [limit]          limit of pagination of stylist's list (default: 20)
 * @apiParam {String} [sort]           sort criteria (default: 'createdAt desc,updatedAt desc')
 *
 * @apiExample {json} Request example
 * {
 *   "salonId":"rasGad",
 *   "from":"2021-04-01",
 *   "to":"2021-04-03"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.data
 * @apiSuccess {String}  result.data.objectId                       Stylist's id
 * @apiSuccess {String}  result.data.avatar
 * @apiSuccess {String}  result.data.name
 * @apiSuccess {Array}   result.data.schedules
 * @apiSuccess {Number}  result.data.schedules.dayOfWeek            (0: for Sunday)
 * @apiSuccess {String}  result.data.schedules.startAt
 * @apiSuccess {Number}  result.data.schedules.endAt
 * @apiSuccess {Number}  result.data.schedules.startSchedule
 * @apiSuccess {Number}  result.data.schedules.endSchedule
 * @apiSuccess {Array}   result.data.sumSchedule
 * @apiSuccess {Number}  result.data.sumSchedule.dayOfWeek          (0: for Sunday)
 * @apiSuccess {Number}  result.data.sumSchedule.availability       0: 'x', 1: 'o', -1: '/', -2: 'Closing date', -3: 'Salon closed date'
 * @apiSuccess {Array}   result.data.sumSchedule.availableSchedule                Defined only when availability is 1
 * @apiSuccess {String}  result.data.sumSchedule.availableSchedule.startTime
 * @apiSuccess {String}  result.data.sumSchedule.availableSchedule.endTime
 * @apiSuccess {Array}   result.data.profileImages
 * @apiSuccess {String}  result.data.profileImages.objectId
 * @apiSuccess {String}  result.data.profileImages.file
 * @apiSuccess {String}  result.data.profileImages.thumbSmall
 * @apiSuccess {String}  result.data.profileImages.thumbMedium
 * @apiSuccess {String}  result.data.profileImages.thumbLarge
 * @apiSuccess {Array}   result.data.bookingsStats
 * @apiSuccess {Number}  result.data.bookingsStats.dayOfWeek
 * @apiSuccess {Number}  result.data.bookingsStats.countRequested
 * @apiSuccess {Number}  result.data.bookingsStats.countConfirmed
 * @apiSuccess {Array}   result.currentWeeklySchedule
 * @apiSuccess {String}  result.currentWeeklySchedule.objectId
 * @apiSuccess {String}  result.currentWeeklySchedule.avatar
 * @apiSuccess {String}  result.currentWeeklySchedule.name
 * @apiSuccess {String}  result.currentWeeklySchedule.active
 * @apiSuccess {Array}   result.currentWeeklySchedule.schedules
 * @apiSuccess {Number}  result.currentWeeklySchedule.schedules.dayOfWeek            (0: for Sunday)
 * @apiSuccess {String}  result.currentWeeklySchedule.schedules.startAt
 * @apiSuccess {Number}  result.currentWeeklySchedule.schedules.endAt
 * @apiSuccess {Number}  result.currentWeeklySchedule.schedules.startSchedule
 * @apiSuccess {Number}  result.currentWeeklySchedule.schedules.endSchedule
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "data": [
 *       {
 *         "avatar": null,
 *         "name": "Tran Duc",
 *         "active": true,
 *         "schedules": [
 *       {
 *         "dayOfWeek": 1,
 *         "startAt": "2021-04-02T00:00:00.000Z",
 *         "endAt": "2021-04-02T00:00:00.000Z",
 *         "startSchedule": "2021-04-01T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 0,
 *         "startAt": "2021-04-08T01:00:00.000Z",
 *         "endAt": "2021-04-08T08:00:00.000Z",
 *         "startSchedule": "2021-04-07T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 0,
 *         "startAt": "2021-04-08T13:00:00.000Z",
 *         "endAt": "2021-04-08T14:00:00.000Z",
 *         "startSchedule": "2021-04-07T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 2,
 *         "startAt": "2021-04-08T01:00:00.000Z",
 *         "endAt": "2021-04-08T12:00:00.000Z",
 *         "startSchedule": "2021-04-07T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 3,
 *         "startAt": "2021-04-08T01:00:00.000Z",
 *         "endAt": "2021-04-08T12:00:00.000Z",
 *         "startSchedule": "2021-04-07T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 4,
 *         "startAt": "2021-04-08T01:00:00.000Z",
 *         "endAt": "2021-04-08T12:00:00.000Z",
 *         "startSchedule": "2021-04-07T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 5,
 *         "startAt": "2021-04-08T01:00:00.000Z",
 *         "endAt": "2021-04-08T12:00:00.000Z",
 *         "startSchedule": "2021-04-07T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 6,
 *         "startAt": "2021-04-08T01:00:00.000Z",
 *         "endAt": "2021-04-08T12:00:00.000Z",
 *         "startSchedule": "2021-04-07T15:00:00.000Z",
 *         "endSchedule": null
 *       }
 *     ],
 *     "scheduleDailies": [
 *       {
 *         "dayOfWeek": 5,
 *         "startAt": "2021-04-08T07:00:00.000Z",
 *         "endAt": "2021-04-08T08:00:00.000Z",
 *         "startOfDay": "2021-04-08T07:00:00.000Z",
 *         "endOfDay": "2021-04-08T08:00:00.000Z"
 *       },
 *       {
 *         "dayOfWeek": 4,
 *         "startAt": "2021-04-08T07:00:00.000Z",
 *         "endAt": "2021-04-08T08:00:00.000Z",
 *         "startOfDay": "2021-04-08T07:00:00.000Z",
 *         "endOfDay": "2021-04-08T08:00:00.000Z"
 *       },
 *       {
 *         "dayOfWeek": 4,
 *         "startAt": "2021-04-08T09:00:00.000Z",
 *         "endAt": "2021-04-08T10:00:00.000Z",
 *         "startOfDay": "2021-04-08T09:00:00.000Z",
 *         "endOfDay": "2021-04-08T10:00:00.000Z"
 *       }
 *     ],
 *     "objectId": "JMO71YjQQt",
 *     "sumSchedule": [
 *       {
 *         "dayOfWeek": 0,
 *         "availability": 1,
 *         "availableSchedule": [
 *           {
 *             "startTime": "10:00",
 *             "endTime": "21:00"
 *           }
 *         ]
 *       },
 *       {
 *         "dayOfWeek": 1,
 *         "availability": 1,
 *         "availableSchedule": [
 *           {
 *             "startTime": "10:00",
 *             "endTime": "21:00"
 *           }
 *         ]
 *       },
 *       {
 *         "dayOfWeek": 2,
 *         "availability": 1,
 *         "availableSchedule": [
 *           {
 *             "startTime": "09:00",
 *             "endTime": "21:00"
 *           }
 *         ]
 *       },
 *       {
 *         "dayOfWeek": 3,
 *         "availability": 1,
 *         "availableSchedule": [
 *           {
 *             "startTime": "09:00",
 *             "endTime": "23:00"
 *           }
 *         ]
 *       },
 *       {
 *         "dayOfWeek": 4,
 *         "availability": 1,
 *         "availableSchedule": [
 *           {
 *             "startTime": "11:00",
 *             "endTime": "12:00"
 *           },
 *           {
 *             "startTime": "13:00",
 *             "endTime": "14:00"
 *           }
 *         ]
 *       },
 *       {
 *         "dayOfWeek": 5,
 *         "availability": 0
 *       },
 *       {
 *         "dayOfWeek": 6,
 *         "availability": 1,
 *         "availableSchedule": [
 *           {
 *             "startTime": "09:00",
 *             "endTime": "21:00"
 *           }
 *         ]
 *       }
 *     ],
 *     "profileImages": [
 *       {
 *         "objectId": "IWWbmGZ0MF",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/dab5244d28ceed6c840a0b7909e4da37_hairlie_image.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/cc5451e9d449223b6e38a367469ca9fe_post_250x250.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/85cea3a429f72f1e4455880745b76b5b_post_600x600.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/ce75047c52f21cade24f42bfd63aad63_post_800x800.jpg"
 *       }
 *     ],
 *     "bookingStats": [
 *       {
 *         "dayOfWeek": 1,
 *         "countRequested": 1,
 *         "countConfirmed": 0
 *       }
 *     ]
 *     "currentWeeklySchedule": [
 *     {
 *       "avatar": null,
 *       "name": "stynickcb1",
 *       "active": true,
 *       "schedules": [
 *         {
 *           "dayOfWeek": 0,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         },
 *         {
 *           "dayOfWeek": 1,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         },
 *         {
 *           "dayOfWeek": 2,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         },
 *         {
 *           "dayOfWeek": 3,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         },
 *         {
 *           "dayOfWeek": 4,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         },
 *         {
 *           "dayOfWeek": 5,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         },
 *         {
 *           "dayOfWeek": 6,
 *           "startAt": "2021-04-18T15:00:00.000Z",
 *           "endAt": "2021-04-18T15:00:00.000Z",
 *           "startSchedule": "2021-04-18T15:00:00.000Z",
 *           "endSchedule": null
 *         }
 *       ],
 *       "objectId": "1iXwGj7KQM"
 *     },
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getStaffsScheduleOfSalonWeekView() {}
