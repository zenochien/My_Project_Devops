const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const url = require('url');
const { AppCache } = require('parse-server/lib/cache');
const mongoDB = require('./../db/mongoDB');
const { parseServerConfig, generalConfig } = require('../config');
const { USER_ROLE } = require('../const/Constants');
const Errors = require('../const/Errors');
const Helper = require('../utils/helper');
const moment = require('moment-timezone');
const ROUTE_PATH = {
  HANDLE_EMAIL_PASSWORD_PATH: '/handleEmailPassword',
  RESET_PASSWORD_PATH: '/resetPassword',
  INVALID_LINK_PATH: '/invalidLink',
  PASSWORD_RESET_SUCCESS_PATH: '/passwordResetSuccess',
  INVALID_VERIFICATION_LINK_PATH: '/invalidVerificationLink',
  VERIFY_EMAIL_SUCCESS_PATH: '/verifyEmailSuccess',
  VERIFY_EMAIL: '/verifyEmail',
};
let userController = undefined;

/**
 * Get UserController in Parse server
 * @return {undefined|UserController}
 */
const getUserController = () => {
  if (userController) {
    return userController;
  }

  const app = AppCache.get(parseServerConfig.appId);
  userController = _.get(app, 'userController');
  return userController;
};

/**
 * Get host url
 * @param {Request} req
 * @return {string}
 */
const getHostUrl = (req) => {
  const [hostname, port] = req.headers.host.split(':');
  return url.format({
    protocol: req.protocol,
    hostname,
    port: port,
  });
};

/**
 * Query user by username
 * @param {String} username
 * @param {String[]} selectFields
 * @returns {Promise<Parse.Object | undefined>}
 */
const getUser = (username, selectFields = undefined) => {
  const query = new Parse.Query(Parse.User);
  query.equalTo('username', username);
  if (selectFields) {
    query.select(...selectFields);
  }
  return query.first({ useMasterKey: true });
};

/**
 * Set isInvalidVerificationLink to true
 * @param {String} username
 */
const setUserIsInvalidVerificationLink = async (username) => {
  const user = await getUser(username);
  user.set('isInvalidVerificationLink', true);
  await user.save(null, { useMasterKey: true });
};

/**
 * Handle reset password route
 * @param req
 * @param res
 * @returns {*}
 */
const handleResetPassword = function (req, res) {
  const { username, token, id, link, error } = req.query;
  if (!username || !token) {
    return res.redirect(ROUTE_PATH.INVALID_LINK_PATH);
  }

  getUser(username, ['email', 'role', 'hasSetPassFirstTime'])
    .then((user) => {
      if (!user) {
        throw Parse.Error.OBJECT_NOT_FOUND;
      }

      if (!generalConfig.adminResetPassUrl && !generalConfig.salonResetPassUrl && !generalConfig.customerResetPassUrl) {
        const requestURL = `${getHostUrl(req)}${ROUTE_PATH.RESET_PASSWORD_PATH}`;
        const message = 'パスワードは8文字以上の半角英数字でご設定ください';

        return res.render(
          Helper.getPageTemplatePath(!user.get('hasSetPassFirstTime') ? 'setPasswordForFirstTime' : 'resetPassword'),
          {
            requestURL,
            username,
            token,
            error,
            message,
            user: user.toJSON(),
          },
        );
      }

      const role = user.get('role');
      const hasSetPassFirstTime = user.get('hasSetPassFirstTime');
      const email = user.getEmail();
      let resetPassUrl;
      let emailAndRole;
      if (role === USER_ROLE.ADMIN) {
        resetPassUrl = generalConfig.adminResetPassUrl;
        emailAndRole = '';
      } else if (role === USER_ROLE.SALON_OPERATOR) {
        resetPassUrl = !hasSetPassFirstTime ? generalConfig.customerSetPassUrl : generalConfig.salonResetPassUrl;
        emailAndRole = `/${encodeURIComponent(email)}/${role}`;
      } else {
        resetPassUrl = !hasSetPassFirstTime ? generalConfig.customerSetPassUrl : generalConfig.customerResetPassUrl;
        emailAndRole = !hasSetPassFirstTime ? `/${encodeURIComponent(email)}/${role}` : '';
      }
      const redirectUrl = `${resetPassUrl}/${encodeURIComponent(username)}/${token}${emailAndRole}`;
      return res.redirect(redirectUrl);
    })
    .catch((error) => {
      console.error('Error when handle email password link!', error);
      return res.redirect(ROUTE_PATH.INVALID_LINK_PATH);
    });
};

const checkResetPasswordToken = async ({ username, token }) => {
  const db = await mongoDB.getMongoDB();
  const result = await db.collection('_User').findOne({
    username: username,
    _perishable_token: token,
  });
  if (!result) {
    throw new Parse.Error(Errors.INVALID_PARAMS.code, 'Username or token is invalid');
  }
  if (moment().isAfter(moment(result._perishable_token_expires_at))) {
    throw new Parse.Error(Errors.TOKEN_EXPIRED.code, Errors.TOKEN_EXPIRED.message);
  }
};

