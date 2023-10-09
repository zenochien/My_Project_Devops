/**
 * @api {post} /getRecommendationForAStylist getRecommendationForAStylist
 * @apiVersion 1.9.0
 * @apiName getRecommendationForAStylist
 * @apiGroup Recommendation
 *
 * @apiDescription Get recommendations for a stylist
 *
 * @apiParam {String} stylistId
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "gJQu5XT931"
 * }
 *
 * @apiSuccess {Array}   result
 * @apiSuccess {Object}  result.receiver
 * @apiSuccess {String}  result.receiver.objectId
 * @apiSuccess {String}  result.receiver.fullName
 * @apiSuccess {String}  result.receiver.nickName
 * @apiSuccess {Array}   result.receiver.profileImages
 * @apiSuccess {Object}  result.contributor
 * @apiSuccess {String}  result.contributor.objectId
 * @apiSuccess {String}  result.contributor.fullName
 * @apiSuccess {String}  result.contributor.nickName
 * @apiSuccess {Array}   result.contributor.profileImages
 * @apiSuccess {Object}  result.salonContributor
 * @apiSuccess {String}  result.salonContributor.objectId
 * @apiSuccess {String}  result.salonContributor.salonName
 * @apiSuccess {String}  result.salonContributor.salonNameKatakana
 * @apiSuccess {String}  result.title
 * @apiSuccess {String}  result.content
 * @apiSuccess {String}  result.objectId
 * @apiSuccess {String}  result.createdAt
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
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
 *           },
 *           "title": "sckjncka",
 *           "content": "sdfnksjdf \nsdfsdkfj \nsdfs df sjdf sdfo sjdi fsod fsidf sjdfi",
 *           "objectId": "0tHWMKlyraaInPcArp2h3",
 *           "createdAt": "2022-05-05T06:26:19.566Z"
 *       }
 *   ]
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse MarkAllNotificationsNotFound
 */
function getRecommendationForAStylist() {}

/**
 * @api {post} /setTopBannerForStylist setTopBannerForStylist
 * @apiVersion 1.9.0
 * @apiName setTopBannerForStylist
 * @apiGroup Recommendation
 *
 * @apiDescription Set top banner for stylist
 *
 * @apiParam {String} stylistId
 * @apiParam {String} recommendationId
 * @apiExample {json} Request example
 * {
 *   "recommendationId": "gJQu5XT931",
 *   "stylistId": "12rdver"
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {String}  result.status
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "status": 'success'
 *	 }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse MarkAllNotificationsNotFound
 */
function setTopBannerForStylist() {}

