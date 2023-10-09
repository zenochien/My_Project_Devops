/**
 * @api {post} /getPrefectureList getPrefectureList
 * @apiVersion 1.0.3
 * @apiName getPrefectureList
 * @apiGroup Web-Prefecture
 *
 * @apiDescription Get prefecture list
 *
 * @apiSuccess {Array}  result
 * @apiSuccess {String}  result.nameEn
 * @apiSuccess {String}  result.nameJp
 * @apiSuccess {String}  result.value
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": [
 *     {
 *       "nameEn": "Hokkaido",
 *       "nameJp": "北海道",
 *       "value": "PREFECTURE1"
 *     },
 *     {
 *       "nameEn": "Aomori Prefecture",
 *       "nameJp": "青森県",
 *       "value": "PREFECTURE2"
 *     },
 *     {
 *       "nameEn": "Iwate Prefecture",
 *       "nameJp": "岩手県",
 *       "value": "PREFECTURE3"
 *     }
 *   ]
 * }
 *
 */
function getPrefectureList() {}
