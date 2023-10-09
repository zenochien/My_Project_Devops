/**
 * @api {post} /getStylistDetail getStylistDetail
 * @apiVersion 1.9.0
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
 * @apiSuccess {Object}  result.requestDeletingAccount
 * @apiSuccess {Array}   result.commissonRate               Only show when login with Admin
 * @apiSuccess {Object}  result.profile
 * @apiSuccess {Object}  result.profile.catchPhrase
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "createdAt": "2020-08-19T02:04:27.047Z",
 *     "requestDeletingAccount": {
 *         "reasons": [],
 *         "expiredAt": "2022-02-11T10:13:02.927Z",
 *         "deletedAt": "2022-02-11T10:13:02.927Z"
 *     },
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
 *     "objectId": "UxhVodAYn6",
 *     "commissonRate": [
 *           {
 *               "percent": 50,
 *               "startCycle": "2022-05-31T15:00:00.000Z"
 *           }
 *      ],
 *      "profile": {
 *           "catchPhrase": "catch phrase value"
 *      },
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getStylistDetail() {}

/**
 * @api {post} /getStylistList getStylistList
 * @apiVersion 1.9.0
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
 * @apiSuccess {Object}  result.profile.catchPhrase
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
 *            "salonName": "hahaha",
 *            "salonAddress1": "PREFECTURE1",
 *            "salonAddress2": "yok",
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
 * @api {post} /updateStylist updateStylist
 * @apiVersion 1.9.0
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
 * @apiSuccess {Object}  result.profile
 * @apiSuccess {Object}  result.profile.catchPhrase
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
 *     "objectId": "UxhVodAYn6",
 *     "profile": {
 *        "catchPhrase": "catch phrase value"
 *      },
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
 * @api {post} /createStylist createStylist
 * @apiVersion 1.9.0
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
 * @apiParam {String} profile.catchPhrase Only admin role
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
 * @apiSuccess {String}  profile
 * @apiSuccess {String}  profile.catchPhrase              Only admin role
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
 * @api {post} /updateStylistStatusByAdmin updateStylistStatusByAdmin
 * @apiVersion 1.9.0
 * @apiName updateStylistStatusByAdmin
 * @apiGroup Web-Stylist
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Update Stylist status
 *
 * @apiParam {String} stylistId
 * @apiParam {String} status       PUBLISHED or UNPUBLISHED
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "UxhVodAYn6",
 *   "status": "UNPUBLISHED",
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
 * @apiSuccess {Object}  result.profile
 * @apiSuccess {Object}  result.profile.catchPhrase
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
 *     "objectId": "UxhVodAYn6",
 *     "profile": {
 *        "catchPhrase": "catch phrase value"
 *      },
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function updateStylistStatusByAdmin() {}
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
 * @apiSuccess {Object}   result
 * @apiSuccess {Numnber} result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {Object}  result.list.receiver
 * @apiSuccess {String}  result.list.receiver.objectId
 * @apiSuccess {String}  result.list.receiver.fullName
 * @apiSuccess {String}  result.list.receiver.nickName
 * @apiSuccess {Array}   result.list.receiver.profileImages
 * @apiSuccess {Object}  result.list.salonReceiver
 * @apiSuccess {String}  result.list.salonReceiver.objectId
 * @apiSuccess {String}  result.list.salonReceiver.salonName
 * @apiSuccess {String}  result.list.salonReceiver.salonNameKatakana
 * @apiSuccess {String}  result.list.salonReceiver.salonAddress1
 * @apiSuccess {String}  result.list.salonReceiver.salonAddress2
 * @apiSuccess {Object}  result.list.contributor
 * @apiSuccess {String}  result.list.contributor.objectId
 * @apiSuccess {String}  result.list.contributor.fullName
 * @apiSuccess {String}  result.list.contributor.nickName
 * @apiSuccess {Array}   result.list.contributor.profileImages
 * @apiSuccess {Object}  result.list.salonContributor
 * @apiSuccess {String}  result.list.salonContributor.objectId
 * @apiSuccess {String}  result.list.salonContributor.salonName
 * @apiSuccess {String}  result.list.salonContributor.salonNameKatakana
 * @apiSuccess {String}  result.list.salonContributor.salonAddress1
 * @apiSuccess {String}  result.list.salonContributor.salonAddress2
 * @apiSuccess {String}  result.list.title
 * @apiSuccess {String}  result.list.content
 * @apiSuccess {String}  result.list.objectId
 * @apiSuccess {String}  result.list.createdAt
 * @apiSuccess {String}  result.list.updatedAt
 * @apiSuccessExample {json} Response example
 * {
 *  "result":{
 *   "total": 2
 *   "list": [
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
 *  }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse MarkAllNotificationsNotFound
 */
function getRecommendationForAStylist() {}
