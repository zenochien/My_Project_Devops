/**
 * @api {post} /customerGetStylistDetailPage customerGetStylistDetailPage
 * @apiVersion 1.5.0
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
 * @apiSuccess {Object}  result.stylist
 * @apiSuccess {Boolane} [result.stylist.isFavorite]
 * @apiSuccess {Number}  [result.stylist.favoriteTotal]
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