/**
 * @api {post} /getStylistBannersByAdmin getStylistBannersByAdmin
 * @apiVersion 1.9.0
 * @apiName getStylistBannersByAdmin
 * @apiGroup Recommendation
 *
 * @apiDescription Get recommendations set to top banner for a stylist
 *
 * @apiParam {Number} [page]      Default 1
 * @apiParam {Number} [limit]     Default 10
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 10
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Array}    result.success
 * @apiSuccess {Object}   result.stylist
 * @apiSuccess {String}   result.stylist.objectId
 * @apiSuccess {String}   result.stylist.fullName
 * @apiSuccess {String}   result.stylist.nickName
 * @apiSuccess {Object}   result.list.stylist.profileImages
 * @apiSuccess {Object}   result.list.stylist.profileImages.objectId
 * @apiSuccess {Object}   result.list.stylist.profileImages.file
 * @apiSuccess {Object}   result.list.stylist.profileImages.thumbSmall
 * @apiSuccess {Object}   result.list.stylist.profileImages.thumbMedium
 * @apiSuccess {Object}   result.list.stylist.profileImages.thumbLarge
 * @apiSuccess {String}   result.list.salon
 * @apiSuccess {String}   result.list.salon.objectId
 * @apiSuccess {String}   result.list.salon.salonName
 * @apiSuccess {String}   result.list.salon.salonNameKatakana
 * @apiSuccess {String}   result.list.status
 * @apiSuccess {String}   result.list.createdAt

  * @apiSuccessExample {json} Response example
  * {
  *    "result": {
  *        "total": 1,
  *        "list": [
  *            {
  *                "objectId": "RQFUNLJTHsV9Lj0OuyXUV",
  *                "stylist": {
  *                    "objectId": "zTovNUJMss",
  *                    "fullName": "迫田 将輝",
  *                    "nickName": "サコタマサキ",
  *                    "userStatus": "INVITED",
  *                    "profileImages": [
  *                        {
  *                            "objectId": "1fCqIK3zeq",
  *                            "file": "https://hairlie-dev.s3.amazonaws.com/bde55085a1ba0a4368ecf8d7df208057_hairlie_image.jpg",
  *                            "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/3474d383cf2fda31a729f4f77d79fd81_post_250x250.jpg",
  *                            "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/03eb9c9b2e7a607ab78eebea1a4c2ade_post_600x600.jpg",
  *                            "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/f122e57aca8dccf20e0f6cdc403b5744_post_800x800.jpg"
  *                        }
  *                    ]
  *                },
  *                "salon": {
  *                    "objectId": "TPb2EF",
  *                    "salonName": "BARBER SAKOTA",
  *                    "salonNameKatakana": "バーバーサコタ"
  *                },
  *                "createdAt": "2022-04-27T09:54:57.070Z",
  *                "status": "published"
  *            }
  *        ]
  *    }
  * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getStylistBannersByAdmin() {}

/**
 * @api {post} /updateStatusTopBannerByAdmin updateStatusTopBannerByAdmin
 * @apiVersion 1.9.0
 * @apiName updateStatusTopBannerByAdmin
 * @apiGroup Recommendation
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Set status top banner for stylist
 *
 * @apiParam {String} recommendationId
 * @apiParam {String} status              PUBLISHED or UNPUBLISHED
 * @apiExample {json} Request example
 * {
 *   "recommendationId": "gJQu5XT931",
 *   "status": "PUBLISHED"
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {String}   result.success
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "success": true
 *	 }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function updateStatusTopBannerByAdmin() {}

/**
 * @api {post} /deleteTopBannerByAdmin deleteTopBannerByAdmin
 * @apiVersion 1.9.0
 * @apiName deleteTopBannerByAdmin
 * @apiGroup Recommendation
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Delete top banner for stylist
 *
 * @apiParam {String} recommendationId
 * @apiExample {json} Request example
 * {
 *   "recommendationId": "gJQu5XT931",
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {String}   result.success
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "success": true
 *	 }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function deleteTopBannerByAdmin() {}

/**
 * @api {post} /getTopBannerDetail getTopBannerDetail
 * @apiVersion 1.9.0
 * @apiName getTopBannerDetail
 * @apiGroup Recommendation
 *
 * @apiDescription Get recommendations detail for a stylist
 *
 * @apiParam {String} stylistId
 * @apiParam {String} recommendationId
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "gJQu5XT931"
 *   "recommendationId":"62a7edb1ccd0e7514db4491f"
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {String}   result.title
 * @apiSuccess {String}   result.content
 * @apiSuccess {Number}   result.recommendationNumber
 * @apiSuccess {Object}   result.receiver
 * @apiSuccess {String}   result.receiver.objectId
 * @apiSuccess {String}   result.receiver.fullName
 * @apiSuccess {String}   result.receiver.nickName
 * @apiSuccess {Array}    result.receiver.profileImages
 * @apiSuccess {Object}   result.salonReceiver
 * @apiSuccess {String}   result.salonReceiver.objectId
 * @apiSuccess {String}   result.salonReceiver.salonName
 * @apiSuccess {String}   result.salonReceiver.stationName
 * @apiSuccess {Number}   result.salonReceiver.distanceNearestStation
 * @apiSuccess {Object}   result.contributor
 * @apiSuccess {String}   result.contributor.objectId
 * @apiSuccess {String}   result.contributor.fullName
 * @apiSuccess {String}   result.contributor.nickName
 * @apiSuccess {Object}   result.contributor.salonContributor
 * @apiSuccess {String}   result.contributor.salonContributor.objectId
 * @apiSuccess {String}   result.contributor.salonContributor.salonName
 * @apiSuccess {String}   result.contributor.salonContributor.salonNameKatakana
 * @apiSuccess {Array}    result.schedules
 * @apiSuccess {String}   result.schedules.date
 * @apiSuccess {Boolean}  result.schedules.available

 * @apiSuccessExample {json} Response example
 *{
 *   "result": {
 *       "title": "title value",
 *       "content": "content value",
 *       "receiver": {
 *           "fullName": "Bogum Park",
 *           "nickName": "Bo Gum",
 *           "objectId": "zXlnCgiczB",
 *           "generalScore": 0,
 *           "styleScore": 0,
 *           "serviceScore": 0,
 *           "reviewCount": 0,
 *           "profileImages": [
 *               {
 *                   "objectId": "uXlAMPT3Ag",
 *                   "file": "https://hairlie-dev.s3.amazonaws.com/f4dc77a8c90330375211e795c2906be5_hairlie_image.jpg",
 *                   "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/7cc2d2f164ad5299ad70539368cc54d4_post_250x250.jpg",
 *                   "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/ae3b6e64ec0e349317e756096bfe83e5_post_600x600.jpg",
 *                   "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/e8786bb4d342c65cfbab938160c87df0_post_800x800.jpg"
 *               },
 *           ]
 *       },
 *       "salonReceiver": {
 *           "objectId": "NRc88P",
 *           "salonName": "Psycho Killer",
 *           "stationName": "testst",
 *           "distanceNearestStation": 20
 *       },
 *       "contributor": {
 *           "objectId": "zTovNUJMss",
 *           "fullName": "迫田 将輝",
 *           "nickName": "サコタマサキ",
 *           "userStatus": "INVITED",
 *           "profileImages": [
 *               {
 *                   "objectId": "1fCqIK3zeq",
 *                   "file": "https://hairlie-dev.s3.amazonaws.com/bde55085a1ba0a4368ecf8d7df208057_hairlie_image.jpg",
 *                   "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/3474d383cf2fda31a729f4f77d79fd81_post_250x250.jpg",
 *                   "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/03eb9c9b2e7a607ab78eebea1a4c2ade_post_600x600.jpg",
 *                   "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/f122e57aca8dccf20e0f6cdc403b5744_post_800x800.jpg"
 *               }
 *           ]
 *       },
 *       "salonContributor": {
 *           "objectId": "TPb2EF",
 *           "salonName": "BARBER SAKOTA",
 *           "salonNameKatakana": "バーバーサコタ"
 *       },
 *       "recommendationNumber": 2,
 *       "schedules": [
 *           {
 *               "date": "2022-06-13T15:00:00.000Z",
 *               "available": false
 *           },
 *           {
 *               "date": "2022-06-14T15:00:00.000Z",
 *               "available": false
 *           },
 *           {
 *               "date": "2022-06-15T15:00:00.000Z",
 *               "available": false
 *           },
 *           {
 *               "date": "2022-06-16T15:00:00.000Z",
 *               "available": false
 *           },
 *           {
 *               "date": "2022-06-17T15:00:00.000Z",
 *               "available": false
 *           },
 *           {
 *               "date": "2022-06-18T15:00:00.000Z",
 *               "available": false
 *           },
 *           {
 *               "date": "2022-06-19T15:00:00.000Z",
 *               "available": false
 *           }
 *       ]
 *   }
 *}
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getTopBannerDetail() {}

/**
 * @api {post} /getTopBannerStylistForHomePage getTopBannerStylistForHomePage
 * @apiVersion 1.9.0
 * @apiName getTopBannerStylistForHomePage
 * @apiGroup Recommendation
 *
 * @apiDescription Get recommendations detail for a top banner
 *
 *
 * @apiSuccess {Array}    result
 * @apiSuccess {String}   result.title
 * @apiSuccess {String}   result.content
 * @apiSuccess {Number}   result.recommendationNumber
 * @apiSuccess {Object}   result.receiver
 * @apiSuccess {String}   result.receiver.objectId
 * @apiSuccess {String}   result.receiver.fullName
 * @apiSuccess {String}   result.receiver.nickName
 * @apiSuccess {Array}    result.receiver.profileImages
 * @apiSuccess {Object}   result.salonReceiver
 * @apiSuccess {String}   result.salonReceiver.objectId
 * @apiSuccess {String}   result.salonReceiver.salonName
 * @apiSuccess {String}   result.salonReceiver.stationName
 * @apiSuccess {Number}   result.salonReceiver.distanceNearestStation
 * @apiSuccess {Object}   result.contributor
 * @apiSuccess {String}   result.contributor.objectId
 * @apiSuccess {String}   result.contributor.fullName
 * @apiSuccess {String}   result.contributor.nickName
 * @apiSuccess {Object}   result.contributor.salonContributor
 * @apiSuccess {String}   result.contributor.salonContributor.objectId
 * @apiSuccess {String}   result.contributor.salonContributor.salonName
 * @apiSuccess {String}   result.contributor.salonContributor.salonNameKatakana
 * @apiSuccess {Array}    result.schedules
 * @apiSuccess {String}   result.schedules.date
 * @apiSuccess {Boolean}  result.schedules.available

 * @apiSuccessExample {json} Response example
 *{
 *   "result": [
 *    {
 *       "title": "title value",
 *       "content": "content value",
 *       "receiver": {
 *           "fullName": "Bogum Park",
 *           "nickName": "Bo Gum",
 *           "objectId": "zXlnCgiczB",
 *           "generalScore": 0,
 *           "styleScore": 0,
 *           "serviceScore": 0,
 *           "reviewCount": 0,
 *           "profileImages": [
 *               {
 *                   "objectId": "uXlAMPT3Ag",
 *                   "file": "https://hairlie-dev.s3.amazonaws.com/f4dc77a8c90330375211e795c2906be5_hairlie_image.jpg",
 *                   "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/7cc2d2f164ad5299ad70539368cc54d4_post_250x250.jpg",
 *                   "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/ae3b6e64ec0e349317e756096bfe83e5_post_600x600.jpg",
 *                   "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/e8786bb4d342c65cfbab938160c87df0_post_800x800.jpg"
 *               },
 *           ]
 *       },
 *       "salonReceiver": {
 *           "objectId": "NRc88P",
 *           "salonName": "Psycho Killer",
 *           "stationName": "testst",
 *           "distanceNearestStation": 20
 *       },
 *       "contributor": {
 *           "objectId": "zTovNUJMss",
 *           "fullName": "迫田 将輝",
 *           "nickName": "サコタマサキ",
 *           "userStatus": "INVITED",
 *           "profileImages": [
 *               {
 *                   "objectId": "1fCqIK3zeq",
 *                   "file": "https://hairlie-dev.s3.amazonaws.com/bde55085a1ba0a4368ecf8d7df208057_hairlie_image.jpg",
 *                   "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/3474d383cf2fda31a729f4f77d79fd81_post_250x250.jpg",
 *                   "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/03eb9c9b2e7a607ab78eebea1a4c2ade_post_600x600.jpg",
 *                   "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/f122e57aca8dccf20e0f6cdc403b5744_post_800x800.jpg"
 *               }
 *           ]
 *       },
 *       "salonContributor": {
 *           "objectId": "TPb2EF",
 *           "salonName": "BARBER SAKOTA",
 *           "salonNameKatakana": "バーバーサコタ"
 *       },
 *       "recommendationNumber": 2,
 *       "schedules": [
 *           {
 *               "date": "2022-06-13T15:00:00.000Z",
 *               "available": false
 *           },
 *           {
 *               "date": "2022-06-14T15:00:00.000Z",
 *               "available": false
 *           },
 *           {
 *               "date": "2022-06-15T15:00:00.000Z",
 *               "available": false
 *           },
 *           {
 *               "date": "2022-06-16T15:00:00.000Z",
 *               "available": false
 *           },
 *           {
 *               "date": "2022-06-17T15:00:00.000Z",
 *               "available": false
 *           },
 *           {
 *               "date": "2022-06-18T15:00:00.000Z",
 *               "available": false
 *           },
 *           {
 *               "date": "2022-06-19T15:00:00.000Z",
 *               "available": false
 *           }
 *       ]
 *    }
 *  ]
 *}
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getTopBannerStylistForHomePage() {}
