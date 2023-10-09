/**
 * @api {post} /createCategory createCategory
 * @apiVersion 1.0.0
 * @apiName createCategory
 * @apiGroup Web-Category
 *
 * @apiDescription Create category
 *
 * @apiParam {String} name Category name
 *
 * @apiExample {json} Request example
 * {
 *   "name": "Dry"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.name  Name
 * @apiSuccess {Boolean} result.status PUBLISH or UNPUBLISHED
 * @apiSuccess {Date}    result.createdAt  Creation date
 * @apiSuccess {String}  result.objectId  Category Id
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "name": "Dry",
 *     "status": "PUBLISHED",
 *     "createdAt": "2020-08-10T03:04:34.445Z"
 *     "objectId": "A2aMPgBIaj",
 *   }
 * }
 *
 * @apiUse DuplicateValueError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function createCategory() {}

/**
 * @api {post} /updateCategory updateCategory
 * @apiVersion 1.0.0
 * @apiName updateCategory
 * @apiGroup Web-Category
 *
 * @apiDescription Update category, except status
 *
 * @apiParam {String} categoryId
 * @apiParam {String} [name] Category name
 *
 * @apiExample {json} Request example
 * {
 *   "categoryId": "A2aMPgBIaj"
 *   "name": "Dry Wash",
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.name  Name
 * @apiSuccess {String}  result.status PUBLISHED or UNPUBLISHED
 * @apiSuccess {Date}    result.updatedAt  Creation date
 * @apiSuccess {String}  result.objectId  Category Id
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "name": "Dry Wash",
 *     "status": "UNPUBLISHED",
 *     "updatedAt": "2020-08-10T03:04:34.445Z"
 *     "objectId": "A2aMPgBIaj",
 *   }
 * }
 *
 * @apiUse DuplicateValueError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function updateCategory() {}

/**
 * @api {post} /getCategoryList getCategoryList
 * @apiVersion 1.0.0
 * @apiName getCategoryList
 * @apiGroup Web-Category
 *
 * @apiDescription Get category List
 *
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} [orderBy]  Order key
 * @apiParam {String} [order]  Order direction ['ascending', 'descending']
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 10,
 *   "orderBy": "createdAt",
 *   "order": "ascending"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total  Number of categories
 * @apiSuccess {Array}   result.lists  List of categories
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 2,
 *     "list": [
 *       {
 *         "name": "Dry Wash",
 *         "status": "UNPUBLISHED",
 *         "updatedAt": "2020-08-10T03:04:34.445Z"
 *         "objectId": "A2aMPgBIaj",
 *       },
 *       {
 *         "name": "Curl",
 *         "status": "PUBLISHED",
 *         "updatedAt": "2020-08-10T03:04:34.445Z"
 *         "objectId": "Cqe213dd",
 *       }
 *     ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 */
function getCategoryList() {}

/**
 * @api {post} /changeCategoryPublishStatus changeCategoryPublishStatus
 * @apiVersion 1.0.0
 * @apiName changeCategoryPublishStatus
 * @apiGroup Web-Category
 * @apiPermission Required Login as ADMIN
 *
 * @apiDescription Change publish status of category
 *
 * @apiParam {String} categoryId
 *
 * @apiExample {json} Request example
 * {
 *   "categoryId": "pQzvcNS5z7"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.name
 * @apiSuccess {String}  result.status
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "name": "duc category 2",
 *     "status": "UNPUBLISHED",
 *     "createdAt": "2020-09-22T07:55:17.577Z",
 *     "objectId": "pQzvcNS5z7"
 *   }
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function changeCategoryPublishStatus() {}
