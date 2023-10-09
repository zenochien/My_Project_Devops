/**
 * @api {post} /stylistSetMaxConfirmedBookingCount stylistSetMaxConfirmedBookingCount
 * @apiVersion 1.4.1
 * @apiName stylistSetMaxConfirmedBookingCount
 * @apiGroup Stylist
 * @apiPermission Required Login as Stylist
 *
 * @apiDescription Update maximum confirmed booking count
 *
 * @apiParam {Number} max   
 *
 * @apiExample {json} Request example
 *{
 *  "max": 10
 *}
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolean} result.success
 *
 * @apiSuccessExample {json} Response example
 * {
 *    "result": {
 *      "success": true,
 *    }
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse UnassignMenuError
 */
function stylistSetMaxConfirmedBookingCount() {}

/**
 * @api {post} /getMyProfileStylist getMyProfileStylist
 * @apiVersion 1.4.1
 * @apiName getMyProfileStylist
 * @apiGroup Web-Stylist
 *
 * @apiDescription Stylist get their own profile
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.maxConfirmedBookingCount
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
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "maxConfirmedBookingCount": 1,
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
 *     "objectId": "UxhVodAYn6"
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getMyProfileStylist() {}