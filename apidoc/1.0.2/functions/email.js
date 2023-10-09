/**
 * @api {post} /sendEmailTemplate sendEmailTemplate
 * @apiVersion 1.0.0
 * @apiName sendEmailTemplate
 * @apiGroup Web-Email
 *
 * @apiDescription Send email with template to customer
 *
 * @apiParam {String} secretKey
 * @apiParam {String} template
 * @apiParam {String} customerEmail
 * @apiParam {Object} mailData
 * @apiParam {String} mailData.salonName
 * @apiParam {String} mailData.salonNameKatakana
 *
 * @apiExample {json} Request example
 * {
 *   "secretKey": "XXXXX",
 *   "template": "booking-job-soon-customer",
 *   "customerEmail": "duccustomer33@yopmail.com",
 *   "mailData": { "salonName": "abc", "salonNameKatakana": "bca"}
 * }
 *
 * @apiSuccess {Object}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": true
 * }
 *
 */
function sendEmailTemplate() {}
