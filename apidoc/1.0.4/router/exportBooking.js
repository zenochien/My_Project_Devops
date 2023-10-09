/**
 * @api {post} http://localhost:1337/api/export/booking getBookingCSV
 * @apiVersion 1.0.4
 * @apiName getBookingCSV
 * @apiGroup Router
 * @apiPermission Login Required as Salon Operator or Stylist
 *
 * @apiDescription Get Booking CSV
 *
 * @apiParam {String} [orderBy]            Order key
 * @apiParam {String} [order]              Order direction ['ascending', 'descending']
 * @apiParam {String} [fromCreatedDate]    Created from YYYY-MM-DD
 * @apiParam {String} [toCreatedDate]      Created to YYYY-MM-DD
 *
 * @apiExample {json} Request example
 * {
 *   "orderBy": "createdAt",
 *   "order": "ascending",
 *   "fromCreatedDate": "2021-03-07"
 *   "toCreatedDate": "2021-05-07"
 * }
 *
 * @apiSuccessExample {string} Response example
 * Created at,Booking id,Stylist full name,Customer full name,Gender,Menus name,Service at,Total price,Booking status,Payment status,Payment date
 * 2021-05-05T08:04:07.704Z,lHgsY9KJNq,Last name FirstNAME2,YiYi🐢🐢🐙 cus_chop23,男性,Test,2021-05-06T08:30:00.000Z,1000,CANCELED_OPERATOR,PENDING,
 * 2021-05-05T02:39:22.785Z,6aCvCTOzL8,Last name FirstNAME2,YiYi🐢🐢🐙 cus_chop23,男性,"Menu 1 YiJi, Menu 3 YiJi, Menu 2 YiJi, Test",2021-05-13T00:00:00.000Z,352909,CANCELED_OPERATOR,CANCELED,
 * 2021-04-27T06:28:50.822Z,pCg6ameMBl,Last name FirstNAME2,Le Anh Kiet,男性,"Menu 1 YiJi, Menu 3 YiJi, Menu 2 YiJi, Test",2021-04-30T00:00:00.000Z,352909,CANCELED_OPERATOR,PENDING,
 * 2021-04-23T06:42:54.894Z,jMcGoFTkV3,chopper2 Luf2,YangYi Cus_chop1,女性,Menu 1 YiJi,2021-04-26T04:00:00.000Z,6563,COMPLETED,SUCCEEDED,2021-04-26T07:11:40.876Z
 *
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 * @apiUse InternalError
 */
function getBookingCSV() {}
