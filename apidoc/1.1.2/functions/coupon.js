/**
 * @api {post} /getAnnouncements getAnnouncements
 * @apiVersion 1.1.2
 * @apiName getAnnouncements
 * @apiGroup Coupon
 *
 * @apiDescription Get announcement list
 *
 * @apiParam {Number} page
 * @apiParam {Number} limit
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 10
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Number}  result.perPage
 * @apiSuccess {Number}  result.page
 * @apiSuccess {Number}  result.lastPage
 * @apiSuccess {Array}   result.data
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "total": "3",
 *       "perPage": 20,
 *       "page": 1,
 *       "lastPage": 1,
 *       "data": [
 *           {
 *               "id": 344,
 *               "appId": "624472413543498",
 *               "link": "https://www.yahoo.co.jp",
 *               "images": {
 *                   "banner": {
 *                       "small": "https://first.kera.asia/heo/images/12.jpg",
 *                       "large": "https://first.kera.asia/heo/images/15.jpg"
 *                   },
 *                   "announcement": {
 *                       "small": "https://first.kera.asia/bo/images/11.jpg",
 *                       "large": "https://first.kera.asia/bo/images/14.jpg"
 *                   }
 *               },
 *               "status": "ACTIVE",
 *               "createdAt": "2021-12-24T06:41:04.000Z",
 *               "updatedAt": "2021-12-24T06:41:04.000Z",
 *               "coupon": {
 *                   "id": 678,
 *                   "appId": "624472413543498",
 *                   "announcementId": 344,
 *                   "code": "HE002",
 *                   "title": "Mai Test",
 *                   "description": "this is a test coupon",
 *                   "currency": "¥",
 *                   "amount": 1000,
 *                   "quantumUsage": 0,
 *                   "status": "ACTIVE",
 *                   "rules": {
 *                       "min": 2,
 *                       "endIssued": "2021-12-31T14:59:59.999Z",
 *                       "timezone": "Asia/Tokyo",
 *                       "issueCouponNumber": 2,
 *                       "allowServicerIds": null,
 *                       "allowCustomerIds": [
 *                           "KxEBk7e29M"
 *                       ],
 *                       "availableDays": 30,
 *                       "quantumIssue": 10,
 *                       "start": "2021-12-24T14:59:59.999Z"
 *                   },
 *                   "createdAt": "2021-12-24T06:41:04.000Z",
 *                   "updatedAt": "2021-12-24T06:41:04.000Z",
 *                   "type": "Private",
 *                   "quantumIssueUsage": 0
 *               }
 *           }
 *       ]
 *   }
 * }
 * @apiUse ObjectNotFoundError
 */
function getAnnouncements() {}

/**
 * @api {post} /getCoupons getCoupons
 * @apiVersion 1.1.2
 * @apiName getCoupons
 * @apiGroup Coupon
 * @apiPermission Login Required as Customer
 * @apiDescription Get coupon list
 *
 * @apiParam {Number} page
 * @apiParam {Number} limit
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 10
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Number}  result.perPage
 * @apiSuccess {Number}  result.page
 * @apiSuccess {Number}  result.lastPage
 * @apiSuccess {Array}   result.coupons
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "coupons": [
 *           {
 *               "id": 635,
 *               "appId": "624472413543498",
 *               "announcementId": null,
 *               "code": "HAIR1",
 *               "title": "BLACKFRIDAY",
 *               "description": null,
 *               "currency": "¥",
 *               "amount": 200,
 *               "quantumUsage": 0,
 *               "status": "ACTIVE",
 *               "rules": {
 *                   "timezone": "Asia/Tokyo",
 *                   "quantum": 10
 *               },
 *               "createdAt": "2021-11-23T02:34:15.000Z",
 *               "updatedAt": "2021-11-23T02:34:15.000Z",
 *               "type": "Public",
 *               "quantumIssueUsage": 0
 *           }
 *       ],
 *       "total": "3",
 *       "perPage": 20,
 *       "page": 1,
 *       "lastPage": 1
 *   }
 * }
 * @apiUse ObjectNotFoundError
 */
function getCoupons() {}

