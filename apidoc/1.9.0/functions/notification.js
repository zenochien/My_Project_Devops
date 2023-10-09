/**
 * @api {post} /markAllNotificationsAsReadByCustomer markAllNotificationsAsReadByCustomer
 * @apiVersion 1.9.0
 * @apiName markAllNotificationsAsReadByCustomer
 * @apiGroup Notification
 * @apiPermission Login Required as Customer
 *
 * @apiDescription Mark All Notifications As Read By Customer
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Boolean}  result.success
 * @apiSuccessExample {json} Response example
 *{
 *   "result": {
 *       "success": true
 *	 }
 *}
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse MarkAllNotificationsNotFound
 */
function markAllNotificationsAsReadByCustomer() {}

/**
 * @api {post} /markAllNotificationsAsReadByStylist markAllNotificationsAsReadByStylist
 * @apiVersion 1.9.0
 * @apiName markAllNotificationsAsReadByStylist
 * @apiGroup Notification
 * @apiPermission Login Required as Stylist
 *
 * @apiDescription Mark All Notifications As Read By Stylist
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Boolean}  result.success
 * @apiSuccessExample {json} Response example
 *{
 *   "result": {
 *       "success": true
 *	 }
 *}
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse MarkAllNotificationsNotFound
 */
function markAllNotificationsAsReadByStylist() {}
