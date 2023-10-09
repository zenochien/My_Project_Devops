/**
 * @api {post} /getBookingList getBookingList
 * @apiVersion 1.0.4
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
