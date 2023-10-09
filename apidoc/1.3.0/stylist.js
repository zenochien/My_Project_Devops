/**
 * @api {post} /adminUpdateStylist adminUpdateStylist
 * @apiVersion 1.3.0
 * @apiName adminUpdateStylist
 * @apiGroup Stylist
 * @apiPermission Login Required as Admin 
 *
 * @apiDescription Admin Update Stylist
 *
 * @apiParam {String} stylistId           Required if role is not stylist
 * @apiParam {String} [stylistEmail]
 * @apiParam {String} [firstName]
 * @apiParam {String} [lastName]
 * @apiParam {String} [nickName]
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
 *   "stylistSNS": {
 *       "facebook": "nguyen.nhan"
 *   },
 *  "profile": {
 *       "description": "description",
 *       "workDay": "workDay",
 *       "characterOfStylist": "characterOfStylist",
 *       "strongAssetOfHairstyle": "strongAssetOfHairstyle",
 *       "strongAssetOfSkill": "strongAssetOfSkill",
 *       "experience": 1,
 *       "jobTitle": "jobTitle"
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
 * @apiSuccess {String}  result.profile.jobTitle
 * @apiSuccess {Number}  result.profile.experience
 * @apiSuccess {String}  result.profile.strongAssetOfSkill
 * @apiSuccess {String}  result.profile.strongAssetOfHairstyle
 * @apiSuccess {String}  result.profile.characterOfStylist
 * @apiSuccess {String}  result.profile.workDay
 * @apiSuccess {String}  result.profile.description
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
 *           "characterOfStylist": "characterOfStylist",
 *           "strongAssetOfHairstyle": "strongAssetOfHairstyle",
 *           "strongAssetOfSkill": "strongAssetOfSkill",
 *           "experience": 1,
 *           "jobTitle": "jobTitle",
 *           "description": "description",
 *           "workDay": "workDay",
 *       },
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
 * @apiVersion 1.3.0
 * @apiName operatorUpdateStylist
 * @apiGroup Stylist
 * @apiPermission Login Required as Operator 
 *
 * @apiDescription Operator Update Stylist
 *
 * @apiParam {String} stylistId           Required if role is not stylist
 * @apiParam {String} [stylistEmail]
 * @apiParam {String} [firstName]
 * @apiParam {String} [lastName]
 * @apiParam {String} [nickName]
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
 *   "stylistSNS": {
 *       "facebook": "nguyen.nhan"
 *   },
 *  "profile": {
 *       "description": "description",
 *       "workDay": "workDay",
 *       "characterOfStylist": "characterOfStylist",
 *       "strongAssetOfHairstyle": "strongAssetOfHairstyle",
 *       "strongAssetOfSkill": "strongAssetOfSkill",
 *       "experience": 1,
 *       "jobTitle": "jobTitle"
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
 * @apiSuccess {String}  result.profile.jobTitle
 * @apiSuccess {Number}  result.profile.experience
 * @apiSuccess {String}  result.profile.strongAssetOfSkill
 * @apiSuccess {String}  result.profile.strongAssetOfHairstyle
 * @apiSuccess {String}  result.profile.characterOfStylist
 * @apiSuccess {String}  result.profile.workDay
 * @apiSuccess {String}  result.profile.description
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
 *           "characterOfStylist": "characterOfStylist",
 *           "strongAssetOfHairstyle": "strongAssetOfHairstyle",
 *           "strongAssetOfSkill": "strongAssetOfSkill",
 *           "experience": 1,
 *           "jobTitle": "jobTitle",
 *           "description": "description",
 *           "workDay": "workDay",
 *       },
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
 * @apiVersion 1.3.0
 * @apiName stylistUpdateProfile
 * @apiGroup Stylist
 * @apiPermission Login Required as Stylist 
 *
 * @apiDescription Stylist update profile
 *
 * @apiParam {String} [firstName]
 * @apiParam {String} [lastName]
 * @apiParam {String} [nickName]
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
 *
 * @apiExample {json} Request example
 * {
 *   "firstName": "Nguyen",
 *   "lastName": "Nhan",
 *   "nickName": "Swagger",
 *   "gender": "男性",
 *   "profileImages": ["mxA3Zcygwt","NGDBkFAzsJ", "yRmzmGXiAW"],
 *   "stylistSNS": {
 *       "facebook": "nguyen.nhan"
 *   },
 *  "profile": {
 *       "description": "description",
 *       "workDay": "workDay",
 *       "characterOfStylist": "characterOfStylist",
 *       "strongAssetOfHairstyle": "strongAssetOfHairstyle",
 *       "strongAssetOfSkill": "strongAssetOfSkill",
 *       "experience": 1,
 *       "jobTitle": "jobTitle"
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
 * @apiSuccess {String}  result.profile.jobTitle
 * @apiSuccess {Number}  result.profile.experience
 * @apiSuccess {String}  result.profile.strongAssetOfSkill
 * @apiSuccess {String}  result.profile.strongAssetOfHairstyle
 * @apiSuccess {String}  result.profile.characterOfStylist
 * @apiSuccess {String}  result.profile.workDay
 * @apiSuccess {String}  result.profile.description
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
 *           "characterOfStylist": "characterOfStylist",
 *           "strongAssetOfHairstyle": "strongAssetOfHairstyle",
 *           "strongAssetOfSkill": "strongAssetOfSkill",
 *           "experience": 1,
 *           "jobTitle": "jobTitle",
 *           "description": "description",
 *           "workDay": "workDay",
 *       },
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
 * @apiVersion 1.3.0
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
 * @apiVersion 1.3.0
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
 *       "objectId": "eI1sUdrIc5",
 *       "profile": {
 *           "jobTitle": "job tittle",
 *           "experience": 2,
 *           "strongAssetOfSkill": "得意な技術\n\n得意な技術",
 *           "StrongAssetOfHairstyle": "得意なヘアスタイルイメージ\n\n得意なヘアスタイルイメージ",
 *           "characterOfStylist": "スタイリストの特徴\n\nスタイリストの特徴",
 *           "workDay": "出勤日や出勤サロン\n\n出勤日や出勤サロン",
 *           "description": "自己紹介\n\n自己紹介"
 *       },
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