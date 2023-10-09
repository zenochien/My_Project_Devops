/**
 * @api {post} /getStylistDetail getStylistDetail
 * @apiVersion 1.0.0
 * @apiName getStylistDetail
 * @apiGroup Web-Stylist
 *
 * @apiDescription Get Stylist Details
 *
 * @apiParam {String} objectId          objectId of Stylist
 *
 * @apiExample {json} Request example
 * {
 *   "objectId": "UxhVodAYn6",
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {String}  result.salon.salonName
 * @apiSuccess {Array}   result.profileImages
 * @apiSuccess {String}  result.profileImages.objectId
 * @apiSuccess {String}  result.profileImages.file
 * @apiSuccess {String}  result.profileImages.thumbLarge
 * @apiSuccess {String}  result.profileImages.thumbMedium
 * @apiSuccess {String}  result.profileImages.thumbSmall
 * @apiSuccess {String}  result.firstName
 * @apiSuccess {String}  result.lastName
 * @apiSuccess {String}  result.fullName
 * @apiSuccess {String}  result.nickName
 * @apiSuccess {String}  result.stylistEmail                Provided if role is SALON_OPERATOR or ADMIN or STYLIST(oneself)
 * @apiSuccess {String}  result.slug
 * @apiSuccess {String}  result.gender                      Accepted values: ['男性', '女性', 'その他']
 * @apiSuccess {String}  result.profileText
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {Object}  result.stylistSNS
 * @apiSuccess {String}  result.stylistSNS.facebook
 * @apiSuccess {String}  result.stylistSNS.instagram
 * @apiSuccess {String}  result.stylistSNS.tiktok
 * @apiSuccess {String}  result.stylistSNS.youtube
 * @apiSuccess {String}  result.stylistSNS.twitter
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "createdAt": "2020-08-19T02:04:27.047Z",
 *     "salon": {
 *       "objectId": "nyG1k8",
 *       "salonName": "hahaha"
 *     },
 *     "profileImages": [
 *       {
 *         "objectId": "mxA3Zcygwt",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/94730348c9a9e25c64ec39d03a7873ba_M_DSho_O.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/925cf41f52b39ba27dc97332323177f1_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/e5de705e6f578c374d95783ff6250197_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/f3acb3c18a5d21a65bc3c86c3f08227d_salon_250x250.jpg"
 *       },
 *       {
 *         "objectId": "NGDBkFAzsJ",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/5d0fb9ead6036e99f888d7d8a996ae85_M_DSho_O.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/d0d116bcc6cc1f46a5695d2b4642f033_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/321c335a5a7dd9035821313e09784aec_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/7dd074dc257ef11495d29dc4aa69907e_salon_250x250.jpg"
 *       },
 *       {
 *         "objectId": "yRmzmGXiAW",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/4f2e61beb2d24bf3c9fbaf1c4edc7290_M_DSho_O.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/749565b62e971490c1bf99414095f0db_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/28b421bed2816112598da9cbc18fd479_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/386dd1e91a934c403f252b07221f6677_salon_250x250.jpg"
 *       }
 *     ],
 *     "firstName": "Nguyen",
 *     "lastName": "Nhan",
 *     "fullName": "Nhan Nguyen",
 *     "nickName": "Swagger",
 *     "stylistEmail": "abc@yopmail.com",
 *     "slug": "swagger",
 *     "gender": "男性",
 *     "profileText": "Do it",
 *     "stylistEmail": "stylist@yopmail.com"
 *     "stylistSNS": {
 *       "facebook": "nguyen.nhan"
 *     },
 *     "objectId": "UxhVodAYn6"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getStylistDetail() {}

/**
 * @api {post} /createStylist createStylist
 * @apiVersion 1.0.0
 * @apiName createStylist
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Admin Or Salon Operator
 *
 * @apiDescription Create new Stylist
 *
 * @apiParam {String} salonId
 * @apiParam {String} email
 * @apiParam {String} firstName
 * @apiParam {String} lastName
 * @apiParam {String} nickName
 * @apiParam {String} [gender]            Accepted values: ['男性', '女性', 'その他']
 * @apiParam {String} profileText
 * @apiParam {Array}  [profileImages]     objectIds of Images, min 0 image (empty array), max 4 images
 * @apiParam {Object} [stylistSNS]        Social media username (or profile path)
 * @apiParam {String} [stylistSNS.facebook]
 * @apiParam {String} [stylistSNS.instagram]
 * @apiParam {String} [stylistSNS.tiktok]
 * @apiParam {String} [stylistSNS.youtube]
 * @apiParam {String} [stylistSNS.twitter]
 *
 * @apiExample {json} Request example
 * {
 *   "salonId": "nyG1k8",
 *   "email": "stylist@yopmail.com",
 *   "firstName": "Nguyen",
 *   "lastName": "Nhan",
 *   "nickName": "Swagger",
 *   "gender": "男性",
 *   "profileImages": ["mxA3Zcygwt","NGDBkFAzsJ", "yRmzmGXiAW"],
 *   "profileText": "Do it",
 *   "stylistSNS": {
 *       "facebook": "nguyen.nhan"
 *   }
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {Array}   result.profileImages
 * @apiSuccess {String}  result.profileImages.objectId
 * @apiSuccess {String}  result.profileImages.file
 * @apiSuccess {String}  result.profileImages.thumbLarge
 * @apiSuccess {String}  result.profileImages.thumbMedium
 * @apiSuccess {String}  result.profileImages.thumbSmall
 * @apiSuccess {String}  result.firstName
 * @apiSuccess {String}  result.lastName
 * @apiSuccess {String}  result.fullName
 * @apiSuccess {String}  result.nickName
 * @apiSuccess {String}  result.stylistEmail
 * @apiSuccess {String}  result.slug
 * @apiSuccess {String}  result.gender
 * @apiSuccess {String}  result.profileText
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {Object}  result.stylistSNS
 * @apiSuccess {String}  result.stylistSNS.facebook
 * @apiSuccess {String}  result.stylistSNS.instagram
 * @apiSuccess {String}  result.stylistSNS.tiktok
 * @apiSuccess {String}  result.stylistSNS.youtube
 * @apiSuccess {String}  result.stylistSNS.twitter
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "createdAt": "2020-08-19T02:04:27.047Z",
 *     "salon": {
 *       "objectId": "nyG1k8"
 *     },
 *     "profileImages": [
 *       {
 *         "objectId": "mxA3Zcygwt",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/94730348c9a9e25c64ec39d03a7873ba_M_DSho_O.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/925cf41f52b39ba27dc97332323177f1_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/e5de705e6f578c374d95783ff6250197_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/f3acb3c18a5d21a65bc3c86c3f08227d_salon_250x250.jpg"
 *       },
 *       {
 *         "objectId": "NGDBkFAzsJ",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/5d0fb9ead6036e99f888d7d8a996ae85_M_DSho_O.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/d0d116bcc6cc1f46a5695d2b4642f033_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/321c335a5a7dd9035821313e09784aec_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/7dd074dc257ef11495d29dc4aa69907e_salon_250x250.jpg"
 *       },
 *       {
 *         "objectId": "yRmzmGXiAW",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/4f2e61beb2d24bf3c9fbaf1c4edc7290_M_DSho_O.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/749565b62e971490c1bf99414095f0db_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/28b421bed2816112598da9cbc18fd479_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/386dd1e91a934c403f252b07221f6677_salon_250x250.jpg"
 *       }
 *     ],
 *     "firstName": "Nguyen",
 *     "lastName": "Nhan",
 *     "fullName": "Nhan Nguyen",
 *     "nickName": "Swagger",
 *     "stylistEmail": "abc@yopmail.com"
 *     "slug": "swagger",
 *     "gender": "男性",
 *     "profileText": "Do it",
 *     "stylistSNS": {
 *       "facebook": "nguyen.nhan"
 *     },
 *     "objectId": "UxhVodAYn6"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParams
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse AddStylistCbError
 * @apiUse InvalidMongoOperationError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function createStylist() {}

/**
 * @api {post} /updateStylist updateStylist
 * @apiVersion 1.0.0
 * @apiName updateStylist
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Admin Or Salon Operator Or Stylist
 *
 * @apiDescription Update Stylist
 *
 * @apiParam {String} stylistId           Required if role is not stylist
 * @apiParam {String} [stylistEmail]
 * @apiParam {String} [firstName]
 * @apiParam {String} [lastName]
 * @apiParam {String} [nickName]
 * @apiParam {String} [gender]            Accepted values: ['男性', '女性', 'その他']
 * @apiParam {String} [profileText]
 * @apiParam {String} [status]            Stylist status: PUBLISHED || UNPUBISHED
 * @apiParam {Array}  [profileImages]     objectIds of Images, max 4 images, min 0 image (empty array) to delete old images
 * @apiParam {Object} [stylistSNS]        Social media username (or profile path)
 * @apiParam {String} [stylistSNS.facebook]
 * @apiParam {String} [stylistSNS.instagram]
 * @apiParam {String} [stylistSNS.tiktok]
 * @apiParam {String} [stylistSNS.youtube]
 * @apiParam {String} [stylistSNS.twitter]
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "UxhVodAYn6",
 *   "firstName": "Nguyen",
 *   "lastName": "Nhan",
 *   "nickName": "Swagger",
 *   "stylistEmail": "swagger@yopmail.com",
 *   "gender": "男性",
 *   "profileImages": ["mxA3Zcygwt","NGDBkFAzsJ", "yRmzmGXiAW"],
 *   "status": "PUBLISHED"
 *   "profileText": "Do it",
 *   "stylistSNS": {
 *       "facebook": "nguyen.nhan"
 *   }
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {Object}  result.salon
 * @apiSuccess {String}  result.salon.objectId
 * @apiSuccess {Array}   result.profileImages
 * @apiSuccess {String}  result.profileImages.objectId
 * @apiSuccess {String}  result.profileImages.file
 * @apiSuccess {String}  result.profileImages.thumbLarge
 * @apiSuccess {String}  result.profileImages.thumbMedium
 * @apiSuccess {String}  result.profileImages.thumbSmall
 * @apiSuccess {String}  result.firstName
 * @apiSuccess {String}  result.lastName
 * @apiSuccess {String}  result.fullName
 * @apiSuccess {String}  result.nickName
 * @apiSuccess {String}  result.stylistEmail
 * @apiSuccess {String}  result.gender
 * @apiSuccess {String}  result.profileText
 * @apiSuccess {String}  result.status
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {Object}  result.stylistSNS
 * @apiSuccess {String}  result.stylistSNS.facebook
 * @apiSuccess {String}  result.stylistSNS.instagram
 * @apiSuccess {String}  result.stylistSNS.tiktok
 * @apiSuccess {String}  result.stylistSNS.youtube
 * @apiSuccess {String}  result.stylistSNS.twitter
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "createdAt": "2020-08-19T02:04:27.047Z",
 *     "salon": {
 *       "objectId": "nyG1k8"
 *     },
 *     "profileImages": [
 *       {
 *         "objectId": "mxA3Zcygwt",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/94730348c9a9e25c64ec39d03a7873ba_M_DSho_O.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/925cf41f52b39ba27dc97332323177f1_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/e5de705e6f578c374d95783ff6250197_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/f3acb3c18a5d21a65bc3c86c3f08227d_salon_250x250.jpg"
 *       },
 *       {
 *         "objectId": "NGDBkFAzsJ",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/5d0fb9ead6036e99f888d7d8a996ae85_M_DSho_O.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/d0d116bcc6cc1f46a5695d2b4642f033_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/321c335a5a7dd9035821313e09784aec_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/7dd074dc257ef11495d29dc4aa69907e_salon_250x250.jpg"
 *       },
 *       {
 *         "objectId": "yRmzmGXiAW",
 *         "file": "https://hairlie-dev.s3.amazonaws.com/4f2e61beb2d24bf3c9fbaf1c4edc7290_M_DSho_O.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/749565b62e971490c1bf99414095f0db_salon_800x800.jpg",
 *         "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/28b421bed2816112598da9cbc18fd479_salon_600x600.jpg",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/386dd1e91a934c403f252b07221f6677_salon_250x250.jpg"
 *       }
 *     ],
 *     "status": "PUBLISHED",
 *     "firstName": "Nguyen",
 *     "lastName": "Nhan",
 *     "fullName": "Nhan Nguyen",
 *     "nickName": "Swagger",
 *     "slug": "swagger",
 *     "gender": "男性",
 *     "profileText": "Do it",
 *     "stylistSNS": {
 *       "facebook": "nguyen.nhan"
 *     },
 *     "objectId": "UxhVodAYn6"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function updateStylist() {}

/**
 * @api {post} /getStylistList getStylistList
 * @apiVersion 1.0.0
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
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *        {
 *          "createdAt": "2020-08-19T02:04:27.047Z",
 *          "salon": {
 *            "objectId": "nyG1k8",
 *            "salonName": "hahaha"
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
 *          "objectId": "UxhVodAYn6"
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
 * @api {post} /customerGetStylistDetailPage customerGetStylistDetailPage
 * @apiVersion 1.0.0
 * @apiName customerGetStylistDetailPage
 * @apiGroup Web-Customer-Stylist
 *
 * @apiDescription Get Stylist detail on Customer page
 *
 * @apiParam {String} stylistId
 * @apiParam {Number} limit (optional, default is 10)
 * @apiParam {String} [status] Accepted values: ['PUBLISHED', 'UNPUBLISHED']
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "eI1sUdrIc5",
 *   "limit": 8,
 *   "status": "PUBLISHED"
 * }
 *
 * @apiSuccess {Object}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "stylist": {
 *       "createdAt": "2020-08-27T03:38:06.317Z",
 *       "salon": {
 *         "salonName": "Psycho Killer",
 *         "objectId": "nyG1k8"
 *       },
 *       "profileImages": [
 *         {
 *           "objectId": "XPDzdDh5LC",
 *           "file": "https://hairlie-dev.s3.amazonaws.com/feb2b85e61b52fa643e4177a0675b688_hairlie_image.jpg",
 *           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/5e5e4143ed76319abe8f3cb533afd6cb_stylist_250x250.jpg",
 *           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/6c122a6b5f3cbe8dcd12550dc52c2a6e_stylist_600x600.jpg",
 *           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/e7301cb7bc9d4fe3a6650fbfef868f9c_stylist_800x800.jpg"
 *         }
 *       ],
 *       "fullName": "adadad adadada",
 *       "nickName": "adadadadad",
 *       "slug": "adadadadad",
 *       "profileText": "adad",
 *       "stylistSNS": {},
 *       "objectId": "eI1sUdrIc5"
 *     },
 *     "posts": [
 *       {
 *         "tags": [
 *             "fsfsf",
 *             "sfsf"
 *         ],
 *         "images": [
 *           {
 *             "objectId": "SFDPHQlUei",
 *             "file": "https://hairlie-dev.s3.amazonaws.com/bf839b3ab24e09e12a9f73b0587f9ef1_hairlie_image.jpeg",
 *             "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/c1a466b883f2b49f15fa11c4268da730_post_250x250.jpg",
 *             "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/1734abd07c6c2a181237569d73b6d921_post_600x600.jpg",
 *             "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/eabb0665ed3d4e7afb6f613e6f7a8555_post_800x800.jpg"
 *           }
 *         ],
 *         "stylist": {
 *           "profileImages": [
 *             {
 *               "objectId": "8Yo5HCoyaP",
 *               "file": "https://hairlie-dev.s3.amazonaws.com/30a8d2eee10b97b0d7995c580242cb70_hairlie_image.jpg",
 *               "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/de7ad84654866194e219051a807cc42c_post_250x250.jpg",
 *               "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/fb6227c08a25ce5859b9cf5a34ebff4a_post_600x600.jpg",
 *               "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/eb0dfcfad3f140a13df1c32f499bf573_post_800x800.jpg"
 *             }
 *           ],
 *           "fullName": "Kiet Anh",
 *           "objectId": "xsX53jqzxs"
 *         },
 *         "totalPrice": 200,
 *         "createdAt": "2020-09-08T01:24:03.351Z",
 *         "objectId": "Ja4XYqVKaH"
 *       },
 *     ],
 *     "categories": [
 *        {
 *          "name": "HEAD SPA",
 *          "menus": [
 *            {
 *              "objectId": "Cna3E9HdTR",
 *              "name": "menu ne",
 *              "amount": 111,
 *              "description": "description moi ne"
 *            }
 *          ],
 *          "objectId": "VMcx8Oyy37"
 *        },
 *      ],
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function customerGetStylistDetailPage() {}

/**
 * @api {post} /updateStylistWeeklySchedule updateStylistWeeklySchedule
 * @apiVersion 0.5.0
 * @apiName updateStylistWeeklySchedule
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Salon Operator or Admin or Stylist
 *
 * @apiDescription Update a stylist's weekly schedule. If you want to set a day not working, you have to set both startTime and endTime to '00:00'. If you don't set a day, it will keep the old value unchanged.
 *
 * @apiParam {String} stylistId                     Required if role is not Stylist
 * @apiParam {Object} stylistSchedules              stylist's weekly schedules
 * @apiParam {Array}  stylistSchedules.0            stylist's weekly schedule in a day (0: for Sunday)
 * @apiParam {String} stylistSchedules.0.startTime  start time of stylist's weekly schedule in a day (0: for Sunday)
 * @apiParam {String} stylistSchedules.0.endTime    end time of stylist's weekly schedule in a day (0: for Sunday)
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "JMO71YjQQt",
 *   "stylistSchedules": {
 *       "0": [{
 *         "startTime": "09:00",
 *         "endTime": "17:00"
 *       },
 *       {
 *         "startTime": "22:00",
 *         "endTime": "23:00"
 *       }],
 *       "2": [{
 *         "startTime": "10:00",
 *         "endTime": "21:00"
 *       }],
 *       "3": [{
 *         "startTime": "10:00",
 *         "endTime": "21:00"
 *       }],
 *       "4": [{
 *         "startTime": "10:00",
 *         "endTime": "21:00"
 *       }],
 *       "5": [{
 *         "startTime": "10:00",
 *         "endTime": "21:00"
 *       }],
 *       "6": [{
 *         "startTime": "10:00",
 *         "endTime": "21:00"
 *       }]
 *     }
 *  }
 *
 * @apiSuccess {Object}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *    "result": {
 *      "success": true,
 *      "stylistSchedules": {
 *        "0": [
 *          {
 *            "startTime": "09:00",
 *            "endTime": "17:00"
 *          },
 *          {
 *            "startTime": "22:00",
 *            "endTime": "23:00"
 *          }
 *        ],
 *        "2": [
 *          {
 *            "startTime": "10:00",
 *            "endTime": "21:00"
 *          }
 *        ],
 *        "3": [
 *          {
 *            "startTime": "10:00",
 *            "endTime": "21:00"
 *          }
 *        ],
 *        "4": [
 *          {
 *            "startTime": "10:00",
 *            "endTime": "21:00"
 *          }
 *        ],
 *        "5": [
 *          {
 *            "startTime": "10:00",
 *            "endTime": "21:00"
 *          }
 *        ],
 *        "6": [
 *          {
 *            "startTime": "10:00",
 *            "endTime": "21:00"
 *          }
 *        ]
 *      }
 *    }
 * }
 *
 * @apiErrorExample  {json} AffectBookingError example
 * {
 *   "code": 9514,
 *   "error": [
 *       {
 *           "objectId": "U7uzFfN3yq",
 *           "serviceDateTime": "2021-04-29T09:30:00.000Z"
 *       }
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse AffectBookingError
 * @apiUse ScheduleAtLeastError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function updateStylistWeeklySchedule() {}

/**
 * @api {post} /updateStylistDailySchedule updateStylistDailySchedule
 * @apiVersion 0.5.0
 * @apiName updateStylistDailySchedule
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Salon Operator or Admin or Stylist
 *
 * @apiDescription Update a stylist's daily schedule
 *
 * @apiParam {String} stylistId                     Required if role is not stylist
 * @apiParam {Object} stylistSchedules              stylist's daily schedules
 * @apiParam {Array}  stylistSchedules.0            stylist's daily schedule in a day (0: for Sunday)
 * @apiParam {String} stylistSchedules.0.startTime  start time of stylist's daily schedule in a day (0: for Sunday)
 * @apiParam {String} stylistSchedules.0.endTime    end time of stylist's daily schedule in a day (0: for Sunday)
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "JMO71YjQQt",
 *   "stylistDailySchedules": [
 *     {
 *       "dayOfWeek": 6,
 *       "startAt": "2021-04-07T13:00:00.000+09:00",
 *       "endAt": "2021-04-07T14:00:00.000+09:00"
 *     }
 *   ]
 * }
 *
 * @apiSuccess {Object}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "success": true,
 *       "stylistDailySchedules": [
 *         {
 *           "dayOfWeek": 6,
 *           "startAt": "2021-04-07T13:00:00.000+09:00",
 *           "endAt": "2021-04-07T14:00:00.000+09:00"
 *         }
 *     ]
 *   }
 * }
 *
 * @apiErrorExample  {json} AffectBookingError example
 * {
 *   "code": 9514,
 *   "error": [
 *       {
 *           "objectId": "U7uzFfN3yq",
 *           "serviceDateTime": "2021-04-29T09:30:00.000Z"
 *       }
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse AffectBookingError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function updateStylistDailySchedule() {}

/**
 * @api {post} /getStylistAvailableSlots getStylistAvailableSlots
 * @apiVersion 0.5.0
 * @apiName getStylistAvailableSlots
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Salon Operator or Customer
 *
 * @apiDescription Get available slots
 *
 * @apiParam {String} stylistId        objectId of stylist
 * @apiParam {String} dateTime         ISOString. Regex /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:00.000([+-][0-2]\d:[0-5]\d|Z)$/
 * @apiParam {Number} totalDuration    min: 1
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "1iXwGj7KQM",
 *   "dateTime": "2021-01-21T18:35:00.000Z",
 *   "totalDuration": 2
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.availableSlots
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "availableSlots": [
 *       "08:30",
 *       "09:30",
 *       "10:30",
 *       "11:30"
 *     ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getStylistAvailableSlots() {}

/**
 * @api {post} /getStylistUnavailableDaysOfMonth getStylistUnavailableDaysOfMonth
 * @apiVersion 0.6.0
 * @apiName getStylistUnavailableDaysOfMonth
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Customer
 *
 * @apiDescription Get unavailable days of a month (from the later between today or startMonth, until the end of month)
 *
 * @apiParam {String} stylistId        objectId of stylist
 * @apiParam {String} dateTime         Only month and year are accounted. ISOString. Regex /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:00.000([+-][0-2]\d:[0-5]\d|Z)$/
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "1iXwGj7KQM",
 *   "dateTime": "2021-01-21T18:35:00.000Z"
 * }
 *
 * @apiSuccess {Array}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *       "2021-06-11",
 *       "2021-06-13",
 *       "2021-06-14",
 *       "2021-06-15",
 *       "2021-06-16",
 *       "2021-06-18",
 *       "2021-06-20",
 *       "2021-06-21",
 *       "2021-06-22",
 *       "2021-06-23",
 *       "2021-06-25",
 *       "2021-06-27",
 *       "2021-06-28",
 *       "2021-06-30"
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getStylistUnavailableDaysOfMonth() {}

/**
 * @api {post} /getAvailableStylists getAvailableStylists
 * @apiVersion 0.5.0
 * @apiName getAvailableStylists
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Salon Operator
 *
 * @apiDescription Get available stylists for a booking
 *
 * @apiParam {String} bookingId        objectId of booking
 *
 * @apiExample {json} Request example
 * {
 *   "bookingId": "dh25M5pHBP"
 * }
 *
 * @apiSuccess {Array}   result
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {Array}   result.profileImages
 * @apiSuccess {String}  result.nickName
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *     {
 *         "createdAt": "2021-04-22T07:28:56.553Z",
 *         "profileImages": [],
 *         "nickName": "stynickcb2",
 *         "objectId": "00gcVpm5SD"
 *     },
 *     {
 *         "createdAt": "2021-04-19T02:31:34.329Z",
 *         "profileImages": [],
 *         "nickName": "stynickcb",
 *         "objectId": "Hp4AA8iFvP"
 *     }
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getAvailableStylists() {}
