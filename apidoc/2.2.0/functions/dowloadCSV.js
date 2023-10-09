/**
 * @api {post} http://localhost:1337/api/dowload/booking dowloadBookingCSV
 * @apiVersion 2.3.0
 * @apiName dowloadBookingCSV
 * @apiGroup Router
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Download CSV file of Salon list
 *
 * @apiParam {String} [orderBy]            Order key
 * @apiParam {String} [order]              Order direction ['ascending', 'descending']
 * @apiParam {String} [fromCreatedDate]    Created from YYYY-MM-DD
 * @apiParam {String} [toCreatedDate]      Created to YYYY-MM-DD
 * @apiParam {String} [fromServiceDateTime]
 * @apiParam {String} [toServiceDateTime]
 * @apiParam {Array}  [bookingStatusExtends]  Accepted values: ['REQUESTED', 'CONFIRMED', 'REQUESTED_CANCELED_OPERATOR', 'REQUESTED_CANCELED_CUSTOMER', 'REQUESTED_CANCELED_STYLIST', 'CONFIRMED_CANCELED_OPERATOR', 'CONFIRMED_CANCELED_CUSTOMER', 'CONFIRMED_CANCELED_STYLIST', 'CANCELED_WITH_FEE', 'CANCELED_AUTO', 'COMPLETED', 'NOT_ARRIVED']
 * @apiParam {Array}  [bookingStatuses]    Accepted values: ['REQUESTED', 'CONFIRMED', 'CANCELED_OPERATOR','CANCELED_STYLIST', 'CANCELED_CUSTOMER', 'CANCELED_WITH_FEE', 'CANCELED_AUTO', 'COMPLETED', 'NOT_ARRIVED']
 * @apiParam {Array}  [paymentStatuses]    Accepted values: ['PENDING', 'CANCELED', 'FAILED', 'SUCCEEDED', 'OTHER']
 *
 * @apiExample {json} Request example
 * {
 *   "orderBy": "createdAt",
 *   "order": "ascending",
 *   "fromCreatedDate": "2021-03-07"
 *   "toCreatedDate": "2021-05-07"
 *   "fromServiceDateTime": "2022-03-10",
 *   "toServiceDateTime": "2022-03-10",
 *   "bookingStatusExtends": ["CONFIRMED_CANCELED_OPERATOR", "REQUESTED_CANCELED_CUSTOMER"]
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Number}  result.total
 * @apiSuccess {Array}   result.list
 *
 * @apiSuccessExample {string} Response example
 *
 * 予約ID,サロンID,サロン名,スタイリスト名,スタイリストID,お客様名,お客様ID,予約作成日,サービス日時,合計金額,予約ステータス,クーポン値引
 * OPDsERDTix,aozBj3,----,----,VykYj8udCr,Cus cus_chop41,3eGQIOmqrH,2022-01-27 11:01,2022-01-28 11:01,2500円,予約確定・サロンキャンセル,無ー
 * CnVbI8dPNX,tUfK1q,C2C Beauty,Trang Le,1nWUi0otNi,trang93 trang93,CcRSijHBKt,2022-01-26 17:01,2022-01-26 18:01,321円,予約確定・サロンキャンセル,無ー
 * izoAQroG0U,WagDmw,Luf11_kahara-を獲得🐧🐸🐣🐽🐷🐼🐹🐶🐱-,Teta CHOp42dd❤️,y0ka13VeK4,----,30PF3adOd1,2022-01-20 18:01,2022-01-20 20:01,1600円,予約確定・サロンキャンセル,無ー
 * hgJbi9T1Eq,eWljiF,Thao Salon,Ngn Thao,htMbbAFkhS,----,3nQzxRnXB9,2022-01-18 16:01,2022-01-20 11:01,33333円,予約確定・サロンキャンセル,無ー
 * L2Fs5wsZma,eWljiF,Thao Salon,Ngn Thao,htMbbAFkhS,Nguyen Thao,FdzBdYqZVK,2022-01-18 14:01,2022-01-19 10:01,33333円,予約確定・サロンキャンセル,11000円(BX004)
 * U4usg2ppPP,tUfK1q,C2C Beauty,Hau Stylist 7,qlOuEYyQk0,trang8 trang8,gebRzRGBLO,2022-01-13 16:01,2022-01-13 18:01,4343円,予約確定・サロンキャンセル,無ー
 * ZjDSIp6Nkx,tUfK1q,C2C Beauty,Trang Le,1nWUi0otNi,trang8 trang8,gebRzRGBLO,2022-01-13 16:01,2022-01-14 00:01,321円,予約確定・サロンキャンセル,無ー
 *
 *
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse InternalError
 */
function dowloadSalonsCSV() {}
