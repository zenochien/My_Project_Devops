/**
 * @api {post} /getReviewList getReviewList
 * @apiVersion 1.0.6
 * @apiName getReviewList
 * @apiGroup Review
 *
 * @apiDescription Get review list of stylist
 *
 * @apiParam {String} stylistId
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} [order]
 * @apiParam {String} [orderBy]
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "00gcVpm5SD",
 *   "page": 1,
 *   "limit": 10
 * }
 *
 * @apiSuccess {Array}   result
 * @apiSuccess {Object}  result.customer
 * @apiSuccess {String}  result.nickName
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {Number}  result.generalScore
 * @apiSuccess {Number}  result.styleScore
 * @apiSuccess {Number}  result.serviceScore
 * @apiSuccess {String}  result.comment
 * @apiSuccess {String}  result.objectId
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *       {
 *           "customer": {
 *               "nickName": "nickname1",
 *               "objectId": "2ldweNVOt5"
 *           },
 *           "createdAt": "2021-11-04T10:13:49.419Z",
 *           "generalScore": 5,
 *           "styleScore": 3,
 *           "serviceScore": 4,
 *           "comment": "abc",
 *           "objectId": "UuahKT7eav"
 *       },
 *       {
 *           "customer": {
 *               "nickName": "nickname1",
 *               "objectId": "2ldweNVOt5"
 *           },
 *           "createdAt": "2021-11-04T09:39:58.609Z",
 *           "generalScore": 5,
 *           "styleScore": 3,
 *           "serviceScore": 4,
 *           "comment": "abc",
 *           "objectId": "niyxN9fZ2j"
 *       }
 *   ]
 * }
 * @apiUse ObjectNotFoundError
 */
function getReviewList() {}

/**
 * @api {post} /getReviewDetail getReviewDetail
 * @apiVersion 1.0.6
 * @apiName getReviewDetail
 * @apiGroup Review
 *
 * @apiDescription Get review detail
 *
 * @apiParam {String} reviewId
 *
 * @apiExample {json} Request example
 * {
 *   "reviewId": "gKN1XvFA9v"
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Object}  result.customer
 * @apiSuccess {String}  result.nickName
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {Number}  result.generalScore
 * @apiSuccess {Number}  result.styleScore
 * @apiSuccess {Number}  result.serviceScore
 * @apiSuccess {String}  result.comment
 * @apiSuccess {String}  result.objectId
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "customer": {
 *           "nickName": "nickname1",
 *           "objectId": "2ldweNVOt5"
 *       },
 *       "createdAt": "2021-11-04T09:35:42.441Z",
 *       "generalScore": 4,
 *       "styleScore": 2,
 *       "serviceScore": 3,
 *       "comment": "abc",
 *       "objectId": "gKN1XvFA9v"
 *   }
 * }
 * @apiUse ObjectNotFoundError
 */
function getReviewDetail() {}

/**
 * @api {post} /createReview createReview
 * @apiVersion 1.0.6
 * @apiName createReview
 * @apiGroup Review
 * @apiPermission Login Required as Customer
 *
 * @apiDescription Create review
 *
 * @apiExample {json} Request example
 * {
 *   "bookingId": "qGVYExEMYS",
 *   "generalScore": 5,
 *   "styleScore": 3,
 *   "serviceScore": 4,
 *   "comment": "abc"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Object}  result.customer
 * @apiSuccess {String}  result.nickName
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {Number}  result.generalScore
 * @apiSuccess {Number}  result.styleScore
 * @apiSuccess {Number}  result.serviceScore
 * @apiSuccess {String}  result.comment
 * @apiSuccess {String}  result.objectId
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "customer": {
 *           "nickName": "nickname1",
 *           "objectId": "2ldweNVOt5"
 *       },
 *       "createdAt": "2021-11-04T09:35:42.441Z",
 *       "generalScore": 4,
 *       "styleScore": 2,
 *       "serviceScore": 3,
 *       "comment": "abc",
 *       "objectId": "gKN1XvFA9v"
 *   }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse AlreadyReviewError
 *
 */
function createReview() {}

/**
 * @api {post} /checkIsReviewedBooking checkIsReviewedBooking
 * @apiVersion 1.0.6
 * @apiName checkIsReviewedBooking
 * @apiGroup Review
 *
 * @apiDescription Check if Is bookng reviewed
 *
 * @apiExample {json} Request example
 * {
 *   "bookingId": "qGVYExEMYS"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolean}  result.isReviewed
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "isReviewed": true
 *   }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse AlreadyReviewError
 *
 */
function checkIsReviewedBooking() {}
