/**
 * @api {post} /getPressPostListByCustomer getPressPostListByCustomer
 * @apiVersion 2.5.0
 * @apiName getPressPostListByCustomer
 * @apiGroup Web-PressPost
 *
 * @apiDescription Get Press Post List
 *
 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 * @apiParam {Array}  [types]       List of type  DEFAULT or SELECTION
 * @apiParam {String} [orderBy]     Order key
 * @apiParam {String} [order]       Order direction ['ascending', 'descending']
 *
 * @apiExample {json} Request example
 * {
 *    "limit": 10,
 *    "page": 1,
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Number}   result.total
 * @apiSuccess {Array}    result.list
 * @apiSuccess {String}   result.list.createdAt
 * @apiSuccess {String}   result.list.description
 * @apiSuccess {Object}   result.list.image
 * @apiSuccess {String}   result.list.image.file
 * @apiSuccess {Number}   result.list.rank
 * @apiSuccess {String}   result.list.title
 * @apiSuccess {String}   result.list.detailURL
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "total": 2,
 *       "list": [
 *           {
 *               "createdAt": "2022-09-18T17:00:00.000Z",
 *               "description": "インナーカラーは後悔するというのは本当でしょうか？今回は、インナーカラーが後悔すると言われる理由や、実際に後悔した人の体験談を紹介します。インナーカラーで後悔しないための注意点も紹介するので参考にしてみてください。",
 *               "image": {
 *                   "file": "csqpt51rgy.user-space.cdn.idcfcloud.net/production/posts/eyecatches/000/000/024/medium.JPG?1663138851"
 *               },
 *               "rank": 10,
 *               "title": "インナーカラーは後悔する？やめたほうが良い？注意点・失敗した時の対処も！",
 *               "detailURL": "https://press.hairlie.jp/posts/24"
 *               "objectId": "24"
 *           },
 *           {
 *               "createdAt": "2022-09-18T17:00:00.000Z",
 *               "description": "ミルクティーベージュのインナーカラーは色落ち後は何色になるかご存知ですか？今回は、ミルクティーベージュの色落ち後の色や、色落ち過程やその期間を【ブリーチなし・あり（1回・2回）】別に分けて紹介します！ミルクティーベージュを色持ちさせる方法も紹介するので参考にしてください♡",
 *               "image": {
 *                   "file": "csqpt51rgy.user-space.cdn.idcfcloud.net/production/posts/eyecatches/000/000/020/medium.JPG?1663058846"
 *               },
 *               "rank": 7,
 *               "title": "ミルクティベージュの色落ち後は？過程をブリーチ1回あり/なし別に紹介♡",
 *               "detailURL": "https://press.hairlie.jp/posts/20"
 *               "objectId": "20"
 *           }
 *       ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getPressPostListByCustomer() {}

/**
 * @api {post} /getPressPostListByAdmin getPressPostListByAdmin
 * @apiVersion 2.5.0
 * @apiName getPressPostListByAdmin
 * @apiGroup Web-PressPost
 *
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Press Post List
 *
 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 * @apiParam {String} searchKey
 * @apiParam {Array}  [types]       List of type  DEFAULT or SELECTION
 * @apiParam {String} [orderBy]     Order key
 * @apiParam {String} [order]       Order direction ['ascending', 'descending']
 *
 * @apiExample {json} Request example
 * {
 *    "limit": 10,
 *    "page": 1,
 *    "searchKey": "postman"
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Number}   result.total
 * @apiSuccess {Array}    result.list
 * @apiSuccess {String}   result.list.createdAt
 * @apiSuccess {Object}   result.list.image
 * @apiSuccess {String}   result.list.image.file
 * @apiSuccess {String}   result.list.title
 * @apiSuccess {String}   result.list.detailURL
 * @apiSuccess {Array}    result.list.stylists
 * @apiSuccess {Array}    result.list.stylists.objectId
 * @apiSuccess {String}   result.list.stylists.fullName
 * @apiSuccess {Array}    result.list.stylists.profileImages
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "total": 2,
 *       "list": [
 *           {
 *               "createdAt": "2022-09-18T17:00:00.000Z",
 *               "image": {
 *                   "file": "csqpt51rgy.user-space.cdn.idcfcloud.net/production/posts/eyecatches/000/000/024/medium.JPG?1663138851"
 *               },
 *               "title": "インナーカラーは後悔する？やめたほうが良い？注意点・失敗した時の対処も！",
 *               "stylists": [
 *                   {
 *                       "profileImages": [
 *                           {
 *                               "objectId": "0NX6DplEEw",
 *                               "file": "https://hairlie-dev.s3.amazonaws.com/1f609424b14d89adab14744b6a5fa336_hairlie_image.jpg",
 *                               "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/c2ae2ccaac9a0b9f818ce03cf6957608_post_250x250.jpg",
 *                               "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/fde96608835be1d52d94e4e04811da8d_post_600x600.jpg",
 *                               "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/7577cbabd1ecd2f8f1ab60a8229cf647_post_800x800.jpg"
 *                           }
 *                       ],
 *                       "fullName": "postman test",
 *                       "objectId": "rqZDbiooVa"
 *                   }
 *               ],
 *               "detailURL": "https://press.hairlie.jp/posts/24"
 *               "objectId": "24"
 *           },
 *           {
 *               "createdAt": "2022-09-18T17:00:00.000Z",
 *               "image": {
 *                   "file": "csqpt51rgy.user-space.cdn.idcfcloud.net/production/posts/eyecatches/000/000/020/medium.JPG?1663058846"
 *               },
 *               "title": "ミルクティベージュの色落ち後は？過程をブリーチ1回あり/なし別に紹介♡",
 *               "detailURL": "https://press.hairlie.jp/posts/20"
 *               "objectId": "20"
 *           }
 *       ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getPressPostListByAdmin() {}

/**
 * @api {post} /getPressPostDetailByAdmin getPressPostDetailByAdmin
 * @apiVersion 2.5.0
 * @apiName getPressPostDetailByAdmin
 * @apiGroup Web-PressPost
 *
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Press Post Detail
 *
 * @apiParam {Number} pressPostId
 *
 * @apiExample {json} Request example
 * {
 *    "pressPostId": 24
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {String}   result.createdAt
 * @apiSuccess {Object}   result.image
 * @apiSuccess {String}   result.image.file
 * @apiSuccess {String}   result.title
 * @apiSuccess {String}   result.detailURL
 * @apiSuccess {Array}    result.stylists
 * @apiSuccess {String}   result.stylists.objectId
 * @apiSuccess {String}   result.stylists.fullName
 * @apiSuccess {Array}    result.stylists.profileImages
 * @apiSuccess {Object}   result.stylists.salon
 * @apiSuccess {String}   result.stylists.salon.salonName
 * @apiSuccess {String}   result.stylists.salon.salonNameKatakana
 * @apiSuccess {Array}    result.stylists.salon.salonImage
 * @apiSuccess {String}   result.stylists.salon.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "createdAt": "2022-09-18T17:00:00.000Z",
 *       "image": {
 *           "file": "csqpt51rgy.user-space.cdn.idcfcloud.net/production/posts/eyecatches/000/000/024/medium.JPG?1663138851"
 *       },
 *       "title": "インナーカラーは後悔する？やめたほうが良い？注意点・失敗した時の対処も！",
 *       "stylists": [
 *           {
 *               "createdAt": "2021-06-29T08:20:50.594Z",
 *               "salon": {
 *                   "salonName": "longsalon01longest name possible 0.21456565abしもしどう",
 *                   "salonImage": {
 *                       "objectId": "oIidgEQmUv",
 *                       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/ba7ac327dfce184353ae49f711ef31ef_salon_800x800.jpg",
 *                       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/b715dc37c7b9ec012cd5e443bf47955b_salon_250x250.jpg",
 *                       "file": "https://hairlie-dev.s3.amazonaws.com/b7cb0e928d07d4b547b23a3f546fa6a4_hairlie_image.jpg"
 *                   },
 *                   "salonNameKatakana": "asd",
 *                   "objectId": "NmEpw4"
 *               },
 *               "profileImages": [
 *                   {
 *                       "objectId": "0NX6DplEEw",
 *                       "file": "https://hairlie-dev.s3.amazonaws.com/1f609424b14d89adab14744b6a5fa336_hairlie_image.jpg",
 *                       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/c2ae2ccaac9a0b9f818ce03cf6957608_post_250x250.jpg",
 *                       "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/fde96608835be1d52d94e4e04811da8d_post_600x600.jpg",
 *                       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/7577cbabd1ecd2f8f1ab60a8229cf647_post_800x800.jpg"
 *                   }
 *               ],
 *               "fullName": "postman test",
 *               "objectId": "rqZDbiooVa"
 *           }
 *       ],
 *       "detailURL": "https://press.hairlie.jp/posts/24",
 *       "objectId": "24"
 *    }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getPressPostDetailByAdmin() {}

/**
 * @api {post} /getPressPostListByStylistId getPressPostListByStylistId
 * @apiVersion 2.5.0
 * @apiName getPressPostListByStylistId
 * @apiGroup Web-PressPost
 *
 * @apiPermission Login Required as Customer
 *
 * @apiDescription Get Press Post List
 *
 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 * @apiParam {String} stylistId
 * @apiParam {String} [orderBy]     Order key
 * @apiParam {String} [order]       Order direction ['ascending', 'descending']
 *
 * @apiExample {json} Request example
 * {
 *      "stylistId": "zm3KWTNwHp"
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Number}   result.total
 * @apiSuccess {Array}    result.list
 * @apiSuccess {String}   result.list.createdAt
 * @apiSuccess {String}   result.list.description
 * @apiSuccess {Object}   result.list.image
 * @apiSuccess {String}   result.list.image.file
 * @apiSuccess {Number}   result.list.rank
 * @apiSuccess {String}   result.list.title
 * @apiSuccess {String}   result.list.detailURL
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "total": 2,
 *       "list": [
 *           {
 *               "createdAt": "2022-09-18T17:00:00.000Z",
 *               "description": "インナーカラーは後悔するというのは本当でしょうか？今回は、インナーカラーが後悔すると言われる理由や、実際に後悔した人の体験談を紹介します。インナーカラーで後悔しないための注意点も紹介するので参考にしてみてください。",
 *               "image": {
 *                   "file": "csqpt51rgy.user-space.cdn.idcfcloud.net/production/posts/eyecatches/000/000/024/medium.JPG?1663138851"
 *               },
 *               "rank": 10,
 *               "title": "インナーカラーは後悔する？やめたほうが良い？注意点・失敗した時の対処も！",
 *               "detailURL": "https://press.hairlie.jp/posts/24"
 *               "objectId": "24"
 *           },
 *           {
 *               "createdAt": "2022-09-18T17:00:00.000Z",
 *               "description": "ミルクティーベージュのインナーカラーは色落ち後は何色になるかご存知ですか？今回は、ミルクティーベージュの色落ち後の色や、色落ち過程やその期間を【ブリーチなし・あり（1回・2回）】別に分けて紹介します！ミルクティーベージュを色持ちさせる方法も紹介するので参考にしてください♡",
 *               "image": {
 *                   "file": "csqpt51rgy.user-space.cdn.idcfcloud.net/production/posts/eyecatches/000/000/020/medium.JPG?1663058846"
 *               },
 *               "rank": 7,
 *               "title": "ミルクティベージュの色落ち後は？過程をブリーチ1回あり/なし別に紹介♡",
 *               "detailURL": "https://press.hairlie.jp/posts/20"
 *               "objectId": "20"
 *           }
 *       ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getPressPostListByStylistId() {}

/**
 * @api {post} /assignedStylistsPressPostsByAdmin assignedStylistsPressPostsByAdmin
 * @apiVersion 2.5.0
 * @apiName assignedStylistsPressPostsByAdmin
 * @apiGroup Web-PressPost
 *
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Assigned Stylist for press post
 *
 * @apiParam {Number} pressPostId
 * @apiParam {Array}  assignedStylistIds
 *
 * @apiExample {json} Request example
 * {
 *    "pressPostId": 24
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Boolean}   result.success
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "success": true,
 *    }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function assignedStylistsPressPostsByAdmin() {}
