/**
 * @api {post} /getTopStylistByAdmin getTopStylistByAdmin
 * @apiVersion 2.0.0
 * @apiName getTopStylistByAdmin
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Get Top 10 Stylist
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {String}  result.salonId
 * @apiSuccess {String}  result.fullName
 * @apiSuccess {String}  result.nickName
 * @apiSuccess {String}  result.sortOrder
 * @apiSuccess {String}  result.stylistEmail
 * @apiSuccess {String}  result.gender                      Accepted values: ['男性', '女性', 'その他']
 * @apiSuccess {Array}   result.profileImages
 * @apiSuccess {String}  result.profileImages.objectId
 * @apiSuccess {String}  result.profileImages.file
 * @apiSuccess {String}  result.profileImages.thumbLarge
 * @apiSuccess {String}  result.profileImages.thumbMedium
 *
 * @apiSuccessExample {json} Response example
 *{
 *   "result": [
 *       {
 *           "profileImages": [
 *               {
 *                   "objectId": "uXlAMPT3Ag",
 *                   "file": "https://hairlie-dev.s3.amazonaws.com/f4dc77a8c90330375211e795c2906be5_hairlie_image.jpg",
 *                   "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/7cc2d2f164ad5299ad70539368cc54d4_post_250x250.jpg",
 *                   "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/ae3b6e64ec0e349317e756096bfe83e5_post_600x600.jpg",
 *                   "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/e8786bb4d342c65cfbab938160c87df0_post_800x800.jpg"
 *               },
 *           ],
 *           "fullName": "Bogum Park",
 *           "nickName": "Bo Gum",
 *           "gender": "女性",
 *           "status": "PUBLISHED",
 *           "stylistEmail": "zxlncgiczb@yopmail.com",
 *           "objectId": "zXlnCgiczB",
 *           "salonId": "NRc88P",
 *           "sortOrder": 1
 *       },
 *       {
 *           "profileImages": [],
 *           "status": "PUBLISHED",
 *           "fullName": "Nhan Nguyen",
 *           "gender": "男性",
 *           "nickName": "Swagger",
 *           "stylistEmail": "duy2.stylist@yopmail.com",
 *           "objectId": "zxneYyyFRn",
 *           "salonId": "NRc88P",
 *           "sortOrder": 2
 *       }
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getTopStylistByAdmin() {}

/**
 * @api {post} /addTopStylistByAdmin addTopStylistByAdmin
 * @apiVersion 2.0.0
 * @apiName addTopStylistByAdmin
 * @apiGroup Web-Stylist
 * @apiPermission  Login Required as Admin
 *
 * @apiDescription Selected top 10 stylist
 *
 * @apiParam {Array} stylistIds
 *
 * @apiExample {json} Request example
 * {
 *   "stylistIds": ["zxneYyyFRn"],
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolean}  result.success
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "success": true,
 *    }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse ErrorExample
 */
function addTopStylistByAdmin() {}
/**
 * @api {post} /deleteTopStylistByAdmin deleteTopStylistByAdmin
 * @apiVersion 2.0.0
 * @apiName deleteTopStylistByAdmin
 * @apiGroup Web-Stylist
 * @apiPermission  Login Required as Admin
 *
 * @apiDescription Deleted top 10 stylist
 *
 * @apiParam {Array} stylistIds
 *
 * @apiExample {json} Request example
 * {
 *   "stylistIds": ["zxneYyyFRn"],
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolean}  result.success
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "success": true,
 *    }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse ErrorExample
 */
function deleteTopStylistByAdmin() {}

/**
 * @api {post} /sortTopStylistByAdmin sortTopStylistByAdmin
 * @apiVersion 2.0.0
 * @apiName sortTopStylistByAdmin
 * @apiGroup Web-Stylist
 * @apiPermission  Login Required as Admin
 *
 * @apiDescription Sort top 10 stylist
 *
 * @apiParam {Array}  stylists
 * @apiParam {String} stylists.objectId
 * @apiParam {Number} stylists.sortOrder
 *
 * @apiExample {json} Request example
 * {
 * "stylists": [
 *   {
 *     "objectId": "zxneYyyFRn",
 *     "sortOrder": 3
 *   },
 *
 *   {
 *     "objectId": "zXlnCgiczB",
 *     "sortOrder": 2
 *   },
 *
 *   {
 *     "objectId": "zTovNUJMss",
 *     "sortOrder": 1
 *   }
 * ]
 *}

 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Boolean}  result.success
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "success": true,
 *    }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse ErrorExample
 */
