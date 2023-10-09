/**
 * @api {post} /loginAdmin loginAdmin
 * @apiVersion 1.0.0
 * @apiName loginAdmin
 * @apiGroup Web-User
 *
 * @apiDescription Login for admin.
 *
 * @apiParam {String} email email
 * @apiParam {String} password password
 * @apiParam {String} [installationId] installationId
 *
 * @apiExample {json} Request example
 * {
 *   "email": "admin@yopmail.com",
 *   "password": "Abc@123456",
 *   "installationId": "12ig32-kqe1-419u-1280-afqweor1"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolean} result.status Active status
 * @apiSuccess {Boolean} result.hasSetPassFirstTime Active hasSetPassFirstTime
 * @apiSuccess {String}  result.role  Role
 * @apiSuccess {String}  result.email  Email
 * @apiSuccess {String}  result.objectId  User id
 * @apiSuccess {String}  result.sessionToken  Session token
 * @apiSuccess {Date}    result.createdAt  creation date
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "objectId": "7A2xFd8zfb",
 *      "username": "admin@yopmail.com",
 *      "email": "admin@yopmail.com",
 *      "sessionToken": "r:2eed7b76245d89fbd34c7e3c3f8ee9b2",
 *      "role": "ADMIN",
 *      "createdAt": "2020-08-07T08:45:47.533Z"
 *    }
 * }
 *
 * @apiUse InvalidParamsError
 * @apiUse InvalidEmailPasswordError
 * @apiUse InvalidUserError
 */
function loginAdmin() {}

/**
 * @api {post} /loginSalon loginSalon
 * @apiVersion 1.0.0
 * @apiName loginSalon
 * @apiGroup Web-User
 *
 * @apiDescription Login for salon operator.
 *
 * @apiParam {String} email email
 * @apiParam {String} password password
 * @apiParam {String} [installationId] installationId
 *
 * @apiExample {json} Request example
 * {
 *   "email": "salon@yopmail.com",
 *   "password": "Abc@123456",
 *   "installationId": "12ig32-kqe1-419u-1280-afqweor1"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolean} result.status Active status
 * @apiSuccess {Boolean} result.hasSetPassFirstTime Active hasSetPassFirstTime
 * @apiSuccess {String}  result.role  Role
 * @apiSuccess {String}  result.email  Email
 * @apiSuccess {String}  result.objectId  User id
 * @apiSuccess {String}  result.sessionToken  Session token
 * @apiSuccess {Date}    result.createdAt  creation date
 * @apiSuccess {String}  result.salonId Unique 6 character ID for salon
 * @apiSuccess {String}  result.salonName Name of Salon
 * @apiSuccess {Object}  result.salonImage Image info of salon
 * @apiSuccess {String}  result.salonImage.objectId Id of image object
 * @apiSuccess {String}  result.salonImage.thumbLarge Url to thumb large
 * @apiSuccess {String}  result.salonImage.thumbSmall Url to thumb small
 * @apiSuccess {String}  result.salonImage.original  Url to original
 *
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "objectId": "7A2xFd8zfb",
 *      "username": "admin@yopmail.com",
 *      "email": "admin@yopmail.com",
 *      "sessionToken": "r:2eed7b76245d89fbd34c7e3c3f8ee9b2",
 *      "role": "OPERATOR",
 *      "createdAt": "2020-08-07T08:45:47.533Z",
 *      "salonId": "a1sd7n",
 *      "salonName": "Test Salon",
 *      "salonImage": {
 *        "objectId": "VSEiPphDfr",
 *        "thumbSmall": "https://hairlie-dev.s3.amazonaws.com/769de28690f6ca608db2f00d8f090a54_salon_250x250.jpg",
 *        "thumbLarge": "https://hairlie-dev.s3.amazonaws.com/93970592dd99f6c1d24685b51a08a404_salon_800x800.jpg",
 *        "original": "https://hairlie-dev.s3.amazonaws.com/15a7863c9e614be28a6df91b37d3bf1d_Nailie.png"
 *      }
 *    }
 * }
 *
 * @apiUse InvalidParams
 * @apiUse InvalidParamsError
 * @apiUse InvalidSalonIdPasswordError
 * @apiUse InvalidUserError
 */
function loginSalon() {}

