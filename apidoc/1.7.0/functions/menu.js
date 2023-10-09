/**
 * @api {post} /getMenuItemDetail getMenuItemDetail
 * @apiVersion 1.7.0
 * @apiName getMenuItemDetail
 * @apiGroup Web-Menu
 *
 * @apiDescription Get details of menu
 *
 * @apiParam {String} menuId ObjectId of menu
 *
 * @apiExample {json} Request example
 * {
 *   "menuId": "VB83u80Jmb"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.name
 * @apiSuccess {Number}  result.amount
 * @apiSuccess {Number}  result.duration
 * @apiSuccess {String}  result.description
 * @apiSuccess {Object}  result.category
 * @apiSuccess {String}  result.category.name
 * @apiSuccess {String}  result.category.objectId
 * @apiSuccess {String}  result.category.status
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {String}  result.status
 * @apiSuccess {Array}   result.assignedStylistIds
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {Boolean} result.inPublishedPost
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "name": "nhan menu 03",
 *     "amount": 100,
 *     "duration": 600,
 *     "description": "description",
 *     "category": {
 *       "name": "cate-3",
 *       "objectId": "FFQzTk8anu",
 *       "status": "PUBLISHED"
 *     },
 *     "salon": {
 *       "objectId": "nyG1k8"
 *     },
 *     "status": "PUBLISHED",
 *     "assignedStylistIds": [
 *       "qOLVDMEuVR",
 *       "RFLlqGJ4gd",
 *       "eI1sUdrIc5"
 *     ],
 *     "createdAt": "2020-09-01T10:08:29.389Z",
 *     "objectId": "VB83u80Jmb"
 *     "inPublishedPost": true
 *   }
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse InvalidParamsError
 */
function getMenuItemDetail() {}

/**
 * @api {post} /removeMenu removeMenu
 * @apiVersion 1.7.0
 * @apiName removeMenu
 * @apiGroup Web-Menu
 * @apiPermission Login Required as Salon Operator
 *
 * @apiDescription Remove salon's menu
 *
 * @apiParam {String} menuId
 * @apiParam {Boolean} [forceDelete]
 *
 * @apiExample {json} Request example
 * {
 *   "menuId": "Bad8mjyUGm"
 * }
 *
 * @apiSuccess {Boolean}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": true
 * }
 *
 * @apiUse DeleteMenuInPublishedPost
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function removeMenu() {}
