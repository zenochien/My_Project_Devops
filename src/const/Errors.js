module.exports = {
  OBJECT_NOT_FOUND: {
    code: Parse.Error.OBJECT_NOT_FOUND,
    message: 'Object not found!',
  },
  DUPLICATE_VALUE: {
    code: Parse.Error.DUPLICATE_VALUE,
    message: 'Duplicate value!',
  },
  DUPLICATE_REGISTER_EMAIL: {
    code: Parse.Error.DUPLICATE_VALUE,
    message: 'このメールアドレスは既に登録されています。',
  },
  DUPLICATE_REGISTER_USERNAME: {
    code: Parse.Error.DUPLICATE_VALUE,
    message: 'Username already in used!',
  },
  INVALID_EMAIL_PASSWORD: {
    code: 101,
    message: 'You entered the wrong email/password or both.',
  },
  INVALID_SALONID_PASSWORD: {
    code: 101,
    message: 'You entered the wrong salonId/password or both.',
  },
  INVALID_SESSION_TOKEN: {
    code: Parse.Error.INVALID_SESSION_TOKEN,
    message: 'Invalid session token!',
  },
  INVALID_USER: {
    code: 210,
    message: 'Invalid user!',
  },
  LOGIN_REQUIRED: {
    code: 9500,
    message: 'Login required!',
  },
  PERMISSION_ERROR: {
    code: 9501,
    message: 'Permission error!',
  },
  INVALID_PARAMS: {
    code: 9502,
    message: 'Invalid params!',
  },
  INVALID_MONGO_OPERATION: {
    code: 9503,
    message: 'Invalid mongodb operation!',
  },
  INVALID_SALON_NAME: {
    code: 9504,
    message: 'Invalid salon name!',
  },
  CREATE_CUSTOMER_ERROR: {
    code: 9505,
    message: 'Create customer error!',
  },
  SCHEDULE_ATLEAST_ERROR: {
    code: 9506,
    message: '営業時間は、１日以上登録してください',
  },
  VERITRANS_ACCOUNT_NOT_FOUND: {
    code: 9507,
    message: 'VeriTrans account not found!',
  },
  CANCEL_LATE_ERROR: {
    code: 9508,
    message: 'Too late, cannot cancel now!',
  },
  DELETE_CARD_ERROR: {
    code: 9509,
    message: 'Cannot delete last card!',
  },
  TOKEN_EXPIRED: {
    code: 8000,
    message: 'トークンの有効期限が切れています！',
  },
  INVALID_CB_REQUEST: {
    code: 9510,
    message: 'Invalid controller board request!',
  },
  ADD_STYLIST_CB_ERROR: {
    code: 9511,
    message: 'System cannot add stylist to CB!',
  },
  COMPLETE_BOOKING_EARLY_ERROR: {
    code: 9513,
    message: 'Complete booking too early!',
  },
  AFFECT_BOOKING_ERROR: {
    code: 9514,
    message: 'Affect booking error!',
  },
  DELETE_CARD_CUSTOMER_ERROR: {
    code: 9515,
    message: 'Delete card customer error',
  },
  INTERNAL: {
    code: 9516,
    message: 'Internal error!',
  },
  UNASSIGN_MENU_ERROR: {
    code: 9517,
    message: 'Unassign menu error',
  },
  ALREADY_REVIEW_ERROR: {
    code: 9518,
    message: 'Booking already reviewed',
  },
  LARGE_AMOUNT_COUPON: {
    code: 9600,
    message: 'クーポン適用条件を満たしていません。 再度クーポンの利用条件をご確認ください。',
  },
  ERROR_COUPON: {
    code: 9601,
    message: 'このクーポンはご利用できません',
  },
  INVALID_COUPON: {
    code: 9602,
    message: 'Coupon is invalid',
  },
  RETRY: {
    code: 9910,
    message: '再試行してください',
  },
  HAS_IMCOMPLETE_BOOKING: {
    code: 9700,
    message: '未完了の予約があります',
  },
  DELETE_ACCOUNT_REQUEST_ERROR: {
    code: 9519,
    message: 'Your request was expired',
  },
  INVALID_ACTION: {
    code: 9800,
    message: 'Your action is invalid',
  },
  DELETED_STYLIST: {
    code: 9900,
    message: 'このスタイリストはすでにHAIRLIEを退会しました',
  },
  UNAVAILABLE_MENU: {
    code: 9801,
    message: 'Some menu is unavailable',
  },
  MAX_CONFIRMED_BOOKING_COUNT: {
    code: 9810,
    message: '予約受付可能枠数に達しているためこの予約を承認できません。この予約をキャンセルしてください。',
  },
  DOWLOAD_CSV_ERROR: {
    code: 9820,
    message: 'Process dowload CSV error',
  },
  FAVORITED_STYLIST_ERROR: {
    code: 9821,
    message: 'This stylist have been one of your favorite stylists',
  },
  INVALID_MENU_IN_POST: {
    code: 9823,
    message: 'この投稿は無効なメニューがあるため保存できません。他のメニューに変更してください。',
  },
  PUBLISH_POST_ERROR: {
    code: 9824,
    message: '必須項目が未入力のため公開できません。必須項目を入力し公開設定を行ってください。',
  },
  FAVORITE_POST_ERROR: {
    code: 9825,
    message: 'You can not add this post to your favorite post list',
  },
  UNFAVORITE_POST_ERROR: {
    code: 9826,
    message: 'You can not remove this post from your favorite post list',
  },
  RECOMMENDATION_SAME_PERSON: {
    code: 9827,
    message: '同じ被紹介者と投稿者ですでに口コミ投稿が存在するため投稿できません',
  },
  RECOMMENDATION_DUPLICATE_PERSON: {
    code: 9828,
    message: '同じ被紹介者と投稿者で１つ以上の口コミを投稿することはできません',
  },
  MENU_IN_PUBLISHED_POST: {
    code: 9829,
    message: 'このメニューを削除すると関連するスタイル投稿は自動的に非公開となりますのでご注意ください',
  },

  UNASSIGN_MENU_IN_PUBLISHED_POST: {
    code: 9830,
    message: 'このメニューを変更すると関連するスタイル投稿は自動的に非公開となりますのでご注意ください',
  },
  PUBLISHED_POST_WITH_INVALID_MENU: {
    code: 9831,
    message: 'この投稿は無効なメニューが含まれるため公開できません。メニューを変更し公開設定してください。',
  },
  UNAVAILABLE_PAYOUT_SERVICE: {
    code: 9902,
    message: 'Payout service is not available',
  },
  PAYOUT_ACCOUNT: {
    code: 9903,
    message: 'Payout account is not available',
  },
  INVALID_EARNING: {
    code: 9904,
    message: 'Earning is invalid',
  },
  UNAVAILABLE_COMMISSION_RATE: {
    code: 9905,
    message: 'Commission rate is empty',
  },
  EMPTY_REANING: {
    code: 9906,
    message: 'Earning is empty',
  },
  INVALID_DEPOSIT_PAYMENT_STATUS: {
    code: 9907,
    message: 'Status is invalid',
  },
  INVALID_TIME_GENERATE_PAYOUT: {
    code: 9908,
    message: 'Please just generate payout at the end of cycle',
  },
  PAYOUT_SERVICE_PAYOUT_STATUS_IS_COMPLETED: {
    code: 9909,
    message: 'Can not change completed payout',
  },
  PAYOUT_SERVICE_PAYOUT_STATUS_IS_CANCELED: {
    code: 9910,
    message: 'Can not change canceled payout',
  },
  PAYOUT_SERVICE_PAYOUT_FEE_IS_SAME_DATA: {
    code: 9911,
    message: 'Please input different fee',
  },

  PAYOUT_SERVICE_PAYOUT_FEE_GREATER_AMOUNT: {
    code: 9912,
    message: '小計を超える振込手数料は入力できません',
  },

  MARK_ALL_NOTIFICATION_NOT_FOUND: {
    code: 9913,
    message: 'All notifications read',
  },

  CUSTOMER_ADD_CARD_BLOCKED: {
    code: 9914,
    message:
      '失敗回数制限を超えたため、本日は登録できません 。詳細についてはHAIRLIEカスタマーサポートにお問い合わせください。',
  },

  RECOMMENTDATION_TOP_BANNER_HAVE_STYLIST_DELETE: {
    code: 9915,

    message: 'Can not published recommentdation have stylist deleted',
  },

  STYLIST_TOP_STYLIST_MAX: {
    code: 9916,
    message: 'You only can add max 10 stylists.',
  },

  TOP_STYLIST_ADD_ERROR: {
    code: 9917,
    message: 'Some stylist is top stylist or deleted.',
  },

  PRODUCT_NOT_FOUND: {
    code: 9918,
    message: '削除されたか未公開になっている商品です。他の商品を選択してください。',
  },

  HOLDING_COMPANY_NAME_EXISTS: {
    code: 9919,
    message: 'Holding company name is exists.',
  },

  HOLDING_COMPANY_CREATE_ERROR: {
    code: 9920,
    message: 'Create holding company error',
  },

  SALON_NOT_EXISTS: {
    code: 9921,
    message: 'Salon is not exists',
  },

  HOLDING_COMPANY_NOT_FOUND: {
    code: 9921,
    message: 'Holding company not found.',
  },

  HOLDING_COMPANY_UPDATED_ERROR: {
    code: 9922,
    message: 'Update holding company error',
  },

  HOLDING_COMPANY_DELETED_ERROR: {
    code: 9923,
    message: 'Delete holding company error',
  },

  ASSIGNED_STYLIST_FOR_PRESS_POST_ERROR: {
    code: 9924,
    message: 'Some stylist is not active or more than 2 post',
  },

  ERROR_EMAIL_LOWERCASE: {
    code: 9925,
    message: 'メールアドレスに無効な形式の文字は含まれています',
  },
};
