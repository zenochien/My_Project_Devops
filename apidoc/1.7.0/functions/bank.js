/**
 * @api {post} /getBankList getBankList
 * @apiVersion 1.7.0
 * @apiName getBankList
 * @apiGroup Bank
 * @apiPermission Publish
 *
 * @apiDescription Get Bank List
 * 
 * @apiParam {String} [keyword]
 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 * 
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {String}  result.list.createdAt
 * @apiSuccess {String}  result.list.objectId
 * @apiSuccess {String}  result.list.bankNameHiragana
 * @apiSuccess {String}  result.list.bankName
 * @apiSuccess {String}  result.list.bankCode
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *        {
 *               "createdAt": "2019-08-28T09:01:04.494Z",
 *               "bankName": "台湾中小企業銀行",
 *               "bankCode": 633,
 *               "bankNameHiragana": "たいわんちゆうしようきぎよう",
 *               "objectId": "Vtj7FZUEuQ"
 *        }
 *      ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getBankList() {}

/**
 * @api {post} /getBranchList getBranchList
 * @apiVersion 1.7.0
 * @apiName getBranchList
 * @apiGroup Bank
 * @apiPermission Publish
 *
 * @apiDescription Get Bank Branch List
 * 
 * @apiParam {String} bankId
 * @apiParam {String} [keyword]
 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {String}  result.list.createdAt
 * @apiSuccess {String}  result.list.objectId
 * @apiSuccess {String}  result.list.branchNameHiragana
 * @apiSuccess {String}  result.list.branchName
 * @apiSuccess {String}  result.list.branchCode
 * @apiSuccess {Object}  result.list.bank
 * @apiSuccess {String}  result.list.bank.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *        {
 *               "createdAt": "2019-08-28T09:01:04.494Z",
 *               "bankName": "台湾中小企業銀行",
 *               "bankCode": 633,
 *               "bankNameHiragana": "たいわんちゆうしようきぎよう",
 *               "objectId": "Vtj7FZUEuQ"
 *        }
 *      ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getBranchList() {}