/**
 * @api {post} /getIncompleteBooking getIncompleteBooking
 * @apiVersion 1.2.0
 * @apiName getIncompleteBooking
 * @apiGroup Booking
 * @apiPermission Login Required as Customer or Stylist
 * @apiDescription get incomplete Booking
 *
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.incompleteBooking
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "incompleteBooking": 12
 *   }
 * }
 * @apiUse ObjectNotFoundError
 */
function getIncompleteBooking() {}

/**
 * @api {post} /getBookingDetail getBookingDetail
 * @apiVersion 1.2.0
 * @apiName getBookingDetail
 * @apiGroup Web-Booking
 * @apiPermission Login Required as Salon Operator or Customer
 *
 * @apiDescription Get booking detail
 * Note:
 * - Customer can only see his own bookings
 * - Salon operator can only see salon's bookings
 *
 * @apiParam {String} bookingId
 *
 * @apiExample {json} Request example
 * {
 *   "bookingId": "Bad8mjyUGm"
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
 * @apiSuccess {String}  result.customer.birthDate
 * @apiSuccess {String}  result.customer.phone
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
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.paymentNote
 * @apiSuccess {Object}  result.serviceDateTime
 * @apiSuccess {String}  result.serviceDateTime.iso
 * @apiSuccess {String}  result.lastBookingStatus
 * @apiSuccess {Array}   result.cardStatuses
 * @apiSuccess {String}  result.cardStatuses.status
 * @apiSuccess {String}  result.cardStatuses.createdAt
 * @apiSuccess {String}  result.cardStatuses.cardId
 * @apiSuccess {String}  result.cancelNote
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {Object}  result.review
 * @apiSuccess {String}  result.review.createdAt
 * @apiSuccess {Number}  result.review.generalScore
 * @apiSuccess {Number}  result.review.styleScore
 * @apiSuccess {Number}  result.review.serviceScore
 * @apiSuccess {String}  result.review.comment
 * @apiSuccess {String}  result.review.objectId
 * @apiSuccess {Object}  result.coupon
 * @apiSuccess {String}  result.coupon.couponCode
 * @apiSuccess {Object}  result.coupon.transaction
 * @apiSuccess {Number}  result.coupon.transaction.couponAmount
 * @apiSuccess {String}  result.coupon.transaction.status
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "coupon": {
 *      "couponCode": "HUNG2",
 *      "transaction": {
 *          "couponAmount": 1000,
 *              "status": "USED"
 *          }
 *     },
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
 *     "bookingStatus": "REQUESTED",
 *     "paymentStatus": "PENDING",
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
 *       "birthDate": "2001/11/09",
 *       "phone": "2384927342",
 *       "nickName": "duc customer 1"
 *     },
 *     "cardInfo": {
 *        cardId": "9XYZ8KX23S96Y8GHI809H40GD",
 *        cardNumber": "4111**********11",
 *        cardType": "Visa"
 *     },
 *     "totalPrice": 1530,
 *     "totalDuration": 0,
 *     "paymentNote": "Paid by cash",
 *     "createdAt": "2020-12-23T09:12:01.964Z",
 *     "serviceDateTime": {
 *       "iso": "2025-10-21T11:35:00.000Z"
 *     },
 *     "objectId": "pRalI450An",
 *     "cancelNote": "some reason",
 *
 *     "lastBookingStatus": "REQUESTED",
 *     "cardStatuses": [
 *       {
 *         "status": "SUCCEEDED",
 *         "createdAt": "2021-01-20T09:38:34.841Z",
 *         "cardId": "A5KLJXNB7IEAA94CF65NM8BQ5"
 *       },
 *       {
 *         "status": "FAILED",
 *         "createdAt": "2021-01-20T09:33:11.075Z",
 *         "cardId": "3P7XR2WXEF80OKMFOR9ORRDP"
 *       }
 *     ],
 *     "review": {
 *       "createdAt": "2021-11-15T10:32:48.349Z",
 *       "generalScore": 5,
 *       "styleScore": 3,
 *       "serviceScore": 4,
 *       "comment": "abc",
 *       "updatedAt": "2021-11-15T10:32:48.349Z",
 *       "objectId": "VRhA45VU7p"
 *     },
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getBookingDetail() {}
