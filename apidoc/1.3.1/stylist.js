/**
 * @api {post} /getStylistList getStylistList
 * @apiVersion 1.3.1
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