function sortTopStylistByAdmin() {}

/**
 * @api {post} /getStylistList getStylistList
 * @apiVersion 2.0.0
 * @apiName getStylistList
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Admin Or Salon Operator
 *
 * @apiDescription Get Stylist List
 *
 * @apiParam {String} [salonId]
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} [orderBy]  Order key
 * @apiParam {String} [order]  Order direction ['ascending', 'descending']
 * @apiParam {String} [searchKey]  Search by fullName
 * @apiParam {String} [status]  Stylist status: PUBLISHED || UNPUBISHED
 * @apiParam {String} [from]  Created from YYYY-MM-DD
 * @apiParam {String} [to]  Created to YYYY-MM-DD
 *
 * @apiExample {json} Request example
 * {
 *   "salonId": "qiODa9eq",
 *   "page": 1,
 *   "limit": 10,
 *   "orderBy": "createdAt",
 *   "order": "ascending",
 *   "searchKey": "nhan",
 *   "from": "2020-06-01",
 *   "to": "2021-06-01",
 *   "status": "PUBLISHED"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {String}  result.list.createdAt
 * @apiSuccess {Object}  result.list.salon
 * @apiSuccess {String}  result.list.salon.objectId
 * @apiSuccess {String}  result.list.salon.salonName
 * @apiSuccess {String}  result.list.salon.salonAddress1
 * @apiSuccess {String}  result.list.salon.salonAddress2
 * @apiSuccess {String}  result.list.salon.stationName
 * @apiSuccess {String}  result.list.salon.distanceNearestStation
 * @apiSuccess {Array}   result.list.profileImages
 * @apiSuccess {String}  result.list.profileImages.objectId
 * @apiSuccess {String}  result.list.profileImages.file
 * @apiSuccess {String}  result.list.profileImages.thumbLarge
 * @apiSuccess {String}  result.list.profileImages.thumbMedium
 * @apiSuccess {String}  result.list.profileImages.thumbSmall
 * @apiSuccess {String}  result.list.firstName
 * @apiSuccess {String}  result.list.lastName
 * @apiSuccess {String}  result.list.fullName
 * @apiSuccess {String}  result.list.nickName
 * @apiSuccess {String}  result.list.stylistEmail                Provided if role is SALON_OPERATOR or ADMIN
 * @apiSuccess {String}  result.list.slug
 * @apiSuccess {String}  result.list.gender                      Accepted values: ['男性', '女性', 'その他']
 * @apiSuccess {String}  result.list.profileText
 * @apiSuccess {String}  result.list.objectId
 * @apiSuccess {Object}  result.list.stylistSNS
 * @apiSuccess {String}  result.list.stylistSNS.facebook
 * @apiSuccess {String}  result.list.stylistSNS.instagram
 * @apiSuccess {String}  result.list.stylistSNS.tiktok
 * @apiSuccess {String}  result.list.stylistSNS.youtube
 * @apiSuccess {String}  result.list.stylistSNS.twitter
 * @apiSuccess {Object}  result.profile
 * @apiSuccess {String}  result.profile.catchPhrase
 * @apiSuccess {Number}  result.reviewCount
 * @apiSuccess {Number}  result.generalScore
 * @apiSuccess {Number}  result.styleScore
 * @apiSuccess {Number}  result.serviceScore
 * @apiSuccess {Array}   result.lastPosts
 * @apiSuccess {string}  result.lastPosts.objectId
 * @apiSuccess {Number}  result.lastPosts.totalPrice
 * @apiSuccess {Array}   result.lastPosts.images
 * @apiSuccess {String}  result.lastPosts.images.objectId
 * @apiSuccess {String}  result.lastPosts.images.file
 * @apiSuccess {String}  result.lastPosts.images.thumbSmall
 * @apiSuccess {String}  result.lastPosts.images.thumbMedium
 * @apiSuccess {String}  result.lastPosts.images.thumbLarge
 * @apiSuccess {Number}  result.recommendationNumber
 * @apiSuccess {Array}   result.lastContributor
 * @apiSuccess {string}  result.lastContributor.objectId
 * @apiSuccess {Array}   result.lastContributor.profileImages
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *        {
 *          "createdAt": "2020-08-19T02:04:27.047Z",
 *          "reviewCount": 7,
 *          "generalScore": 4.3,
 *          "styleScore": 2.9,
 *          "serviceScore": 3.6,
 *          "lastPosts": [
 *                   {
 *                       "objectId": "3mRioWnsG3",
 *                       "images": [
 *                           {
 *                               "objectId": "bhbsGVFQFc",
 *                               "file": "https://hairlie-dev.s3.amazonaws.com/8379871b2fdaf992c65a1b2a7b4c8879_hairlie_image.jpg",
 *                               "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/deae9b1eeecafee8ef23f5e55e8d7f1c_post_250x250.jpg",
 *                               "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/29c1d1aae4b8382b2a097a888870b867_post_600x600.jpg",
 *                               "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/2784191c62abd2229c3a8bcd52f31bb8_post_800x800.jpg"
 *                           }
 *                       ],
 *                       "totalPrice": 3435
 *                   }
 *               ],
 *          "salon": {
 *            "objectId": "nyG1k8",
 *            "salonName": "hahaha",
 *            "salonAddress1": "PREFECTURE1",
 *            "salonAddress2": "yok",
 *            "distanceNearestStation": 11,
              "stationName": "Toyko",
 *          },
 *          "profileImages": [
 *            {
 *              "objectId": "mxA3Zcygwt",
 *              "file": "https://hairlie-dev.s3.amazonaws.com/94730348c9a9e25c64ec39d03a7873ba_M_DSho_O.jpg",
 *              "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/925cf41f52b39ba27dc97332323177f1_salon_800x800.jpg",
 *              "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/e5de705e6f578c374d95783ff6250197_salon_600x600.jpg",
 *              "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/f3acb3c18a5d21a65bc3c86c3f08227d_salon_250x250.jpg"
 *            },
 *            {
 *              "objectId": "NGDBkFAzsJ",
 *              "file": "https://hairlie-dev.s3.amazonaws.com/5d0fb9ead6036e99f888d7d8a996ae85_M_DSho_O.jpg",
 *              "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/d0d116bcc6cc1f46a5695d2b4642f033_salon_800x800.jpg",
 *              "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/321c335a5a7dd9035821313e09784aec_salon_600x600.jpg",
 *              "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/7dd074dc257ef11495d29dc4aa69907e_salon_250x250.jpg"
 *            },
 *            {
 *              "objectId": "yRmzmGXiAW",
 *              "file": "https://hairlie-dev.s3.amazonaws.com/4f2e61beb2d24bf3c9fbaf1c4edc7290_M_DSho_O.jpg",
 *              "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/749565b62e971490c1bf99414095f0db_salon_800x800.jpg",
 *              "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/28b421bed2816112598da9cbc18fd479_salon_600x600.jpg",
 *              "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/386dd1e91a934c403f252b07221f6677_salon_250x250.jpg"
 *            }
 *          ],
 *          "firstName": "Nguyen",
 *          "lastName": "Nhan",
 *          "fullName": "Nhan Nguyen",
 *          "nickName": "Swagger",
 *          "slug": "swagger",
 *          "gender": "男性",
 *          "stylistEmail": "abc@yopmail.com",
 *          "profileText": "Do it",
 *          "stylistSNS": {
 *            "facebook": "nguyen.nhan"
 *          },
 *          "status": "PUBLISHED",
 *          "recommendationNumber": 2,
 *          "lastContributor": [
 *                   {
 *                       "profileImages": [],
 *                       "objectId": "zxneYyyFRn"
 *                   }
 *           ],
 *          "objectId": "UxhVodAYn6",
 *          "profile": {
 *            "catchPhrase": "catch phrase value"
 *           },
 *        }
 *      ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse ErrorExample
 */
