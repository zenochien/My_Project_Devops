/**
 * @api {post} /getHoldingCompanyListByAdmin getHoldingCompanyListByAdmin
 * @apiVersion 2.4.0
 * @apiName getHoldingCompanyListByAdmin
 * @apiGroup Web-HoldingCompany
 * @apiPermission Login required as  Admin
 *
 * @apiDescription Get HoldingCompany List
 *
 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 * @apiParam {String} [orderBy]            Order key
 * @apiParam {String} [order]              Order direction ['ascending', 'descending']
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {Array}   result.list.name
 * @apiSuccess {String}  result.list.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *        {
 *          "objectId": "2pXAH75cUA",
 *          "name": "Holding Company Name",
 *        }
 *      ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getHoldingCompanyListByAdmin() {}

/**
 * @api {post} /createHoldingCompanyByAdmin createHoldingCompanyByAdmin
 * @apiVersion 2.4.0
 * @apiName createHoldingCompanyByAdmin
 * @apiGroup Web-HoldingCompany
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Create HoldingCompany
 *
 *
 * @apiParam {Number} name
 * @apiParam {Array} [salonIds]   List salonId
 *
 * @apiExample {json} Request example
 * {
 *   "name": "Holding Company Name"
 * }
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.name                              max 30 chars
 * @apiSuccess {String}  result.objectId
 *
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "name": "Holding Company Name",
 *      "objectId": "MeWPuNd9E3"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 * @apiUse HoldingCompanyNameExsits
 */
function createHoldingCompanyByAdmin() {}

/**
 * @api {post} /updateHoldingCompanyByAdmin updateHoldingCompanyByAdmin
 * @apiVersion 2.4.0
 * @apiName updateHoldingCompanyByAdmin
 * @apiGroup Web-HoldingCompany
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Update HoldingCompany
 *
 *
 * @apiParam {String} id
 * @apiParam {Array} [salonIds]   List salonId
 * @apiParam {Number} name                          max 30 chars
 *
 * @apiExample {json} Request example
 * {
 *   "id": "99eCKuoqiT"
 *   "name": "Holding Company Name"
 * }
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.name
 * @apiSuccess {String}  result.objectId
 *
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "name": "Holding Company Name",
 *      "objectId": "99eCKuoqiT"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 * @apiUse HoldingCompanyNameExsits
 */
function updateHoldingCompanyByAdmin() {}

/**
 * @api {post} /deleteHoldingCompanyByAdmin deleteHoldingCompanyByAdmin
 * @apiVersion 2.4.0
 * @apiName deleteHoldingCompanyByAdmin
 * @apiGroup Web-HoldingCompany
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Delete HoldingCompany
 *
 *
 * @apiParam {String} id
 *
 * @apiExample {json} Request example
 * {
 *   "id": "99eCKuoqiT"
 * }
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolane}  result.success
 *
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "success": true,
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function deleteHoldingCompanyByAdmin() {}
