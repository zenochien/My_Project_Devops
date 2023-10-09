/**
 * @api {post} /addCard addCard
 * @apiVersion 1.0.3
 * @apiName addCard
 * @apiGroup Web-Customer
 * @apiPermission Login Required as CUSTOMER
 *
 * @apiDescription Add card
 *
 * @apiParam {String} cardToken
 * @apiParam {String} [cardHolderName]      Empty string if not provided
 *
 * @apiExample {json} Request example
 * {
 *   "cardToken": "999811f3-8baa-4c01-8e35-1acfa08d576c",
 *   "cardHolderName": "Duc Tran"
 * }
 *
 *
 * @apiSuccess {Array}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *     {
 *       "cardId": "CT8ZI9B29LQ16D27RRTSIEQFX",
 *       "cardNumber": "411111********11",
 *       "cardExpire": "05/25",
 *       "cardType": "Visa",
 *       "isDefault": true,
 *       "cardHolderName": "Duc Tran"
 *     }
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function addCard() {}
