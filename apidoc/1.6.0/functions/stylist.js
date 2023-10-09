/**
 * @api {post} /getStylistListByAdmin getStylistListByAdmin
 * @apiVersion 1.6.0
 * @apiName getStylistListByAdmin
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Stylist List
 *
 * @apiParam {String} [searchKey]  Search by fullName
 * @apiParam {String} [status]  List Stylist status:  default ["PUBLISHED", "UNPUBISHED"]
 * @apiParam {Number} [page]      Default 1
 * @apiParam {Number} [limit]     Default 10
 *
 * @apiExample {json} Request example
 * {
 *   "searchKey": "Gates Palmer",
 *   "page": 1,
 *   "limit": 10
 * }
 *
 * @apiSuccess {Array}   result
 * @apiSuccess {String}  result.list.createdAt
 * @apiSuccess {String}  result.list.fullName
 * @apiSuccess {String}  result.list.nickName
 * @apiSuccess {String}  result.list.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *  "result": [
 *       {
 *           "profileImages": [
 *               {
 *                   "objectId": "db5c6ZccHY",
 *                   "file": "https://hairlie-dev.s3.amazonaws.com/52baa48c3d270bedee8a0207eaaf9f6d_hairlie_image.jpg",
 *                   "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/b15ab3ea46f8e3bb43683f07b8bd4d30_post_250x250.jpg",
 *                   "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/b8a3a1dbfbe9e466c9ef249aa770ba44_post_600x600.jpg",
 *                   "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/aae7a1b4396f2c1981b4c982b4b98366_post_800x800.jpg"
 *               }
 *           ],
 *           "fullName": "Gates Palmer",
 *           "nickName": "Jena Hyde",
 *           "objectId": "ADXqFEx2CT",
 *           "createdAt": "2021-04-13T07:19:27.370Z"
 *       }
 *   ]
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse ErrorExample
 */
function getStylistListByAdmin() {}

/**
 * @api {post} /createRecommendation createRecommendation
 * @apiVersion 1.6.0
 * @apiName createRecommendation
 * @apiGroup Recommendation-Stylist
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Create recommendation for stylist
 *
 * @apiParam {String} contributorId  Not same receiverId.
 * @apiParam {Number} receiverId    Not same contributorId.
 * @apiParam {String} title   Recommendation Title (max 25 chars)
 * @apiParam {String} content   Recommendation Content (max 200 chars)
 *
 * @apiExample {json} Request example
 * {
 *   "contributorId": "2AfJxNkZit",
 *   "receiverId": "2Qo1syKwVF",
 *   "title": "title value"
 *   "content": "content value"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolane} result.success
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
 * @apiUse InvalidSessionTokenError
 * @apiUse ErrorExample
 */
function createRecommendation() {}

