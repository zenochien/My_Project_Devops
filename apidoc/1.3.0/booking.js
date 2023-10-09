/**
 * @api {post} /completeBooking completeBooking
 * @apiVersion 1.3.0
 * @apiName completeBooking
 * @apiGroup Web-Booking
 * @apiPermission Login Required as Salon operator or Stylist
 *
 * @apiDescription Complete Booking
 *
 * @apiParam {String}  bookingId
 * @apiParam {Boolean} [isWithPayment]    Default is true
 * @apiParam {Boolean} [isArrived]        Default is true
 * @apiParam {String}  [paymentNote]      Required if isWithPayment is false
 * @apiParam {Array}   [newMenus]            Provided if changed
 *
 * @apiExample {json} Request example
 * {
 *   "bookingId": "gJQu5XT931",
 *   "isWithPayment": false,
 *   "isArrived": true,
 *   "paymentNote": "Paid by cash",
 *   "newMenus": [
 *       {
 *           "id": "pxKA6JGEEL",
 *           "isNew": false
 *       },
 *       {
 *           "id": "mqMJj1HVdf",
 *           "isNew": true,
 *           "newPrice": 400000,
 *           "memo": "hello"
 *       }
 *   ]
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.menus
 * @apiSuccess {Number}  result.menus.amount
 * @apiSuccess {String}  result.menus.objectId
 * @apiSuccess {String}  result.menus.name
 * @apiSuccess {String}  result.bookingStatus
 * @apiSuccess {String}  result.paymentStatus
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.salonName
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {Object}  result.stylist
 * @apiSuccess {Array}   result.stylist.profileImages
 * @apiSuccess {String}  result.stylist.profileImages.objectId
 * @apiSuccess {String}  result.stylist.profileImages.file
 * @apiSuccess {String}  result.stylist.profileImages.thumbSmall
 * @apiSuccess {String}  result.stylist.profileImages.thumbMedium
 * @apiSuccess {String}  result.stylist.profileImages.thumbLarge
 * @apiSuccess {String}  result.stylist.nickName
 * @apiSuccess {String}  result.stylist.objectId
 * @apiSuccess {Object}  result.customer
 * @apiSuccess {String}  result.customer.objectId
 * @apiSuccess {Array}   result.customer.profileImages
 * @apiSuccess {String}  result.customer.profileImages.objectId
 * @apiSuccess {String}  result.customer.profileImages.file
 * @apiSuccess {String}  result.customer.profileImages.thumbSmall
 * @apiSuccess {String}  result.customer.profileImages.thumbMedium
 * @apiSuccess {String}  result.customer.profileImages.thumbLarge
 * @apiSuccess {String}  result.customer.nickName
 * @apiSuccess {Object}  result.cardInfo
 * @apiSuccess {String}  result.cardInfo.cardId
 * @apiSuccess {String}  result.cardInfo.cardNumber
 * @apiSuccess {String}  result.cardInfo.cardType
 * @apiSuccess {Number}  result.totalPrice
 * @apiSuccess {Number}  result.totalDuration
 * @apiSuccess {String}  result.paymentNote
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {Object}  result.serviceDateTime
 * @apiSuccess {String}  result.serviceDateTime.iso
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "menus": [
 *       {
 *         "amount": 765,
 *         "objectId": "ET4wBn39Dk",
 *         "name": "abc",
 *       },
 *       {
 *         "amount": 765,
 *         "objectId": "iEFYxURrGy",
 *         "name": "bcd",
 *       }
 *     ],
 *     "bookingStatus": "COMPLETED",
 *     "paymentStatus": "OTHER",
 *     "salon": {
 *       "salonName": "Salon Minh giao 2",
 *       "objectId": "fvtTXE"
 *     },
 *     "stylist": {
 *       "profileImages": [
 *         {
 *           "objectId": "8LMYHzXTVc",
 *           "file": "https://hairlie-dev.s3.amazonaws.com/7a847528c2a1988229b1422c975b2d0a_hairlie_image.jpg",
 *           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/93d629a2e438f640b3b278934634eb73_stylist_250x250.jpg",
 *           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/6d439f8c1c825eb3072ad1dd067381fd_stylist_600x600.jpg",
 *           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/1abdf09bafed6beaed128926a14232fd_stylist_800x800.jpg"
 *         },
 *         {
 *           "objectId": "9Zd3Vl2pWm",
 *           "file": "https://hairlie-dev.s3.amazonaws.com/e8bed3efc91001620a173554d1e8385f_hairlie_image.jpg",
 *           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/17345eea6e4dc4e032414baea4048e09_stylist_250x250.jpg",
 *           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/f9fe05c05b0a360ae92889bb7f7346de_stylist_600x600.jpg",
 *           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/d6d7fbb9275178211df2fff0124d6d20_stylist_800x800.jpg"
 *         }
 *       ],
 *       "nickName": "Happy Ms",
 *       "objectId": "yEbDRqhRb0"
 *     },
 *     "customer": {
 *       "objectId": "NjF1TX9U79",
 *       "profileImages": [],
 *       "nickName": "duc customer 1"
 *     },
 *     "cardInfo": {
 *        "cardId": "9XYZ8KX23S96Y8GHI809H40GD",
 *        "cardNumber": "4111**********11",
 *        "cardType": "Visa"
 *     },
 *     "totalPrice": 1530,
 *     "paymentNote": "Paid by cash"
 *     "totalDuration": 0,
 *     "createdAt": "2020-12-23T09:12:01.964Z",
 *     "serviceDateTime": {
 *       "iso": "2025-10-21T11:35:00.000Z"
 *     },
 *     "objectId": "pRalI450An"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse InvalidSessionTokenError
 * @apiUse CompleteBookingEarlyError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 *
 * @apiErrorExample {json} Menus not found
 * {
 *   "code": 101,
 *   "error": "{\"errorMenuIds\":[\"OypykobDD3\"],\"message\":\"削除されたメニューです。他のメニューを選択してください。\"}"
 * }
 *
 */
function completeBooking() {}