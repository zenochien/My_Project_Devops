/**
 * @api {post} /getHashtagList getHashtagList
 * @apiVersion 2.1.0
 * @apiName getHashtagList
 * @apiGroup Web-HashTag
 * @apiPermission Publish
 * @apiParam {Array} [platform]               List of platform ['mobile', 'web']
 * @apiParam {string} [status]
 * @apiExample {json} Request example
 * {
 *   "platform": ["web"]
 * }
 *
 * @apiDescription Get HashTag List
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {Array}   result.list.image
 * @apiSuccess {String}  result.list.image.objectId
 * @apiSuccess {String}  result.list.image.file
 * @apiSuccess {String}  result.list.image.thumbLarge
 * @apiSuccess {String}  result.list.image.thumbMedium
 * @apiSuccess {String}  result.list.image.thumbSmall
 * @apiSuccess {Array}   result.list.platform
 * @apiSuccess {String}  result.list.name
 * @apiSuccess {String}  result.list.createdAt
 * @apiSuccess {String}  result.list.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *        {
 *          "image": {
 *              "objectId": "t8Wel7ensH",
 *              "file": "https://hairlie-dev.s3.amazonaws.com/5af545a64fd57b21bdf5da718a78bccf_hairlie_image.png",
 *              "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/fc39a468b8d04f97ad532fa670bd7dc5_banner_250x250.jpg",
 *              "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/835f17d59318d107addf6a4b87f6f215_banner_600x600.jpg",
 *              "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/38ef0e875ca2f3ac9876f291d473664a_banner_800x800.jpg"
 *          },
 *          "createdAt": "2022-03-15T03:54:06.165Z",
 *          "objectId": "2pXAH75cUA",
 *          "name": "カラー",
 *          "platform": ["web"]
 *        }
 *      ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getHashtagList() {}