const checkVerifyEmailToken = async ({ username, token }) => {
  const db = await mongoDB.getMongoDB();
  const result = await db.collection('_User').findOne({
    username: username,
    _email_verify_token: token,
  });
  if (!result) {
    throw new Parse.Error(Errors.INVALID_PARAMS.code, 'Username or token is invalid');
  }
  if (moment().isAfter(moment(result._email_verify_token_expires_at))) {
    throw new Parse.Error(Errors.TOKEN_EXPIRED.code, Errors.TOKEN_EXPIRED.message);
  }
};

module.exports.default = function () {
  const router = express.Router();
  router.use(bodyParser.json());

  // handle verify email / reset password (parseFrameURL)
  router.get(ROUTE_PATH.HANDLE_EMAIL_PASSWORD_PATH, function (req, res) {
    const { username, token, link } = req.query;
    if (!username || !token || !link) {
      return res.redirect(ROUTE_PATH.INVALID_LINK_PATH);
    }

    if (link.includes('request_password_reset')) {
      return handleResetPassword(req, res);
    } else if (link.includes('verify_email')) {
      const redirectUrl =
        parseServerConfig.publicServerURL +
        decodeURI(link) +
        `?username=${encodeURIComponent(username)}&token=${token}`;
      return res.redirect(redirectUrl);
    } else {
      return res.redirect(ROUTE_PATH.INVALID_LINK_PATH);
    }
  });

  // handle reset password (not use parseFrameURL) for GET method
  router.get(ROUTE_PATH.RESET_PASSWORD_PATH, handleResetPassword);

  // handle reset password for POST method - return json
  router.post(ROUTE_PATH.RESET_PASSWORD_PATH, async function (req, res) {
    try {
      const { username, new_password, token } = req.body;

      let errorMsg = '';
      if (!username) {
        errorMsg += 'Missing username. ';
      }
      if (!token) {
        errorMsg += 'Missing token. ';
      }
      if (!new_password) {
        errorMsg += 'Missing password.';
      }

      if (errorMsg.length > 0) {
        return res.status(400).json({ code: Parse.Error.SCRIPT_FAILED, error: errorMsg.trim() });
      }
      await checkResetPasswordToken({ username, token });
      const controller = getUserController();
      await controller.updatePassword(username, token, new_password);
      return res.json({ result: true });
    } catch (error) {
      console.error('Error when handle post reset password!', error);
      let message = error;
      let { code } = Errors.INVALID_PARAMS;
      if (error && error.message) {
        message = error.message;
      }
      if (error && error.code) {
        code = error.code;
      }
      return res.status(400).json({ code, error: message });
    }
  });

  // handle invalid link
  router.get(ROUTE_PATH.INVALID_LINK_PATH, function (req, res) {
    res.render(Helper.getPageTemplatePath('invalidLink'));
  });

  // handle password reset successfully link
  router.get(ROUTE_PATH.PASSWORD_RESET_SUCCESS_PATH, function (req, res) {
    const username = req.query.username !== undefined ? req.query.username : '';
    res.render(Helper.getPageTemplatePath('passwordResetSuccess'), { username });
  });

  // handle invalid verification link
  router.get(ROUTE_PATH.INVALID_VERIFICATION_LINK_PATH, async function (req, res) {
    const username = req.query.username !== undefined ? req.query.username : '';
    const appId = req.query.appId !== undefined ? req.query.appId : '';

    await setUserIsInvalidVerificationLink(username);

    const requestURL = parseServerConfig.publicServerURL + `/apps/${appId}/resend_verification_email`;

    const redirectUrl = `${generalConfig.customerLoginUrl}?verifySuccess=false&username=${encodeURIComponent(
      username,
    )}&requestUrl=${encodeURIComponent(requestURL)}`;

    return res.redirect(redirectUrl);
  });

  // handle verify email successfully link
  router.get(ROUTE_PATH.VERIFY_EMAIL_SUCCESS_PATH, function (req, res) {
    const { username } = req.query;
    if (!username) {
      return res.redirect(ROUTE_PATH.INVALID_LINK_PATH);
    }

    const redirectUrl = `${generalConfig.customerLoginUrl}?verifySuccess=true&username=${encodeURIComponent(username)}`;

    return res.redirect(redirectUrl);
  });

  router.post(ROUTE_PATH.VERIFY_EMAIL, async (req, res) => {
    const { username, token } = req.body;
    let errorMsg = '';
    if (!username) {
      errorMsg += 'Username is required. ';
    }
    if (!token) {
      errorMsg += 'Token is required. ';
    }
    if (errorMsg.length > 0) {
      return res.status(400).json({ code: Parse.Error.SCRIPT_FAILED, error: errorMsg.trim() });
    }
    try {
      await checkVerifyEmailToken({ username, token });
      const controller = getUserController();
      await controller.verifyEmail(username, token);
      return res.json({ result: { status: 'success' } });
    } catch (error) {
      let { code } = Errors.INVALID_PARAMS;
      let message = 'Username or token is invalid';
      if (error && error.message) {
        message = error.message;
      }
      if (error && error.code) {
        code = error.code;
      }
      return res.status(400).json({ code, error: message });
    }
  });

  return router;
};