/**
 * @api {post} /loginCustomer loginCustomer
 * @apiVersion 1.0.0
 * @apiName loginCustomer
 * @apiGroup Web-User
 *
 * @apiDescription Login for customer.
 *
 * @apiParam {String} email email
 * @apiParam {String} password password
 * @apiParam {String} [installationId] installationId
 *
 * @apiExample {json} Request example
 * {
 *   "email": "customer@yopmail.com",
 *   "password": "Abc@123456",
 *   "installationId": "12ig32-kqe1-419u-1280-afqweor1"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolean} result.status Active status
 * @apiSuccess {Boolean} result.hasSetPassFirstTime Active hasSetPassFirstTime
 * @apiSuccess {String}  result.role  Role
 * @apiSuccess {String}  result.email  Email
 * @apiSuccess {String}  result.objectId  User id
 * @apiSuccess {String}  result.sessionToken  Session token
 * @apiSuccess {Date}    result.createdAt  creation date
 * @apiSuccess {Boolean} result.emailVerified  Email verified
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "objectId": "7A2xFd8zfb",
 *      "email": "customer@yopmail.com",
 *      "sessionToken": "r:2eed7b76245d89fbd34c7e3c3f8ee9b2",
 *      "role": "CUSTOMER",
 *      "createdAt": "2020-08-07T08:45:47.533Z",
 *      "emailVerified": true,
 *      "status": "ACTIVE",
 *      "hasSetPassFirstTime": false,
 *    }
 * }
 *
 * @apiUse InvalidParamsError
 * @apiUse InvalidEmailPasswordError
 * @apiUse InvalidUserError
 */
function loginCustomer() {}

/**
 * @api {post} /loginStylist loginStylist
 * @apiVersion 1.0.2
 * @apiName loginStylist
 * @apiGroup Web-User
 *
 * @apiDescription Login for stylist.
 *
 * @apiParam {String} email email
 * @apiParam {String} password password
 * @apiParam {String} [installationId] installationId
 *
 * @apiExample {json} Request example
 * {
 *   "email": "stylist@yopmail.com",
 *   "password": "Abc@123456",
 *   "installationId": "12ig32-kqe1-419u-1280-afqweor1"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolean} result.status Active status
 * @apiSuccess {Boolean} result.hasSetPassFirstTime Active hasSetPassFirstTime
 * @apiSuccess {String}  result.role  Role
 * @apiSuccess {String}  result.email  Email
 * @apiSuccess {String}  result.objectId  User id
 * @apiSuccess {String}  result.sessionToken  Session token
 * @apiSuccess {Date}    result.createdAt  creation date
 * @apiSuccess {Boolean} result.emailVerified  Email verified
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "objectId": "7A2xFd8zfb",
 *      "email": "stylist@yopmail.com",
 *      "sessionToken": "r:2eed7b76245d89fbd34c7e3c3f8ee9b2",
 *      "role": "STYLIST",
 *      "createdAt": "2020-08-07T08:45:47.533Z",
 *      "emailVerified": true,
 *      "status": "ACTIVE",
 *      "hasSetPassFirstTime": false,
 *    }
 * }
 *
 * @apiUse InvalidParamsError
 * @apiUse InvalidEmailPasswordError
 * @apiUse InvalidUserError
 */
function loginStylist() {}

/**
 * @api {post} /getCurrentUser getCurrentUser
 * @apiVersion 1.0.0
 * @apiName getCurrentUser
 * @apiGroup Web-User
 * @apiPermission Login Required
 *
 * @apiDescription getCurrentUserInfo.
 *
 * @apiExample {json} Request example
 * {}
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolean} result.status Active status
 * @apiSuccess {Boolean} result.hasSetPassFirstTime Active hasSetPassFirstTime
 * @apiSuccess {String}  result.role  Role
 * @apiSuccess {String}  result.email  Email
 * @apiSuccess {String}  result.objectId  User id
 * @apiSuccess {String}  result.sessionToken  Session token
 * @apiSuccess {Date}    result.createdAt  creation date
 * @apiSuccess {String}  result.salonId Unique 6 character ID for salon
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "objectId": "7A2xFd8zfb",
 *      "username": "admin@yopmail.com",
 *      "email": "admin@yopmail.com",
 *      "sessionToken": "r:2eed7b76245d89fbd34c7e3c3f8ee9b2",
 *      "role": "OPERATOR",
 *      "createdAt": "2020-08-07T08:45:47.533Z",
 *      "salonId": "a1sd7n",
 *      "status": "INVITED",
 *      "hasSetPassFirstTime": false
 *    }
 * }
 *
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse LoginRequiredError
 */
function getCurrentUser() {}

