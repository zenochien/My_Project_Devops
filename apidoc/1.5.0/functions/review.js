/**
 * @api {post} /getReviewListByAdmin getReviewListByAdmin
 * @apiVersion 1.5.0
 * @apiName getReviewListByAdmin
 * @apiGroup Review
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get review list of stylist
 *
 * @apiParam {String} [searchKey]
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} [order] Order direction ['ascending', 'descending']
 * @apiParam {String} [orderBy] Order key
 *
 * @apiExample {json} Request example
 * {
 *   "searchKey": "str",
 *   "page": 1,
 *   "limit": 10
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {String}  result.list.createdAt
 * @apiSuccess {Number}  result.list.generalScore
 * @apiSuccess {Number}  result.list.styleScore
 * @apiSuccess {Number}  result.list.serviceScore
 * @apiSuccess {String}  result.list.comment
 * @apiSuccess {Object}  result.list.customer
 * @apiSuccess {Array}  result.list.customer.profileImages
 * @apiSuccess {String}  result.list.customer.profileImages.objectId
 * @apiSuccess {String}  result.list.customer.profileImages.file
 * @apiSuccess {String}  result.list.customer.profileImages.thumbLarge
 * @apiSuccess {String}  result.list.customer.profileImages.thumbMedium
 * @apiSuccess {String}  result.list.customer.profileImages.thumbSmall
 * @apiSuccess {String}  result.list.customer.fullName
 * @apiSuccess {String}  result.list.customer.nickName
 * @apiSuccess {String}  result.list.customer.objectId
 * @apiSuccess {Object}  result.list.salon
 * @apiSuccess {String}  result.list.salon.salonNameKatakana
 * @apiSuccess {String}  result.list.salon.salonName
 * @apiSuccess {Object}  result.list.stylist
 * @apiSuccess {Array}  result.list.stylist.profileImages
 * @apiSuccess {String}  result.list.stylist.profileImages.objectId
 * @apiSuccess {String}  result.list.stylist.profileImages.file
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbLarge
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbMedium
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbSmall
 * @apiSuccess {String}  result.list.stylist.fullName
 * @apiSuccess {String}  result.list.stylist.nickName
 * @apiSuccess {String}  result.list.stylist.objectId
 * @apiSuccess {String}  result.list.objectId
 * @apiSuccessExample {json} Response example
 *{
 *   "result": {
 *       "total": 1,
 *       "list": [
 *           {
 *               "generalScore": 5,
 *               "styleScore": 4,
 *               "serviceScore": 3,
 *               "comment": "5-4-3",
 *               "customer": {
 *                  "profileImages": "array",
 *                   "fullName": "string",
 *                   "nickName": "string",
 *                   "objectId": "string"
 *               },
 *               "salon": {
 *                   "salonNameKatakana": "string",
 *                   "salonName": "string"
 *               },
 *               "stylist": {
 *                   "profileImages": "array",
 *                   "fullName": "string",
 *                   "nickName": "string",
 *                   "objectId": "string"
 *               },
 *               "objectId": "zT5X8WuCut",
 *               "createdAt": "2021-11-19T06:44:44.970Z"
 *           }
 *       ]
 *   }
 *}
 * @apiUse ObjectNotFoundError
 */
function getReviewListByAdmin() {}
/*
 * @api {post} /deleteReview deleteReview
 * @apiVersion 1.5.0
 * @apiName deleteReview
 * @apiGroup Review
 * @apiPermission Login Required as admin
 *
 * @apiDescription Delete Review
 *
 * @apiParam {String} reviewId
 *
 * @apiExample {json} Request example
 * {
 *   "reviewId": "zT5X8WuCut"
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Boolane}  result.success
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *           "success": true,
 *    }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse LoginRequiredError
 */
function deleteReview() {}
