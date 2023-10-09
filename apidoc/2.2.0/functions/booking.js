/**
 * @api {post} /getBookingListByAdmin getBookingListByAdmin
 * @apiVersion 2.2.0
 * @apiName getBookingListByAdmin
 * @apiGroup Web-Booking
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Booking list

 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 * @apiParam {String} [searchKey]            Search field: ['bookingId', 'customer.fullName', 'salon.salonName', 'stylist.fullName'],
 * @apiParam {String} [orderBy]            Order key
 * @apiParam {String} [order]              Order direction ['ascending', 'descending']
 * @apiParam {String} [fromCreatedDate]    Created from YYYY-MM-DD
 * @apiParam {String} [toCreatedDate]      Created to YYYY-MM-DD
 * @apiParam {String} [fromServiceDateTime]
 * @apiParam {String} [toServiceDateTime]
 * @apiParam {Array}  [bookingStatusExtends]  Accepted values: ['REQUESTED', 'CONFIRMED', 'REQUESTED_CANCELED_OPERATOR', 'REQUESTED_CANCELED_CUSTOMER', 'REQUESTED_CANCELED_STYLIST', 'CONFIRMED_CANCELED_OPERATOR', 'CONFIRMED_CANCELED_CUSTOMER', 'CONFIRMED_CANCELED_STYLIST', 'CANCELED_WITH_FEE', 'CANCELED_AUTO', 'COMPLETED', 'NOT_ARRIVED']
 * @apiParam {Array}  [bookingStatuses]    Accepted values: ['REQUESTED', 'CONFIRMED', 'CANCELED_OPERATOR','CANCELED_STYLIST', 'CANCELED_CUSTOMER', 'CANCELED_WITH_FEE', 'CANCELED_AUTO', 'COMPLETED', 'NOT_ARRIVED']
 * @apiParam {Array}  [paymentStatuses]    Accepted values: ['PENDING', 'CANCELED', 'FAILED', 'SUCCEEDED', 'OTHER']
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 10,
 *   "searchKey": "ducstyle"
 *   "orderBy": "createdAt",
 *   "order": "ascending",
 *   "fromCreatedDate": "2021-03-07"
 *   "toCreatedDate": "2021-05-07"
 *   "fromServiceDateTime": "2022-03-10",
 *   "toServiceDateTime": "2022-03-10",
 *   "bookingStatusExtends": ["CONFIRMED_CANCELED_OPERATOR", "REQUESTED_CANCELED_CUSTOMER"]
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "total": 2,
 *       "list": [
 *           {
 *               "serviceDateTime": "2021-11-17T00:30:00.000Z",
 *               "bookingStatus": "CANCELED_CUSTOMER",
 *               "paymentStatus": "CANCELED",
 *               "salon": {
 *                   "salonName": "Nha Salon",
 *                   "createdAt": "2020-08-26T07:18:57.564Z",
 *                   "updatedAt": "2021-11-22T06:40:39.310Z",
 *                   "salonAddress3": "Shibuya",
 *                   "salonImage": {
 *                       "objectId": "GTZofcctbW",
 *                       "file": "https://hairlie-dev.s3.amazonaws.com/8f09df1062069cf36e08046a164eadb4_hairlie_image.jpg",
 *                       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/c24ce4e8f2985fba929f4722d3fbf963_salon_250x250.jpg",
 *                       "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/2b547436f7786a02fdf9d839b01a5efd_salon_600x600.jpg",
 *                       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/94c14f1e8f0193b0f0e147ebf6dff8bd_salon_800x800.jpg"
 *                    },
 *                   "salonAddress4": "1234",
 *                   "objectId": "LYYVe2",
 *               },
 *               "stylist": {
 *                   "createdAt": "2021-08-13T11:24:20.338Z",
 *                   "updatedAt": "2021-11-29T04:11:24.912Z",
 *                   "profileImages": [
 *                       {
 *                           "objectId": "epTTu35s5x",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/2eeae46839cbacc86c0e08f49dc15697_hairlie_image.jpg",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/01da258223a7416cc72a4d64673eb62c_post_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/cac2efd888a46934f644c9512cac5fc2_post_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/8222f55a36f518aee3b2a48b994e478a_post_800x800.jpg"
 *                       },
 *                       {
 *                           "objectId": "F174xDOm0c",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/120ac3dc862caf7feed2a4f4e9153807_hairlie_image.jpg",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/48e2b8229d62b954a021b76ef40de0df_post_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/3eb918e00a77805aa313c0743cb3dbdf_post_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/a2e694bc9773e94aea3fc751007af3d3_post_800x800.jpg"
 *                       }
 *                   ],
 *                   "fullName": "Stylist1 Nha",
 *                   "nickName": "nhastylist",
 *                   "objectId": "PIiYHEc6pS",
 *               },
 *               "customer": {
 *                   "createdAt": "2021-11-15T06:25:32.744Z",
 *                   "updatedAt": "2021-11-15T08:32:22.776Z",
 *                   "fullName": "ヘアリー ちゃん",
 *                   "nickName": "ヘアリーちゃん",
 *                   "phoneticFullName": "ヘアリー チャン",
 *                   "objectId": "SBpUg9Fdr9",
 *               },
 *               "totalPrice": 3000,
 *               "totalDuration": 180,
 *               "createdAt": "2021-11-15T08:32:25.745Z",
 *               "cancelNote": null,
 *               "originalPrice": 3000,
 *               "bookingStatusExtend": "REQUESTED_CANCELED_CUSTOMER",
 *               "objectId": "zwdxnA924e"
 *           },
 *           {
 *               "serviceDateTime": "2021-07-20T21:00:00.000Z",
 *               "bookingStatus": "CANCELED_OPERATOR",
 *               "paymentStatus": "CANCELED",
 *               "salon": {
 *                   "salonName": "Aube Hair",
 *                   "createdAt": "2020-10-13T10:19:15.278Z",
 *                   "updatedAt": "2021-09-22T07:11:17.896Z",
 *                   "salonAddress3": "ga",
 *                   "salonImage": {
 *                       "__type": "Pointer",
 *                       "className": "Image",
 *                       "objectId": "Z1pQCHPGqw"
 *                   },
 *                   "salonAddress4": "Ggfg",
 *                   "objectId": "GrWysf",
 *               },
 *               "stylist": {
 *                   "createdAt": "2021-03-10T02:18:24.748Z",
 *                   "updatedAt": "2021-08-26T02:27:56.688Z",
 *                   "profileImages": [
 *                       {
 *                           "objectId": "DwfsXlYqNj",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/6bdfa720fdb3a6f345310c648d7e6232_hairlie_image.jpg",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/c2bedb5656b57828afadbc6c0b1e447a_post_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/ca4b8d46e6124759b35c597c190bd149_post_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/f70791dcb63edadb767db53d1ad3e6b4_post_800x800.jpg"
 *                       },
 *                       {
 *                           "objectId": "hwyXaV1WJ2",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/8f5776de80db61362385fed9308341bd_hairlie_image.jpg",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/a55aca0b23ea1df2a89bbb3021a31040_post_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/04a6754e826b2d72d5cd3e4ecb88ca23_post_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/fc6c745ade11697176aeccda4ed0ed52_post_800x800.jpg"
 *                       }
 *                   ],
 *                   "fullName": "new 2 new new 2 new",
 *                   "nickName": "23424234gf",
 *                   "objectId": "wlTUQ4i7UD",
 *                   "className": "Stylist"
 *               },
 *               "customer": {
 *                   "createdAt": "2021-01-07T14:15:32.213Z",
 *                   "updatedAt": "2021-10-25T07:58:00.626Z",
 *                   "fullName": "hoang tien",
 *                   "nickName": "hoang tien",
 *                   "phoneticFullName": "フリガ フリガナ",
 *                   "profileImages": [
 *                       {
 *                           "objectId": "H2uRbx48XZ",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/4122d417a21fbd57a37675d83aacb0de_hairlie_image.jpg",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/4ebfe62488c413ae330212714ef7e033_customer_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/324ae06ce5a9d65220ff783ebbb3ef90_customer_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/2095bd541ed340432b67ea770337772e_customer_800x800.jpg"
 *                       }
 *                   ],
 *                   "objectId": "R3X0lEY09q",
 *                   "className": "Customer"
 *               },
 *               "totalPrice": 4554554,
 *               "totalDuration": 180,
 *               "createdAt": "2021-07-19T02:26:19.553Z",
 *               "originalPrice": 4554554,
 *               "bookingStatusExtend": "CONFIRMED_CANCELED_OPERATOR",
 *               "objectId": "zyzi06WwGh"
 *           }
 *       ]
 *
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getBookingListByAdmin() {}
