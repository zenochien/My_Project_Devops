/**
 * @api {post} /getNotificationList getNotificationList
 * @apiVersion 1.0.3
 * @apiName getNotificationList
 * @apiGroup Notification
 * @apiPermission Login Required as Salon Operator or Stylist
 *
 * @apiDescription Get notification list of user
 *
 * @apiParam {Number} page
 * @apiParam {Number} limit
 *
 * @apiExample {json} Request example
 * {
 *  "page": 1,
 *  "limit": 10,
 * }
 *
 * @apiSuccess {Array}   result
 * @apiSuccessExample {json} Response example
 *{
 *   "result": [
 *       {
            "data": {
                "message": "{senderName} 様より新しい予約リクエストが届きました",
                "type": "RECEIVE_BOOKING",
                "popupData": {
                    "nickName": "cus_chop1",
                    "profileImage": [
                        {
                            "objectId": "JFJqeNzcom",
                            "file": "https://hairlie-dev.s3.amazonaws.com/f08075fdd9a764683e6b6bca97919cd1_hairlie_image.jpg",
                            "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/bd8299704d052b4efaccdca6a1ed0882_customer_250x250.jpg",
                            "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/f327135eb4d4ab00961d5d0e369ff5fe_customer_600x600.jpg",
                            "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/ed74ab75ad71577c401dbd40d93eddbc_customer_800x800.jpg"
                        }
                    ]
                }
            },
            "booking": {
                "objectId": "iqJsR3ttcm"
            },
            "senderCustomer": {
                "nickName": "cus_chop1",
                "profileImages": [
                    {
                        "objectId": "JFJqeNzcom",
                        "file": "https://hairlie-dev.s3.amazonaws.com/f08075fdd9a764683e6b6bca97919cd1_hairlie_image.jpg",
                        "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/bd8299704d052b4efaccdca6a1ed0882_customer_250x250.jpg",
                        "thumbMedium": "https://hairlie-dev.s3.amazonaws.com/f327135eb4d4ab00961d5d0e369ff5fe_customer_600x600.jpg",
                        "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/ed74ab75ad71577c401dbd40d93eddbc_customer_800x800.jpg"
                    }
                ],
                "objectId": "2TohB3peV8"
            },
            "isDeleted": false,
            "createdAt": "2021-05-04T10:49:46.978Z",
            "isRead": false,
            "objectId": "psZmglaCga"
        }
 *    ]
 *	}
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function getNotificationList() {}

/**
 * @api {post} /markNotificationIsRead markNotificationIsRead
 * @apiVersion 1.0.3
 * @apiName markNotificationIsRead
 * @apiGroup Notification
 * @apiPermission Login Required as Salon Operator or Stylist
 *
 * @apiDescription Mark notification as readed
 *
 * @apiParam {String} notificationId
 *
 * @apiExample {json} Request example
 * {
 *  	"notificationId": "nkJ8ZNQUx7"
 * }
 *
 * @apiSuccess {boolean} result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": true
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 *
 */
function markNotificationIsRead() {}

/**
 * @api {post} /markAllNewNotification markAllNewNotification
 * @apiVersion 1.0.3
 * @apiName markAllNewNotification
 * @apiGroup Notification
 * @apiPermission Login Required as Salon Operator or Stylist
 *
 * @apiDescription Mark new notifications is old and doesn't show when count new notifications
 *
 * @apiSuccess {boolean} result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": true
 * }
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 *
 */
function markAllNewNotification() {}

/**
 * @api {post} /getNumOfNewNotifications getNumOfNewNotifications
 * @apiVersion 1.0.3
 * @apiName getNumOfNewNotifications
 * @apiGroup Notification
 * @apiPermission Login Required as Salon Operator or Stylist
 *
 * @apiDescription Get total number of unread notifications
 *
 * @apiSuccess {Number} result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": 6
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 *
 */
function getNumOfNewNotifications() {}

/**
 * @api {post} /registerDevice registerDevice
 * @apiVersion 1.0.3
 * @apiName registerDevice
 * @apiGroup Notification
 * @apiPermission Login Required as CUSTOMER or STYLIST
 *
 * @apiDescription Register device for notification service, call after login success
 *
 * @apiParam {String} appIdentifier
 * @apiParam {String} deviceType        'ios' or 'android'
 * @apiParam {String} deviceToken
 * @apiParam {String} appVersion
 * @apiParam {String} timeZone
 * @apiParam {Array}  [channels]
 *
 * @apiExample {json} Request example
 * {
 *   "appIdentifier": "com.c2c_platform.hairlie.stylist.dev",
 *   "deviceType": "ios",
 *   "deviceToken": "6f4d5dbb9320d300318f38010adb83ce02340747f42e9e8ffc9fd489d0b58701",
 *   "appVersion": "0.1",
 *   "timeZone": "Asia/Tokyo"
 * }
 *
 * @apiSuccess {Boolean} result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": true
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse InternalError
 *
 */
function registerDevice() {}