/**
 * @api {post} /getUserById getUserById
 * @apiVersion 1.0.0
 * @apiName getUserById
 * @apiGroup Web-User
 * @apiPermission Login Required
 *
 * @apiDescription get userinformation by their objectId
 *
 * @apiParam {String} userId userId
 *
 * @apiExample {json} Request example
 * {
 *   "userId": "7A2xFd8zfb"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {Boolean} result.status Active status
 * @apiSuccess {Boolean} result.hasSetPassFirstTime Active hasSetPassFirstTime
 * @apiSuccess {String}  result.role  Role
 * @apiSuccess {String}  result.email  Email
 * @apiSuccess {String}  result.objectId  User id
 * @apiSuccess {String}  result.sessionToken  Session token
 * @apiSuccess {Date}    result.createdAt  creation date
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *      "objectId": "7A2xFd8zfb",
 *      "username": "admin@yopmail.com",
 *      "email": "admin@yopmail.com",
 *      "sessionToken": "r:2eed7b76245d89fbd34c7e3c3f8ee9b2",
 *      "role": "ADMIN",
 *      "createdAt": "2020-08-07T08:45:47.533Z",
 *      "status": "INVITED",
 *      "hasSetPassFirstTime": false
 *    }
 * }
 *
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse ErrorExample
 */
function getUserById() {}

/**
 * @api {post} /createAdmin createAdmin
 * @apiVersion 1.0.0
 * @apiName createAdmin
 * @apiGroup Web-User
 *
 * @apiDescription Initiate a admin account
 *
 * @apiParam {String} email email
 * @apiParam {String} [password] password
 * @apiParam {String} [installationId] installationId
 *
 * @apiExample {json} Request example
 * {
 *   "email": "adminhairlie@yopmail.com"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.email  Email
 * @apiSuccess {Boolean} result.status Active status
 * @apiSuccess {String}  result.role  Role
 * @apiSuccess {Date}    result.createdAt  creation date
 * @apiSuccess {Boolean} result.hasSetPassFirstTime Active hasSetPassFirstTime
 * @apiSuccess {String}  result.sessionToken  Session token
 * @apiSuccess {String}  result.objectId  User id
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "email": "adminhairlie@yopmail.com",
 *     "status": "INVITED",
 *     "role": "ADMIN",
 *     "createdAt": "2020-08-10T03:04:34.445Z",
 *     "hasSetPassFirstTime": false,
 *     "sessionToken": "r:5abee909a23b31ec7a0c88f8c2a0751e",
 *     "objectId": "A2aMPgBIaj",
 *   }
 * }
 *
 * @apiUse EmailAlreadyInUsedError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function createAdmin() {}

/**
 * @api {post} /createSalonOperator createSalonOperator
 * @apiVersion 1.0.0
 * @apiName createSalonOperator
 * @apiGroup Web-User
 * @apiPermission Login Required as Admin
 *
 * @apiDescription Initiate a operator account
 *
 * @apiParam {String} email email
 * @apiParam {String} salonName salonName
 * @apiParam {String} [password] password
 * @apiParam {String} [installationId] installationId
 *
 * @apiExample {json} Request example
 * {
 *   "email": "salonnailie@yopmail.com",
 *   "salonName": "Nailie"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.email  Email
 * @apiSuccess {Boolean} result.status Active status
 * @apiSuccess {String}  result.role  Role
 * @apiSuccess {Date}    result.createdAt  creation date
 * @apiSuccess {Boolean} result.hasSetPassFirstTime Active hasSetPassFirstTime
 * @apiSuccess {String}  result.sessionToken  Session token
 * @apiSuccess {String}  result.objectId  User id
 * @apiSuccess {String}  result.salonId Unique 6 character ID for salon
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "email": "salonnailie@yopmail.com",
 *     "status": "INVITED",
 *     "role": "OPERATOR",
 *     "createdAt": "2020-08-10T03:04:34.445Z",
 *     "hasSetPassFirstTime": false,
 *     "sessionToken": "r:5abee909a23b31ec7a0c88f8c2a0751e",
 *     "objectId": "A2aMPgBIaj",
 *     "salonId": "53hluP"
 *   }
 * }
 *
 * @apiUse EmailAlreadyInUsedError
 * @apiUse ScriptFailedError
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse InvalidSessionTokenError
 * @apiUse InvalidCbRequestError
 * @apiUse InvalidMongoOperationError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function createSalonOperator() {}

/**
 * @api {post} /createCustomer createCustomer
 * @apiVersion 1.0.0
 * @apiName createCustomer
 * @apiGroup Web-User
 * @apiPermission Login Required as customer
 *
 * @apiDescription Initiate a operator account
 *
 * @apiParam {String} email email
 * @apiParam {String} password password
 * @apiParam {String} [installationId] installationId
 *
 * @apiExample {json} Request example
 * {
 *   "email": "customer@yopmail.com",
 *   "password": "aBc@1234"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.email  Email
 * @apiSuccess {Boolean} result.status Active status
 * @apiSuccess {String}  result.role  Role
 * @apiSuccess {Date}    result.createdAt  creation date
 * @apiSuccess {Boolean} result.hasSetPassFirstTime Active hasSetPassFirstTime
 * @apiSuccess {String}  result.sessionToken  Session token
 * @apiSuccess {String}  result.objectId  User id
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "email": "salonnailie@yopmail.com",
 *     "status": "INVITED",
 *     "role": "OPERATOR",
 *     "createdAt": "2020-08-10T03:04:34.445Z",
 *     "hasSetPassFirstTime": false,
 *     "sessionToken": "r:5abee909a23b31ec7a0c88f8c2a0751e",
 *     "objectId": "A2aMPgBIaj"
 *   }
 * }
 *
 * @apiUse EmailAlreadyInUsedError
 * @apiUse ScriptFailedError
 * @apiUse InvalidParamsError
 * @apiUse InvalidParams
 * @apiUse InvalidSessionTokenError
 * @apiUse CreateCustomerError
 */
