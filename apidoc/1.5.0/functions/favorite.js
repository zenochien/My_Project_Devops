/**
 * @api {post} /favoriteStylist favoriteStylist
 * @apiVersion 1.5.0
 * @apiName favoriteStylist
 * @apiGroup Favorite-Stylist
 *
 * @apiDescription customer favorite a stylist
 * @apiPermission Required Login as Customer
 *
 * @apiParam {String} [stylistId]
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "qiODa9eq"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.status
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "status": "success"
 *    }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 */
function favoriteStylist() {}

/**
 * @api {post} /unfavoriteStylist unfavoriteStylist
 * @apiVersion 1.5.0
 * @apiName unfavoriteStylist
 * @apiGroup Favorite-Stylist
 *
 * @apiDescription customer can unfavorite a stylist
 * @apiPermission Required Login as Customer
 *
 * @apiParam {String} [stylistId]
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "qiODa9eq"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.status
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "status": "success"
 *    }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 */
function unfavoriteStylist() {}

/**
 * @api {post} /getFavoritedStylistsByCustomer getFavoritedStylistsByCustomer
 * @apiVersion 1.5.0
 * @apiName getFavoritedStylistsByCustomer
 * @apiGroup Favorite-Stylist
 * @apiPermission Login Required as Customer
 *
 * @apiDescription get Favorited Stylists By Customer
 *
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} [order]   Order direction ['ascending', 'descending']
 * @apiParam {String} [orderBy] Order key
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 10
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {String}  result.list.createdAt
 * @apiSuccess {Object}  result.list.salon
 * @apiSuccess {String}  result.list.salon.objectId
 * @apiSuccess {String}  result.list.salon.salonNameKatakana
 * @apiSuccess {String}  result.list.salon.salonName
 * @apiSuccess {Object}  result.list.stylist
 * @apiSuccess {Array}   result.list.stylist.profileImages
 * @apiSuccess {String}  result.list.stylist.profileImages.objectId
 * @apiSuccess {String}  result.list.stylist.profileImages.file
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbLarge
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbMedium
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbSmall
 * @apiSuccess {String}  result.list.stylist.fullName
 * @apiSuccess {String}  result.list.stylist.nickName
 * @apiSuccess {String}  result.list.stylist.objectId
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "list": [
 *           {
 *               "stylist": {
 *                   "objectId": "VvCs40kZrL",
 *                   "fullName": "llll ffff",
 *                   "nickName": "choPPer13",
 *                   "profileImages": []
 *               },
 *               "salon": {
 *                   "objectId": "ukuHSc",
 *                   "salonName": "luf8_Yakissi",
 *                   "salonNameKatakana": "サロン名のフリガナ jangurKatakana"
 *               },
 *               "createdAt": "2022-04-12T23:02:59.306Z"
 *           }
 *      ],
 *       "total": 1
 *  }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getFavoritedStylistsByCustomer() {}
