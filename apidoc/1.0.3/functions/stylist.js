/**
 * @api {post} /getStylistAvailableSlots getStylistAvailableSlots
 * @apiVersion 1.0.3
 * @apiName getStylistAvailableSlots
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Salon Operator or Customer
 *
 * @apiDescription Get available slots
 *
 * @apiParam {String} stylistId        objectId of stylist
 * @apiParam {String} dateTime         ISOString. Regex /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:00.000([+-][0-2]\d:[0-5]\d|Z)$/
 * @apiParam {Number} totalDuration    min: 30
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "1iXwGj7KQM",
 *   "dateTime": "2021-01-21T18:35:00.000Z",
 *   "totalDuration": 120
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.availableSlots
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "availableSlots": [
 *       "08:30",
 *       "09:30",
 *       "10:30",
 *       "11:30"
 *     ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getStylistAvailableSlots() {}
