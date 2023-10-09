/**
 * @api {post} /customerGetPostDetailPage customerGetPostDetailPage
 * @apiVersion 2.3.0
 * @apiName customerGetPostDetailPage
 * @apiGroup Web-Customer-Post
 *
 * @apiDescription Get Post detail on Customer page
 *
 * @apiParam {String} postId
 *
 * @apiExample {json} Request example
 * {
 *   "postId": "eI1sUdrIc5"
 * }
 *
 * @apiSuccess {Object}  result
 *
 * @apiSuccessExample {json} Response example
 *{
 *   "result": {
 *       "post": {
 *           "tags": [],
 *           "faceShapes": [],
 *           "images": [
 *               {
 *                   "objectId": "p1QQzK7rf8",
 *                   "file": "https://hairlie-dev.s3.amazonaws.com/b22e6a8d2bfabcbeb952ad98c81ebdbd_hairlie_image.jpg",
 *                   "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/f549e9c0c152c6b06d2e0ed3571aa690_post_250x250.jpg",
 *                   "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/fc20f4ccd6148b33792307aafa2a47fb_post_600x600.jpg",
 *                   "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/aa7af6fe168975ae7d30e3a4b51227bd_post_800x800.jpg"
 *                }
 *           ],
 *           "products": [
 *               {
 *                   "objectId": "TvEZHSFXOx",
 *                   "name": "BakaJen",
 *                   "price": 1,
 *                   "images": [
 *                       {
 *                           "objectId": "jlRYZfc4lg",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/8c2c6532d7fc311554a0e64db49077be_hairlie_image.png",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/64b7f7c4e4a393d01d620cebfa83f5a3_post_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/fd3284d6560b9b587220ff3abca33f33_post_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/8bef2d5ed5c4e8c191c70e4dca4fd403_post_800x800.jpg"
 *                       },
 *                       {
 *                           "objectId": "dFbkSHqmKD",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/011b7b2269deddc03f6ad07fdf9d38c0_hairlie_image.jpg",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/99c46ea1c6ace9934b21a16e10534630_post_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/befda9fc6178226bf1ef0dedd30dbbd1_post_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/1e4b88b72bbf3baa9f670850c2e906c1_post_800x800.jpg"
 *                       },
 *                       {
 *                           "objectId": "ig2gIm5fPl",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/86d17e9b5388373c60829e3f5ac54688_hairlie_image.jpg",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/3b97b23a9c23cc21f917ae0d6596e05b_post_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/79c2ab1006e32314d5b0d28a7f1af123_post_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/51046e86264638ee7360655e55d429f1_post_800x800.jpg"
 *                       }
 *                   ],
 *                   "description": "血液がなくなる。それは死を意味しま3 事業資金がなくな\n\n1. れば企業は倒産する。日本では毎年約１万社の企業が倒産しています。 倒産する企業のうち黒字企業の割合は半数近く \n 2. に上っています。つまり、救 えるのに救えなかった企業が日本にはどれだけあるのか、ということになります。 ピーエムジ―で"
 *               }
 *           ],
 *           "menus": [],
 *           "status": "PUBLISHED",
 *           "salon": {
 *               "salonName": "LuuLuu",
 *               "slug": "luuluu",
 *               "objectId": "bQ2XFo"
 *           },
 *           "stylist": {
 *               "profileImages": [
 *                   {
 *                       "objectId": "Xh6jlViH4C",
 *                       "file": "https://hairlie-dev.s3.amazonaws.com/096a0bfce2ed8494fa294e9ec5cb1d20_hairlie_image.jpg",
 *                       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/5571a6fa7f8f5757e6e0be8b52f0e8d3_post_250x250.jpg",
 *                       "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/f52532920cde7f82123134a61acaaddf_post_600x600.jpg",
 *                       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/509b457f47871c1dc22a9de64d491667_post_800x800.jpg"
 *                   },
 *                   {
 *                       "objectId": "zCvhC2GucU",
 *                       "file": "https://hairlie-dev.s3.amazonaws.com/a4e5b1645a8ea773cd6ff79429866c8d_hairlie_image.jpg",
 *                       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/142d67ce1085ba7691b42e3c52874456_post_250x250.jpg",
 *                       "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/0f847ba049254019bc8c5bd6f2b68630_post_600x600.jpg",
 *                       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/0cec3bbee54d85e291279aaaabe91e74_post_800x800.jpg"
 *                   },
 *                   {
 *                       "objectId": "TvaCoIOflQ",
 *                       "file": "https://hairlie-dev.s3.amazonaws.com/f628f92361defbf73dbab01a2c9e9f6d_hairlie_image.jpg",
 *                       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/62d1f0a855b9a81df0ad8f4c119844ff_post_250x250.jpg",
 *                       "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/fde81571a081537a1b3eb6b1acae5e0c_post_600x600.jpg",
 *                       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/b6f450eb322d52e2c73e89adea5c9903_post_800x800.jpg"
 *                   }
 *               ],
 *               "fullName": "Zhan Yang",
 *               "nickName": "Zix",
 *               "status": "PUBLISHED",
 *               "slug": "zix",
 *               "generalScore": 0,
 *               "reviewCount": 0,
 *               "serviceScore": 0,
 *               "styleScore": 0,
 *               "isOfficial": false,
 *               "objectId": "KqCurYw6LM"
 *           },
 *           "description": "",
 *           "totalPrice": 0,
 *           "createdAt": "2020-09-10T03:59:52.380Z",
 *           "objectId": "zecI954bqN",
 *           "isFavorite": false
 *       },
 *       "relatedPosts": [
 *           {
 *               "tags": [
 *                   ",limnjhbgv"
 *               ],
 *               "faceShapes": [
 *                   "丸型",
 *                   "ベース",
 *                   "逆三角"
 *               ],
 *               "images": [
 *                   {
 *                       "objectId": "zr4ppmV9Xi",
 *                       "file": "https://hairlie-dev.s3.amazonaws.com/2c4d8eb7c547db1e7c7f9c464af97ad1_hairlie_image.jpg",
 *                       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/6814ce8d903b470db801649de1394a0a_post_250x250.jpg",
 *                       "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/88e24f5c40896d5aefd6fbd443682fd8_post_600x600.jpg",
 *                       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/0a02398946ccb4aec7894ec84896eb90_post_800x800.jpg"
 *                    },
 *                   {
 *                       "objectId": "tJlolYNOEE",
 *                       "file": "https://hairlie-dev.s3.amazonaws.com/a18783e3d6738dc432413cbef2537559_hairlie_image.jpg",
 *                       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/1a310d0d42ea5586029ff482038d2d45_post_250x250.jpg",
 *                       "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/d00573e54666eff67ed6c5d5f7413027_post_600x600.jpg",
 *                       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/73f847e680058552469573f464f40409_post_800x800.jpg"
 *                   },
 *                   {
 *                       "objectId": "r0RQmYjhXH",
 *                       "file": "https://hairlie-dev.s3.amazonaws.com/d9c921b99d8b3191c2ea48d7d0899a1b_hairlie_image.jpg",
 *                       "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/f59ac07780e8db7e5fbc8546a38c9623_post_250x250.jpg",
 *                       "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/8b53f34e44383fd14387288c341a401d_post_600x600.jpg",
 *                       "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/7c748fb6de51e3cf1d70f5284f38899b_post_800x800.jpg"
 *                   }
 *               ],
 *               "products": [
 *                   {
 *                       "objectId": "V0w4EaGWcl",
 *                       "name": "aa",
 *                       "price": 1600000,
 *                       "images": [
 *                           {
 *                               "objectId": "RhnhvUW1zC",
 *                               "file": "https://hairlie-dev.s3.amazonaws.com/26b2e2893df1842925970fac6e362248_hairlie_image.png",
 *                               "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/bb141c6e68e2189b3689ed7d138d7290_post_250x250.jpg",
 *                                "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/dd0f57955a7ca602b8af5fd1ea739ce1_post_600x600.jpg",
 *                               "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/13e9a1f421866aab4e4d5b551d016e0e_post_800x800.jpg"
 *                           }
 *                       ],
 *                       "description": "gnfgh"
 *                   }
 *               ],
 *               "menus": [
 *                   {
 *                       "objectId": "sRP9GJqPAu",
 *                       "name": "Waubs",
 *                       "description": "sdgfsdgsg",
 *                       "amount": 145265,
 *                       "duration": 60,
 *                       "status": "PUBLISHED",
 *                       "isAssigned": true
 *                   }
 *               ],
 *               "status": "PUBLISHED",
 *               "salon": {
 *                   "salonName": "LuuLuu",
 *                   "slug": "luuluu",
 *                   "objectId": "bQ2XFo"
 *               },
 *               "stylist": {
 *                   "profileImages": [
 *                       {
 *                           "objectId": "Xh6jlViH4C",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/096a0bfce2ed8494fa294e9ec5cb1d20_hairlie_image.jpg",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/5571a6fa7f8f5757e6e0be8b52f0e8d3_post_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/f52532920cde7f82123134a61acaaddf_post_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/509b457f47871c1dc22a9de64d491667_post_800x800.jpg"
 *                       },
 *                       {
 *                           "objectId": "zCvhC2GucU",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/a4e5b1645a8ea773cd6ff79429866c8d_hairlie_image.jpg",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/142d67ce1085ba7691b42e3c52874456_post_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/0f847ba049254019bc8c5bd6f2b68630_post_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/0cec3bbee54d85e291279aaaabe91e74_post_800x800.jpg"
 *                       },
 *                       {
 *                           "objectId": "TvaCoIOflQ",
 *                           "file": "https://hairlie-dev.s3.amazonaws.com/f628f92361defbf73dbab01a2c9e9f6d_hairlie_image.jpg",
 *                           "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/62d1f0a855b9a81df0ad8f4c119844ff_post_250x250.jpg",
 *                           "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/fde81571a081537a1b3eb6b1acae5e0c_post_600x600.jpg",
 *                           "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/b6f450eb322d52e2c73e89adea5c9903_post_800x800.jpg"
 *                       }
 *                   ],
 *                   "fullName": "Zhan Yang",
 *                   "nickName": "Zix",
 *                   "status": "PUBLISHED",
 *                   "slug": "zix",
 *                   "generalScore": 0,
 *                   "reviewCount": 0,
 *                   "serviceScore": 0,
 *                   "styleScore": 0,
 *                   "isOfficial": false,
 *                   "objectId": "KqCurYw6LM"
 *               },
 *               "description": "tyhujikjuhygtfrdes",
 *               "totalPrice": 145265,
 *               "createdAt": "2020-10-16T06:48:54.403Z",
 *               "objectId": "pqMa5mzZgn",
 *               "isFavorite": false
 *           }
 *       ]
 *   }
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 */
function customerGetPostDetailPage() {}
