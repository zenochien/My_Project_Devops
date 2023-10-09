/**
 * @api {post} /getStylistListForPressPost getStylistListForPressPost
 * @apiVersion 2.5.0
 * @apiName getStylistListForPressPost
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Admin
 * @apiDescription Get Stylist List
 *
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} [orderBy]  Order key
 * @apiParam {String} [order]  Order direction ['ascending', 'descending']
 * @apiParam {String} [searchKey]
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 10,
 *   "orderBy": "createdAt",
 *   "order": "ascending",
 *   "searchKey": "nhan",
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {String}  result.list.createdAt
 * @apiSuccess {Object}  result.list.salon
 * @apiSuccess {String}  result.list.salon.objectId
 * @apiSuccess {String}  result.list.salon.salonName
 * @apiSuccess {Array}   result.list.profileImages
 * @apiSuccess {String}  result.list.profileImages.objectId
 * @apiSuccess {String}  result.list.profileImages.file
 * @apiSuccess {String}  result.list.profileImages.thumbLarge
 * @apiSuccess {String}  result.list.profileImages.thumbMedium
 * @apiSuccess {String}  result.list.profileImages.thumbSmall
 * @apiSuccess {String}  result.list.fullName
 * @apiSuccess {Number}  result.list.totalPressPost
 * @apiSuccess {String}  result.list.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *    "result": {
 *       "total": 2,
 *       "list": [
 *           {
 *               "createdAt": "2022-03-25T08:56:47.366Z",
 *               "salon": {
 *                   "salonName": "Luf17",
 *                   "objectId": "IXryO6"
 *               },
 *               "profileImages": [],
 *               "fullName": "Dang Hung Dang",
 *               "objectId": "iB4BWbLAhJ"
 *           },
 *           {
 *               "createdAt": "2022-03-25T08:55:42.522Z",
 *               "salon": {
 *                   "salonName": "Luf17",
 *                   "objectId": "IXryO6"
 *               },
 *               "profileImages": [],
 *               "fullName": "fsa fá",
 *               "objectId": "mkZF6AJ0CW"
 *               "totalPressPost": 1
 *           }
 *       ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse ErrorExample
 */
function getStylistListForPressPost() {}