/**
 * @api {post} /updateRecommendation updateRecommendation
 * @apiVersion 1.6.0
 * @apiName updateRecommendation
 * @apiGroup Recommendation-Stylist
 * @apiPermission Login Required as Admin
 *
 * @apiDescription update recommendation for stylist
 *
 * @apiParam {String} recommendationId
 * @apiParam {String} contributorId  Not same receiverId.
 * @apiParam {Number} receiverId    Not same contributorId.
 * @apiParam {String} title   Recommendation Title (max 25 chars)
 * @apiParam {String} content   Recommendation Content (max 200 chars)
 *
 * @apiExample {json} Request example
 * {
 *   "recommendationId": "VRcNtuaG61gzN19rbcHTF",
 *   "contributorId": "2AfJxNkZit",
 *   "receiverId": "2Qo1syKwVF",
 *   "title": "title value"
 *   "content": "content value"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolane} result.success
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
function updateRecommendation() {}

/**
 * @api {post} /getRecommendationByAdmin getRecommendationByAdmin
 * @apiVersion 1.6.0
 * @apiName getRecommendationByAdmin
 * @apiGroup Recommendation-Stylist
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Recommendation List
 *
 * @apiParam {String} [orderBy]   Order key
 * @apiParam {String} [order]     Order direction ['ascending', 'descending']
 * @apiParam {Number} [page]      Default 1
 * @apiParam {Number} [limit]     Default 10
 * @apiParam {String} [fillter]
 * @apiParam {String} [fillterBy] Accept value "contributorId" or "receiverId"
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 10
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Number}   result.total
 * @apiSuccess {Array}    result.list
 * @apiSuccess {String}   result.list.objectId
 * @apiSuccess {String}   result.list.title
 * @apiSuccess {String}   result.list.content
 * @apiSuccess {String}   result.list.createdAt
 * @apiSuccess {String}   result.list.updateAt
 * @apiSuccess {Object}   result.list.receiver
 * @apiSuccess {String}   result.list.receiver.objectId
 * @apiSuccess {String}   result.list.receiver.fullName
 * @apiSuccess {String}   result.list.receiver.nickName
 * @apiSuccess {Object}   result.list.receiver.profileImages
 * @apiSuccess {Object}   result.list.receiver.profileImages.objectId
 * @apiSuccess {Object}   result.list.receiver.profileImages.file
 * @apiSuccess {Object}   result.list.receiver.profileImages.thumbSmall
 * @apiSuccess {Object}   result.list.receiver.profileImages.thumbMedium
 * @apiSuccess {Object}   result.list.receiver.profileImages.thumbLarge
 * @apiSuccess {String}   result.list.salonReceiver
 * @apiSuccess {String}   result.list.salonReceiver.objectId
 * @apiSuccess {String}   result.list.salonReceiver.salonName
 * @apiSuccess {String}   result.list.salonReceiver.salonNameKatakana
 * @apiSuccess {Object}   result.list.contributor
 * @apiSuccess {String}   result.list.contributor.objectId
 * @apiSuccess {String}   result.list.contributor.fullName
 * @apiSuccess {String}   result.list.contributor.nickName
 * @apiSuccess {Object}   result.list.contributor.profileImages
 * @apiSuccess {Object}   result.list.contributor.profileImages.objectId
 * @apiSuccess {Object}   result.list.contributor.profileImages.file
 * @apiSuccess {Object}   result.list.contributor.profileImages.thumbSmall
 * @apiSuccess {Object}   result.list.contributor.profileImages.thumbMedium
 * @apiSuccess {Object}   result.list.contributor.profileImages.thumbLarge
 * @apiSuccess {String}   result.list.salonContributor
 * @apiSuccess {String}   result.list.salonContributor.objectId
 * @apiSuccess {String}   result.list.salonContributor.salonName
 * @apiSuccess {String}   result.list.salonContributor.salonNameKatakana
 * @apiSuccessExample {json} Response example
 * {
 *    "result": {
 *        "total": 1,
 *        "list": [
 *           {
 *               "receiver": {
 *                   "objectId": "2Qo1syKwVF",
 *                   "fullName": "Nhan111 Nguyen",
 *                   "nickName": "hugnvu6",
 *                   "profileImages": []
 *               },
 *               "salonReceiver": {
 *                   "objectId": "N10MTB",
 *                   "salonName": "HAIRLIE salon 1",
 *                   "salonNameKatakana": "ヘアリーサロン"
 *               },
 *               "contributor": {
 *                   "objectId": "2AfJxNkZit",
 *                   "fullName": "Nhan111 Nguyen",
 *                   "nickName": "hugnvu6",
 *                   "profileImages": [
 *                       {
 *                           "objectId": "JOpKEWmJvA",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/e4c4e1f341b4bd3e7d0e02b118b962c9_hairlie_image.jpg",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/5302ffe251cf51e8597e35e4aba6e889_post_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/e5faa21c3fe1608ed50c8b89f495c8cc_post_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/ad5e4af12a68da849698d785bf41255d_post_800x800.jpg"
 *                       }
 *                   ]
 *               },
 *               "salonContributor": {
 *                   "objectId": "By37ZY",
 *                   "salonName": "Psycho Killer 4",
 *                   "salonNameKatakana": "フリガナ"
 *               },
 *               "title": "title test",
 *               "content": "content",
 *               "objectId": "Ot1TVYoudhFrjf90FYtrp",
 *               "createdAt": "2022-04-21T04:02:25.399Z"
 *               "updateAt": "2022-05-09T08:41:07.620Z"
 *           }
 *       ]
 *   }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse ErrorExample
 */
function getRecommendationByAdmin() {}

