/**
 * @api {post} /getSalonsByHoldingCompanyByAdmin getSalonsByHoldingCompanyByAdmin
 * @apiVersion 2.4.0
 * @apiName getSalonsByHoldingCompanyByAdmin
 * @apiGroup Web-Salon
 * @apiPermission Login required as Admin
 *
 * @apiDescription Get Salon List
 *
 * @apiParam {String} [holdingCompanyId]
 * @apiParam {String} [searchKey]
 * @apiParam {Number} [page]
 * @apiParam {Number} [limit]
 * @apiParam {String} [orderBy]     Order key
 * @apiParam {String} [order]       Order direction ['ascending', 'descending']
 *
 * @apiExample {json} Request example
 * {
 *    "limit": 300,
 *    "page": 1,
 *    "searchKey": "HAIRLIE",
 *    "holdingCompanyId": "FAMskU4JBp"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {Array}   result.list.name
 * @apiSuccess {Array}   result.list.salonNameKatakana
 * @apiSuccess {String}  result.list.objectId
 * @apiSuccess {boolane} result.list.belongingCompany      True if have holding Company Id equal Parameter.holdingCompanyId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *           {
 *               "salonName": "HAIRLIE salon 2",
 *               "salonNameKatakana": "サイコー・キラー",
 *               "objectId": "NRc88P",
 *               "belongingCompany": true
 *           }
 *      ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getSalonsByHoldingCompanyByAdmin() {}

/**
 * @api {post} /getSalonList getSalonList
 * @apiVersion 2.4.0
 * @apiName getSalonList
 * @apiGroup Web-Salon
 *
 * @apiDescription Get Salon List
 *
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} [orderBy]  Order key
 * @apiParam {String} [order]  Order direction ['ascending', 'descending']
 * @apiParam {String} [searchKey]  Search phrase
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 10,
 *   "orderBy": "createdAt",
 *   "order": "ascending"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total  Number of salons
 * @apiSuccess {Array}   result.lists  List of salons
 * @apiSuccess {String}  result.lists.salonName
 * @apiSuccess {String}  result.lists.slug
 * @apiSuccess {String}  result.lists.salonEmail
 * @apiSuccess {String}  result.lists.createdAt
 * @apiSuccess {String}  result.lists.status
 * @apiSuccess {String}  result.lists.phone
 * @apiSuccess {String}  result.lists.postalCode
 * @apiSuccess {String}  result.lists.salonAddress1
 * @apiSuccess {String}  result.lists.salonAddress2
 * @apiSuccess {String}  result.lists.salonAddress3
 * @apiSuccess {String}  result.lists.salonAddress4
 * @apiSuccess {String}  result.lists.salonCatchphrase
 * @apiSuccess {String}  result.lists.salonDirection
 * @apiSuccess {String}  result.lists.salonNote
 * @apiSuccess {String}  result.lists.salonOtherNote
 * @apiSuccess {String}  result.lists.salonSeatsNumber
 * @apiSuccess {String}  result.lists.salonStaffsNumber
 * @apiSuccess {String}  result.lists.stationName
 * @apiSuccess {String}  result.lists.distanceNearestStation
 * @apiSuccess {String}  result.lists.objectId
 * @apiSuccess {Object}  result.lists.salonSNS
 * @apiSuccess {String}  result.lists.salonSNS.facebook
 * @apiSuccess {String}  result.lists.salonSNS.instagram
 * @apiSuccess {String}  result.lists.salonSNS.tiktok
 * @apiSuccess {String}  result.lists.salonSNS.twitter
 * @apiSuccess {Object}  result.lists.holdingCompany
 * @apiSuccess {String}  result.lists.holdingCompany.name
 * @apiSuccess {String}  result.lists.holdingCompany.status
 * @apiSuccess {String}  result.lists.holdingCompany.objectId
 * @apiSuccess {Object}  result.lists.salonHolidays
 * @apiSuccess {Array}   result.lists.salonHolidays.weekdays
 * @apiSuccess {Array}   result.lists.salonHolidays.holidays
 * @apiSuccess {String}  result.lists.salonHolidays.texts
 * @apiSuccess {Object}  result.lists.salonSchedules
 * @apiSuccess {Object}  result.lists.salonSchedules.0              salonSchedules.0 ==>> salonSchedules.6
 * @apiSuccess {String}  result.lists.salonSchedules.0.startTime
 * @apiSuccess {String}  result.lists.salonSchedules.0.endTime
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "total": 1,
 *     "list": [
 *       "salonName": "Psycho Killer",
 *       "slug": "psycho-killer",
 *       "salonNameKatakana": "サイコー・キラー",
 *       "phone": "09897452312",
 *       "salonAddress1": "北海道",
 *       "salonAddress2": "Tsukisamu Higashi 2 Jo",
 *       "salonAddress3": "4th floor",
 *       "salonCatchphrase": "Saa, omae no tsumi o kazoero!",
 *       "salonDirection": "Jump off the bridge",
 *       "salonSchedules": {
 *         "0":
 *           {
 *             "startTime": "08:00",
 *             "endTime": "10:00"
 *           },
 *         "1":
 *           {
 *             "startTime": "08:00",
 *             "endTime": "10:00"
 *           }
 *       },
 *       "salonHolidays": {
 *         "weekdays": [
 *           1
 *         ],
 *         "holidays": [
 *           "01/01"
 *         ],
 *         "texts": "holiday"
 *       },
 *       "salonSNS": {
 *         "facebook": "profile.php?id=100011002652350"
 *       },
 *       "salonSeatsNumber": 50,
 *       "objectId": "iEYQp8",
 *       "salonStaffsNumber": "10",
 *       "salonEmail": "salon-1@abc.com",
 *       "salonImage": {
 *         "objectId": "oAulFLCVmA",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/c6f437fe510743f2c6a80c9a09800dfa_salon_250x250.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/ee9ddfaf3f839c8bedecab51d6d5c3ec_salon_800x800.jpg",
 *         "original": "https://hairlie-dev.s3.amazonaws.com/8c676aa2c5cbf692e5711b519b357ddc_PsychoKiller.png"
 *       },
 *       "salonNote": "hello"
 *       "holdingCompany": {
 *           "name": "holding company 1",
 *           "objectId": "FAMskU4JBp",
 *           "status": "ACTIVE"
 *        },
 *    ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getSalonList() {}

/**
 * @api {post} /getSalonDetail getSalonDetail
 * @apiVersion 2.4.0
 * @apiName getSalonDetail
 * @apiGroup Web-Salon
 *
 * @apiDescription Get Salon Details
 *
 * @apiParam {String} objectId objectId of Salon (same as salonId)
 *
 * @apiExample {json} Request example
 * {
 *   "objectId": "17fgt2",
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.salonName                              Salon Name
 * @apiSuccess {String}  result.slug                                   Slug
 * @apiSuccess {String}  result.salonNameKatakana                      Salon Katakana Name
 * @apiSuccess {String}  result.phone4
 * @apiSuccess {String}  result.salonAddress1                          salonAddress1  Prefecture
 * @apiSuccess {String}  result.salonAddress2                          salonAddress2  City ward street address
 * @apiSuccess {String}  result.salonAddress3                          salonAddress3  Building
 * @apiSuccess {String}  result.salonCatchphrase                       Slogan
 * @apiSuccess {String}  result.salonDirection                         Direction to salon
 * @apiSuccess {Object}  result.salonSchedules                         Salon schedules
 * @apiSuccess {Object}  result.salonHolidays                          Salon holidays
 * @apiSuccess {Array}   result.salonHolidays.weekdays                 List of closed weekdays (0 sunday - 6 saturday)
 * @apiSuccess {Array}   result.salonHolidays.holidays                 List of closed holidays (MM/DD)
 * @apiSuccess {Array}   result.salonHolidays.texts                    Free text
 * @apiSuccess {String}  result.lists.stationName
 * @apiSuccess {String}  result.lists.distanceNearestStation
 * @apiSuccess {Object}  result.salonSNS                               Social media username (or profile path)
 * @apiSuccess {String}  result.salonSNS.facebook
 * @apiSuccess {String}  result.salonSNS.instagram
 * @apiSuccess {String}  result.salonSNS.tiktok
 * @apiSuccess {String}  result.salonSNS.youtube
 * @apiSuccess {String}  result.salonSNS.twitter
 * @apiSuccess {Number}  result.salonSeatsNumber                      Number of seat in salon
 * @apiSuccess {String}  result.objectId  Salon id
 * @apiSuccess {Object}  result.salonImage                            Links to images
 * @apiSuccess {Number}  result.salonStaffsNumber                     Number of staffs
 * @apiSuccess {Number}  result.salonEmail                            Email
 * @apiSuccess {String}  result.salonNote
 * @apiSuccess {Object}  result.bankInfo
 * @apiSuccess {Object}  result.bankInfo.bank
 * @apiSuccess {String}  result.bankInfo.bank.objectId
 * @apiSuccess {String}  result.bankInfo.bank.bankName
 * @apiSuccess {String}  result.bankInfo.bank.bankCode
 * @apiSuccess {String}  result.bankInfo.bank.bankNameHiragana
 * @apiSuccess {Object}  result.bankInfo.branch
 * @apiSuccess {String}  result.bankInfo.branch.objectId
 * @apiSuccess {String}  result.bankInfo.branch.branchName
 * @apiSuccess {String}  result.bankInfo.branch.branchCode
 * @apiSuccess {String}  result.bankInfo.branch.branchNameHiragana
 * @apiSuccess {String}  result.bankInfo.branch.telephone
 * @apiSuccess {String}  result.bankInfo.branch.postalCode
 * @apiSuccess {String}  result.bankInfo.branch.address
 * @apiSuccess {String}  result.bankInfo.type
 * @apiSuccess {String}  result.bankInfo.accountName
 * @apiSuccess {String}  result.bankInfo.accountNumber
 * @apiSuccess {Object}  result.holdingCompany
 * @apiSuccess {String}  result.holdingCompany.name
 * @apiSuccess {String}  result.holdingCompany.status
 * @apiSuccess {String}  result.holdingCompany.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "salonName": "Psycho Killer",
 *     "slug": "psycho-killer",
 *     "salonNameKatakana": "サイコー・キラー",
 *     "phone": "09897452312",
 *     "salonAddress1": "北海道",
 *     "salonAddress2": "Tsukisamu Higashi 2 Jo",
 *     "salonAddress3": "4th floor",
 *     "salonCatchphrase": "Saa, omae no tsumi o kazoero!",
 *     "salonDirection": "Jump off the bridge",
 *     "salonNote": "eg",
 *     "salonSchedules": {
 *       "0":
 *         {
 *           "startTime": "08:00",
 *           "endTime": "10:00"
 *         },
 *       "1":
 *         {
 *           "startTime": "08:00",
 *           "endTime": "10:00"
 *         }
 *     },
 *     "salonHolidays": {
 *       "weekdays": [
 *         1
 *       ],
 *       "holidays": [
 *         "01/01"
 *       ],
 *       "texts": "holiday"
 *     },
 *     "salonSNS": {
 *       "facebook": "profile.php?id=100011002652350"
 *     },
 *     "salonSeatsNumber": 50,
 *     "salonOtherNote": "eg eg",
 *     "objectId": "iEYQp8",
 *     "salonStaffsNumber": "10",
 *     "salonEmail": "salon-1@abc.com",
 *     "salonImage": {
 *       "objectId": "oAulFLCVmA",
 *       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/c6f437fe510743f2c6a80c9a09800dfa_salon_250x250.jpg",
 *       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/ee9ddfaf3f839c8bedecab51d6d5c3ec_salon_800x800.jpg",
 *       "original": "https://hairlie-dev.s3.amazonaws.com/8c676aa2c5cbf692e5711b519b357ddc_PsychoKiller.png"
 *     }
 *     "bankInfo": {
 *           "bank": {
 *               "objectId": "KN9ow5H3eL",
 *               "bankName": "仙台銀行",
 *               "bankCode": 512,
 *               "bankNameHiragana": "せんだい"
 *           },
 *           "branch": {
 *               "objectId": "qvSm78rV1K",
 *               "branchName": "国分町支店",
 *               "branchCode": 203,
 *               "branchNameHiragana": "こくぶんちよう",
 *               "telephone": "022-225-8241",
 *               "postalCode": "980-8656",
 *               "address": "宮城県仙台市青葉区一番町２−１−１本店営業部内"
 *           },
 *           "type": "CHECKING_ACCOUNT",
 *           "accountName": "hung123456789101",
 *           "accountNumber": "1234567"
 *       },
 *     "holdingCompany": {
 *          "name": "holding company 1",
 *          "objectId": "FAMskU4JBp",
 *          "status": "ACTIVE"
 *      },
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function getSalonDetail() {}

/**
 * @api {post} /adminUpdateSalonInfo adminUpdateSalonInfo
 * @apiVersion 2.4.0
 * @apiName adminUpdateSalonInfo
 * @apiGroup Web-Salon
 * @apiPermission Required Login as Admin
 * @apiDescription Update Salon Name
 *
 * @apiParam {String} objectId         objectId of Salon
 * @apiParam {String} salonName        Name of Salon
 * @apiParam {String} [holdingCompanyId]
 *
 * @apiExample {json} Request example
 * {
 *     "objectId": "iEYQp8",
 *     "salonName": "Psycho Killer 2",
 *     "holdingCompanyId": "FAMskU4JBp"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.salonName                              Salon Name
 * @apiSuccess {String}  result.slug                                   Slug
 * @apiSuccess {String}  result.salonNameKatakana                      Salon Katakana Name
 * @apiSuccess {String}  result.phone4
 * @apiSuccess {String}  result.salonAddress1                          salonAddress1  Prefecture
 * @apiSuccess {String}  result.salonAddress2                          salonAddress2  City ward street address
 * @apiSuccess {String}  result.salonAddress3                          salonAddress3  Building
 * @apiSuccess {String}  result.salonCatchphrase                       Slogan
 * @apiSuccess {String}  result.salonDirection                         Direction to salon
 * @apiSuccess {Object}  result.salonSchedules                         Salon schedules
 * @apiSuccess {Object}  result.salonHolidays                          Salon holidays
 * @apiSuccess {Array}   result.salonHolidays.weekdays                 List of closed weekdays (0 sunday - 6 saturday)
 * @apiSuccess {Array}   result.salonHolidays.holidays                 List of closed holidays (MM/DD)
 * @apiSuccess {Array}   result.salonHolidays.texts                    Free text
 * @apiSuccess {String}  result.lists.stationName
 * @apiSuccess {String}  result.lists.distanceNearestStation
 * @apiSuccess {Object}  result.salonSNS                               Social media username (or profile path)
 * @apiSuccess {String}  result.salonSNS.facebook
 * @apiSuccess {String}  result.salonSNS.instagram
 * @apiSuccess {String}  result.salonSNS.tiktok
 * @apiSuccess {String}  result.salonSNS.youtube
 * @apiSuccess {String}  result.salonSNS.twitter
 * @apiSuccess {Number}  result.salonSeatsNumber                      Number of seat in salon
 * @apiSuccess {String}  result.objectId  Salon id
 * @apiSuccess {Object}  result.salonImage                            Links to images
 * @apiSuccess {Number}  result.salonStaffsNumber                     Number of staffs
 * @apiSuccess {Number}  result.salonEmail                            Email
 * @apiSuccess {String}  result.salonNote
 * @apiSuccess {Object}  result.bankInfo
 * @apiSuccess {Object}  result.bankInfo.bank
 * @apiSuccess {String}  result.bankInfo.bank.objectId
 * @apiSuccess {String}  result.bankInfo.bank.bankName
 * @apiSuccess {String}  result.bankInfo.bank.bankCode
 * @apiSuccess {String}  result.bankInfo.bank.bankNameHiragana
 * @apiSuccess {Object}  result.bankInfo.branch
 * @apiSuccess {String}  result.bankInfo.branch.objectId
 * @apiSuccess {String}  result.bankInfo.branch.branchName
 * @apiSuccess {String}  result.bankInfo.branch.branchCode
 * @apiSuccess {String}  result.bankInfo.branch.branchNameHiragana
 * @apiSuccess {String}  result.bankInfo.branch.telephone
 * @apiSuccess {String}  result.bankInfo.branch.postalCode
 * @apiSuccess {String}  result.bankInfo.branch.address
 * @apiSuccess {String}  result.bankInfo.type
 * @apiSuccess {String}  result.bankInfo.accountName
 * @apiSuccess {String}  result.bankInfo.accountNumber
 * @apiSuccess {Object}  result.holdingCompany
 * @apiSuccess {String}  result.holdingCompany.name
 * @apiSuccess {String}  result.holdingCompany.status
 * @apiSuccess {String}  result.holdingCompany.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "salonName": "Psycho Killer",
 *     "slug": "psycho-killer",
 *     "salonNameKatakana": "サイコー・キラー",
 *     "phone": "09897452312",
 *     "salonAddress1": "北海道",
 *     "salonAddress2": "Tsukisamu Higashi 2 Jo",
 *     "salonAddress3": "4th floor",
 *     "salonCatchphrase": "Saa, omae no tsumi o kazoero!",
 *     "salonDirection": "Jump off the bridge",
 *     "salonNote": "eg",
 *     "salonSchedules": {
 *       "0":
 *         {
 *           "startTime": "08:00",
 *           "endTime": "10:00"
 *         },
 *       "1":
 *         {
 *           "startTime": "08:00",
 *           "endTime": "10:00"
 *         }
 *     },
 *     "salonHolidays": {
 *       "weekdays": [
 *         1
 *       ],
 *       "holidays": [
 *         "01/01"
 *       ],
 *       "texts": "holiday"
 *     },
 *     "salonSNS": {
 *       "facebook": "profile.php?id=100011002652350"
 *     },
 *     "salonSeatsNumber": 50,
 *     "salonOtherNote": "eg eg",
 *     "objectId": "iEYQp8",
 *     "salonStaffsNumber": "10",
 *     "salonEmail": "salon-1@abc.com",
 *     "salonImage": {
 *       "objectId": "oAulFLCVmA",
 *       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/c6f437fe510743f2c6a80c9a09800dfa_salon_250x250.jpg",
 *       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/ee9ddfaf3f839c8bedecab51d6d5c3ec_salon_800x800.jpg",
 *       "original": "https://hairlie-dev.s3.amazonaws.com/8c676aa2c5cbf692e5711b519b357ddc_PsychoKiller.png"
 *     }
 *     "bankInfo": {
 *           "bank": {
 *               "objectId": "KN9ow5H3eL",
 *               "bankName": "仙台銀行",
 *               "bankCode": 512,
 *               "bankNameHiragana": "せんだい"
 *           },
 *           "branch": {
 *               "objectId": "qvSm78rV1K",
 *               "branchName": "国分町支店",
 *               "branchCode": 203,
 *               "branchNameHiragana": "こくぶんちよう",
 *               "telephone": "022-225-8241",
 *               "postalCode": "980-8656",
 *               "address": "宮城県仙台市青葉区一番町２−１−１本店営業部内"
 *           },
 *           "type": "CHECKING_ACCOUNT",
 *           "accountName": "hung123456789101",
 *           "accountNumber": "1234567"
 *       },
 *     "holdingCompany": {
 *          "name": "holding company 1",
 *          "objectId": "FAMskU4JBp",
 *          "status": "ACTIVE"
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
function adminUpdateSalonInfo() {}
