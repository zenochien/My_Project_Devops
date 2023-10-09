/**
 * @api {post} /addClosingDates addClosingDates
 * @apiVersion 0.0.5
 * @apiName addClosingDates
 * @apiGroup Web-ClosingDate
 *
 * @apiPermission Required Login as Salon operator
 * @apiDescription Add closing date
 *
 *
 * @apiParam {String} startDate    'YYYY-MM-DD'
 * @apiParam {String} endDate    'YYYY-MM-DD'
 * @apiParam {String} note
 *
 * @apiExample {json} Request example
 * {
 *   "startDate": "2021-04-30",
 *   "endDate": "2021-05-03",
 *   "note": "QTLD & GPMN"
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {String}   result.startDate
 * @apiSuccess {String}   result.endDate
 * @apiSuccess {String}   result.note
 * @apiSuccess {String}   result.salonId
 * @apiSuccess {String}   result.createdAt
 * @apiSuccess {String}   result.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "startDate": "2021-06-01",
 *       "endDate": "2021-06-01",
 *       "note": "QTTN",
 *       "salonId": "rasGad",
 *       "createdAt": "2021-04-21T10:00:23.107Z",
 *       "objectId": "QngxYijEen"
 *   }
 * }
 *
 * @apiErrorExample {json} AffectBookingError example
 * {
 *   "code": 9514,
 *   "error": [
 *       {
 *           "objectId": "U7uzFfN3yq",
 *           "serviceDateTime": "2021-04-29T09:30:00.000Z"
 *       }
 *   ]
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse AffectBookingError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function addClosingDates() {}

/**
 * @api {post} /deleteClosingDates deleteClosingDates
 * @apiVersion 0.0.5
 * @apiName deleteClosingDates
 * @apiGroup Web-ClosingDate
 *
 * @apiPermission Required Login as Salon operator
 * @apiDescription Delete closing date
 *
 *
 * @apiParam {String} objectId
 *
 * @apiExample {json} Request example
 * {
 *   "objectId": "tlBD4YtkSj"
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Boolean}  result.success
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "success": true
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function deleteClosingDates() {}

/**
 * @api {post} /getClosingDates getClosingDates
 * @apiVersion 0.0.5
 * @apiName getClosingDates
 * @apiGroup Web-ClosingDate
 *
 * @apiPermission Required Login as Salon operator
 * @apiDescription Get closing date
 *
 * @apiParam {String} [orderBy=createdAt]    Order column
 * @apiParam {String} [order]    ascending / descending
 * @apiParam {Number} page
 * @apiParam {Number} limit
 *
 * @apiExample {json} Request example
 * {
 *   "page": 1,
 *   "limit": 100
 * }
 *
 * @apiSuccess {Object}   result
 * @apiSuccess {Array}    result.list
 * @apiSuccess {String}   result.list.startDate    'YYYY-MM-DD'
 * @apiSuccess {String}   result.list.endDate    'YYYY-MM-DD'
 * @apiSuccess {String}   result.list.note
 * @apiSuccess {String}   result.list.createdAt
 * @apiSuccess {String}   result.list.objectId
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *       "list": [
 *           {
 *               "startDate": "2021-04-21",
 *               "endDate": "2021-04-21",
 *               "note": "Gio to",
 *               "createdAt": "2021-04-21T08:36:38.973Z",
 *               "objectId": "Ixwtc6aNWE"
 *           },
 *           {
 *               "startDate": "2021-04-30",
 *               "endDate": "2021-05-03",
 *               "note": "QTLD & GPMN",
 *               "createdAt": "2021-04-21T08:47:17.990Z",
 *               "objectId": "mFSorhUNwI"
 *           }
 *       ]
 *   }
 * }
 *
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getClosingDates() {}