function createCustomer() {}

/**
 * @api {post} /changePassword changePassword
 * @apiVersion 1.0.0
 * @apiName changePassword
 * @apiGroup Web-User
 * @apiPermission Login Required
 *
 * @apiDescription Change password while logged in
 *
 * @apiParam {String} currentPassword currentPassword
 * @apiParam {String} newPassword newPassword
 *
 * @apiExample {json} Request example
 * {
 *   "currentPassword": "Abcdef123",
 *   "newPassword": "Abcfed123"
 * }
 *
 * @apiSuccess {Object}  result
 * @apiSuccess {String}  result.sessionToken  Session token
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {
 *     "sessionToken": "r:5abee909a23b31ec7a0c88f8c2a0751e"
 *   }
 * }
 *
 * @apiUse InvalidSalonIdPasswordError
 * @apiUse InvalidEmailPasswordError
 * @apiUse InvalidParamsError
 * @apiUse InvalidSessionTokenError
 * @apiUse PermissionError
 * @apiUse LoginRequiredError
 */
function changePassword() {}

/**
 * @api {post} /forgotPassword forgotPassword
 * @apiVersion 1.0.0
 * @apiName forgotPassword
 * @apiGroup Web-User
 *
 * @apiDescription Send reset password email
 *
 * @apiParam {String} email email
 * @apiParam {String} [role] role         Accepted values: ['OPERATOR', 'ADMIN', 'STYLIST', 'CUSTOMER'], check role when provided
 *
 * @apiExample {json} Request example
 * {
 *   "email": "litte1412@gmail.com",
 *   "role": "OPERATOR"
 * }
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": {}
 * }
 *
 * @apiUse ScriptFailedError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function forgotPassword() {}

/**
 * @api {post} /forgotSalonId forgotSalonId
 * @apiVersion 1.0.0
 * @apiName forgotSalonId
 * @apiGroup Web-User
 *
 * @apiDescription Send salonId to email
 *
 * @apiParam {String} email email
 *
 * @apiExample {json} Request example
 * {
 *   "email": "litte1412@gmail.com"
 * }
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": true
 * }
 *
 * @apiUse ScriptFailedError
 * @apiUse ObjectNotFoundError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function forgotSalonId() {}

/**
 * @api {post} http://localhost:1337/resetPassword resetPassword
 * @apiVersion 1.0.0
 * @apiName resetPassword
 * @apiGroup Web-User
 *
 * @apiDescription Reset password by user & token (for ADMIN & SALON dashboard).
 *
 * @apiParam {String} username username
 * @apiParam {String} token token
 * @apiParam {String} new_password new_password
 *
 * @apiExample {json} Request example
 * {
 *   "username": "admin-hairlie@yopmail.com"
 *   "token": "tooooooken"
 *   "new_password": "Abc!1234"
 * }
 *
 * @apiSuccess {Boolean}  result
 *
 * @apiSuccessExample {json} Response success
 * {
 *   "result": true
 * }
 *
 * @apiUse TokenExpiredError
 * @apiUse InvalidParamsError
 * @apiUse ErrorExample
 */
function resetPassword() {}

/**
 * @api {post} /renewSession renewSession
 * @apiVersion 1.0.0
 * @apiName renewSession
 * @apiGroup Web-User
 * @apiPermission Login Required
 *
 * @apiDescription Renew session token of User
 *
 * @apiSuccess {Boolean}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": true
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse LoginRequiredError
 */
function renewSession() {}

/**
 * @api {post} /logout logout
 * @apiVersion 0.5.0
 * @apiName logout
 * @apiGroup Web-User
 * @apiPermission Login Required
 *
 * @apiDescription Delete the session token of user
 *
 * @apiSuccess {Boolean}  result
 *
 * @apiSuccessExample {json} Response example
 * {
 *   "result": true
 * }
 *
 * @apiUse InvalidSessionTokenError
 * @apiUse LoginRequiredError
 */
function logout() {}
