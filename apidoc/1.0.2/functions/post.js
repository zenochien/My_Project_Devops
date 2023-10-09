/**
 * @api {post} /getPostDetail getPostDetail
 * @apiVersion 1.0.0
 * @apiName getPostDetail
 * @apiGroup Web-Post
 *
 * @apiDescription Get post detail
 * Note:
 * - Anonymous user can see published post
 * - Salon can only see their post
 *
 * @apiParam {String} postId
 *
 * @apiExample {json} Request example
 * {
 *   "postId": "Bad8mjyUGm"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.tags
 * @apiSuccess {Array}   result.faceShapes
 * @apiSuccess {Object}  result.images
 * @apiSuccess {String}  result.images.objectId
 * @apiSuccess {String}  result.images.file
 * @apiSuccess {String}  result.images.thumbLarge
 * @apiSuccess {String}  result.images.thumbMedium
 * @apiSuccess {String}  result.images.thumbSmall
 * @apiSuccess {Object}  result.menus
 * @apiSuccess {String}  result.menus.objectId
 * @apiSuccess {String}  result.menus.name
 * @apiSuccess {String}  result.menus.description
 * @apiSuccess {Number}  result.menus.amount
 * @apiSuccess {Number}  result.menus.duration
 * @apiSuccess {String}  result.menus.status
 * @apiSuccess {Number}  result.menus.isAssigned
 * @apiSuccess {Object}  result.products
 * @apiSuccess {String}  result.products.objectId
 * @apiSuccess {String}  result.products.name
 * @apiSuccess {Number}  result.products.price
 * @apiSuccess {Object}  result.products.images
 * @apiSuccess {Object}  result.stylist
 * @apiSuccess {String}  result.stylist.objectId
 * @apiSuccess {String}  result.stylist.fullName
 * @apiSuccess {String}  result.stylist.nickName
 * @apiSuccess {Object}  result.stylist.profileImages
 * @apiSuccess {String}  result.description
 * @apiSuccess {Number}  result.totalPrice
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.status
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *  "result": {
 *    "tags": [
 *      "tag1",
 *      "tag2"
 *    ],
 *    "faceShapes": [
 *      "vuong",
 *      "tron"
 *    ],
 *    "images": [
 *      {
 *        "objectId": "hssaminD2I",
 *        "file": "https://hairlie-dev.s3.amazonaws.com/56392a13b1cad5f5e6e08fda67bc42ea_hairlie_image.jpg",
 *        "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/fb30ae23d9746fa4401b7dc6d60acfa4_stylist_250x250.jpg",
 *        "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/1bf818315f57a5a49d66a4220227f280_stylist_600x600.jpg",
 *        "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/5fab18beec3c25c2b303058cd899997a_stylist_800x800.jpg"
 *      }
 *    ],
 *    "products": [
 *      {
 *        "objectId": "VaKAdIgjOC",
 *        "name": "product5",
 *        "price": 100,
 *        "images": [
 *          {
 *            "objectId": "UiQEVdS7OE",
 *            "file": "https://hairlie-dev.s3.amazonaws.com/fc976153529256217a21db5f8dda4801_hairlie_image.jpg",
 *            "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/ef6efbf152ef4221433bdd55041857fe_stylist_250x250.jpg",
 *            "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/f1d74e5f2400504c339ef3f5670cb209_stylist_600x600.jpg",
 *            "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/58f1a308a28fb57a7721e6c1aff01e89_stylist_800x800.jpg"
 *          }
 *        ]
 *      },
 *      {
 *        "objectId": "077HV40Czs",
 *        "name": "product6",
 *        "price": 100,
 *        "images": [
 *          {
 *            "objectId": "U3iCuFG64x",
 *            "file": "https://hairlie-dev.s3.amazonaws.com/fb4ab1995f6c3ae385b8a0ff63ade271_hairlie_image.jpg",
 *            "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/9a1e669e0ba2bb0619be4e9395c8551f_stylist_250x250.jpg",
 *            "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/9cff64538fcb367846e29a8a733b69a2_stylist_600x600.jpg",
 *            "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/2f3966433a6f9ef81e1b77ecd1195afc_stylist_800x800.jpg"
 *          }
 *        ]
 *      }
 *    ],
 *    "menus": [
 *      {
 *        "objectId": "ycclnF3gaT",
 *        "name": "Menu cat 11",
 *        "description": "Menu description",
 *        "duration": 1,
 *        "amount": 1112,
 *        "status": "PUBLISHED",
 *        "isAssigned": true
 *      }
 *    ],
 *    "status": "PUBLISHED",
 *    "salon": {
 *      "salonName": "Psycho Killer",
 *      "objectId": "nyG1k8"
 *    },
 *    "stylist": {
 *      "profileImages": [
 *        {
 *          "objectId": "XPDzdDh5LC",
 *          "file": "https://hairlie-dev.s3.amazonaws.com/feb2b85e61b52fa643e4177a0675b688_hairlie_image.jpg",
 *          "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/5e5e4143ed76319abe8f3cb533afd6cb_stylist_250x250.jpg",
 *          "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/6c122a6b5f3cbe8dcd12550dc52c2a6e_stylist_600x600.jpg",
 *          "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/e7301cb7bc9d4fe3a6650fbfef868f9c_stylist_800x800.jpg"
 *        }
 *      ],
 *      "fullName": "Nhan Nguyen",
 *      "nickName": "Nhan Nguyen",
 *      "objectId": "A4litCaG6h"
 *    },
 *    "description": "description",
 *    "totalPrice": 1112,
 *    "createdAt": "2020-09-01T03:05:30.249Z",
 *    "objectId": "8eEkaCRuW3"
 *  }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 */