/**
 * @api {post} /getCouponDetail getCouponDetail
 * @apiVersion 1.1.2
 * @apiName getCouponDetail
 * @apiGroup Coupon
 * @apiPermission Login Required as Customer
 *
 * @apiDescription Get coupon detail
 *
 * @apiParam {Number} couponId
 * 
 * @apiExample {json} Request example
 * {
 *   "couponId": 123
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "id": 682,
 *       "appId": "624472413543498",
 *       "announcementId": 348,
 *       "code": "HUNG1",
 *       "title": "hello",
 *       "description": "hello",
 *       "currency": "¥",
 *       "amount": 1000,
 *       "quantumUsage": 0,
 *       "status": "ACTIVE",
 *       "rules": {
 *           "timezone": "Asia/Tokyo",
 *           "allowCustomerIds": [
 *               "123",
 *               "IndlqNn3h7"
 *           ]
 *       },
 *       "createdAt": "2021-12-26T15:54:04.000Z",
 *       "updatedAt": "2021-12-26T15:55:04.000Z",
 *       "type": "Public",
 *       "quantumIssueUsage": 0,
 *       "announcement": {
 *           "id": 348,
 *           "appId": "624472413543498",
 *           "link": "https://coupon.csp-dev.scrum-dev.com/",
 *           "images": {
 *               "banner": {
 *                   "small": "https://coupon-pf-dev.s3.ap-northeast-1.amazonaws.com/images/announcement/small/1640533942319_vang_sua.jpg",
 *                   "large": "https://coupon-pf-dev.s3.ap-northeast-1.amazonaws.com/images/announcement/large/1640533942319_vang_sua.jpg"
 *               },
 *               "announcement": {
 *                   "small": "https://coupon-pf-dev.s3.ap-northeast-1.amazonaws.com/images/banner/small/1640533951349_vang_chanh.jpg",
 *                   "large": "https://coupon-pf-dev.s3.ap-northeast-1.amazonaws.com/images/banner/large/1640533951349_vang_chanh.jpg"
 *               }
 *           },
 *           "status": "ACTIVE",
 *           "createdAt": "2021-12-26T15:54:04.000Z",
 *           "updatedAt": "2021-12-26T15:54:04.000Z"
 *       }
 *   }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse AlreadyReviewError
 *
 */
function getCouponDetail() {}

/**
 * @api {post} /checkCoupon checkCoupon
 * @apiVersion 1.1.2
 * @apiName checkCoupon
 * @apiGroup Coupon
 *
 * @apiDescription Check coupon
 *
 * @apiExample {json} Request example
 * {
 * "code": "HUNG1",
 * "totalPrice": 10000,
 * "bookingDatetime": "2021-12-30T15:00:00.000Z"
 * }
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "id": 682,
 *       "appId": "624472413543498",
 *       "announcementId": 348,
 *       "code": "HUNG1",
 *       "title": "hello",
 *       "description": "hello",
 *       "currency": "¥",
 *       "amount": 1000,
 *       "quantumUsage": 0,
 *       "status": "ACTIVE",
 *       "rules": {
 *           "timezone": "Asia/Tokyo",
 *           "allowCustomerIds": [
 *               "123",
 *               "IndlqNn3h7"
 *           ],
 *           "start": null,
 *           "min": 3000
 *       },
 *       "createdAt": "2021-12-26T15:54:04.000Z",
 *       "updatedAt": "2021-12-26T16:37:57.000Z",
 *       "type": "Public",
 *       "quantumIssueUsage": 0,
 *       "announcement": {
 *           "id": 348,
 *           "appId": "624472413543498",
 *           "link": "https://coupon.csp-dev.scrum-dev.com/",
 *           "images": {
 *               "banner": {
 *                   "small": "https://coupon-pf-dev.s3.ap-northeast-1.amazonaws.com/images/announcement/small/1640533942319_vang_sua.jpg",
 *                   "large": "https://coupon-pf-dev.s3.ap-northeast-1.amazonaws.com/images/announcement/large/1640533942319_vang_sua.jpg"
 *               },
 *               "announcement": {
 *                   "small": "https://coupon-pf-dev.s3.ap-northeast-1.amazonaws.com/images/banner/small/1640533951349_vang_chanh.jpg",
 *                   "large": "https://coupon-pf-dev.s3.ap-northeast-1.amazonaws.com/images/banner/large/1640533951349_vang_chanh.jpg"
 *               }
 *           },
 *          "status": "ACTIVE",
 *           "createdAt": "2021-12-26T15:54:04.000Z",
 *           "updatedAt": "2021-12-26T15:54:04.000Z"
 *       }
 *   }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse AlreadyReviewError
 *
 */
function checkCoupon() {}
