/**
 * @api {post} /updateCustomerInfo updateCustomerInfo
 * @apiVersion 1.0.0
 * @apiName updateCustomerInfo
 * @apiGroup Web-Customer
 * @apiPermission Login Required as CUSTOMER & ADMIN
 *
 * @apiDescription Update Customer info
 *
 * @apiParam {String} firstName
 * @apiParam {String} lastName
 * @apiParam {String} phoneticFirstName
 * @apiParam {String} phoneticLastName
 * @apiParam {String} nickName
 * @apiParam {String} gender              Accepted values: ['男性', '女性', 'その他']
 * @apiParam {String} birthDate           YYYY/MM/DD
 * @apiParam {Array}  [profileImages]     objectIds of Images, max 4 images, min 0 image (empty array) to delete old images
 * @apiParam {String} [phone]             Phone number
 * @apiParam {String} paymentMethod       Accepted values: ['CREDIT_CARD']
 *
 * @apiExample {json} Request example
 * {
 *   "firstName": "Duc",
 *   "lastName": "Tran",
 *   "phoneticFirstName": "Duc",
 *   "phoneticLastName": "Tran",
 *   "nickName": "ductr",
 *   "gender": "男性",
 *   "birthDate": "1992-02-20",
 *   "profileImages": ["mxA3Zcygwt","NGDBkFAzsJ", "yRmzmGXiAW"],
 *   "phone": "1234567",
 *   "paymentMethod": "CREDIT_CARD",
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
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "createdAt": "2020-08-19T02:04:27.047Z",
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
 *     "lastName": "Tran",
 *     "nickName": "ductr27",
 *     "fullName": "Duc TRAN",
 *     "phoneticFullName": "Duc Tran",
 *     "paymentMethod": "CREDIT_CARD",
 *     "phone": "1234567",
 *     "phoneticFirstName": "Duc",
 *     "phoneticLastName": "Tran",
 *     "objectId": "UxhVodAYn6",
 *     "isCompletedProfile": true
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function updateCustomerInfo() {}

/**
 * @api {post} /getCustomerDetail getCustomerDetail
 * @apiVersion 1.0.0
 * @apiName getCustomerDetail
 * @apiGroup Web-Customer
 * @apiPermission Login Required as CUSTOMER or ADMIN
 *
 * @apiDescription Get Customer detail
 *
 * @apiParam {String} email     Required if role is ADMIN, ignore if role is CUSTOMER
 *
 * @apiExample {json} Request example
 * {
 *   "email": "duccustomer10@yopmail.com"
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
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "createdAt": "2020-08-19T02:04:27.047Z",
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
function getCustomerDetail() {}

/**
 * @api {post} /getCustomerList getCustomerList
 * @apiVersion 1.0.0
 * @apiName getCustomerList
 * @apiGroup Web-Customer
 * @apiPermission Login Required as ADMIN
 *
 * @apiDescription Get Customer list
 *
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} [orderBy]  Order key
 * @apiParam {String} [order]  Order direction ['ascending', 'descending']
 * @apiParam {String} [searchKey]  Search by firstName, lastName, phoneticFirstName, phoneticLastName, email, objectId
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 10,
 *   "orderBy": "createdAt",
 *   "order": "descending",
 *   "searchKey": "21"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *        {
 *          "createdAt": "2020-08-19T02:04:27.047Z",
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
 *          "email": "duccustomer10@yopmail.com",
 *          "createdAt": "2020-11-13T01:56:18.721Z",
 *          "birthDate": "1992/02/20",
 *          "firstName": "Duc",
 *          "gender": "男性",
 *          "lastName": "TRAN",
 *          "fullName": "Duc TRAN",
 *          "phoneticFullName": "Duc Tran",
 *          "nickName": "ductr",
 *          "paymentMethod": "CREDIT_CARD",
 *          "phone": "1234567",
 *          "phoneticFirstName": "Duc",
 *          "phoneticLastName": "Tran",
 *          "objectId": "UxhVodAYn6",
 *          "isCompletedProfile": true
 *        }
 *      ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getCustomerList() {}

/**
 * @api {post} /getCardList getCardList
 * @apiVersion 1.0.0
 * @apiName getCardList
 * @apiGroup Web-Customer
 * @apiPermission Login Required as CUSTOMER or ADMIN
 *
 * @apiDescription Get Card List
 *
 * @apiParam {String} email         Required only when role is ADMIN
 *
 * @apiExample {json} Request example
 * {
 *   "email": "duccustomer10@yopmail.com",
 * }
 *
 * @apiSuccess {Array}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *     {
 *       "cardId": "CT8ZI9B29LQ16D27RRTSIEQFX",
 *       "cardNumber": "411111********11",
 *       "cardExpire": "05/25",
 *       "cardType": "Visa",
 *       "isDefault": true,
 *       "cardHolderName": "Duc Tran"
 *     }
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getCardList() {}

/**
 * @api {post} /addCard addCard
 * @apiVersion 1.0.0
 * @apiName addCard
 * @apiGroup Web-Customer
 * @apiPermission Login Required as CUSTOMER
 *
 * @apiDescription Add card
 *
 * @apiParam {String} cardToken
 * @apiParam {String} cardHolderName
 *
 * @apiExample {json} Request example
 * {
 *   "cardToken": "999811f3-8baa-4c01-8e35-1acfa08d576c",
 *   "cardHolderName": "Duc Tran"
 * }
 *
 *
 * @apiSuccess {Array}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *     {
 *       "cardId": "CT8ZI9B29LQ16D27RRTSIEQFX",
 *       "cardNumber": "411111********11",
 *       "cardExpire": "05/25",
 *       "cardType": "Visa",
 *       "isDefault": true,
 *       "cardHolderName": "Duc Tran"
 *     }
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function addCard() {}

/**
 * @api {post} /deleteCard deleteCard
 * @apiVersion 1.0.0
 * @apiName deleteCard
 * @apiGroup Web-Customer
 * @apiPermission Login Required as CUSTOMER
 *
 * @apiDescription Delete Card
 *
 * @apiParam {String} cardId
 *
 * @apiExample {json} Request example
 * {
 *   "cardId": "CT8ZI9B29LQ16D27RRTSIEQFX"
 * }
 *
 * @apiSuccess {Array}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *     {
 *       "cardId": "CT8ZI9B29LQ16D27RRTSIEQFX",
 *       "cardNumber": "411111********11",
 *       "cardExpire": "05/25",
 *       "cardType": "Visa",
 *       "isDefault": true,
 *       "cardHolderName": "Duc Tran"
 *     }
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse VeriTransAccountNotFoundError
 * @apiUse DeleteCardError
 * @apiUse DeleteCardCustomerError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function deleteCard() {}

/**
 * @api {post} /setDefaultCard setDefaultCard
 * @apiVersion 1.0.0
 * @apiName setDefaultCard
 * @apiGroup Web-Customer
 * @apiPermission Login Required as CUSTOMER
 *
 * @apiDescription Set Default Card
 *
 * @apiParam {String} cardId
 *
 * @apiExample {json} Request example
 * {
 *   "cardId": "CT8ZI9B29LQ16D27RRTSIEQFX"
 * }
 *
 * @apiSuccess {Boolean}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": true
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse VeriTransAccountNotFoundError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function setDefaultCard() {}
