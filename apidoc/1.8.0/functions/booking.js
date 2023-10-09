/**
 * @api {post} /cancelBookingByCustomer cancelBookingByCustomer
 * @apiVersion 1.8.0
 * @apiName cancelBookingByCustomer
 * @apiGroup Web-Booking
 * @apiPermission Login Required as Customer
 *
 * @apiDescription Cancel booking by customer
 *
 * @apiParam {String} bookingId
 * @apiParam {String} [cancelNote]
 *
 * @apiExample {json} Request example
 * {
 *   "bookingId": "gJQu5XT931"
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
 * @apiSuccess {String}  result.customer.phoneticFullName
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
 * @apiSuccess {Object}  result.serviceDateTime
 * @apiSuccess {String}  result.serviceDateTime.iso
 * @apiSuccess {String}  result.cancelNote
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
 *     "bookingStatus": "CANCELED_CUSTOMER",
 *     "paymentStatus": "SUCCEEDED",
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
 *       "phoneticFullName": "ガナ フリ",
 *       "objectId": "NjF1TX9U79",
 *       "profileImages": [],
 *       "nickName": "duc customer 1"
 *     },
 *     "cardInfo": {
 *        cardId": "9XYZ8KX23S96Y8GHI809H40GD",
 *        cardNumber": "4111**********11",
 *        cardType": "Visa"
 *     },
 *     "totalPrice": 1530,
 *     "totalDuration": 0,
 *     "createdAt": "2020-12-23T09:12:01.964Z",
 *     "serviceDateTime": {
 *       "iso": "2025-10-21T11:35:00.000Z"
 *     },
 *     "cancelNote": "Some reason",
 *     "objectId": "pRalI450An"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse InvalidSessionTokenError
 * @apiUse CancelLateError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function cancelBookingByCustomer() {}

/**
 * @api {post} /cancelBookingByOperator cancelBookingByOperator
 * @apiVersion 1.8.0
 * @apiName cancelBookingByOperator
 * @apiGroup Web-Booking
 * @apiPermission Login Required as Salon operator
 *
 * @apiDescription Cancel booking by salon operator
 *
 * @apiParam {String}  bookingId
 * @apiParam {String} [cancelNote]
 *
 * @apiExample {json} Request example
 * {
 *   "bookingId": "gJQu5XT931",
 *   "cancelNote": "some reason",
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
 * @apiSuccess {String}  result.customer.phoneticFullName
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
 * @apiSuccess {Object}  result.serviceDateTime
 * @apiSuccess {String}  result.serviceDateTime.iso
 * @apiSuccess {String}  result.cancelNote
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
 *     "bookingStatus": "CANCELED_OPERATOR",
 *     "paymentStatus": "CANCELED",
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
 *       "phoneticFullName": "ガナ フリ",
 *       "objectId": "NjF1TX9U79",
 *       "profileImages": [],
 *       "nickName": "duc customer 1"
 *     },
 *     "cardInfo": {
 *        cardId": "9XYZ8KX23S96Y8GHI809H40GD",
 *        cardNumber": "4111**********11",
 *        cardType": "Visa"
 *     },
 *     "totalPrice": 1530,
 *     "totalDuration": 0,
 *     "createdAt": "2020-12-23T09:12:01.964Z",
 *     "serviceDateTime": {
 *       "iso": "2025-10-21T11:35:00.000Z"
 *     },
 *     "cancelNote": "Some reason",
 *     "objectId": "pRalI450An"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse InvalidSessionTokenError
 * @apiUse CancelLateError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function cancelBookingByOperator() {}

/**
 * @api {post} /updateBookingCard updateBookingCard
 * @apiVersion 1.8.0
 * @apiName updateBookingCard
 * @apiGroup Web-Booking
 * @apiPermission Login Required as Customer
 *
 * @apiDescription Update booking's card by customer
 *
 * @apiParam {String} bookingId
 * @apiParam {String} cardId
 *
 * @apiExample {json} Request example
 * {
 *   "bookingId": "gJQu5XT931"
 *   "cardId": "9XYZ8KX23S96Y8GHI809H40GD"
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
 * @apiSuccess {String}  result.customer.phoneticFullName
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
 * @apiSuccess {Object}  result.serviceDateTime
 * @apiSuccess {String}  result.serviceDateTime.iso
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {String}  result.cancelNote
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
 *     "bookingStatus": "CANCELED_CUSTOMER",
 *     "paymentStatus": "SUCCEEDED",
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
 *       "phoneticFullName": "ガナ フリ",
 *       "objectId": "NjF1TX9U79",
 *       "profileImages": [],
 *       "nickName": "duc customer 1"
 *     },
 *     "cardInfo": {
 *        cardId": "9XYZ8KX23S96Y8GHI809H40GD",
 *        cardNumber": "4111**********11",
 *        cardType": "Visa"
 *     },
 *     "totalPrice": 1530,
 *     "totalDuration": 0,
 *     "createdAt": "2020-12-23T09:12:01.964Z",
 *     "serviceDateTime": {
 *       "iso": "2025-10-21T11:35:00.000Z"
 *     },
 *     "objectId": "pRalI450An",
 *     "cancelNote": "some reason",
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function updateBookingCard() {}

/**
 * @api {post} /confirmBooking confirmBooking
 * @apiVersion 1.8.0
 * @apiName confirmBooking
 * @apiGroup Web-Booking
 * @apiPermission Login Required as Salon operator or Stylist
 *
 * @apiDescription Confirm Booking
 *
 * @apiParam {String} bookingId
 * @apiParam {String} [stylistId]
 *
 * @apiExample {json} Request example
 * {
 *   "bookingId": "gJQu5XT931",
 *   "stylistId": "yEbDRqhRb0"
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
 * @apiSuccess {String}  result.customer.phoneticFullName
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
 *     "bookingStatus": "CONFIRMED",
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
 *       "phoneticFullName": "ガナ フリ",
 *       "objectId": "NjF1TX9U79",
 *       "profileImages": [],
 *       "nickName": "duc customer 1"
 *     },
 *     "cardInfo": {
 *        cardId": "9XYZ8KX23S96Y8GHI809H40GD",
 *        cardNumber": "4111**********11",
 *        cardType": "Visa"
 *     },
 *     "totalPrice": 1530,
 *     "totalDuration": 0,
 *     "createdAt": "2020-12-23T09:12:01.964Z",
 *     "serviceDateTime": {
 *       "iso": "2025-10-21T11:35:00.000Z"
 *     },
 *     "cancelNote": "Some reason",
 *     "objectId": "pRalI450An"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function confirmBooking() {}

/**
 * @api {post} /completeBooking completeBooking
 * @apiVersion 1.8.0
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
 * @apiSuccess {String}  result.customer.phoneticFullName
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
 *       "phoneticFullName": "ガナ フリ",
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

/**
 * @api {post} /getBookingDetail getBookingDetail
 * @apiVersion 1.8.0
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
 * @apiSuccess {String}  result.customer.phoneticFullName
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
 * @apiSuccess {Boolean} result.visitedSalon
 * @apiSuccess {String} result.customerNote
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "customerNote": "123",
 *     "visitedSalon": true,
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
 *       "phoneticFullName": "ガナ フリ",
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

/**
 * @api {post} /getBookingList getBookingList
 * @apiVersion 1.8.0
 * @apiName getBookingList
 * @apiGroup Web-Booking
 * @apiPermission Login Required as Salon Operator or Customer
 *
 * @apiDescription Get Booking list
 * Note:
 * - Customer can only see his own bookings
 * - Salon operator can only see salon's bookings
 *
 * @apiParam {Array}  [bookingStatuses]    Accepted values: ['REQUESTED', 'CONFIRMED', 'CANCELED_OPERATOR','CANCELED_STYLIST', 'CANCELED_CUSTOMER', 'CANCELED_WITH_FEE', 'CANCELED_AUTO', 'COMPLETED', 'NOT_ARRIVED']
 * @apiParam {Array}  [paymentStatuses]    Accepted values: ['PENDING', 'CANCELED', 'FAILED', 'SUCCEEDED', 'OTHER']
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} searchKey
 * @apiParam {String} [orderBy]            Order key
 * @apiParam {String} [order]              Order direction ['ascending', 'descending']
 * @apiParam {String} [fromCreatedDate]    Created from YYYY-MM-DD
 * @apiParam {String} [toCreatedDate]      Created to YYYY-MM-DD
 *
 * @apiExample {json} Request example
 * {
 *   "bookingStatuses": ['CANCELED_OPERATOR', 'CANCELED_CUSTOMER', 'CANCELED_WITH_FEE', 'CANCELED_STYLIST', 'CANCELED_AUTO'],
 *   "paymentStatuses": ['FAILED'],
 *   "page": 1,
 *   "limit": 10,
 *   "searchKey": "ducstyle"
 *   "orderBy": "createdAt",
 *   "order": "ascending",
 *   "fromCreatedDate": "2021-03-07"
 *   "toCreatedDate": "2021-05-07"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *       {
 *         "menus": [
 *           {
 *             "amount": 765,
 *             "objectId": "ET4wBn39Dk",
 *             "name": "abc",
 *           },
 *           {
 *             "amount": 765,
 *             "objectId": "iEFYxURrGy",
 *             "name": "bcd",
 *           }
 *         ],
 *         "bookingStatus": "CANCELED_CUSTOMER",
 *         "paymentStatus": "FAILED",
 *         "salon": {
 *           "salonName": "duc salon 1 updated",
 *           "objectId": "rasGad"
 *         },
 *         "stylist": {
 *           "profileImages": [],
 *           "nickName": "duc stylist 1",
 *           "objectId": "Dk0EENPjcU"
 *         },
 *         "customer": {
 *           "objectId": "NjF1TX9U79",
 *           "phoneticFullName": "ガナ フリ",
 *           "profileImages": [],
 *           "nickName": "duc customer 1"
 *         },
 *         "cardId": "123456",
 *         "totalPrice": 246,
 *         "totalDuration": 0,
 *         "createdAt": "2020-12-23T07:55:45.511Z",
 *         "paymentNote": "Paid by cash",
 *         "serviceDateTime": {
 *           "iso": "2025-10-21T11:35:00.000Z"
 *         },
 *         "objectId": "gJQu5XT931",
 *         "cancelNote": "some reason",
 *         "lastBookingStatus": "REQUESTED"
 *       }
 *     ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getBookingList() {}
