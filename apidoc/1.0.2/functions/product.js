/**
 * @api {post} /getProductDetail getProductDetail
 * @apiVersion 1.0.0
 * @apiName getProductDetail
 * @apiGroup Web-Product
 *
 * @apiDescription Get product detail
 * Note:
 * - Anonymous user can see all published product
 * - SALON can only see their product
 *
 *
 * @apiParam {String} productId          objectId of Stylist
 *
 * @apiExample {json} Request example
 * {
 *   "productId": "Bad8mjyUGm"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {Object}  result.images
 * @apiSuccess {String}  result.images.objectId
 * @apiSuccess {String}  result.images.file
 * @apiSuccess {String}  result.images.thumbLarge
 * @apiSuccess {String}  result.images.thumbMedium
 * @apiSuccess {String}  result.images.thumbSmall
 * @apiSuccess {String}  result.status
 * @apiSuccess {String}  result.name
 * @apiSuccess {Number}  result.price
 * @apiSuccess {String}  result.type
 * @apiSuccess {String}  result.description
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {String}  result.url
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "images": [
 *       {
 *         "objectId": "uIlJHBYiwg",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/8454245a7b545b1ec97f27db6d106957_pngtree520coupleavatarboyavatarlittledinosaurcartooncuteimage_1263411jpg.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/0a49a7ec62b8276616e700a16f8e7030_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/d5a5549e7f4d931d9381ec1bc1ca09e9_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/9ce567284064dac0f1c4e6a0a18739bc_salon_250x250.jpg"
 *       }
 *     ],
 *     "salon": {
 *       "objectId": "JaiFcZ"
 *     },
 *     "status": "PUBLISHED",
 *     "name": "nhan product",
 *     "price": 1200,
 *     "type": "USER",
 *     "description": "this is des",
 *     "url": "https://www.facebook.com",
 *     "createdAt": "2020-08-20T07:58:32.748Z",
 *     "objectId": "Bad8mjyUGm"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getProductDetail() {}

/**
 * @api {post} /createProduct createProduct
 * @apiVersion 1.0.0
 * @apiName createProduct
 * @apiGroup Web-Product
 * @apiPermission Login Required as Salon Operator
 *
 * @apiDescription Create new product
 *
 * @apiParam {String} name
 * @apiParam {Number} price
 * @apiParam {String} type        One of 2 types [USER, SALON]
 * @apiParam {String} [description]
 * @apiParam {String} [url]
 * @apiParam {Array}  [images]    objectIds of Image. Max: 3 images
 *
 * @apiExample {json} Request example
 * {
 *   "images": ["uIlJHBYiwg"],
 *   "name": "nhan product",
 *   "type": "USER",
 *   "price": 200,
 *   "description": "this is des",
 *   "url": "https://www.facebook.com"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {Object}  result.images
 * @apiSuccess {String}  result.images.objectId
 * @apiSuccess {String}  result.images.file
 * @apiSuccess {String}  result.images.thumbLarge
 * @apiSuccess {String}  result.images.thumbMedium
 * @apiSuccess {String}  result.images.thumbSmall
 * @apiSuccess {String}  result.status
 * @apiSuccess {String}  result.name
 * @apiSuccess {Number}  result.price
 * @apiSuccess {String}  result.type
 * @apiSuccess {String}  result.description
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {String}  result.url
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "images": [
 *       {
 *         "objectId": "uIlJHBYiwg",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/8454245a7b545b1ec97f27db6d106957_pngtree520coupleavatarboyavatarlittledinosaurcartooncuteimage_1263411jpg.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/0a49a7ec62b8276616e700a16f8e7030_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/d5a5549e7f4d931d9381ec1bc1ca09e9_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/9ce567284064dac0f1c4e6a0a18739bc_salon_250x250.jpg"
 *       }
 *     ],
 *     "salon": {
 *       "objectId": "JaiFcZ"
 *     },
 *     "status": "PUBLISHED",
 *     "name": "nhan product",
 *     "price": 1200,
 *     "type": "USER",
 *     "description": "this is des",
 *     "url": "https://www.facebook.com",
 *     "createdAt": "2020-08-20T07:58:32.748Z",
 *     "objectId": "Bad8mjyUGm"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function createProduct() {}

/**
 * @api {post} /updateProduct updateProduct
 * @apiVersion 1.0.0
 * @apiName updateProduct
 * @apiGroup Web-Product
 * @apiPermission Login Required as Salon Operator
 *
 * @apiDescription Update salon's product
 *
 * @apiParam {String} productId
 * @apiParam {String} [name]
 * @apiParam {Number} [price]
 * @apiParam {String} [type]      One of 2 types [USER, SALON]
 * @apiParam {String} [description]
 * @apiParam {String} [url]
 * @apiParam {Array}  [images]    objectIds of Image. Max: 3 images
 *
 * @apiExample {json} Request example
 * {
 *   "productId": "Bad8mjyUGm",
 *   "images": ["uIlJHBYiwg"],
 *   "name": "nhan product",
 *   "type": "USER",
 *   "price": 200,
 *   "description": "this is des",
 *   "url": "https://www.facebook.com"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {Object}  result.images
 * @apiSuccess {String}  result.images.objectId
 * @apiSuccess {String}  result.images.file
 * @apiSuccess {String}  result.images.thumbLarge
 * @apiSuccess {String}  result.images.thumbMedium
 * @apiSuccess {String}  result.images.thumbSmall
 * @apiSuccess {String}  result.status
 * @apiSuccess {String}  result.name
 * @apiSuccess {String}  result.type
 * @apiSuccess {Number}  result.price
 * @apiSuccess {String}  result.description
 * @apiSuccess {String}  result.url
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "images": [
 *       {
 *         "objectId": "uIlJHBYiwg",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/8454245a7b545b1ec97f27db6d106957_pngtree520coupleavatarboyavatarlittledinosaurcartooncuteimage_1263411jpg.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/0a49a7ec62b8276616e700a16f8e7030_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/d5a5549e7f4d931d9381ec1bc1ca09e9_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/9ce567284064dac0f1c4e6a0a18739bc_salon_250x250.jpg"
 *       }
 *     ],
 *     "salon": {
 *       "objectId": "JaiFcZ"
 *     },
 *     "status": "PUBLISHED",
 *     "name": "nhan product",
 *     "type": "USER",
 *     "price": 1200,
 *     "description": "this is des",
 *     "url": "https://www.facebook.com",
 *     "createdAt": "2020-08-20T07:58:32.748Z",
 *     "objectId": "Bad8mjyUGm"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function updateProduct() {}

/**
 * @api {post} /removeProduct removeProduct
 * @apiVersion 1.0.0
 * @apiName removeProduct
 * @apiGroup Web-Product
 * @apiPermission Login Required as Salon Operator
 *
 * @apiDescription Remove salon's product
 *
 * @apiParam {String} productId
 *
 * @apiExample {json} Request example
 * {
 *   "productId": "Bad8mjyUGm"
 * }
 *
 * @apiSuccess {Boolean}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": true
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function removeProduct() {}

/**
 * @api {post} /changeProductPublishStatus changeProductPublishStatus
 * @apiVersion 1.0.0
 * @apiName changeProductPublishStatus
 * @apiGroup Web-Product
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Change publish status of product
 *
 * @apiParam {String} productId
 *
 * @apiExample {json} Request example
 * {
 *   "productId": "Bad8mjyUGm"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {Object}  result.images
 * @apiSuccess {String}  result.images.objectId
 * @apiSuccess {String}  result.images.file
 * @apiSuccess {String}  result.images.thumbLarge
 * @apiSuccess {String}  result.images.thumbMedium
 * @apiSuccess {String}  result.images.thumbSmall
 * @apiSuccess {String}  result.status
 * @apiSuccess {String}  result.name
 * @apiSuccess {String}  result.type
 * @apiSuccess {Number}  result.price
 * @apiSuccess {String}  result.description
 * @apiSuccess {String}  result.url
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "images": [
 *       {
 *         "objectId": "uIlJHBYiwg",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/8454245a7b545b1ec97f27db6d106957_pngtree520coupleavatarboyavatarlittledinosaurcartooncuteimage_1263411jpg.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/0a49a7ec62b8276616e700a16f8e7030_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/d5a5549e7f4d931d9381ec1bc1ca09e9_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/9ce567284064dac0f1c4e6a0a18739bc_salon_250x250.jpg"
 *       }
 *     ],
 *     "salon": {
 *       "objectId": "JaiFcZ"
 *     },
 *     "status": "PUBLISHED",
 *     "name": "nhan product",
 *     "type": "USER",
 *     "price": 1200,
 *     "description": "this is des",
 *     "url": "https://www.facebook.com",
 *     "createdAt": "2020-08-20T07:58:32.748Z",
 *     "objectId": "Bad8mjyUGm"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function changeProductPublishStatus() {}

/**
 * @api {post} /getProductList getProductList
 * @apiVersion 1.0.0
 * @apiName getProductList
 * @apiGroup Web-Product
 *
 * @apiDescription Get product list
 * Note:
 * - Anonymous user can see all published product
 * - SALON can only see their product
 *
 * @apiParam {String} [salonId]
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} [orderBy]     Order key
 * @apiParam {String} [order]       Order direction ['ascending', 'descending']
 * @apiParam {String} [searchKey]   Search by name
 * @apiParam {String} [status]      Product status: PUBLISHED || UNPUBISHED
 *
 * @apiExample {json} Request example
 * {
 *   "salonId": "qiODa9eq",
 *   "page": 1,
 *   "limit": 10,
 *   "orderBy": "createdAt",
 *   "order": "ascending",
 *   "searchKey": "nhan",
 *   "status": "PUBLISHED"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "total": 2,
 *      "list": [
 *        {
 *          "images": [
 *            {
 *              "objectId": "uIlJHBYiwg",
 *              "file": "https://hairlie-dev.s3.amazonaws.com/8454245a7b545b1ec97f27db6d106957_pngtree520coupleavatarboyavatarlittledinosaurcartooncuteimage_1263411jpg.jpg",
 *              "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/0a49a7ec62b8276616e700a16f8e7030_salon_800x800.jpg",
 *              "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/d5a5549e7f4d931d9381ec1bc1ca09e9_salon_600x600.jpg",
 *              "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/9ce567284064dac0f1c4e6a0a18739bc_salon_250x250.jpg"
 *            }
 *          ],
 *          "salon": {
 *            "objectId": "nyG1k8"
 *          },
 *          "status": "PUBLISHED",
 *          "name": "nhan product",
 *          "price": 1200,
 *          "description": "this is des",
 *          "createdAt": "2020-08-20T07:56:06.490Z",
 *          "objectId": "FJD1mlv0LD"
 *        },
 *        {
 *          "images": [
 *            {
 *              "objectId": "uIlJHBYiwg",
 *              "file": "https://hairlie-dev.s3.amazonaws.com/8454245a7b545b1ec97f27db6d106957_pngtree520coupleavatarboyavatarlittledinosaurcartooncuteimage_1263411jpg.jpg",
 *              "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/0a49a7ec62b8276616e700a16f8e7030_salon_800x800.jpg",
 *              "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/d5a5549e7f4d931d9381ec1bc1ca09e9_salon_600x600.jpg",
 *              "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/9ce567284064dac0f1c4e6a0a18739bc_salon_250x250.jpg"
 *            }
 *          ],
 *          "salon": {
 *            "objectId": "JaiFcZ"
 *          },
 *          "status": "PUBLISHED",
 *          "name": "nhan product",
 *          "type": "USER",
 *          "price": 1200,
 *          "description": "this is des",
 *          "url": "https://www.facebook.com",
 *          "createdAt": "2020-08-20T07:58:32.748Z",
 *          "objectId": "Bad8mjyUGm"
 *        }
 *      ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 */
function getProductList() {}
