/**
 * @api {post} /getBannerList getBannerList
 * @apiVersion 1.4.0
 * @apiName getBannerList
 * @apiGroup Web-Banner
 * @apiPermission Publish
 *
 * @apiDescription Get Banner List
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
 * @apiSuccess {String}  result.list.createdAt
 * @apiSuccess {String}  result.list.status
 * @apiSuccess {Number}  result.list.sortOrder
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
 *          "status": "PUBLISHED",
 *          "sortOrder": 0
 *        }
 *      ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getBannerList() {}

/**
 * @api {post} /createBanner createBanner
 * @apiVersion 1.4.0
 * @apiName createBanner
 * @apiGroup Web-Banner
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Create Banner
 *
 *
 * @apiParam {String} imageId
 * @apiParam {Number} [sortOrder]
 * @apiParam {String} [status]  Banner status: PUBLISHED || UNPUBISHED
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.image
 * @apiSuccess {String}  result.image.objectId
 * @apiSuccess {String}  result.image.file
 * @apiSuccess {String}  result.image.thumbLarge
 * @apiSuccess {String}  result.image.thumbMedium
 * @apiSuccess {String}  result.image.thumbSmall
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.status
 * @apiSuccess {Number}  result.sortOrder
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "sortOrder": 1,
 *      "status": "PUBLISHED",
 *      "image": {
 *          "objectId": "t8Wel7ensH",
 *          "file": "https://hairlie-dev.s3.amazonaws.com/5af545a64fd57b21bdf5da718a78bccf_hairlie_image.png",
 *          "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/fc39a468b8d04f97ad532fa670bd7dc5_banner_250x250.jpg",
 *          "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/835f17d59318d107addf6a4b87f6f215_banner_600x600.jpg",
 *          "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/38ef0e875ca2f3ac9876f291d473664a_banner_800x800.jpg"
 *      },
 *      "createdAt": "2022-03-15T10:02:31.756Z",
 *      "objectId": "MeWPuNd9E3"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function createBanner() {}

/**
 * @api {post} /updateBanner updateBanner
 * @apiVersion 1.4.0
 * @apiName updateBanner
 * @apiGroup Web-Banner
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Update Banner
 *
 *
 * @apiParam {String} id  Banner Id
 * @apiParam {String} [imageId]
 * @apiParam {Number} [sortOrder]
 * @apiParam {String} [status]  Banner status: PUBLISHED || UNPUBISHED
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.image
 * @apiSuccess {String}  result.image.objectId
 * @apiSuccess {String}  result.image.file
 * @apiSuccess {String}  result.image.thumbLarge
 * @apiSuccess {String}  result.image.thumbMedium
 * @apiSuccess {String}  result.image.thumbSmall
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.status
 * @apiSuccess {Number}  result.sortOrder
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "sortOrder": 1,
 *      "status": "PUBLISHED",
 *      "image": {
 *          "objectId": "t8Wel7ensH",
 *          "file": "https://hairlie-dev.s3.amazonaws.com/5af545a64fd57b21bdf5da718a78bccf_hairlie_image.png",
 *          "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/fc39a468b8d04f97ad532fa670bd7dc5_banner_250x250.jpg",
 *          "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/835f17d59318d107addf6a4b87f6f215_banner_600x600.jpg",
 *          "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/38ef0e875ca2f3ac9876f291d473664a_banner_800x800.jpg"
 *      },
 *      "createdAt": "2022-03-15T10:02:31.756Z",
 *      "objectId": "MeWPuNd9E3"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function updateBanner() {}