function getStylistList() {}

/**
 * @api {post} /getTopStylistByCustomer getTopStylistByCustomer
 * @apiVersion 2.0.0
 * @apiName getTopStylistByCustomer
 * @apiGroup Web-Stylist
 *
 * @apiDescription Get Top Stylist
 *

 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 * @apiParam {String} [orderBy]  Default "topStylist.sortOrder"
 * @apiParam {String} [order]   Default "ascending"
 * @apiParam {String} [status]  Stylist status: PUBLISHED || UNPUBISHED
 *
 * @apiExample {json} Request example
 * {}
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {String}  result.list.createdAt
 * @apiSuccess {Object}  result.list.salon
 * @apiSuccess {String}  result.list.salon.objectId
 * @apiSuccess {String}  result.list.salon.salonName
 * @apiSuccess {String}  result.list.salon.salonAddress1
 * @apiSuccess {String}  result.list.salon.salonAddress2
 * @apiSuccess {String}  result.list.salon.stationName
 * @apiSuccess {String}  result.list.salon.distanceNearestStation
 * @apiSuccess {Array}   result.list.profileImages
 * @apiSuccess {String}  result.list.profileImages.objectId
 * @apiSuccess {String}  result.list.profileImages.file
 * @apiSuccess {String}  result.list.profileImages.thumbLarge
 * @apiSuccess {String}  result.list.profileImages.thumbMedium
 * @apiSuccess {String}  result.list.profileImages.thumbSmall
 * @apiSuccess {String}  result.list.firstName
 * @apiSuccess {String}  result.list.lastName
 * @apiSuccess {String}  result.list.fullName
 * @apiSuccess {String}  result.list.nickName
 * @apiSuccess {String}  result.list.stylistEmail                Provided if role is SALON_OPERATOR or ADMIN
 * @apiSuccess {String}  result.list.slug
 * @apiSuccess {String}  result.list.gender                      Accepted values: ['男性', '女性', 'その他']
 * @apiSuccess {String}  result.list.profileText
 * @apiSuccess {String}  result.list.objectId
 * @apiSuccess {Object}  result.list.stylistSNS
 * @apiSuccess {String}  result.list.stylistSNS.facebook
 * @apiSuccess {String}  result.list.stylistSNS.instagram
 * @apiSuccess {String}  result.list.stylistSNS.tiktok
 * @apiSuccess {String}  result.list.stylistSNS.youtube
 * @apiSuccess {String}  result.list.stylistSNS.twitter
 * @apiSuccess {Object}  result.profile
 * @apiSuccess {String}  result.profile.catchPhrase
 * @apiSuccess {Number}  result.reviewCount
 * @apiSuccess {Number}  result.generalScore
 * @apiSuccess {Number}  result.styleScore
 * @apiSuccess {Number}  result.serviceScore
 * @apiSuccess {Array}   result.lastPosts
 * @apiSuccess {string}  result.lastPosts.objectId
 * @apiSuccess {Number}  result.lastPosts.totalPrice
 * @apiSuccess {Array}   result.lastPosts.images
 * @apiSuccess {String}  result.lastPosts.images.objectId
 * @apiSuccess {String}  result.lastPosts.images.file
 * @apiSuccess {String}  result.lastPosts.images.thumbSmall
 * @apiSuccess {String}  result.lastPosts.images.thumbMedium
 * @apiSuccess {String}  result.lastPosts.images.thumbLarge
 * @apiSuccess {Number}  result.recommendationNumber
 * @apiSuccess {Array}   result.lastContributor
 * @apiSuccess {string}  result.lastContributor.objectId
 * @apiSuccess {Array}   result.lastContributor.profileImages
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *        {
 *          "createdAt": "2020-08-19T02:04:27.047Z",
 *          "reviewCount": 7,
 *          "generalScore": 4.3,
 *          "styleScore": 2.9,
 *          "serviceScore": 3.6,
 *          "lastPosts": [
 *                   {
 *                       "objectId": "3mRioWnsG3",
 *                       "images": [
 *                           {
 *                               "objectId": "bhbsGVFQFc",
 *                               "file": "https://hairlie-dev.s3.amazonaws.com/8379871b2fdaf992c65a1b2a7b4c8879_hairlie_image.jpg",
 *                               "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/deae9b1eeecafee8ef23f5e55e8d7f1c_post_250x250.jpg",
 *                               "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/29c1d1aae4b8382b2a097a888870b867_post_600x600.jpg",
 *                               "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/2784191c62abd2229c3a8bcd52f31bb8_post_800x800.jpg"
 *                           }
 *                       ],
 *                       "totalPrice": 3435
 *                   }
 *               ],
 *          "salon": {
 *            "objectId": "nyG1k8",
 *            "salonName": "hahaha",
 *            "salonAddress1": "PREFECTURE1",
 *            "salonAddress2": "yok",
 *            "distanceNearestStation": 11,
              "stationName": "Toyko",
 *          },
 *          "profileImages": [
 *            {
 *              "objectId": "mxA3Zcygwt",
 *              "file": "https://hairlie-dev.s3.amazonaws.com/94730348c9a9e25c64ec39d03a7873ba_M_DSho_O.jpg",
 *              "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/925cf41f52b39ba27dc97332323177f1_salon_800x800.jpg",
 *              "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/e5de705e6f578c374d95783ff6250197_salon_600x600.jpg",
 *              "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/f3acb3c18a5d21a65bc3c86c3f08227d_salon_250x250.jpg"
 *            },
 *            {
 *              "objectId": "NGDBkFAzsJ",
 *              "file": "https://hairlie-dev.s3.amazonaws.com/5d0fb9ead6036e99f888d7d8a996ae85_M_DSho_O.jpg",
 *              "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/d0d116bcc6cc1f46a5695d2b4642f033_salon_800x800.jpg",
 *              "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/321c335a5a7dd9035821313e09784aec_salon_600x600.jpg",
 *              "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/7dd074dc257ef11495d29dc4aa69907e_salon_250x250.jpg"
 *            },
 *            {
 *              "objectId": "yRmzmGXiAW",
 *              "file": "https://hairlie-dev.s3.amazonaws.com/4f2e61beb2d24bf3c9fbaf1c4edc7290_M_DSho_O.jpg",
 *              "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/749565b62e971490c1bf99414095f0db_salon_800x800.jpg",
 *              "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/28b421bed2816112598da9cbc18fd479_salon_600x600.jpg",
 *              "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/386dd1e91a934c403f252b07221f6677_salon_250x250.jpg"
 *            }
 *          ],
 *          "firstName": "Nguyen",
 *          "lastName": "Nhan",
 *          "fullName": "Nhan Nguyen",
 *          "nickName": "Swagger",
 *          "slug": "swagger",
 *          "gender": "男性",
 *          "stylistEmail": "abc@yopmail.com",
 *          "profileText": "Do it",
 *          "stylistSNS": {
 *            "facebook": "nguyen.nhan"
 *          },
 *          "status": "PUBLISHED",
 *          "recommendationNumber": 2,
 *          "lastContributor": [
 *                   {
 *                       "profileImages": [],
 *                       "objectId": "zxneYyyFRn"
 *                   }
 *           ],
 *          "objectId": "UxhVodAYn6",
 *          "profile": {
 *            "catchPhrase": "catch phrase value"
 *           },
 *        }
 *      ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse ErrorExample
 */
