/**
 * @api {post} /getPayoutsByAdmin getPayoutsByAdmin
 * @apiVersion 2.4.0
 * @apiName getPayoutsByAdmin
 * @apiGroup Payout
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Payout List
 *
 * @apiParam {Number}   [page]
 * @apiParam {Number}   [limit]
 * @apiParam {String}   [startCycle]
 * @apiParam {Array}    [holdingCompanyIds]
 * @apiParam {Boolane}  [notBelongToCompany]
 * @apiParam {String}   [status]       List one of the following values: pending, scheduled, canceled, completed, failed, reverted
 *
 * @apiExample {json} Request example
 *  {
 *    "limit": 50,
 *    "page": 1,
 *    "startCycle": "2022-07-31T15:00:00.000Z",
 *    "holdingCompanyIds": ["Xjd5Ph15qNQxxMaFpIQnY"]
 *  }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {String}  result.list.payoutId
 * @apiSuccess {String}  result.list.earningId
 * @apiSuccess {String}  result.list.salonInfo
 * @apiSuccess {String}  result.list.salonInfo.salonName
 * @apiSuccess {String}  result.list.salonInfo.salonEmail
 * @apiSuccess {String}  result.list.salonInfo.createdAt
 * @apiSuccess {String}  result.list.salonInfo.objectId
 * @apiSuccess {String}  result.list.salonInfo.salonImage
 * @apiSuccess {String}  result.list.salonInfo.salonImage.objectId
 * @apiSuccess {String}  result.list.salonInfo.salonImage.thumbSmall
 * @apiSuccess {String}  result.list.salonInfo.salonImage.thumbLarge
 * @apiSuccess {String}  result.list.salonInfo.salonImage.file
 * @apiSuccess {Object}  result.list.salonInfo.holdingCompany
 * @apiSuccess {String}  result.list.salonInfo.holdingCompany.name
 * @apiSuccess {String}  result.list.salonInfo.holdingCompany.objectId
 * @apiSuccess {String}  result.list.salonInfo.holdingCompany.status
 * @apiSuccess {Number}  result.list.totalSales                         Total amount charged in that cycle
 * @apiSuccess {Number}  result.list.commission                         Total commission of all stylists belonging to that salon in that cycle.
 * @apiSuccess {Number}  result.list.subtotal                           Subtotal = Total sales - commission
 * @apiSuccess {Number}  result.list.transferFee                        Default = 229円 if total sales < 100,000円; Default = 0円 if total sales >= 100,000円
 * @apiSuccess {Number}  result.list.transferAmount                     Transfer amount = Subtotal - Transfer fee
 * @apiSuccess {String}  result.list.status                             paid or unpaid
 * @apiSuccess {String}  result.list.action

 *
 * @apiSuccessExample {json} Response example
 *{
 *   "result": {
 *       "total": 2,
 *       "list": [
 *           {
 *               "payoutId": "cl39y8tif00090uyrfvd42fsd",
 *               "earningId": "cl3o6l4cl00am150m7qftbnrr",
 *               "totalSales": 1200,
 *               "commission": 200,
 *               "subtotal": 1000,
 *               "transferFee": 100,
 *               "transferAmount": 900,
 *               "status": "unpaid",
 *               "action": "view",
 *               "salonInfo": {
 *                 "salonName": "hungsalon1",
 *                 "salonEmail": "hungsalon1@yopmail.com",
 *                 "createdAt": "2022-01-28T02:16:34.684Z",
 *                 "salonImage": {
 *                     "objectId": "UDYVWFgXea",
 *                     "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/df06a7b67728e9ee5ab4cc779fcbd3a9_salon_250x250.jpg",
 *                     "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/a54d791aeac6024ecbefa04d79b02916_salon_800x800.jpg",
 *                     "file": "https://hairlie-dev.s3.amazonaws.com/f6095fa96b79083b937c06fa551fabca_hairlie_image.jpg"
 *                 },
 *                 "holdingCompany": {
 *                     "name": "holding company new",
 *                     "objectId": "Xjd5Ph15qNQxxMaFpIQnY",
 *                     "status": "ACTIVE"
 *                 },
 *                 "objectId": "NRc88P"
 *               },
 *           },
 *           {
 *               "payoutId": "cl39xvsxm00050uxjdz9lar77",
 *               "earningId": "cl3o6l4cl00am150m7qftbnrr",
 *               "salonInfo": {
 *                 "salonName": "hungsalon1",
 *                 "salonEmail": "hungsalon1@yopmail.com",
 *                 "createdAt": "2022-01-28T02:16:34.684Z",
 *                 "salonImage": {
 *                     "objectId": "UDYVWFgXea",
 *                     "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/df06a7b67728e9ee5ab4cc779fcbd3a9_salon_250x250.jpg",
 *                     "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/a54d791aeac6024ecbefa04d79b02916_salon_800x800.jpg",
 *                     "file": "https://hairlie-dev.s3.amazonaws.com/f6095fa96b79083b937c06fa551fabca_hairlie_image.jpg"
 *                  }
 *                 "holdingCompany": {
 *                     "name": "holding company new",
 *                     "objectId": "Xjd5Ph15qNQxxMaFpIQnY",
 *                     "status": "ACTIVE"
 *                 },
 *               },
 *               "totalSales": 1100,
 *               "commission": 100,
 *               "subtotal": 1000,
 *               "transferFee": 100,
 *               "transferAmount": 900,
 *               "status": "unpaid",
 *               "action": "view"
 *           }
 *       ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getPayoutsByAdmin() {}
/**
 * @api {post} /getPayoutSummaryByAdmin getPayoutSummaryByAdmin
 * @apiVersion 2.4.0
 * @apiName getPayoutSummaryByAdmin
 * @apiGroup Payout
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Payout Summary
 *
 * @apiParam {String}   [startCycle]
 * @apiParam {Array}    [holdingCompanyIds]
 * @apiParam {Boolane}  [notBelongToCompany]
 *
 * @apiExample {json} Request example
 *  {
 *    "startCycle": "2022-07-31T15:00:00.000Z",
 *    "holdingCompanyIds": ["Xjd5Ph15qNQxxMaFpIQnY"]
 *  }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Object}  result.payoutSummary
 * @apiSuccess {String}  result.payoutSummary.totalSales
 * @apiSuccess {String}  result.payoutSummary.commission
 * @apiSuccess {String}  result.payoutSummary.subtotal
 * @apiSuccess {String}  result.payoutSummary.transferFee
 * @apiSuccess {String}  result.payoutSummary.transferAmount
 *
 * @apiSuccessExample {json} Response example
 *{
 *   "result": {
 *          "payoutSummary": {
 *           "totalSales": 270003,
 *           "commission": 94500,
 *           "subtotal": 175503,
 *           "transferFee": 0,
 *           "transferAmount": 175503
 *          }
 *    }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getPayoutSummaryByAdmin() {}

/**
 * @api {post} /getNumberPayoutsByAdmin getNumberPayoutsByAdmin
 * @apiVersion 2.4.0
 * @apiName getNumberPayoutsByAdmin
 * @apiGroup Payout
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Payout List
 *
 * @apiParam {String}   [startCycle]
 * @apiParam {String}   [status]       List one of the following values: pending, scheduled, canceled, completed, failed, reverted
 *
 * @apiExample {json} Request example
 *  {
 *    "startCycle": "2022-07-31T15:00:00.000Z",
 *    "status": ["completed", "completed"],
 *  }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total

 *
 * @apiSuccessExample {json} Response example
 *{
 *   "result": {
 *       "total": 2,
 *    }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getNumberPayoutsByAdmin() {}
