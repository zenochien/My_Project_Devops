/**
 * @api {post} /getStylistUnavailableDaysOfMonth getStylistUnavailableDaysOfMonth
 * @apiVersion 1.0.5
 * @apiName getStylistUnavailableDaysOfMonth
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Customer or Stylist
 *
 * @apiDescription Get unavailable days of a month (from the later between today or startMonth, until the end of month)
 *
 * @apiParam {String} stylistId        objectId of stylist
 * @apiParam {String} dateTime         Only month and year are accounted. ISOString. Regex /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:00.000([+-][0-2]\d:[0-5]\d|Z)$/
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "1iXwGj7KQM",
 *   "dateTime": "2021-01-21T18:35:00.000Z"
 * }
 *
 * @apiSuccess {Array}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *       "2021-06-11",
 *       "2021-06-13",
 *       "2021-06-14",
 *       "2021-06-15",
 *       "2021-06-16",
 *       "2021-06-18",
 *       "2021-06-20",
 *       "2021-06-21",
 *       "2021-06-22",
 *       "2021-06-23",
 *       "2021-06-25",
 *       "2021-06-27",
 *       "2021-06-28",
 *       "2021-06-30"
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getStylistUnavailableDaysOfMonth() {}

/**
 * @api {post} /assignMenus assignMenus
 * @apiVersion 1.0.5
 * @apiName assignMenus
 * @apiGroup Web-Stylist
 * @apiPermission Required Login as STYLIST
 *
 * @apiDescription Assign or unassign menus for a stylist
 *
 * @apiParam {Array}   menuIds          Menu id array
 * @apiParam {Boolean} isForceUpdate    Default is false
 *
 * @apiExample {json} Request example
 * {
 *   "menuIds": ["meGa7myA2t"],
 *   "isForceUpdate": false,
 * }
 *
 * @apiSuccess {Array}  result
 * @apiSuccess {String}  result.name
 * @apiSuccess {Number}  result.amount
 * @apiSuccess {Number}  result.duration
 * @apiSuccess {String}  result.description
 * @apiSuccess {Object}  result.category
 * @apiSuccess {String}  result.category.name
 * @apiSuccess {String}  result.category.objectId
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {String}  result.status
 * @apiSuccess {Array}   result.assignedStylistIds
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *  {
 *     "name": "nhan menu 03",
 *     "amount": 100,
 *     "duration": 600,
 *     "description": "description",
 *     "category": {
 *       "name": "cate-3",
 *       "objectId": "FFQzTk8anu"
 *     },
 *     "salon": {
 *       "objectId": "nyG1k8"
 *     },
 *     "status": "PUBLISHED",
 *     "assignedStylistIds": [],
 *     "createdAt": "2020-09-01T10:08:29.389Z",
 *     "objectId": "VB83u80Jmb"
 *   }
 *  ]
 * }
 *
 * @apiErrorExample {json} UnassignMenuError example
 * {
 *   "code": 9517,
 *   "error": "[{\"_id\":\"b2z3ySiesK\",\"postIds\":[\"83Z3BDMRMp\",\"e5SNE1IoKO\",\"XRCUEr676Q\",\"aRYPLbp4ve\",\"6LCHsBYuVV\",\"M1uWwFpmEb\"],\"menuName\":\"duc menu\"},{\"_id\":\"Y2nx4qZ3Im\",\"postIds\":[\"pUaCaoUUGC\",\"QZioHOsINY\",\"ZsBVtCWoVS\",\"83Z3BDMRMp\",\"XRCUEr676Q\",\"7mjOuZUB5P\",\"k9XiRhVCsg\",\"vs5toLbn9f\",\"3Fe5YqVaBM\",\"Zi8NMbx48N\"],\"menuName\":\"duc menu 2\"}]"
 * }
 *
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse DuplicateValueError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse UnassignMenuError
 */
function assignMenus() {}