function getTopStylistByCustomer() {}

/**
 * @api {post} /getRecommendationForAStylist getRecommendationForAStylist
 * @apiVersion 2.0.0
 * @apiName getRecommendationForAStylist
 * @apiGroup Recommendation
 *
 * @apiDescription Get recommendations for a stylist
 *
 * @apiParam {String} stylistId
 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 * @apiParam {String} [orderBy]  Default "updateAt"
 * @apiParam {String} [order]   Default "ascending"
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "gJQu5XT931"
 *   "orderBy": "updateAt"
 *   "order": "ascending"
 *   "page": 1
 *   "limit": 10
 * }
 *
 * @apiSuccess {Array}   result
 * @apiSuccess {Object}  result.receiver
 * @apiSuccess {String}  result.receiver.objectId
 * @apiSuccess {String}  result.receiver.fullName
 * @apiSuccess {String}  result.receiver.nickName
 * @apiSuccess {Array}   result.receiver.profileImages
 * @apiSuccess {Object}  result.salonReceiver
 * @apiSuccess {String}  result.salonReceiver.objectId
 * @apiSuccess {String}  result.salonReceiver.salonName
 * @apiSuccess {String}  result.salonReceiver.salonNameKatakana
 * @apiSuccess {String}  result.salonReceiver.salonAddress1
 * @apiSuccess {String}  result.salonReceiver.salonAddress2
 * @apiSuccess {Object}  result.contributor
 * @apiSuccess {String}  result.contributor.objectId
 * @apiSuccess {String}  result.contributor.fullName
 * @apiSuccess {String}  result.contributor.nickName
 * @apiSuccess {Array}   result.contributor.profileImages
 * @apiSuccess {Object}  result.salonContributor
 * @apiSuccess {String}  result.salonContributor.objectId
 * @apiSuccess {String}  result.salonContributor.salonName
 * @apiSuccess {String}  result.salonContributor.salonNameKatakana
 * @apiSuccess {String}  result.salonContributor.salonAddress1
 * @apiSuccess {String}  result.salonContributor.salonAddress2
 * @apiSuccess {String}  result.title
 * @apiSuccess {String}  result.content
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.updatedAt
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *       {
 *           "receiver": {
 *               "objectId": "P9gJlSC8sC",
 *               "fullName": "Okayu Nekomata",
 *               "nickName": "Nyan",
 *               "userStatus": "INVITED",
 *               "profileImages": [
 *                   {
 *                       "objectId": "0CSgxZRmUo",
 *                       "file": "https://hairlie-dev.s3.amazonaws.com/e6c5c56d37ea1078430645c5767f794c_hairlie_image.jpg",
 *                       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/e847f0bb9485427caff3f26250be9cee_post_250x250.jpg",
 *                       "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/3e1e9ec2f2921ca21222e0b5d818dae5_post_600x600.jpg",
 *                       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/02cf944651b70b47f3e702a3f4b82ba6_post_800x800.jpg"
 *                   }
 *               ]
 *           },
 *           "salonReceiver": {
 *               "objectId": "nyG1k8",
 *               "salonName": "qweqwe qweqw eqwe",
 *               "salonNameKatakana": "ewq qwewq"
 *               "salonAddress1": "北海道 1",
 *               "salonAddress2": "Tsukisamu Higashi 2 Jo",
 *           },
 *           "contributor": {
 *               "objectId": "el2D6CqqMW",
 *               "fullName": "Yel Tran",
 *               "nickName": "NuNa",
 *               "userStatus": "INVITED",
 *               "profileImages": [
 *                   {
 *                       "objectId": "fwRQ7QNlco",
 *                       "file": "https://hairlie-dev.s3.amazonaws.com/49a08c3edcb11443078ffa20c6376375_hairlie_image.jpg",
 *                       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/89e7ada979811af5954150d1c25bf22a_post_250x250.jpg",
 *                       "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/4ff853e8c0d6f34f22f25c76503cf0ec_post_600x600.jpg",
 *                       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/cec03705cfda608897970d9dff5575c9_post_800x800.jpg"
 *                   }
 *               ]
 *           },
 *            "salonContributor": {
 *               "objectId": "nyG1k8",
 *               "salonName": "qweqwe qweqw eqwe",
 *               "salonNameKatakana": "ewq qwewq"
 *               "salonAddress1": "北海道 1",
 *               "salonAddress2": "Tsukisamu Higashi 2 Jo",
 *           },
 *           "title": "sckjncka",
 *           "content": "sdfnksjdf \nsdfsdkfj \nsdfs df sjdf sdfo sjdi fsod fsidf sjdfi",
 *           "objectId": "0tHWMKlyraaInPcArp2h3",
 *           "createdAt": "2022-05-05T06:26:19.566Z"
 *       }
 *   ]
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse MarkAllNotificationsNotFound
 */
function getRecommendationForAStylist() {}
