/**
 * @api {post} /getPostList getPostList
 * @apiVersion 1.0.5
 * @apiName getPostList
 * @apiGroup Web-Post
 *
 * @apiDescription Get post list
 * Note:
 * - Anonymous user can see all published post
 * - Salon can only see their post
 *
 * @apiParam {String} [stylistId]
 * @apiParam {Number} page
 * @apiParam {Number} limit
 * @apiParam {String} [orderBy]     Order key
 * @apiParam {String} [order]       Order direction ['ascending', 'descending']
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "qiODa9eq",
 *   "page": 1,
 *   "limit": 10,
 *   "orderBy": "createdAt",
 *   "order": "ascending"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 * @apiSuccess {Array}   result.list.tags
 * @apiSuccess {Array}   result.list.faceShapes
 * @apiSuccess {Array}   result.list.images
 * @apiSuccess {String}  result.list.images.objectId
 * @apiSuccess {String}  result.list.images.file
 * @apiSuccess {String}  result.list.images.thumbLarge
 * @apiSuccess {String}  result.list.images.thumbMedium
 * @apiSuccess {String}  result.list.images.thumbSmall
 * @apiSuccess {Array}   result.list.menus
 * @apiSuccess {String}  result.list.menus.objectId
 * @apiSuccess {String}  result.list.menus.name
 * @apiSuccess {String}  result.list.menus.description
 * @apiSuccess {Number}  result.list.menus.amount
 * @apiSuccess {Number}  result.list.menus.duration
 * @apiSuccess {String}  result.list.menus.status
 * @apiSuccess {Number}  result.list.menus.isAssigned
 * @apiSuccess {Object}  result.list.salon
 * @apiSuccess {String}  result.list.salon.salonName
 * @apiSuccess {String}  result.list.salon.slug
 * @apiSuccess {String}  result.list.salon.objectId
 * @apiSuccess {Array}   result.list.products
 * @apiSuccess {String}  result.list.products.objectId
 * @apiSuccess {String}  result.list.products.name
 * @apiSuccess {Number}  result.list.products.price
 * @apiSuccess {Object}  result.list.products.images
 * @apiSuccess {Object}  result.list.stylist
 * @apiSuccess {String}  result.list.stylist.objectId
 * @apiSuccess {String}  result.list.stylist.fullName
 * @apiSuccess {String}  result.list.stylist.nickName
 * @apiSuccess {String}  result.list.stylist.slug
 * @apiSuccess {String}  result.list.stylist.objectId
 * @apiSuccess {Array}   result.list.stylist.profileImages
 * @apiSuccess {String}  result.list.stylist.profileImages.objectId
 * @apiSuccess {String}  result.list.stylist.profileImages.file
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbLarge
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbMedium
 * @apiSuccess {String}  result.list.stylist.profileImages.thumbSmall
 * @apiSuccess {String}  result.list.description
 * @apiSuccess {Number}  result.list.totalPrice
 * @apiSuccess {String}  result.list.createdAt
 * @apiSuccess {String}  result.list.status
 * @apiSuccess {String}  result.list.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "total": 1,
 *      "list": [
 *        {
 *          "tags": [
 *            "tag1",
 *            "tag2"
 *          ],
 *          "faceShapes": [
 *            "vuong",
 *            "tron"
 *          ],
 *          "images": [
 *            {
 *              "objectId": "hssaminD2I",
 *              "file": "https://hairlie-dev.s3.amazonaws.com/56392a13b1cad5f5e6e08fda67bc42ea_hairlie_image.jpg",
 *              "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/fb30ae23d9746fa4401b7dc6d60acfa4_stylist_250x250.jpg",
 *              "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/1bf818315f57a5a49d66a4220227f280_stylist_600x600.jpg",
 *              "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/5fab18beec3c25c2b303058cd899997a_stylist_800x800.jpg"
 *            }
 *          ],
 *          "products": [
 *            {
 *              "objectId": "VaKAdIgjOC",
 *              "name": "product5",
 *              "price": 100,
 *              "images": [
 *                {
 *                  "objectId": "UiQEVdS7OE",
 *                  "file": "https://hairlie-dev.s3.amazonaws.com/fc976153529256217a21db5f8dda4801_hairlie_image.jpg",
 *                  "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/ef6efbf152ef4221433bdd55041857fe_stylist_250x250.jpg",
 *                  "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/f1d74e5f2400504c339ef3f5670cb209_stylist_600x600.jpg",
 *                  "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/58f1a308a28fb57a7721e6c1aff01e89_stylist_800x800.jpg"
 *                }
 *              ]
 *            },
 *            {
 *              "objectId": "077HV40Czs",
 *              "name": "product6",
 *              "price": 100,
 *              "images": [
 *                {
 *                  "objectId": "U3iCuFG64x",
 *                  "file": "https://hairlie-dev.s3.amazonaws.com/fb4ab1995f6c3ae385b8a0ff63ade271_hairlie_image.jpg",
 *                  "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/9a1e669e0ba2bb0619be4e9395c8551f_stylist_250x250.jpg",
 *                  "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/9cff64538fcb367846e29a8a733b69a2_stylist_600x600.jpg",
 *                  "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/2f3966433a6f9ef81e1b77ecd1195afc_stylist_800x800.jpg"
 *                }
 *              ]
 *            }
 *          ],
 *          "menus": [
 *            {
 *              "objectId": "ycclnF3gaT",
 *              "name": "Menu cat 11",
 *              "description": "Menu description 11",
 *              "duration": 1,
 *              "amount": 1112,
 *              "status": "PUBLISHED",
 *              "isAssigned": true
 *            }
 *          ],
 *          "status": "PUBLISHED",
 *          "salon": {
 *            "salonName": "Psycho Killer",
 *            "objectId": "nyG1k8"
 *          },
 *          "stylist": {
 *            "profileImages": [
 *              {
 *                "objectId": "XPDzdDh5LC",
 *                "file": "https://hairlie-dev.s3.amazonaws.com/feb2b85e61b52fa643e4177a0675b688_hairlie_image.jpg",
 *                "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/5e5e4143ed76319abe8f3cb533afd6cb_stylist_250x250.jpg",
 *                "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/6c122a6b5f3cbe8dcd12550dc52c2a6e_stylist_600x600.jpg",
 *                "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/e7301cb7bc9d4fe3a6650fbfef868f9c_stylist_800x800.jpg"
 *              }
 *            ],
 *            "fullName": "Nhan Nguyen",
 *            "nickName": "Nhan Nguyen",
 *            "objectId": "A4litCaG6h"
 *          },
 *          "description": "description",
 *          "totalPrice": 1112,
 *          "createdAt": "2020-09-01T03:05:30.249Z",
 *          "objectId": "8eEkaCRuW3"
 *        }
 *      ]
 *    }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 */
function getPostList() {}
