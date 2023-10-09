/**
 * @api {post} /adminUpdateStylist adminUpdateStylist
 * @apiVersion 2.1.0
 * @apiName adminUpdateStylist
 * @apiGroup Stylist
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Admin Update Stylist
 *
 * @apiParam {String} stylistId
 * @apiParam {String} [firstName]
 * @apiParam {String} [lastName]
 * @apiParam {String} nickName
 * @apiParam {String} [gender]            Accepted values: ['男性', '女性', 'その他']
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
 *       "isFavorited": false
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
 * @api {post} /operatorUpdateStylist operatorUpdateStylist
 * @apiVersion 2.1.0
 * @apiName operatorUpdateStylist
 * @apiGroup Stylist
 * @apiPermission Login Required as Salon
 *
 * @apiDescription Salon Update Stylist
 *
 * @apiParam {String} stylistId
 * @apiParam {String} [stylistEmail]
 * @apiParam {String} [firstName]
 * @apiParam {String} [lastName]
 * @apiParam {String} nickName
 * @apiParam {String} [gender]            Accepted values: ['男性', '女性', 'その他']
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
 *       "isFavorited": false
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function operatorUpdateStylist() {}

/**
 * @api {post} /stylistUpdateProfile stylistUpdateProfile
 * @apiVersion 2.1.0
 * @apiName stylistUpdateProfile
 * @apiGroup Stylist
 * @apiPermission Login Required as Stylist
 *
 * @apiDescription Stylist Update Profile
 *
 * @apiParam {String} [firstName]
 * @apiParam {String} [lastName]
 * @apiParam {String} nickName
 * @apiParam {String} [gender]            Accepted values: ['男性', '女性', 'その他']
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
 * "firstName": "Nguyen",
 * "lastName": "Nhan111",
 * "nickName": "hugnvu6",
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
 *       "isFavorited": false
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function stylistUpdateProfile() {}

/**
 * @api {post} /getMyProfileStylist getMyProfileStylist
 * @apiVersion 2.1.0
 * @apiName getMyProfileStylist
 * @apiGroup Web-Stylist
 *
 * @apiDescription Stylist get their own profile
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
 *     "profile": {
 *           "characterOfStylist": "characterOfStylist",
 *           "strongAssetOfHairstyle": "strongAssetOfHairstyle",
 *           "strongAssetOfSkill": "strongAssetOfSkill",
 *           "experience": 1,
 *           "jobTitle": "jobTitle",
 *           "description": "description",
 *           "workDay": "workDay",
 *           "catchPhrase": "catchPhrase",
 *       },
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getMyProfileStylist() {}

/**
 * @api {post} /customerGetStylistDetailPage customerGetStylistDetailPage
 * @apiVersion 2.1.0
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
 *       "stylist": {
 *           "salon": {
 *               "salonName": "HAIRLIE salon 1",
 *               "slug": "hairlie-salon-1",
 *               "cbSalonId": "112783976545324",
 *               "salonAddress1": "ahihi",
 *               "salonAddress2": "Tsukisamu Higashi 2 Jo",
 *               "salonAddress3": "Abuta District",
 *               "stationName": "testst 1234",
 *               "distanceNearestStation": 21,
 *               "objectId": "NRc88P"
 *           },
 *           "fullName": "##Nhan111 Nguyen",
 *           "nickName": "hugnvu6",
 *           "slug": "hugnvu6",
 *           "stylistSNS": {},
 *           "profileImages": [],
 *           "profileText": "Do it",
 *           "profile": {
 *               "description": "description",
 *               "workDay": "workDay",
 *               "characterOfStylist": "characterOfStylist",
 *               "strongAssetOfHairstyle": "strongAssetOfHairstyle",
 *               "strongAssetOfSkill": "strongAssetOfSkill",
 *               "experience": 1,
 *               "jobTitle": "jobTitle",
 *               "catchPhrase": "catchPhrase"
 *           }
 *       },
 *       "posts": [],
 *       "categories": [
 *           {
 *               "name": "PERM",
 *               "menus": [
 *                   {
 *                       "objectId": "zvo3g3Rkm4",
 *                       "name": "nhan menu 01",
 *                       "amount": 100,
 *                       "description": "description",
 *                       "duration": 60
 *                   },
 *                   {
 *                       "objectId": "3VOzcs5LAj",
 *                       "name": "nhan menu 00",
 *                       "amount": 100,
 *                       "description": "description",
 *                       "duration": 60
 *                   }
 *               ],
 *               "objectId": "FFQzTk8anu"
 *           },
 *           {
 *               "name": "カット＋パーマ＋トリートメント",
 *               "menus": [
 *                   {
 *                       "objectId": "gO1pHaGjNL",
 *                       "name": "Menu 6 YiJi",
 *                       "amount": 100,
 *                       "description": "sdfg",
 *                       "duration": 30
 *                   }
 *               ],
 *               "objectId": "ViX9KLCpxo"
 *           },
 *           {
 *               "name": "カット＋縮毛矯正",
 *               "menus": [
 *                   {
 *                       "objectId": "H2f3LYKvCe",
 *                       "name": "Menu 1 YiJi",
 *                       "amount": 2313,
 *                       "description": "sdsd",
 *                       "duration": 30
 *                   }
 *               ],
 *               "objectId": "6DSZGoO2Zx"
 *           },
 *           {
 *               "name": "ヘッドスパ",
 *               "menus": [
 *                   {
 *                       "objectId": "C1lYyEUzLB",
 *                       "name": "Menu 15 YiJi",
 *                       "amount": 2500,
 *                       "description": "sdfsdfsdfsd",
 *                       "duration": 60
 *                   }
 *               ],
 *               "objectId": "QTczM66HKA"
 *           }
 *       ],
 *   }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function customerGetStylistDetailPage() {}

/**
 * @api {post} /getStylistScheduleForNext7Days getStylistScheduleForNext7Days
 * @apiVersion 2.1.0
 * @apiName getStylistScheduleForNext7Days
 * @apiGroup Stylist
 *
 * @apiDescription Admin Update Stylist
 *
 * @apiParam {String} stylistId
 *
 * @apiExample {json} Request example
 *{
 * "stylistId": "zTovNUJMss",
 * }
 *
 * @apiSuccess {Array}   result
 * @apiSuccess {String}  result.date
 * @apiSuccess {Boolean}  result.available
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *       {
 *           "date": "2022-07-11T15:00:00.000Z",
 *           "available": false
 *       },
 *       {
 *           "date": "2022-07-12T15:00:00.000Z",
 *           "available": false
 *       },
 *       {
 *           "date": "2022-07-13T15:00:00.000Z",
 *           "available": false
 *       },
 *       {
 *           "date": "2022-07-14T15:00:00.000Z",
 *           "available": false
 *       },
 *       {
 *           "date": "2022-07-15T15:00:00.000Z",
 *           "available": false
 *       },
 *       {
 *           "date": "2022-07-16T15:00:00.000Z",
 *           "available": false
 *       },
 *       {
 *           "date": "2022-07-17T15:00:00.000Z",
 *           "available": false
 *       }
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 */
function getStylistScheduleForNext7Days() {}

/**
 * @api {post} /updateStylistStatusBySalon updateStylistStatusBySalon
 * @apiVersion 2.1.0
 * @apiName updateStylistStatusBySalon
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
function updateStylistStatusBySalon() {}
