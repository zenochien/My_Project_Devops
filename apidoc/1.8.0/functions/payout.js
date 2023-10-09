/**
 * @api {post} /getPayoutsByAdmin getPayoutsByAdmin
 * @apiVersion 1.8.0
 * @apiName getPayoutsByAdmin
 * @apiGroup Payout
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Payout List
 *
 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 * @apiParam {String} [startCycle]
 * @apiParam {String} [status]       List one of the following values: pending, scheduled, canceled, completed, failed, reverted
 *
 * @apiExample {json} Request example
 *  {
 *    "startCycle": "2022-05-16T17:00:00.000",
 *    "page": 1,
 *    "limit": 10,
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
 *                 },
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
 * @api {post} /getPayoutDetailByAdmin getPayoutDetailByAdmin
 * @apiVersion 1.8.0
 * @apiName getPayoutDetailByAdmin
 * @apiGroup Payout
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Payout List
 *
 * @apiParam {String} payoutId
 *
 * @apiExample {json} Request example
 *  {
 *    "payoutId": "cl39y8tif00090uyrfvd42fsd"
 *  }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {Object}  result.salon.objectId
 * @apiSuccess {Object}  result.salon.salonEmail
 * @apiSuccess {Object}  result.salon.salonName
 * @apiSuccess {Object}  result.salon.salonNameKatakana
 * @apiSuccess {Number}  result.bankInfo
 * @apiSuccess {Number}  result.bankInfo.bank
 * @apiSuccess {Number}  result.bankInfo.bank.objectId
 * @apiSuccess {Number}  result.bankInfo.bank.bankName
 * @apiSuccess {Number}  result.bankInfo.bank.bankCode
 * @apiSuccess {Number}  result.bankInfo.bank.bankNameHiragana
 * @apiSuccess {Number}  result.bankInfo.branch
 * @apiSuccess {Number}  result.bankInfo.branch.objectId
 * @apiSuccess {Number}  result.bankInfo.branch.branchName
 * @apiSuccess {Number}  result.bankInfo.branch.branchCode
 * @apiSuccess {Number}  result.bankInfo.branch.branchNameHiragana
 * @apiSuccess {Number}  result.bankInfo.branch.telephone
 * @apiSuccess {Number}  result.bankInfo.branch.postalCode
 * @apiSuccess {Number}  result.bankInfo.branch.address
 * @apiSuccess {Number}  result.bankInfo.accountName
 * @apiSuccess {Number}  result.bankInfo.accountNumber
 * @apiSuccess {Number}  result.bankInfo.type
 * @apiSuccess {Number}  result.startCycle
 * @apiSuccess {Number}  result.endCycle
 * @apiSuccess {Number}  result.totalSales
 * @apiSuccess {Number}  result.commission
 * @apiSuccess {Number}  result.subtotal
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "objectId": "cl3s4wg12000516yvffzj0i3d",
 *       "salon": {
 *           "objectId": "3ShlOk",
 *           "salonEmail": "luf18@yopmail.com",
 *           "salonName": "Luf18",
 *           "phone": "+815846315546",
 *           "salonNameKatakana": "Katakaクアラルンプールへマックブックとカメラをフリーのディレクターとして活動するって飛び444"
 *       },
 *       "bankInfo": {
 *           "bank": {
 *               "objectId": "zPH19eG40h",
 *               "bankName": "大阪中河内農業協同組合",
 *               "bankCode": 7164,
 *               "bankNameHiragana": "おおさかなかかわちのうきよう"
 *           },
 *           "branch": {
 *               "objectId": "kMY4H9OjZ9",
 *               "branchName": "松原支店",
 *               "branchCode": 30,
 *               "branchNameHiragana": "まつばら",
 *               "telephone": "072-332-8008",
 *               "postalCode": "580-0016",
 *               "address": "大阪府松原市上田５−１０−３５"
 *           },
 *           "type": "CHECKING_ACCOUNT",
 *           "accountName": "アマカサタグ",
 *           "accountNumber": "1239999"
 *       },
 *       "startCycle": "2022-05-15T15:00:00.000Z",
 *       "endCycle": "2022-05-31T14:59:59.999Z",
 *       "commission": 3000,
 *       "subtotal": 7000
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getPayoutDetailByAdmin() {}

/**
 * @api {post} /getPayoutDetailBookinsByAdmin getPayoutDetailBookinsByAdmin
 * @apiVersion 1.8.0
 * @apiName getPayoutDetailBookinsByAdmin
 * @apiGroup Payout
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Payout List
 *
 * @apiParam {String} earningId
 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 *
 * @apiExample {json} Request example
 *  {
 *    "earningId": "cl3axnda4001v0uum63kl2an3"
 *    "limit": 10
 *    "page": 1
 *  }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {String}  result.list.objectId
 * @apiSuccess {Object}  result.list.stylist
 * @apiSuccess {String}  result.list.stylist.objectId
 * @apiSuccess {String}  result.list.stylist.name
 * @apiSuccess {Array}   result.list.stylist.profileImages
 * @apiSuccess {String}  result.list.stylist.profileImages.objectId
 * @apiSuccess {String}  result.list.stylist.profileImages.file
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbSmall
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbMedium
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbLarge
 * @apiSuccess {Object}  result.list.payoutInfo
 * @apiSuccess {Number}  result.list.payoutInfo.totalPrice
 * @apiSuccess {Number}  result.list.payoutInfo.commission
 * @apiSuccess {Number}  result.list.payoutInfo.subtotal
 *
 * @apiSuccessExample {json} Response example
 * {
 *    "result": {
 *        total: 1
 *       "list": [
 *           {
 *               "objectId": "zzuQK67g9O",
 *               "stylist": {
 *                   "objectId": "t6n0ulmU2Q",
 *                   "fullName": "Hau Stylist",
 *                   "profileImages": [
 *                                 {
 *                                     "objectId": "dYZsWto7Go",
 *                                     "file": "https://hairlie-dev.s3.amazonaws.com/99955a24b341ab7f5a863d742e9d9166_hairlie_image.jpg",
 *                                     "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/2a0018d4f953396b3c810a3f1ba465f8_post_250x250.jpg",
 *                                     "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/7bc41ddab10c8aa071ff0a2229a5917c_post_600x600.jpg",
 *                                     "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/c77b69318e88c0a0b1d9a95417151b6b_post_800x800.jpg"
 *                                 }
 *                             ],
 *               },
 *               "payoutInfo": {
 *                   "totalPrice": 1000,
 *                   "subtotal": 800,
 *                   "commission": 200,
 *               }
 *           }
 *       ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getPayoutDetailBookinsByAdmin() {}

/**
 * @api {post} /completePayoutsByAdmin completePayoutsByAdmin
 * @apiVersion 1.8.0
 * @apiName completePayoutsByAdmin
 * @apiGroup Payout
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Payout List
 *
 * @apiParam {Array} payoutIds
 *
 * @apiExample {json} Request example
 *  {
 *    "payoutIds": "[cl39y8tif00090uyrfvd42fsd]"
 *  }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolane}  result.success
 *
 * @apiSuccessExample {json} Response example
 * {
 *    "result": {
 *        "success": true
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function completePayoutsByAdmin() {}

/**
 * @api {post} /changePayoutTransferFeeByAdmin changePayoutTransferFeeByAdmin
 * @apiVersion 1.8.0
 * @apiName changePayoutTransferFeeByAdmin
 * @apiGroup Payout
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Payout List
 *
 * @apiParam {String} payoutId
 * @apiParam {Number} transferFee
 *
 * @apiExample {json} Request example
 *  {
 *    "payoutId": "cl3muqnhg001t150mdl9q6x4k"
 *    "transferFee": 200
 *  }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.success

 *
 * @apiSuccessExample {json} Response example
 * {
 *    "result": {
 *        success: true
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function changePayoutTransferFeeByAdmin() {}

/**
 * @api {post} /completeCyclePayoutsByAdmin completeCyclePayoutsByAdmin
 * @apiVersion 1.8.0
 * @apiName completeCyclePayoutsByAdmin
 * @apiGroup Payout
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Mark complete a pending by cycle payout.
 *
 * @apiParam {String} startCycle
 *
 * @apiExample {json} Request example
 *  {
 *    "startCycle": "2022-05-15T15:00:00.000Z"
 *  }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Boolane}  result.success
 *
 * @apiSuccessExample {json} Response example
 * {
 *    "result": {
 *        "success": true
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function completeCyclePayoutsByAdmin() {}