function getPostDetail() {}

/**
 * @api {post} /createPost createPost
 * @apiVersion 1.0.0
 * @apiName createPost
 * @apiGroup Web-Post
 * @apiPermission Login Required as Salon Operator
 *
 * @apiDescription Create new post
 *
 * @apiParam {String} stylistId
 * @apiParam {Array}  [tags]
 * @apiParam {Array}  [faceShapes]  Accepted values: ['丸型', '卵型', '四角', '逆三角', 'ベース']
 * @apiParam {Array}  menus         objectIds of Menu. Min: 1 image
 * @apiParam {Array}  [products]    objectIds of Product
 * @apiParam {String} [description]
 * @apiParam {Array}  images        objectIds of Image. Min: 1, max: 3 images
 *
 * @apiExample {json} Request example
 * {
 *   "stylistId": "Ac9olnzPdB",
 *   "description": "description",
 *   "tags": ["tag1", "tag2"],
 *   "faceShapes": ["vuong","tron"],
 *   "images": ["qcWcyAoHVO"],
 *   "menus": ["EY1x3FAsIC"],
 *   "products": ["qwe1xFAsIC"]
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.tags
 * @apiSuccess {Array}   result.faceShapes
 * @apiSuccess {Object}  result.images
 * @apiSuccess {String}  result.images.objectId
 * @apiSuccess {String}  result.images.file
 * @apiSuccess {String}  result.images.thumbLarge
 * @apiSuccess {String}  result.images.thumbMedium
 * @apiSuccess {String}  result.images.thumbSmall
 * @apiSuccess {Object}  result.menus
 * @apiSuccess {String}  result.menus.objectId
 * @apiSuccess {String}  result.menus.name
 * @apiSuccess {Number}  result.menus.amount
 * @apiSuccess {String}  result.menus.status
 * @apiSuccess {Number}  result.menus.duration
 * @apiSuccess {Object}  result.products
 * @apiSuccess {String}  result.products.objectId
 * @apiSuccess {String}  result.products.name
 * @apiSuccess {Number}  result.products.price
 * @apiSuccess {Object}  result.products.images
 * @apiSuccess {Object}  result.stylist
 * @apiSuccess {String}  result.stylist.objectId
 * @apiSuccess {String}  result.stylist.fullName
 * @apiSuccess {String}  result.stylist.nickName
 * @apiSuccess {Object}  result.stylist.profileImages
 * @apiSuccess {String}  result.description
 * @apiSuccess {Number}  result.totalPrice
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.status
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *    "tags": [
 *      "tag1",
 *      "tag2"
 *    ],
 *    "faceShapes": [
 *      "vuong",
 *      "tron"
 *    ],
 *    "images": [
 *      {
 *        "objectId": "hssaminD2I",
 *        "file": "https://hairlie-dev.s3.amazonaws.com/56392a13b1cad5f5e6e08fda67bc42ea_hairlie_image.jpg",
 *        "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/fb30ae23d9746fa4401b7dc6d60acfa4_stylist_250x250.jpg",
 *        "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/1bf818315f57a5a49d66a4220227f280_stylist_600x600.jpg",
 *        "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/5fab18beec3c25c2b303058cd899997a_stylist_800x800.jpg"
 *      }
 *    ],
 *    "products": [
 *      {
 *        "objectId": "VaKAdIgjOC",
 *        "name": "product5",
 *        "price": 100,
 *        "images": [
 *          {
 *            "objectId": "UiQEVdS7OE",
 *            "file": "https://hairlie-dev.s3.amazonaws.com/fc976153529256217a21db5f8dda4801_hairlie_image.jpg",
 *            "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/ef6efbf152ef4221433bdd55041857fe_stylist_250x250.jpg",
 *            "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/f1d74e5f2400504c339ef3f5670cb209_stylist_600x600.jpg",
 *            "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/58f1a308a28fb57a7721e6c1aff01e89_stylist_800x800.jpg"
 *          }
 *        ]
 *      },
 *      {
 *        "objectId": "077HV40Czs",
 *        "name": "product6",
 *        "price": 100,
 *        "images": [
 *          {
 *            "objectId": "U3iCuFG64x",
 *            "file": "https://hairlie-dev.s3.amazonaws.com/fb4ab1995f6c3ae385b8a0ff63ade271_hairlie_image.jpg",
 *            "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/9a1e669e0ba2bb0619be4e9395c8551f_stylist_250x250.jpg",
 *            "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/9cff64538fcb367846e29a8a733b69a2_stylist_600x600.jpg",
 *            "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/2f3966433a6f9ef81e1b77ecd1195afc_stylist_800x800.jpg"
 *          }
 *        ]
 *      }
 *    ],
 *    "menus": [
 *      {
 *        "objectId": "ycclnF3gaT",
 *        "name": "Menu cat 11",
 *        "duration": 1,
 *        "amount": 1112,
 *        "status": "PUBLISHED",
 *        "isAssigned": true
 *      }
 *    ],
 *    "status": "PUBLISHED",
 *    "salon": {
 *      "salonName": "Psycho Killer",
 *      "objectId": "nyG1k8"
 *    },
 *    "stylist": {
 *      "profileImages": [
 *        {
 *          "objectId": "XPDzdDh5LC",
 *          "file": "https://hairlie-dev.s3.amazonaws.com/feb2b85e61b52fa643e4177a0675b688_hairlie_image.jpg",
 *          "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/5e5e4143ed76319abe8f3cb533afd6cb_stylist_250x250.jpg",
 *          "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/6c122a6b5f3cbe8dcd12550dc52c2a6e_stylist_600x600.jpg",
 *          "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/e7301cb7bc9d4fe3a6650fbfef868f9c_stylist_800x800.jpg"
 *        }
 *      ],
 *      "fullName": "Nhan Nguyen",
 *      "nickName": "Nhan Nguyen",
 *      "objectId": "A4litCaG6h"
 *    },
 *    "description": "description",
 *    "totalPrice": 1112,
 *    "createdAt": "2020-09-01T03:05:30.249Z",
 *    "objectId": "8eEkaCRuW3"
 *  }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function createPost() {}

/**
 * @api {post} /updatePost updatePost
 * @apiVersion 1.0.0
 * @apiName updatePost
 * @apiGroup Web-Post
 * @apiPermission Login Required as Salon Operator
 *
 * @apiDescription Update post
 *
 * @apiParam {String} postId
 * @apiParam {Array}  [tags]
 * @apiParam {Array}  [faceShapes]    Accepted values: ['丸型', '卵型', '四角', '逆三角', 'ベース']
 * @apiParam {Array}  [menus]         objectIds of Menu. Min: 1 image
 * @apiParam {Array}  [products]      objectIds of Product
 * @apiParam {String} [description]
 * @apiParam {Array}  [images]        objectIds of Image. Min: 1, max: 3 images
 *
 * @apiExample {json} Request example
 * {
 *   "postId": "Ac9olnzPdB",
 *   "description": "description",
 *   "tags": ["tag1", "tag2"],
 *   "faceShapes": ["vuong","tron"],
 *   "images": ["qcWcyAoHVO"],
 *   "menus": ["EY1x3FAsIC"],
 *   "products": ["qwe1xFAsIC"]
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.tags
 * @apiSuccess {Array}   result.faceShapes
 * @apiSuccess {Object}  result.images
 * @apiSuccess {String}  result.images.objectId
 * @apiSuccess {String}  result.images.file
 * @apiSuccess {String}  result.images.thumbLarge
 * @apiSuccess {String}  result.images.thumbMedium
 * @apiSuccess {String}  result.images.thumbSmall
 * @apiSuccess {Object}  result.menus
 * @apiSuccess {String}  result.menus.objectId
 * @apiSuccess {String}  result.menus.name
 * @apiSuccess {Number}  result.menus.amount
 * @apiSuccess {String}  result.menus.status
 * @apiSuccess {Number}  result.menus.duration
 * @apiSuccess {Object}  result.products
 * @apiSuccess {String}  result.products.objectId
 * @apiSuccess {String}  result.products.name
 * @apiSuccess {Number}  result.products.price
 * @apiSuccess {Object}  result.products.images
 * @apiSuccess {Object}  result.stylist
 * @apiSuccess {String}  result.stylist.objectId
 * @apiSuccess {String}  result.stylist.fullName
 * @apiSuccess {String}  result.stylist.nickName
 * @apiSuccess {Object}  result.stylist.profileImages
 * @apiSuccess {String}  result.description
 * @apiSuccess {Number}  result.totalPrice
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.status
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *    "tags": [
 *      "tag1",
 *      "tag2"
 *    ],
 *    "faceShapes": [
 *      "vuong",
 *      "tron"
 *    ],
 *    "images": [
 *      {
 *        "objectId": "hssaminD2I",
 *        "file": "https://hairlie-dev.s3.amazonaws.com/56392a13b1cad5f5e6e08fda67bc42ea_hairlie_image.jpg",
 *        "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/fb30ae23d9746fa4401b7dc6d60acfa4_stylist_250x250.jpg",
 *        "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/1bf818315f57a5a49d66a4220227f280_stylist_600x600.jpg",
 *        "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/5fab18beec3c25c2b303058cd899997a_stylist_800x800.jpg"
 *      }
 *    ],
 *    "products": [
 *      {
 *        "objectId": "VaKAdIgjOC",
 *        "name": "product5",
 *        "price": 100,
 *        "images": [
 *          {
 *            "objectId": "UiQEVdS7OE",
 *            "file": "https://hairlie-dev.s3.amazonaws.com/fc976153529256217a21db5f8dda4801_hairlie_image.jpg",
 *            "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/ef6efbf152ef4221433bdd55041857fe_stylist_250x250.jpg",
 *            "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/f1d74e5f2400504c339ef3f5670cb209_stylist_600x600.jpg",
 *            "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/58f1a308a28fb57a7721e6c1aff01e89_stylist_800x800.jpg"
 *          }
 *        ]
 *      },
 *      {
 *        "objectId": "077HV40Czs",
 *        "name": "product6",
 *        "price": 100,
 *        "images": [
 *          {
 *            "objectId": "U3iCuFG64x",
 *            "file": "https://hairlie-dev.s3.amazonaws.com/fb4ab1995f6c3ae385b8a0ff63ade271_hairlie_image.jpg",
 *            "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/9a1e669e0ba2bb0619be4e9395c8551f_stylist_250x250.jpg",
 *            "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/9cff64538fcb367846e29a8a733b69a2_stylist_600x600.jpg",
 *            "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/2f3966433a6f9ef81e1b77ecd1195afc_stylist_800x800.jpg"
 *          }
 *        ]
 *      }
 *    ],
 *    "menus": [
 *      {
 *        "objectId": "ycclnF3gaT",
 *        "name": "Menu cat 11",
 *        "duration": 1,
 *        "amount": 1112,
 *        "status": "PUBLISHED",
 *        "isAssigned": true
 *      }
 *    ],
 *    "status": "PUBLISHED",
 *    "salon": {
 *      "salonName": "Psycho Killer",
 *      "objectId": "nyG1k8"
 *    },
 *    "stylist": {
 *      "profileImages": [
 *        {
 *          "objectId": "XPDzdDh5LC",
 *          "file": "https://hairlie-dev.s3.amazonaws.com/feb2b85e61b52fa643e4177a0675b688_hairlie_image.jpg",
 *          "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/5e5e4143ed76319abe8f3cb533afd6cb_stylist_250x250.jpg",
 *          "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/6c122a6b5f3cbe8dcd12550dc52c2a6e_stylist_600x600.jpg",
 *          "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/e7301cb7bc9d4fe3a6650fbfef868f9c_stylist_800x800.jpg"
 *        }
 *      ],
 *      "fullName": "Nhan Nguyen",
 *      "nickName": "Nhan Nguyen",
 *      "objectId": "A4litCaG6h"
 *    },
 *    "description": "description",
 *    "totalPrice": 1112,
 *    "createdAt": "2020-09-01T03:05:30.249Z",
 *    "objectId": "8eEkaCRuW3"
 *  }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function updatePost() {}

/**
 * @api {post} /removePost removePost
 * @apiVersion 1.0.0
 * @apiName removePost
 * @apiGroup Web-Post
 * @apiPermission Login Required as Salon Operator
 *
 * @apiDescription Remove post
 *
 * @apiParam {String} postId
 *
 * @apiExample {json} Request example
 * {
 *   "postId": "Bad8mjyUGm"
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
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function removePost() {}

/**
 * @api {post} /changePostPublishStatus changePostPublishStatus
 * @apiVersion 1.0.0
 * @apiName changePostPublishStatus
 * @apiGroup Web-Post
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Change publish status of post
 *
 * @apiParam {String} postId
 *
 * @apiExample {json} Request example
 * {
 *   "postId": "Bad8mjyUGm"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Array}   result.tags
 * @apiSuccess {Array}   result.faceShapes
 * @apiSuccess {Object}  result.images
 * @apiSuccess {String}  result.images.objectId
 * @apiSuccess {String}  result.images.file
 * @apiSuccess {String}  result.images.thumbLarge
 * @apiSuccess {String}  result.images.thumbMedium
 * @apiSuccess {String}  result.images.thumbSmall
 * @apiSuccess {Object}  result.menus
 * @apiSuccess {String}  result.menus.objectId
 * @apiSuccess {String}  result.menus.name
 * @apiSuccess {Number}  result.menus.amount
 * @apiSuccess {Number}  result.menus.duration
 * @apiSuccess {String}  result.menus.status
 * @apiSuccess {Number}  result.menus.isAssigned
 * @apiSuccess {Object}  result.products
 * @apiSuccess {String}  result.products.objectId
 * @apiSuccess {String}  result.products.name
 * @apiSuccess {Number}  result.products.price
 * @apiSuccess {Object}  result.products.images
 * @apiSuccess {Object}  result.stylist
 * @apiSuccess {String}  result.stylist.objectId
 * @apiSuccess {String}  result.stylist.fullName
 * @apiSuccess {String}  result.stylist.nickName
 * @apiSuccess {Object}  result.stylist.profileImages
 * @apiSuccess {String}  result.description
 * @apiSuccess {Number}  result.totalPrice
 * @apiSuccess {String}  result.createdAt
 * @apiSuccess {String}  result.status
 * @apiSuccess {String}  result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *    "tags": [
 *      "tag1",
 *      "tag2"
 *    ],
 *    "faceShapes": [
 *      "vuong",
 *      "tron"
 *    ],
 *    "images": [
 *      {
 *        "objectId": "hssaminD2I",
 *        "file": "https://hairlie-dev.s3.amazonaws.com/56392a13b1cad5f5e6e08fda67bc42ea_hairlie_image.jpg",
 *        "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/fb30ae23d9746fa4401b7dc6d60acfa4_stylist_250x250.jpg",
 *        "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/1bf818315f57a5a49d66a4220227f280_stylist_600x600.jpg",
 *        "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/5fab18beec3c25c2b303058cd899997a_stylist_800x800.jpg"
 *      }
 *    ],
 *    "products": [
 *      {
 *        "objectId": "VaKAdIgjOC",
 *        "name": "product5",
 *        "price": 100,
 *        "images": [
 *          {
 *            "objectId": "UiQEVdS7OE",
 *            "file": "https://hairlie-dev.s3.amazonaws.com/fc976153529256217a21db5f8dda4801_hairlie_image.jpg",
 *            "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/ef6efbf152ef4221433bdd55041857fe_stylist_250x250.jpg",
 *            "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/f1d74e5f2400504c339ef3f5670cb209_stylist_600x600.jpg",
 *            "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/58f1a308a28fb57a7721e6c1aff01e89_stylist_800x800.jpg"
 *          }
 *        ]
 *      },
 *      {
 *        "objectId": "077HV40Czs",
 *        "name": "product6",
 *        "price": 100,
 *        "images": [
 *          {
 *            "objectId": "U3iCuFG64x",
 *            "file": "https://hairlie-dev.s3.amazonaws.com/fb4ab1995f6c3ae385b8a0ff63ade271_hairlie_image.jpg",
 *            "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/9a1e669e0ba2bb0619be4e9395c8551f_stylist_250x250.jpg",
 *            "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/9cff64538fcb367846e29a8a733b69a2_stylist_600x600.jpg",
 *            "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/2f3966433a6f9ef81e1b77ecd1195afc_stylist_800x800.jpg"
 *          }
 *        ]
 *      }
 *    ],
 *    "menus": [
 *      {
 *        "objectId": "ycclnF3gaT",
 *        "name": "Menu cat 11",
 *        "duration": 1,
 *        "amount": 1112,
 *        "status": "PUBLISHED",
 *        "isAssigned": true
 *      }
 *    ],
 *    "status": "PUBLISHED",
 *    "salon": {
 *      "salonName": "Psycho Killer",
 *      "objectId": "nyG1k8"
 *    },
 *    "stylist": {
 *      "profileImages": [
 *        {
 *          "objectId": "XPDzdDh5LC",
 *          "file": "https://hairlie-dev.s3.amazonaws.com/feb2b85e61b52fa643e4177a0675b688_hairlie_image.jpg",
 *          "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/5e5e4143ed76319abe8f3cb533afd6cb_stylist_250x250.jpg",
 *          "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/6c122a6b5f3cbe8dcd12550dc52c2a6e_stylist_600x600.jpg",
 *          "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/e7301cb7bc9d4fe3a6650fbfef868f9c_stylist_800x800.jpg"
 *        }
 *      ],
 *      "fullName": "Nhan Nguyen",
 *      "nickName": "Nhan Nguyen",
 *      "objectId": "A4litCaG6h"
 *    },
 *    "description": "description",
 *    "totalPrice": 1112,
 *    "createdAt": "2020-09-01T03:05:30.249Z",
 *    "objectId": "8eEkaCRuW3"
 *  }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function changePostPublishStatus() {}

/**
 * @api {post} /getPostList getPostList
 * @apiVersion 1.0.0
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

/**
 * @api {post} /customerGetPostDetailPage customerGetPostDetailPage
 * @apiVersion 1.0.0
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
