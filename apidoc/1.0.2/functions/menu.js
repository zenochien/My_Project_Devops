/**
 * @api {post} /assignMenus assignMenus
 * @apiVersion 1.0.0
 * @apiName assignMenus
 * @apiGroup Web-Menu
 * @apiPermission Required Login as STYLIST
 *
 * @apiDescription Assign or unassign menus for a stylist
 *
 * @apiParam {Array} menuIds   Menu id array
 *
 * @apiExample {json} Request example
 *  {
 *    "menuIds": ["meGa7myA2t"],
 *  }
 *
 * @apiSuccess {Array}  result
 * @apiSuccess {String}  result.name
 * @apiSuccess {Number}  result.amount
 * @apiSuccess {Number}  result.duration
 * @apiSuccess {String}  result.description
 * @apiSuccess {Object}  result.category
 * @apiSuccess {String}  result.category.name
 * @apiSuccess {String}  result.category.objectId
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {String}  result.status
 * @apiSuccess {Array}   result.assignedStylistIds
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *  {
 *     "name": "nhan menu 03",
 *     "amount": 100,
 *     "duration": 10,
 *     "description": "description",
 *     "category": {
 *       "name": "cate-3",
 *       "objectId": "FFQzTk8anu"
 *     },
 *     "salon": {
 *       "objectId": "nyG1k8"
 *     },
 *     "status": "PUBLISHED",
 *     "assignedStylistIds": [],
 *     "createdAt": "2020-09-01T10:08:29.389Z",
 *     "objectId": "VB83u80Jmb"
 *   }
 *  ]
 * }
 *
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse DuplicateValueError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function assignMenus() {}

/**
 * @api {post} /createMenuItem createMenuItem
 * @apiVersion 1.0.0
 * @apiName createMenuItem
 * @apiGroup Web-Menu
 * @apiPermission Required Login as SALON_OPERATOR
 *
 * @apiDescription Create a menu item
 *
 * @apiParam {String} name                Menu name, must be unique
 * @apiParam {Number} amount              Menu price
 * @apiParam {Number} duration            Menu duration
 * @apiParam {String} [description]       Menu description
 * @apiParam {String} categoryId          A valid Category Id for menu to be assign to
 * @apiParam {Array}  assignedStylists    Stylist Ids to assign menu
 *
 * @apiExample {json} Request example
 *  {
 *    "name": "nhan menu 00",
 *    "amount": 100,
 *    "description": "description",
 *    "categoryId": "FFQzTk8anu",
 *    "assignedStylists": ["qOLVDMEuVR","RFLlqGJ4gd","eI1sUdrIc5"],
 *    "duration": 10
 *  }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.name
 * @apiSuccess {Number}  result.amount
 * @apiSuccess {Number}  result.duration
 * @apiSuccess {String}  result.description
 * @apiSuccess {Object}  result.category
 * @apiSuccess {String}  result.category.name
 * @apiSuccess {String}  result.category.objectId
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {String}  result.status
 * @apiSuccess {Array}   result.assignedStylistIds
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "name": "nhan menu 03",
 *     "amount": 100,
 *     "duration": 10,
 *     "description": "description",
 *     "category": {
 *       "name": "cate-3",
 *       "objectId": "FFQzTk8anu"
 *     },
 *     "salon": {
 *       "objectId": "nyG1k8"
 *     },
 *     "status": "PUBLISHED",
 *     "assignedStylistIds": [
 *       "qOLVDMEuVR",
 *       "RFLlqGJ4gd",
 *       "eI1sUdrIc5"
 *     ],
 *     "createdAt": "2020-09-01T10:08:29.389Z",
 *     "objectId": "VB83u80Jmb"
 *   }
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse DuplicateValueError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function createMenuItem() {}

/**
 * @api {post} /updateMenuItem updateMenuItem
 * @apiVersion 1.0.0
 * @apiName updateMenuItem
 * @apiGroup Web-Menu
 * @apiPermission Required Login as SALON_OPERATOR
 *
 * @apiDescription Update a menu item given correct role
 *
 * @apiParam {String} menuId
 * @apiParam {String} [name]            Menu name, must be unique
 * @apiParam {Number} [amount]          Menu price
 * @apiParam {Number} [duration]        Menu durration
 * @apiParam {String} [description]     Menu description
 * @apiParam {String} [categoryId]      A valid Category Id for menu to be assign to
 * @apiParam {Array}  assignedStylists    Stylist Ids to assign menu
 *
 * @apiExample {json} Request example
 * {
 *   "menuId": "VB83u80Jmb",
 *   "name": "nhan menu 00",
 *   "amount": 100,
 *   "description": "description",
 *   "categoryId": "FFQzTk8anu",
 *   "duration": 10,
 *   "assignedStylists": ["qOLVDMEuVR","RFLlqGJ4gd","eI1sUdrIc5"]
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.name
 * @apiSuccess {Number}  result.amount
 * @apiSuccess {Number}  result.duration
 * @apiSuccess {String}  result.description
 * @apiSuccess {Object}  result.category
 * @apiSuccess {String}  result.category.name
 * @apiSuccess {String}  result.category.objectId
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {String}  result.status
 * @apiSuccess {Array}   result.assignedStylistIds
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "name": "nhan menu 03",
 *     "amount": 100,
 *     "duration": 10,
 *     "description": "description",
 *     "category": {
 *       "name": "cate-3",
 *       "objectId": "FFQzTk8anu"
 *     },
 *     "salon": {
 *       "objectId": "nyG1k8"
 *     },
 *     "status": "PUBLISHED",
 *     "assignedStylistIds": [
 *       "qOLVDMEuVR",
 *       "RFLlqGJ4gd",
 *       "eI1sUdrIc5"
 *     ],
 *     "createdAt": "2020-09-01T10:08:29.389Z",
 *     "objectId": "VB83u80Jmb"
 *   }
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse DuplicateValueError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function updateMenuItem() {}

/**
 * @api {post} /changeMenuPublishStatus changeMenuPublishStatus
 * @apiVersion 1.0.0
 * @apiName changeMenuPublishStatus
 * @apiGroup Web-Menu
 * @apiPermission Required Login as ADMIN
 *
 * @apiDescription Change publish status of menu
 *
 * @apiParam {String} menuId
 *
 * @apiExample {json} Request example
 * {
 *   "menuId": "qOLVDMEuVR"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.name
 * @apiSuccess {Number}  result.amount
 * @apiSuccess {Number}  result.duration
 * @apiSuccess {String}  result.description
 * @apiSuccess {Object}  result.category
 * @apiSuccess {String}  result.category.name
 * @apiSuccess {String}  result.category.objectId
 * @apiSuccess {String}  result.category.status
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {String}  result.status
 * @apiSuccess {Array}   result.assignedStylistIds
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "name": "nhan menu 03",
 *     "amount": 100,
 *     "duration": 10,
 *     "description": "description",
 *     "category": {
 *       "name": "cate-3",
 *       "objectId": "FFQzTk8anu",
 *       "status": "PUBLISHED"
 *     },
 *     "salon": {
 *       "objectId": "nyG1k8"
 *     },
 *     "status": "PUBLISHED",
 *     "assignedStylistIds": [
 *       "qOLVDMEuVR",
 *       "RFLlqGJ4gd",
 *       "eI1sUdrIc5"
 *     ],
 *     "createdAt": "2020-09-01T10:08:29.389Z",
 *     "objectId": "VB83u80Jmb"
 *   }
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse DuplicateValueError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function changeMenuPublishStatus() {}

/**
 * @api {post} /getMenuItemDetail getMenuItemDetail
 * @apiVersion 1.0.0
 * @apiName getMenuItemDetail
 * @apiGroup Web-Menu
 *
 * @apiDescription Get details of menu
 *
 * @apiParam {String} menuId ObjectId of menu
 *
 * @apiExample {json} Request example
 * {
 *   "menuId": "VB83u80Jmb"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.name
 * @apiSuccess {Number}  result.amount
 * @apiSuccess {Number}  result.duration
 * @apiSuccess {String}  result.description
 * @apiSuccess {Object}  result.category
 * @apiSuccess {String}  result.category.name
 * @apiSuccess {String}  result.category.objectId
 * @apiSuccess {String}  result.category.status
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {String}  result.status
 * @apiSuccess {Array}   result.assignedStylistIds
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "name": "nhan menu 03",
 *     "amount": 100,
 *     "duration": 10,
 *     "description": "description",
 *     "category": {
 *       "name": "cate-3",
 *       "objectId": "FFQzTk8anu",
 *       "status": "PUBLISHED"
 *     },
 *     "salon": {
 *       "objectId": "nyG1k8"
 *     },
 *     "status": "PUBLISHED",
 *     "assignedStylistIds": [
 *       "qOLVDMEuVR",
 *       "RFLlqGJ4gd",
 *       "eI1sUdrIc5"
 *     ],
 *     "createdAt": "2020-09-01T10:08:29.389Z",
 *     "objectId": "VB83u80Jmb"
 *   }
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse InvalidParamsError
 */
