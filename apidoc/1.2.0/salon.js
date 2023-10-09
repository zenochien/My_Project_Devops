/**
 * @api {post} /adminDeleteSalon adminDeleteSalon
 * @apiVersion 1.2.0
 * @apiName adminDeleteSalon
 * @apiGroup Salon 
 * @apiPermission Login Required as Admin 
 * @apiDescription delete a Salon
 * 
 * @apiParam {String} salonId 
 * @apiExample {json} Request example
 * {
 *   "salonId": "salonId"
 * }
 * 
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
function adminDeleteSalon() {}

