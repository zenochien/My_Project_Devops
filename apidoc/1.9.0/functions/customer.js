/**
 * @api {post} /getCardBlockedStatus getCardBlockedStatus
 * @apiVersion 1.9.0
 * @apiName getCardBlockedStatus
 * @apiGroup Customer
 * @apiPermission Login Required as Customer
 * @apiDescription Get Card Blocked Status by customer
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Boolean}  result.isBlocked
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "isBlocked": false
 *   }
 * }
 * @apiUse ObjectNotFoundError
 */
function getCardBlockedStatus() {}

/**
 * @api {post} /updateCardBlockedInfo updateCardBlockedInfo
 * @apiVersion 1.9.0
 * @apiName updateCardBlockedInfo
 * @apiGroup Customer
 * @apiPermission Login Required as Customer
 * @apiDescription Get update card blocked info by customer
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Boolean}  result.isBlocked
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "success": true
 *       "isBlocked": false
 *   }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse CustomerAddCardBlocked
 */
function updateCardBlockedInfo() {}
