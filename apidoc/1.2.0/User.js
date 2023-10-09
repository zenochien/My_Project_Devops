/**
 * @api {post} /getDeletingAccountReason getDeletingAccountReason
 * @apiVersion 1.2.0
 * @apiName getDeletingAccountReason
 * @apiGroup User
 * @apiDescription get reason list
 *
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}  result.reasons
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "reasons": [
 *           {
 *               "id": "ZCLUDQTM9X",
 *               "text": "予約が入らなかった",
 *               "hasExtraInput": false
 *           },
 *           {
 *               "id": "d6o5tJN8Tr",
 *               "text": "手数料が高かった",
 *               "hasExtraInput": false
 *           },
 *       ]
 *   }
 * }
 * @apiUse ObjectNotFoundError
 */
function getIncompleteBooking() {}