function getMenuItemDetail() {}

/**
 * @api {post} /getMenuItemList getMenuItemList
 * @apiVersion 1.0.0
 * @apiName getMenuItemList
 * @apiGroup Web-Menu
 *
 * @apiDescription Get list of menus
 *
 * @apiParam {String} [salonId]
 * @apiParam {String} [stylistId]   This param is used to get assigned menu list by stylistId
 * @apiParam {String} [status]      Menu status: PUBLISHED || UNPUBLISHED
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} [order]       Order direction
 * @apiParam {String} [order]       Order direction ['ascending', 'descending']
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 5,
 *   "orderBy": "amount",
 *   "order": "descending",
 *   "salonId": "iEYQp8",
 *   "stylistId": "5DsuXEnz5o",
 *   "status": "PUBLISHED"
 * }
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *       {
 *         "assignedStylistIds": [
 *           "qOLVDMEuVR",
 *           "RFLlqGJ4gd",
 *           "eI1sUdrIc5"
 *         ],
 *         "name": "nhan menu 03",
 *         "amount": 100,
 *         "duration": 10,
 *         "description": "description",
 *         "category": {
 *           "name": "cate-3",
 *           "objectId": "FFQzTk8anu",
 *           "status": "PUBLISHED"
 *         },
 *         "salon": {
 *           "objectId": "nyG1k8"
 *         },
 *         "createdAt": "2020-09-01T10:08:29.389Z",
 *         "objectId": "VB83u80Jmb"
 *       }
 *     ]
 *   }
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse InvalidParamsError
 */
function getMenuItemList() {}

/**
 * @api {post} /removeMenu removeMenu
 * @apiVersion 1.0.0
 * @apiName removeMenu
 * @apiGroup Web-Menu
 * @apiPermission Login Required as Salon Operator
 *
 * @apiDescription Remove salon's menu
 *
 * @apiParam {String} menuId
 *
 * @apiExample {json} Request example
 * {
 *   "menuId": "Bad8mjyUGm"
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
function removeMenu() {}
