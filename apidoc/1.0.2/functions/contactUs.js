/**
 * @api {post} /saveContactUsInformation saveContactUsInformation
 * @apiVersion 1.0.0
 * @apiName saveContactUsInformation
 * @apiGroup Contact Us
 * @apiPermission None
 *
 * @apiDescription Save customer contact us form and send confirnmation email to customer.
 *
 * @apiParam {String} name required
 * @apiParam {String} email required
 * @apiParam {String} phoneNumber required
 * @apiParam {String} contents required
 * @apiParam {Object} extraInfo optional
 *
 * @apiExample {json} Request example
 * {
 *  "name": "Dave",
 *  "email": "hello@example.com",
 *  "phoneNumber": "0120002221"
 *  "contents": "hello world"
 * }
 *
 * @apiSuccess {Array}   result
 * @apiSuccessExample {json} Response example
 *{
 *   "result": {
        "name": "Dave",
        "email": "hello@example.com",
        "phoneNumber": "1234567891122",
        "contents": "hello world",
        "createdAt": "2021-06-04T06:07:59.348Z",
        "objectId": "Zw2DA8ulLS"
    }
 *	}
 * @apiUse InvalidParamsError
 *
 */
function saveContactUsInformation() {}
