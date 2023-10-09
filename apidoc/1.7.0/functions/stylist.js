/**
 * @api {post} /assignMenus assignMenus
 * @apiVersion 1.7.0
 * @apiName assignMenus
 * @apiGroup Web-Menu
 * @apiPermission Required Login as STYLIST
 *
 * @apiDescription Assign or unassign menus for a stylist
 *
 * @apiParam {Array} menuIds   Menu id array
 * @apiParam {Boolean} isForceUpdate    Default is false
 *
 * @apiExample {json} Request example
 *  {
 *    "menuIds": ["meGa7myA2t"],
 *    "isForceUpdate": false,
 *  }
 *
 * @apiSuccess {Array}  result
 * @apiSuccess {String}  result.name
 * @apiSuccess {Number}  result.amount
 * @apiSuccess {Number}  result.duration
 * @apiSuccess {String}  result.description
 * @apiSuccess {Object}  result.category
 * @apiSuccess {String}  result.category.name
 * @apiSuccess {String}  result.category.objectId
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {String}  result.status
 * @apiSuccess {Array}   result.assignedStylistIds
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *  {
 *     "name": "nhan menu 03",
 *     "amount": 100,
 *     "duration": 600,
 *     "description": "description",
 *     "category": {
 *       "name": "cate-3",
 *       "objectId": "FFQzTk8anu"
 *     },
 *     "salon": {
 *       "objectId": "nyG1k8"
 *     },
 *     "status": "PUBLISHED",
 *     "assignedStylistIds": [],
 *     "createdAt": "2020-09-01T10:08:29.389Z",
 *     "objectId": "VB83u80Jmb"
 *   }
 *  ]
 * }
 *
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse DuplicateValueError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse UnassignMenuInPublishedPost
 */
function assignMenus() {}
