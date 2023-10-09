// ------------------------------------------------------------------------------------------
// General apiDoc documentation blocks and old history blocks.
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// Current Success.
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// Current Errors.
// ------------------------------------------------------------------------------------------
/**
 * @apiDefine OtherCauseError
 * @apiError -1  Other cause!
 */

/**
 * @apiDefine ScriptFailedError
 * @apiError 141  Script failed!
 */

/**
 * @apiDefine ObjectNotFoundError
 * @apiError 101  Object not found error!
 */

/**
 * @apiDefine InvalidEmailPasswordError
 * @apiError 101  You entered the wrong email/password or both.
 */

/**
 * @apiDefine InvalidSalonIdPasswordError
 * @apiError 101  You entered the wrong salonId/password or both.
 */

/**
 * @apiDefine DuplicateValueError
 * @apiError 137  Duplicate value!
 */

/**
 * @apiDefine EmailAlreadyInUsedError
 * @apiError 137  Email already in used!
 */

/**
 * @apiDefine InvalidSessionTokenError
 * @apiError 209  Invalid session token!
 */

/**
 * @apiDefine InvalidUserError
 * @apiError 210  Invalid user!
 */

/**
 * @apiDefine InvalidParamsError
 * @apiError 141  Invalid params error!
 */

/**
 * @apiDefine VeriTransAccountNotFoundError
 * @apiError 9507  VeriTrans account not found!
 */

/**
 * @apiDefine TokenExpiredError
 * @apiError 8000  Token is expired!
 */

/**
 * @apiDefine ErrorExample
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 141,
 *     "error" : "Invalid params error!"
 * }
 */

/**
 * @apiDefine AffectBookingError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9514,
 *     "error" : "Affect booking error!"
 * }
 */

/**
 * @apiDefine CancelLateError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9508,
 *     "error" : "Too late, cannot cancel now!"
 * }
 */

/**
 * @apiDefine DeleteCardError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9509,
 *     "error" : "Cannot delete last card!"
 * }
 */

/**
 * @apiDefine InvalidCbRequestError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9510,
 *     "error" : "Invalid controller board request!"
 * }
 */

/**
 * @apiDefine AddStylistCbError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9511,
 *     "error" : "Cannot add stylist to CB!"
 * }
 */

/**
 * @apiDefine CompleteBookingEarlyError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9513,
 *     "error" : "Complete booking too early!"
 * }
 */

/**
 * @apiDefine ScheduleAtLeastError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9506,
 *     "error" : "営業時間は、１日以上登録してください"
 * }
 */

/**
 * @apiDefine CreateCustomerError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9505,
 *     "error" : "Create customer error!"
 * }
 */

/**
 * @apiDefine InvalidSalonNameError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9504,
 *     "error" : "Invalid salon name!"
 * }
 */

/**
 * @apiDefine InvalidMongoOperationError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9503,
 *     "error" : "Invalid mongodb operation!"
 * }
 */

/**
 * @apiDefine InvalidParams
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9502,
 *     "error" : "Invalid params!"
 * }
 */

/**
 * @apiDefine PermissionError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9501,
 *     "error" : "Permission error!"
 * }
 */

/**
 * @apiDefine LoginRequiredError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9500,
 *     "error" : "Login required!"
 * }
 */

/**
 * @apiDefine DeleteCardCustomerError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9515,
 *     "error" : "Delete card customer error"
 * }
 */

/**
 * @apiDefine InternalError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9516,
 *     "error" : "Internal error"
 * }
 */

/**
 * @apiDefine UnassignMenuError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9517,
 *     "error" : "Unassign menu error"
 * }
 */

/**
 * @apiDefine AlreadyReviewError
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9518,
 *     "error" : "Booking already reviewed"
 * }
 */

/**
 * @apiDefine DeleteMenuInPublishedPost
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9829,
 *     "error" : "このメニューを削除すると関連するスタイル投稿は自動的に非公開となりますのでご注意ください"
 * }
 */

/**
 * @apiDefine UnassignMenuInPublishedPost
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9830,
 *     "error" : "このメニューを変更すると関連するスタイル投稿は自動的に非公開となりますのでご注意ください"
 * }
 */

/**
 * @apiDefine PublishedPostWithInvalidMenu
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9831,
 *     "error" : "この投稿は無効なメニューが含まれるため公開できません。メニューを変更し公開設定してください。"
 * }
 */

/**
 * @apiDefine MarkAllNotificationsNotFound
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9913,
 *     "error" : "All notifications read"
 * }
 */

/**
 * @apiDefine CustomerAddCardBlocked
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9914,
 *     "error" : "失敗回数制限を超えたため、本日は登録できません 。詳細についてはHAIRLIEカスタマーサポートにお問い合わせください。"
 * }
 */

/**
 * @apiDefine HoldingCompanyNameExsits
 * @apiErrorExample {json} Error example
 * {
 *     "code" : 9919,
 *     "error" : "Holding company name is exists."
 * }
 */

// ------------------------------------------------------------------------------------------
// Current Permissions.
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// History.
// ------------------------------------------------------------------------------------------
