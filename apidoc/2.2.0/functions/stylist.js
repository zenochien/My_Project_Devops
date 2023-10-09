/**
 * @api {post} /adminUpdateStylist adminUpdateStylist
 * @apiVersion 2.2.0
 * @apiName adminUpdateStylist
 * @apiGroup Stylist
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Admin Update Stylist
 *
 * @apiParam {String} stylistId
 * @apiParam {String} firstName
 * @apiParam {String} lastName
 * @apiParam {String} nickName
 * @apiParam {String} [gender]            Accepted values: ['男性', '女性', 'その他']
 * @apiParam {Boolean} [isOfficial]
 * @apiParam {Array}  [profileImages]     objectIds of Images, max 4 images, min 0 image (empty array) to delete old images
 * @apiParam {Object} [stylistSNS]        Social media username (or profile path)
 * @apiParam {String} [stylistSNS.facebook]
 * @apiParam {String} [stylistSNS.instagram]
 * @apiParam {String} [stylistSNS.tiktok]
 * @apiParam {String} [stylistSNS.youtube]
 * @apiParam {String} [stylistSNS.twitter]
 * @apiParam {Object} [profile]
 * @apiParam {String} [profile.jobTitle]
 * @apiParam {Number} [profile.experience]
 * @apiParam {String} [profile.strongAssetOfSkill]
 * @apiParam {String} [profile.strongAssetOfHairstyle]
 * @apiParam {String} [profile.characterOfStylist]
 * @apiParam {String} [profile.workDay]
 * @apiParam {String} [profile.description]
 * @apiParam {String} profile.catchPhrase
 *
 * @apiExample {json} Request example
 *{
 * "stylistId": "zTovNUJMss",
 * "firstName": "Nguyen",
 * "lastName": "Nhan111",
 * "nickName": "hugnvu6",
 * "isOfficial": false
 * "profile": {
 *     "description": "description",
 *     "workDay": "workDay",
 *     "characterOfStylist": "characterOfStylist",
 *     "strongAssetOfHairstyle": "strongAssetOfHairstyle",
 *     "strongAssetOfSkill": "strongAssetOfSkill",
 *     "experience": 1,
 *     "jobTitle": "jobTitle",
 *     "catchPhrase": "catchPhrase"
 * },
 * "commissonRate" : 30
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
 * @apiSuccess {String}  result.isOfficial
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {Object}  result.stylistSNS
 * @apiSuccess {String}  result.stylistSNS.facebook
 * @apiSuccess {String}  result.stylistSNS.instagram
 * @apiSuccess {String}  result.stylistSNS.tiktok
 * @apiSuccess {String}  result.stylistSNS.youtube
 * @apiSuccess {String}  result.stylistSNS.twitter
 * @apiSuccess {Object}  result.profile
 * @apiSuccess {String}  result.profile.jobTitle
 * @apiSuccess {Number}  result.profile.experience
 * @apiSuccess {String}  result.profile.strongAssetOfSkill
 * @apiSuccess {String}  result.profile.strongAssetOfHairstyle
 * @apiSuccess {String}  result.profile.characterOfStylist
 * @apiSuccess {String}  result.profile.workDay
 * @apiSuccess {String}  result.profile.description
 * @apiSuccess {String}  result.profile.catchPhrase
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "createdAt": "2022-06-10T06:59:28.551Z",
 *       "salon": {
 *           "salonName": "HAIRLIE salon 1",
 *           "slug": "hairlie-salon-1",
 *           "objectId": "NRc88P"
 *       },
 *       "profileImages": [],
 *       "status": "PUBLISHED",
 *       "firstName": "Nguyen",
 *       "lastName": "Nhan111",
 *       "fullName": "Nhan111 Nguyen",
 *       "gender": "男性",
 *       "nickName": "hugnvu6",
 *       "slug": "hugnvu6",
 *       "profileText": "Do it",
 *       "commissonRate": [
 *           {
 *               "percent": 20,
 *               "startCycle": "2022-05-31T15:00:00.000Z"
 *           }
 *       ],
 *       "stylistSNS": {},
 *       "stylistEmail": "duy2.stylist@yopmail.com",
 *       "maxConfirmedBookingCount": 5,
 *       "profile": {
 *           "description": "description",
 *           "workDay": "workDay",
 *           "characterOfStylist": "characterOfStylist",
 *           "strongAssetOfHairstyle": "strongAssetOfHairstyle",
 *           "strongAssetOfSkill": "strongAssetOfSkill",
 *           "experience": 1,
 *           "jobTitle": "jobTitle",
 *           "catchPhrase": "catchPhrase"
 *       },
 *       "userStatus": "INVITED",
 *       "objectId": "zxneYyyFRn",
 *       "isFavorited": false,
 *       "isOfficial": false
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function adminUpdateStylist() {}

/**
 * @api {post} /createStylist createStylist
 * @apiVersion 2.2.0
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
 * @apiParam {Boolean} [isOfficial]       Only admin role
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
 * @apiSuccess {String}  result.isOfficial
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
 *     "objectId": "UxhVodAYn6",
 *     "isOfficial": false
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
