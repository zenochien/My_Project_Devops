/**
 * @api {post} /salonSetMaxConfirmedBookingCount salonSetMaxConfirmedBookingCount
 * @apiVersion 1.4.1
 * @apiName salonSetMaxConfirmedBookingCount
 * @apiGroup Salon
 * @apiPermission Required Login as Operator
 *
 * @apiDescription Update maximum confirmed booking count
 *
 * @apiParam {String} stylistId
 * @apiParam {Number} max   
 *
 * @apiExample {json} Request example
 *{
 *  "stylistId": "qOLVDMEuVR",
 *  "max": 10
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
function salonSetMaxConfirmedBookingCount() {}