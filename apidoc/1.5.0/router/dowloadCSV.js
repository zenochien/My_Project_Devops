/**
 * @api {post} http://localhost:1337api/dowload/salons dowloadSalonsCSV
 * @apiVersion 1.5.0
 * @apiName dowloadSalonsCSV
 * @apiGroup Router
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Download CSV file of Salon list
 *
 * @apiParam {String} [orderBy]            Order key
 * @apiParam {String} [order]              Order direction ['ascending', 'descending']

 *
 * @apiExample {json} Request example
 * {
 *   "orderBy": "createdAt",
 *   "order": "ascending",
 * }
 *
 * @apiSuccessExample {string} Response example
 * 予約ID,作成日,サロン名,サロン名のフリガナ,スタッフ数,メールアドレス
 *f3iGLt,2021/12/20 16:45,HAIRLIE salon,ヘアリーサロン,15,hairlie.salon.hairlie@yopmail.com
 * lULDMM,2021/12/20 16:30,HAIRLIE salon,,,hairlie.salon.hairlie@yopmail.jp
 *
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse InternalError
 */
function dowloadSalonsCSV() {}
/**
 * @api {post} http://localhost:1337api/dowload/customers dowloadCustomersCSV
 * @apiVersion 1.5.0
 * @apiName dowloadCustomersCSV
 * @apiGroup Router
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Download CSV file of Customer list
 *
 * @apiParam {String} [orderBy]            Order key
 * @apiParam {String} [order]              Order direction ['ascending', 'descending']

 *
 * @apiExample {json} Request example
 * {
 *   "orderBy": "createdAt",
 *   "order": "ascending",
 * }
 *
 * @apiSuccessExample {string} Response example
 * ID,作成日,お客様名,名前 (フリガナ),ニックネーム,電話番号,メールアドレス,性別,生年月日
 * jJfQgFoA1D,2022/03/04 13:08,hung hung,フリガナ フリガナ,hung,0908423211,cus_hung44@yopmail.com,男性,1997/03/04
 * RW2da9KxRg,2022/03/04 12:50,hung e,フリガナ フリガナ,hung,0908423211,cus_hung43@yopmail.com,男性,1997/03/04
 *
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse InternalError
 */
function dowloadCustomersCSV() {}
