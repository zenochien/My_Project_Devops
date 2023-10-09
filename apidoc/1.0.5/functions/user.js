/**
 * @api {post} http://localhost:1337/api/logout logout
 * @apiVersion 1.0.5
 * @apiName logout
 * @apiGroup Web-User
 * @apiPermission Login Required
 *
 * @apiDescription Logout user
 *
 * @apiSuccess {Boolean}  result
 *
 * @apiSuccessExample {json} Response example
 *
 * {}
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse LoginRequiredError
 */
function logout() {}