/**
 * @api {post} /deleteRecommendationByAdmin deleteRecommendationByAdmin
 * @apiVersion 1.6.0
 * @apiName deleteRecommendationByAdmin
 * @apiGroup Recommendation-Stylist
 * @apiPermission Login Required as Admin
 *
 * @apiDescription delete recommendation for stylist
 *
 * @apiParam {String} recommendationId
 *
 * @apiExample {json} Request example
 * {
 *   "recommendationId": "VRcNtuaG61gzN19rbcHTF",
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolane} result.success
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
function deleteRecommendationByAdmin() {}

/**
 * @api {post} /getRecommendationByCustomer getRecommendationByCustomer
 * @apiVersion 1.6.0
 * @apiName getRecommendationByCustomer
 * @apiGroup Recommendation-Stylist
 *
 * @apiDescription Get Recommendation List
 *
 * @apiParam {String} [orderBy]   Order key
 * @apiParam {String} [order]     Order direction ['ascending', 'descending']
 * @apiParam {Number} [page]      Default 1
 * @apiParam {Number} [limit]     Default 10
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 10
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Number}   result.total
 * @apiSuccess {Array}    result.list
 * @apiSuccess {String}   result.list.objectId
 * @apiSuccess {String}   result.list.title
 * @apiSuccess {String}   result.list.content
 * @apiSuccess {String}   result.list.createdAt
 * @apiSuccess {String}   result.list.updateAt
 * @apiSuccess {Object}   result.list.receiver
 * @apiSuccess {String}   result.list.receiver.objectId
 * @apiSuccess {Boolean}   result.list.receiver.isFavorite
 * @apiSuccess {String}   result.list.receiver.fullName
 * @apiSuccess {String}   result.list.receiver.nickName
 * @apiSuccess {Object}   result.list.receiver.profileImages
 * @apiSuccess {Object}   result.list.receiver.profileImages.objectId
 * @apiSuccess {Object}   result.list.receiver.profileImages.file
 * @apiSuccess {Object}   result.list.receiver.profileImages.thumbSmall
 * @apiSuccess {Object}   result.list.receiver.profileImages.thumbMedium
 * @apiSuccess {Object}   result.list.receiver.profileImages.thumbLarge
 * @apiSuccess {String}   result.list.salonReceiver
 * @apiSuccess {String}   result.list.salonReceiver.objectId
 * @apiSuccess {String}   result.list.salonReceiver.salonName
 * @apiSuccess {String}   result.list.salonReceiver.salonNameKatakana
 * @apiSuccess {Object}   result.list.contributor
 * @apiSuccess {String}   result.list.contributor.objectId
 * @apiSuccess {Boolean}   result.list.contributor.isFavorite
 * @apiSuccess {String}   result.list.contributor.fullName
 * @apiSuccess {String}   result.list.contributor.nickName
 * @apiSuccess {Object}   result.list.contributor.profileImages
 * @apiSuccess {Object}   result.list.contributor.profileImages.objectId
 * @apiSuccess {Object}   result.list.contributor.profileImages.file
 * @apiSuccess {Object}   result.list.contributor.profileImages.thumbSmall
 * @apiSuccess {Object}   result.list.contributor.profileImages.thumbMedium
 * @apiSuccess {Object}   result.list.contributor.profileImages.thumbLarge
 * @apiSuccess {String}   result.list.salonContributor
 * @apiSuccess {String}   result.list.salonContributor.objectId
 * @apiSuccess {String}   result.list.salonContributor.salonName
 * @apiSuccess {String}   result.list.salonContributor.salonNameKatakana

 *
 * @apiSuccessExample {json} Response example
 * {
 *    "result": {
 *        "total": 1,
 *        "list": [
 *           {
 *               "receiver": {
 *                   "objectId": "2Qo1syKwVF",
 *                   "isFavorite": true,
 *                   "fullName": "Nhan111 Nguyen",
 *                   "nickName": "hugnvu6",
 *                   "profileImages": []
 *               },
 *               "salonReceiver": {
 *                   "objectId": "N10MTB",
 *                   "salonName": "HAIRLIE salon 1",
 *                   "salonNameKatakana": "ヘアリーサロン"
 *               },
 *               "contributor": {
 *                   "objectId": "2AfJxNkZit",
 *                   "isFavorite": true,
 *                   "fullName": "Nhan111 Nguyen",
 *                   "nickName": "hugnvu6",
 *                   "profileImages": [
 *                       {
 *                           "objectId": "JOpKEWmJvA",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/e4c4e1f341b4bd3e7d0e02b118b962c9_hairlie_image.jpg",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/5302ffe251cf51e8597e35e4aba6e889_post_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/e5faa21c3fe1608ed50c8b89f495c8cc_post_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/ad5e4af12a68da849698d785bf41255d_post_800x800.jpg"
 *                       }
 *                   ]
 *               },
 *               "salonContributor": {
 *                   "objectId": "By37ZY",
 *                   "salonName": "Psycho Killer 4",
 *                   "salonNameKatakana": "フリガナ"
 *               },
 *               "title": "title test",
 *               "content": "content",
 *               "objectId": "Ot1TVYoudhFrjf90FYtrp",
 *               "createdAt": "2022-04-21T04:02:25.399Z"
 *               "updateAt": "2022-05-09T08:41:07.620Z"
 *           }
 *       ]
 *   }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse ErrorExample
 */
function getRecommendationByCustomer() {}
