/**
 * @api {post} /getCustomerDetailByAdmin getCustomerDetailByAdmin
 * @apiVersion 1.5.0
 * @apiName getCustomerDetailByAdmin
 * @apiGroup Web-Customer
 * @apiPermission Login Required as ADMIN
 *
 * @apiDescription Get Customer detail
 *
 * @apiParam {String} customerId
 *
 * @apiExample {json} Request example
 * {
 *   "customerId": "zOOkCgGVpW"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.email
 * @apiSuccess {Array}   result.profileImages
 * @apiSuccess {String}  result.profileImages.objectId
 * @apiSuccess {String}  result.profileImages.file
 * @apiSuccess {String}  result.profileImages.thumbLarge
 * @apiSuccess {String}  result.profileImages.thumbMedium
 * @apiSuccess {String}  result.profileImages.thumbSmall
 * @apiSuccess {String}  result.firstName
 * @apiSuccess {String}  result.lastName
 * @apiSuccess {String}  result.fullName
 * @apiSuccess {String}  result.phoneticFirstName
 * @apiSuccess {String}  result.phoneticLastName
 * @apiSuccess {String}  result.phoneticFullName
 * @apiSuccess {String}  result.nickName
 * @apiSuccess {String}  result.gender
 * @apiSuccess {String}  result.paymentMethod
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {Boolean} result.isCompletedProfile
 * @apiSuccess {Array}   result.cardList          Only provided when role is ADMIN
 * @apiSuccess {Object}  result.requestDeletingAccount
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
 *     "email": "duccustomer10@yopmail.com",
 *     "createdAt": "2020-11-13T01:56:18.721Z",
 *     "birthDate": "1992/02/20",
 *     "firstName": "Duc",
 *     "gender": "男性",
 *     "lastName": "TRAN",
 *     "nickName": "ductr",
 *     "fullName": "Duc TRAN",
 *     "phoneticFullName": "Duc Tran",
 *     "paymentMethod": "CREDIT_CARD",
 *     "phone": "1234567",
 *     "phoneticFirstName": "Duc",
 *     "phoneticLastName": "Tran",
 *     "objectId": "UxhVodAYn6",
 *     "isCompletedProfile": true,
 *     "cardList": [
 *       {
 *         "cardId": "3ZKHKHTSNBECJ1T995L0E9R9P",
 *         "cardNumber": "411111********11",
 *         "cardExpire": "05/27",
 *         "cardType": "Visa",
 *         "isDefault": false,
 *         "cardHolderName": "Duc Tran"
 *       },
 *       {
 *         "cardId": "9H6BUXJR6TBCNSGOY7XJ8MW5P",
 *         "cardNumber": "411111********11",
 *         "cardExpire": "05/24",
 *         "cardType": "Visa",
 *         "isDefault": false,
 *         "cardHolderName": "Duc Tran"
 *       },
 *       {
 *         "cardId": "B3JIPI8ZIZADX01AUZHLW2P25",
 *         "cardNumber": "411111********11",
 *         "cardExpire": "05/25",
 *         "cardType": "Visa",
 *         "isDefault": false,
 *         "cardHolderName": "Duc Tran"
 *       },
 *     ],
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getCustomerDetailByAdmin() {}
