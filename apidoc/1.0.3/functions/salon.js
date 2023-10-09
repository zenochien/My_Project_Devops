/**
 * @api {post} /customerGetSalonDetailPage customerGetSalonDetailPage
 * @apiVersion 1.0.3
 * @apiName customerGetSalonDetailPage
 * @apiGroup Web-Customer-Salon
 *
 * @apiDescription Get Salon detail on Customer page with published stylist
 *
 * @apiParam {String} salonId
 * @apiParam {Number} [limit]       Stylist list's limit
 *
 * @apiExample {json} Request example
 * {
 *   "salonId": "nyG1k8"
 *   "limit": 1
 * }
 *
 * @apiSuccess {Object}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "salon": {
 *       "salonName": "Psycho Killer",
 *       "slug": "psycho-killer",
 *       "salonNameKatakana": "サイコー・キラー",
 *       "salonEmail": "nhansalon@yopmail.com",
 *       "phone": "+811234567890",
 *       "postalCode": "123-4567",
 *       "salonAddress1": "北海道",
 *       "salonAddress2": "Tsukisamu Higashi 2 Jo",
 *       "salonAddress3": "Abuta District",
 *       "salonAddress4": "TOKYO SKYTREE",
 *       "salonCatchphrase": "Saa, omae no tsumi o kazoero!",
 *       "salonDirection": "Jump off the bridge",
 *       "salonHolidays": {
 *         "texts": "holiday"
 *       },
 *       "salonNote": "eg",
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
 *       "salonSNS": {
 *         "facebook": "profile.php?id=100011002652350"
 *       },
 *       "createdAt": "2020-08-13T04:13:02.491Z",
 *       "salonStaffsNumber": 10,
 *       "salonOtherNote": "eg eg",
 *       "salonSeatsNumber": 50,
 *       "objectId": "nyG1k8",
 *       "salonImage": {
 *         "objectId": "yz9GW9hciT",
 *         "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/5d3317f3fc77749b1946ee54ab7eeaa0_salon_250x250.jpg",
 *         "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/3ec081fd1f29a9c777351a17b1ff14e1_salon_800x800.jpg",
 *         "original": "https://hairlie-dev.s3.amazonaws.com/f95b7274c2be30844d8d699452dc9d21_hairlie_image.jpg"
 *       }
 *     },
 *     "categories": [
 *       {
 *         "name": "HEAD SPA",
 *         "menus": [
 *           {
 *             "objectId": "Cna3E9HdTR",
 *             "name": "menu ne",
 *             "amount": 111,
 *             "description": "description moi ne"
 *           }
 *         ],
 *         "objectId": "VMcx8Oyy37"
 *       },
 *     ],
 *     "stylists": [
 *       {
 *         "createdAt": "2020-09-08T03:29:29.306Z",
 *         "salon": {
 *           "salonName": "Psycho Killer",
 *           "objectId": "nyG1k8"
 *         },
 *         "profileImages": [
 *           {
 *             "objectId": "bNFjmC09pJ",
 *             "file": "https://hairlie-dev.s3.amazonaws.com/81c58cb2e6fed25a4e74a7ca8b0a3103_hairlie_image.jpg",
 *             "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/e1a1e5fce3a167f1a80e8f0a9a3d4fc8_post_250x250.jpg",
 *             "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/4f1689e5fd78fe4d4543dd646680ae29_post_600x600.jpg",
 *             "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/07f990b4e12a0aad494d4e6ce7c18c01_post_800x800.jpg"
 *           }
 *         ],
 *         "fullName": "Kiet Anh",
 *         "nickName": "anhkiet",
 *         "objectId": "MZCz5PnBgq"
 *       }
 *     ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function customerGetSalonDetailPage() {}
