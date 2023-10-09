/**
 * @api {post} /getCurrentParseConfig getCurrentParseConfig
 * @apiVersion 0.7.0
 * @apiName getCurrentParseConfig
 * @apiGroup ParseConfig
 *
 * @apiDescription Get current cached ParseConfig
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Object}   result.attributes
 * @apiSuccess {String}   result.attributes.privacyUrl
 * @apiSuccess {String}   result.attributes.termsCustomerUrl
 * @apiSuccess {String}   result.attributes.termsStylistUrl
 * @apiSuccess {String}   result.attributes.termsSalonUrl
 * @apiSuccess {String}   result.attributes.customerAndroidVersion
 * @apiSuccess {String}   result.attributes.customerIOSVersion
 * @apiSuccess {String}   result.attributes.stylistAndroidVersion
 * @apiSuccess {String}   result.attributes.stylistIOSVersion
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "attributes": {
 *           "privacyUrl": "https://hairlie.jp/policy",
 *           "termsCustomerUrl": "https://hairlie.jp/term-of-service/customer",
 *           "termsStylistUrl": "https://hairlie.jp/term-of-service/stylist",
 *           "termsSalonUrl": "https://hairlie.jp/term-of-service/salon",
 *           "customerAndroidVersion": "1.0.0",
 *           "customerIOSVersion": "1.0.0",
 *           "stylistAndroidVersion": "1.0.0",
 *           "stylistIOSVersion": "1.0.0",
 *       },
 *       "_escapedAttributes": {}
 *   }
 * }
 */
function getCurrentParseConfig() {}

/**
 * @api {post} /refreshParseConfig refreshParseConfig
 * @apiVersion 0.7.0
 * @apiName refreshParseConfig
 * @apiGroup ParseConfig
 *
 * @apiDescription Refresh ParseConfig
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {String}   result.hostname                               Ip addess || Const random string
 * @apiSuccess {Object}   result.attributes
 * @apiSuccess {String}   result.attributes.privacyUrl
 * @apiSuccess {String}   result.attributes.termsCustomerUrl
 * @apiSuccess {String}   result.attributes.termsStylistUrl
 * @apiSuccess {String}   result.attributes.termsSalonUrl
 * @apiSuccess {String}   result.attributes.customerAndroidVersion
 * @apiSuccess {String}   result.attributes.customerIOSVersion
 * @apiSuccess {String}   result.attributes.stylistAndroidVersion
 * @apiSuccess {String}   result.attributes.stylistIOSVersion
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "hostname": "RU6by72NrM",
 *       "attributes": {
 *           "privacyUrl": "https://hairlie.jp/policy",
 *           "termsCustomerUrl": "https://hairlie.jp/term-of-service/customer",
 *           "termsStylistUrl": "https://hairlie.jp/term-of-service/stylist",
 *           "termsSalonUrl": "https://hairlie.jp/term-of-service/salon",
 *           "customerAndroidVersion": "1.0.0",
 *           "customerIOSVersion": "1.0.0",
 *           "stylistAndroidVersion": "1.0.0",
 *           "stylistIOSVersion": "1.0.0",
 *       },
 *       "_escapedAttributes": {}
 *   }
 * }
 */
function refreshParseConfig() {}
