/**
 * @api {post} /stylistRemoveCoupon stylistRemoveCoupon
 * @apiVersion 1.2.1
 * @apiName stylistRemoveCoupon
 * @apiGroup Booking
 * @apiPermission Login Required as Stylist
 * @apiDescription remove coupon from booking
 *
 * @apiParam {String} bookingId
 *
 * @apiExample {json} Request example
 * {
 *   "bookingId": "bookingId"
 * }
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.status
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "status": "success"
 *   }
 * }
 * @apiUse ObjectNotFoundError
 */
function stylistRemoveCoupon() {}

/**
 * @api {post} /operatorRemoveCoupon operatorRemoveCoupon
 * @apiVersion 1.2.1
 * @apiName operatorRemoveCoupon
 * @apiGroup Booking
 * @apiPermission Login Required as Operator
 * @apiDescription remove coupon from booking
 *
 * @apiParam {String} bookingId
 *
 * @apiExample {json} Request example
 * {
 *   "bookingId": "bookingId"
 * }
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.status
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "status": "success"
 *   }
 * }
 * @apiUse ObjectNotFoundError
 */
function operatorRemoveCoupon() {}