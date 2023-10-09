/**
 * @api {post} /getPayoutDetailBookinsByAdmin getPayoutDetailBookinsByAdmin
 * @apiVersion 1.8.0
 * @apiName getPayoutDetailBookinsByAdmin
 * @apiGroup Payout
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Payout List
 *
 * @apiParam {String} earningId
 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 *
 * @apiExample {json} Request example
 *  {
 *    "earningId": "cl3axnda4001v0uum63kl2an3"
 *    "limit": 10
 *    "page": 1
 *  }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {String}  result.list.objectId
 * @apiSuccess {Object}  result.list.stylist
 * @apiSuccess {String}  result.list.stylist.objectId
 * @apiSuccess {String}  result.list.stylist.name
 * @apiSuccess {Array}   result.list.stylist.profileImages
 * @apiSuccess {String}  result.list.stylist.profileImages.objectId
 * @apiSuccess {String}  result.list.stylist.profileImages.file
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbSmall
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbMedium
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbLarge
 * @apiSuccess {Object}  result.list.payoutInfo
 * @apiSuccess {Number}  result.list.payoutInfo.totalPrice
 * @apiSuccess {Number}  result.list.payoutInfo.commission
 * @apiSuccess {Number}  result.list.payoutInfo.subtotal
 *
 * @apiSuccessExample {json} Response example
 * {
 *    "result": {
 *        total: 1
 *       "list": [
 *           {
 *               "objectId": "zzuQK67g9O",
 *               "stylist": {
 *                   "objectId": "t6n0ulmU2Q",
 *                   "fullName": "Hau Stylist",
 *                   "profileImages": [
 *                                 {
 *                                     "objectId": "dYZsWto7Go",
 *                                     "file": "https://hairlie-dev.s3.amazonaws.com/99955a24b341ab7f5a863d742e9d9166_hairlie_image.jpg",
 *                                     "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/2a0018d4f953396b3c810a3f1ba465f8_post_250x250.jpg",
 *                                     "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/7bc41ddab10c8aa071ff0a2229a5917c_post_600x600.jpg",
 *                                     "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/c77b69318e88c0a0b1d9a95417151b6b_post_800x800.jpg"
 *                                 }
 *                             ],
 *               },
 *               "payoutInfo": {
 *                   "totalPrice": 1000,
 *                   "subtotal": 800,
 *                   "commission": 200,
 *               }
 *               "serviceDateTime": "2021-11-18T10:30:00.000Z",
 *               "paymentDate": "2021-11-18T08:55:23.723Z",
 *               "bookingStatusExtend": "COMPLETED"
 *           }
 *       ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getPayoutDetailBookinsByAdmin() {}
