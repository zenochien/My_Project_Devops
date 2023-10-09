/**
 * @api {post} /customerGetPostDetailPage customerGetPostDetailPage
 * @apiVersion 1.0.6
 * @apiName customerGetPostDetailPage
 * @apiGroup Web-Customer-Post
 *
 * @apiDescription Get Post detail on Customer page
 *
 * @apiParam {String} postId
 * @apiParam {Number} limit       relatedPosts's limit
 *
 * @apiExample {json} Request example
 * {
 *   "postId": "eI1sUdrIc5"
 *   "limit": 50
 * }
 *
 * @apiSuccess {Object}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "post": {
 *       "tags": [
 *         "aeae",
 *         "sfsff"
 *       ],
 *       "faceShapes": [
 *         "卵型",
 *         "ベース",
 *         "逆三角"
 *       ],
 *       "images": [
 *         {
 *           "objectId": "ygUna7dKue",
 *           "file": "https://hairlie-dev.s3.amazonaws.com/b5763c0b3dc2db8f21973a7580bebcca_hairlie_image.jpg",
 *           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/b0de267ae48bd2981120f4ce97f1f4c9_post_250x250.jpg",
 *           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/b8de593b1d88f3e9fb6561f83112cf51_post_600x600.jpg",
 *           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/9fcf5c45b0b7e77d0ecc3872f6fd266e_post_800x800.jpg"
 *         }
 *       ],
 *       "products": [
 *         {
 *           "objectId": "MnhJ8IWD8N",
 *           "name": "sadsad",
 *           "price": 2313,
 *           "images": [
 *             {
 *               "objectId": "CEmvqOkoYs",
 *               "file": "https://hairlie-dev.s3.amazonaws.com/cc76a699da7d394fed42ebe109644b51_hairlie_image.jpg",
 *               "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/a51a89861d717b49ab03cb6586eeef83_product_250x250.jpg",
 *               "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/68320d9cc34652c20aca2d9f05b219a0_product_600x600.jpg",
 *               "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/e47525a171296478b742a985fd18a8d3_product_800x800.jpg"
 *             }
 *           ],
 *           "description": "sadsadsa"
 *         }
 *       ],
 *       "menus": [
 *         {
 *           "objectId": "Cna3E9HdTR",
 *           "name": "menu ne",
 *           "description": "description ne",
 *           "duration": 1,
 *           "amount": 111,
 *           "status": "PUBLISHED"
 *           "isAssigned": true
 *         }
 *       ],
 *       "status": "PUBLISHED",
 *       "salon": {
 *         "salonName": "Psycho Killer",
 *         "objectId": "nyG1k8"
 *       },
 *       "stylist": {
 *         "profileImages": [
 *           {
 *             "objectId": "8Yo5HCoyaP",
 *             "file": "https://hairlie-dev.s3.amazonaws.com/30a8d2eee10b97b0d7995c580242cb70_hairlie_image.jpg",
 *             "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/de7ad84654866194e219051a807cc42c_post_250x250.jpg",
 *             "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/fb6227c08a25ce5859b9cf5a34ebff4a_post_600x600.jpg",
 *             "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/eb0dfcfad3f140a13df1c32f499bf573_post_800x800.jpg"
 *           }
 *         ],
 *         "fullName": "Kiet Anh",
 *         "nickName": "hahaha",
 *         "objectId": "xsX53jqzxs"
 *       },
 *       "description": "adadadad",
 *       "totalPrice": 211,
 *       "createdAt": "2020-09-07T08:19:50.414Z",
 *       "objectId": "w2BNBJl0U3"
 *     },
 *     "relatedPosts": [
 *       {
 *         "tags": [
 *           "fsfsf",
 *           "sfsf",
 *         ],
 *         "faceShapes": [
 *           "丸型",
 *           "卵型",
 *           "四角"
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
 *         "products": [
 *           {
 *             "objectId": "EDkMVtW2Kd",
 *             "name": "product9",
 *             "price": 100,
 *             "images": [
 *               {
 *                 "objectId": "dtbFTaKrKz",
 *                 "file": "https://hairlie-dev.s3.amazonaws.com/8d162ae7f791d3db2764af5c97316636_hairlie_image.jpg",
 *                 "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/8c5ba258c55d5e7dbdd357cd7a987f3f_stylist_250x250.jpg",
 *                 "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/8d00279e09cb776f1fe77be1fae1b52e_stylist_600x600.jpg",
 *                 "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/41737d568cae901d646144ece80de212_stylist_800x800.jpg"
 *               }
 *             ],
 *             "description": "description3"
 *           }
 *         ],
 *         "menus": [
 *           {
 *             "objectId": "B09OvervYi",
 *             "name": "nhanmenu03",
 *             "description": "description ne",
 *             "duration": 1,
 *             "amount": 100,
 *             "status": "PUBLISHED"
 *             "isAssigned": true
 *           }
 *         ],
 *         "status": "PUBLISHED",
 *         "salon": {
 *           "salonName": "Psycho Killer",
 *           "objectId": "nyG1k8"
 *         },
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
 *           "nickName": "hahaha",
 *           "objectId": "xsX53jqzxs"
 *         },
 *         "description": "d",
 *         "totalPrice": 200,
 *         "createdAt": "2020-09-08T01:24:03.351Z",
 *         "objectId": "Ja4XYqVKaH"
 *       }
 *     ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 */
function customerGetPostDetailPage() {}
