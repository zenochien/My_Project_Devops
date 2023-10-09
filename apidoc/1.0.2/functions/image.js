/**
 * @api {post} http://localhost:1337/api/upload/image uploadImage
 * @apiVersion 1.0.0
 * @apiName uploadImage
 * @apiGroup Web-Image
 * @apiPermission Required Login
 * @apiDescription Upload image using **form-data**
 *
 * @apiParam {File} file
 * @apiParam {String} type
 *
 * @apiSuccess {Object}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "type": "SALON",
 *   "file": {
 *     "__type": "File",
 *     "name": "aa386cb82ede7eb54da1d00d0610256f_pngtree520coupleavatarboyavatarlittledinosaurcartooncuteimage_1263411jpg.jpg",
 *     "url": "https://hairlie-dev.s3.amazonaws.com/aa386cb82ede7eb54da1d00d0610256f_pngtree520coupleavatarboyavatarlittledinosaurcartooncuteimage_1263411jpg.jpg"
 *   },
 *   "createdBy": {
 *     "email": "nhansalon@yopmail.com",
 *     "status": "ACTIVE",
 *     "role": "OPERATOR",
 *     "salon": {
 *       "__type": "Pointer",
 *       "className": "Salon",
 *       "objectId": "nyG1k8"
 *     },
 *     "username": "nyG1k8",
 *     "hasSetPassFirstTime": true,
 *     "createdAt": "2020-08-18T03:48:58.333Z",
 *     "updatedAt": "2020-08-18T04:16:20.682Z",
 *     "objectId": "t3VYUBdOcn",
 *   },
 *   "createdAt": "2020-08-18T06:50:24.552Z",
 *   "status": "DELETED",
 *   "updatedAt": "2020-08-18T06:50:24.552Z",
 *   "objectId": "irCJsaayrC"
 * }
 *
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse InvalidSessionTokenError
 * @apiUse LoginRequiredError
 */
function uploadImage() {}
