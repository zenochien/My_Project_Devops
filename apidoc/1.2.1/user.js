/**
 * @api {post} http://localhost:1337/verifyEmail verifyEmail
 * @apiVersion 1.2.1
 * @apiName verifyEmail
 * @apiGroup User
 * @apiDescription verify email
 *
 * @apiParam {String} token
 * @apiParam {String} username
 *
 * @apiExample {json} Request example
 * {
 *   "token": "token",
 *   "username": "username"
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
function verifyEmail() {}