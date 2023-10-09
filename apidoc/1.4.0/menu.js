/**
 * @api {post} /assignMenusToStylist assignMenusToStylist
 * @apiVersion 1.0.0
 * @apiName assignMenusToStylist
 * @apiGroup Web-Menu
 * @apiPermission Required Login as SALON_OPERATOR
 *
 * @apiDescription Update a menu item given correct role
 *
 * @apiParam {String} stylistId
 * @apiParam {Array}  [menuIds]    Stylist Ids to assign menu
 *
 * @apiExample {json} Request example
 *{
 *  "stylistId": "qOLVDMEuVR",
 *  "menuIds": ["VB83u80Jmb","gGXEWcRyFG", "gO1pHaGjNL"]
 *}
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolean} result.success
 *
 * @apiSuccessExample {json} Response example
 * {
 *    "result": {
 *      "success": true,
 *    }
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse UnassignMenuError
 */
function assignMenusToStylist() {}