/**
 * @api {post} /getStylistScheduleMonthView getStylistScheduleMonthView
 * @apiVersion 1.0.5
 * @apiName getStylistScheduleMonthView
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Stylist
 *
 * @apiDescription Get stylist's schedule of a month
 *
 * @apiParam {String} date                  YYYY-MM-DD
 *
 * @apiExample {json} Request example
 * {
 *   "date": "2021-01-21"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {String}  result.name
 * @apiSuccess {Array}   result.sumSchedule
 * @apiSuccess {String}  result.sumSchedule.date
 * @apiSuccess {Array}   result.sumSchedule.availableSchedule
 * @apiSuccess {String}  result.sumSchedule.availableSchedule.startTime
 * @apiSuccess {String}  result.sumSchedule.availableSchedule.endTime
 * @apiSuccess {Array}   result.sumSchedule.unavailableSchedule
 * @apiSuccess {String}  result.sumSchedule.unavailableSchedule.startTime
 * @apiSuccess {String}  result.sumSchedule.unavailableSchedule.endTime
 * @apiSuccess {Boolean} result.sumSchedule.isClosingDate
 * @apiSuccess {Boolean} result.sumSchedule.isSalonClosedDate
 * @apiSuccess {Array}   result.bookings
 * @apiSuccess {Array}   result.bookings.menus
 * @apiSuccess {Number}  result.bookings.menus.amount
 * @apiSuccess {String}  result.bookings.menus.objectId
 * @apiSuccess {String}  result.bookings.menus.name
 * @apiSuccess {String}  result.bookings.bookingStatus
 * @apiSuccess {String}  result.bookings.paymentStatus
 * @apiSuccess {Object}  result.bookings.salon
 * @apiSuccess {String}  result.bookings.salon.salonName
 * @apiSuccess {String}  result.bookings.salon.objectId
 * @apiSuccess {Object}  result.bookings.stylist
 * @apiSuccess {Array}   result.bookings.stylist.profileImages
 * @apiSuccess {String}  result.bookings.stylist.profileImages.objectId
 * @apiSuccess {String}  result.bookings.stylist.profileImages.file
 * @apiSuccess {String}  result.bookings.stylist.profileImages.thumbSmall
 * @apiSuccess {String}  result.bookings.stylist.profileImages.thumbMedium
 * @apiSuccess {String}  result.bookings.stylist.profileImages.thumbLarge
 * @apiSuccess {String}  result.bookings.stylist.nickName
 * @apiSuccess {String}  result.bookings.stylist.objectId
 * @apiSuccess {Object}  result.bookings.customer
 * @apiSuccess {String}  result.bookings.customer.objectId
 * @apiSuccess {Array}   result.bookings.customer.profileImages
 * @apiSuccess {String}  result.bookings.customer.profileImages.objectId
 * @apiSuccess {String}  result.bookings.customer.profileImages.file
 * @apiSuccess {String}  result.bookings.customer.profileImages.thumbSmall
 * @apiSuccess {String}  result.bookings.customer.profileImages.thumbMedium
 * @apiSuccess {String}  result.bookings.customer.profileImages.thumbLarge
 * @apiSuccess {String}  result.bookings.customer.nickName
 * @apiSuccess {Object}  result.bookings.cardInfo
 * @apiSuccess {String}  result.bookings.cardInfo.cardId
 * @apiSuccess {String}  result.bookings.cardInfo.cardNumber
 * @apiSuccess {String}  result.bookings.cardInfo.cardType
 * @apiSuccess {Number}  result.bookings.totalPrice
 * @apiSuccess {Number}  result.bookings.totalDuration
 * @apiSuccess {String}  result.bookings.createdAt
 * @apiSuccess {String}  result.bookings.paymentNote
 * @apiSuccess {Object}  result.bookings.serviceDateTime
 * @apiSuccess {String}  result.bookings.serviceDateTime.iso
 * @apiSuccess {String}  result.bookings.lastBookingStatus
 * @apiSuccess {Array}   result.bookings.cardStatuses
 * @apiSuccess {String}  result.bookings.cardStatuses.status
 * @apiSuccess {String}  result.bookings.cardStatuses.createdAt
 * @apiSuccess {String}  result.bookings.cardStatuses.cardId
 * @apiSuccess {String}  result.bookings.cancelNote
 * @apiSuccess {String}  result.bookings.objectId
 * @apiSuccess {Object}  result.salonScheduleStartEnd
 * @apiSuccess {String}  result.salonScheduleStartEnd.startTime
 * @apiSuccess {String}  result.salonScheduleStartEnd.endTime
 * @apiSuccess {Array}   result.currentWeeklySchedule
 * @apiSuccess {Number}  result.currentWeeklySchedule.dayOfWeek            (0: for Sunday)
 * @apiSuccess {String}  result.currentWeeklySchedule.startAt
 * @apiSuccess {Number}  result.currentWeeklySchedule.endAt
 * @apiSuccess {Number}  result.currentWeeklySchedule.startSchedule
 * @apiSuccess {Number}  result.currentWeeklySchedule.endSchedule
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "objectId": "yado8wUZKt",
 *     "avatar": null,
 *     "name": "chopper53",
 *     "active": true,
 *     "sumSchedule": [
 *       {
 *         "date": "2021-10-27",
 *         "availableSchedule": [
 *           {
 *             "startTime": "09:00",
 *             "endTime": "16:00"
 *           },
 *           {
 *             "startTime": "16:30",
 *             "endTime": "23:30"
 *           }
 *         ],
 *         "unavailableSchedule": []
 *       },
 *       {
 *         "date": "2021-10-28",
 *         "availableSchedule": [
 *           {
 *             "startTime": "09:00",
 *             "endTime": "23:30"
 *           }
 *         ],
 *         "unavailableSchedule": []
 *       },
 *       {
 *         "date": "2021-10-29",
 *         "isClosingDate": true
 *       },
 *       {
 *         "date": "2021-10-30",
 *         "availableSchedule": [
 *           {
 *             "startTime": "09:00",
 *             "endTime": "21:00"
 *           }
 *         ],
 *         "unavailableSchedule": [
 *           {
 *             "startTime": "21:00",
 *             "endTime": "23:30"
 *           }
 *         ]
 *       },
 *       {
 *         "date": "2021-10-31",
 *         "isSalonClosedDate": true
 *       }
 *     ],
 *     "bookings": [
 *       {
 *         "menus": [
 *           {
 *             "name": "Menu 13 YiJi",
 *             "amount": 1600,
 *             "duration": 30,
 *             "objectId": "pxKA6JGEEL"
 *           }
 *         ],
 *         "serviceDateTime": {
 *           "iso": "2021-10-27T10:30:00.000Z"
 *         },
 *         "cardInfo": {
 *           "cardId": "AT8OL2AFF1TH2J72CV0S74J0T",
 *           "cardNumber": "4111**********11",
 *           "cardType": "Visa"
 *         },
 *         "actionLogs": [],
 *         "bookingStatus": "REQUESTED",
 *         "paymentStatus": "PENDING",
 *         "salon": {
 *           "salonName": "Luf11_kahara-を獲得🐧🐸🐣🐽🐷🐼🐹🐶🐱-",
 *           "slug": "luf11kahara-wo",
 *           "objectId": "WagDmw"
 *         },
 *         "stylist": {
 *           "profileImages": [
 *             {
 *               "objectId": "QMaRFexj6I",
 *               "file": "https://hairlie-dev.s3.amazonaws.com/bf1631c88ea184b4dc184f057a2b80ff_hairlie_image.jpg",
 *               "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/9f35209866a078e1868fe1335e793899_stylist_250x250.jpg",
 *               "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/d8964ef3c714244f4fc8c7b0167c16f1_stylist_600x600.jpg",
 *               "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/2aede164e3a18b41a26a471471887657_stylist_800x800.jpg"
 *             },
 *             {
 *               "objectId": "EOD7JAto50",
 *               "file": "https://hairlie-dev.s3.amazonaws.com/04a238ba7e4f2ef8a7a27afee49cd4ac_hairlie_image.jpg",
 *               "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/702cf5f98259bc3a667087aceb09c194_post_250x250.jpg",
 *               "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/0cc7540abe4137547d2cbc895f6afd5b_post_600x600.jpg",
 *               "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/9abdb8282484adfc6949b947bcf31aa0_post_800x800.jpg"
 *             }
 *           ],
 *           "nickName": "chopper53",
 *           "slug": "chopper53",
 *           "objectId": "yado8wUZKt"
 *         },
 *         "customer": {
 *           "gender": "男性",
 *           "nickName": "nickname3",
 *           "profileImages": [
 *             {
 *               "objectId": "x3sfK8HrBl",
 *               "file": "https://hairlie-dev.s3.amazonaws.com/411dde87b8d6e026c305f6a762821e1d_hairlie_image.jpg",
 *               "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/fb09a61ee6ab30ca97991bf6d7a771f5_customer_250x250.jpg",
 *               "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/7ea449570422966bebf991a99ec322ca_customer_600x600.jpg",
 *               "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/3f6d4f369974efac40c547096cf71533_customer_800x800.jpg"
 *             }
 *           ],
 *           "objectId": "2ldweNVOt5"
 *         },
 *         "totalPrice": 1600,
 *         "totalDuration": 30,
 *         "createdAt": "2021-10-27T09:25:41.067Z",
 *         "objectId": "MDZIjHylMH"
 *         }
 *       ],
 *       "salonScheduleStartEnd": {
 *         "startTime": "00:00",
 *         "endTime": "23:30"
 *       },
 *       "currentWeeklySchedule": [
 *       {
 *         "dayOfWeek": 0,
 *         "startAt": "2021-10-26T15:00:00.000Z",
 *         "endAt": "2021-10-26T15:00:00.000Z",
 *         "startSchedule": "2021-10-26T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 1,
 *         "startAt": "2021-10-26T15:00:00.000Z",
 *         "endAt": "2021-10-27T14:30:00.000Z",
 *         "startSchedule": "2021-10-26T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 2,
 *         "startAt": "2021-10-26T15:00:00.000Z",
 *         "endAt": "2021-10-26T15:00:00.000Z",
 *         "startSchedule": "2021-10-26T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 3,
 *         "startAt": "2021-10-27T00:00:00.000Z",
 *         "endAt": "2021-10-27T14:30:00.000Z",
 *         "startSchedule": "2021-10-26T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 4,
 *         "startAt": "2021-10-27T00:00:00.000Z",
 *         "endAt": "2021-10-27T14:30:00.000Z",
 *         "startSchedule": "2021-10-26T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 5,
 *         "startAt": "2021-10-27T00:00:00.000Z",
 *         "endAt": "2021-10-27T14:30:00.000Z",
 *         "startSchedule": "2021-10-26T15:00:00.000Z",
 *         "endSchedule": null
 *       },
 *       {
 *         "dayOfWeek": 6,
 *         "startAt": "2021-10-27T00:00:00.000Z",
 *         "endAt": "2021-10-27T12:00:00.000Z",
 *         "startSchedule": "2021-10-26T15:00:00.000Z",
 *         "endSchedule": null
 *       }
 *     ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getStylistScheduleMonthView() {}
