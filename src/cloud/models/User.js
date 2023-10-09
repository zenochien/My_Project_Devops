const UserModel = {};
module.exports = UserModel;

const moment = require('moment');
const _get = require('lodash/get');
const slug = require('limax');

const BaseQuery = require('../BaseQuery');
const { ParseServerLogger } = require('../../logger');
const { parseServerConfig } = require('../../config/index');
const Helper = require('../../utils/helper');
const Validation = require('../../utils/validation');
const request = require('../../utils/request').default;
const mongoDB = require('../../db/mongoDB');
const { USER_STATUS, USER_ROLE, SALON_STATUS } = require('../../const/Constants');
const {
  INVALID_PARAMS,
  INVALID_MONGO_OPERATION,
  OBJECT_NOT_FOUND,
  INVALID_EMAIL_PASSWORD,
  CREATE_CUSTOMER_ERROR,
  INVALID_CB_REQUEST,
  DUPLICATE_REGISTER_EMAIL,
} = require('../../const/Errors');
const ControllerBoardModel = require('./ControllerBoard');

UserModel.createUser = async (params, { defaultValue, sendFirstResetPasswordMail = false } = {}) => {
  let { email } = params;
  email = email.toLowerCase();

  const { username, password, installationId, ...otherInfo } = params;

  const options = { useMasterKey: true };
  if (installationId) {
    options.installationId = installationId;
  }

  const userObj = await Parse.User.signUp(
    username || email,
    password || (sendFirstResetPasswordMail && `Abc@123` + Helper.randomString(5)),
    {
      email,
      status: sendFirstResetPasswordMail ? USER_STATUS.INVITED : otherInfo.status || defaultValue.status,
      ...defaultValue,
      ...otherInfo,
    },
    options,
  );

  sendFirstResetPasswordMail &&
    Parse.User.requestPasswordReset(email).catch((error) => {
      ParseServerLogger.error('Error when send invitation email', error);
    });

  return await UserModel.formatUserData(userObj);
};

UserModel.formatUserData = async (userObject) => {
  const newUserObject = Helper.convertParseObjectToJson(userObject);
  if (newUserObject.password) {
    delete newUserObject.password;
  }

  if (newUserObject.salon) {
    const salonId = newUserObject.salon.objectId;
    newUserObject.salonId = salonId;
    const salonQuery = BaseQuery.getSalonQuery();
    salonQuery.select('salonName', 'salonImage');
    salonQuery.include('salonImage');
    const salonObject = await salonQuery.get(salonId, { useMasterKey: true });
    const salonJSON = Helper.convertParseObjectToJson(salonObject, ['salonName', 'salonImage']);
    newUserObject.salonName = salonJSON.salonName;
    newUserObject.salonImage = salonJSON.salonImage;
    delete newUserObject.salon;
  }
  return newUserObject;
};

/**
 * Login by username / email / salonId.
 * @param [salonId]
 * @param [email]
 * @param [username]
 * @param role
 * @param password
 * @param [installationId]
 * @return {Promise<Parse.User>}
 */
UserModel.login = async ({ salonId, email, username, role, password, installationId } = {}) => {
  username = username || salonId;

  await Validation.checkValidAccount({ email, username, role });

  try {
    const user = await Parse.User.logIn(email || username, password, {
      installationId,
    });
    const userObject = await UserModel.formatUserData(user);
    // get more infor for stylist
    if (role === USER_ROLE.STYLIST) {
      const stylist = await user.get('stylist').fetch({ useMasterKey: true });
      if (!stylist) {
        throw new Parse.Error(OBJECT_NOT_FOUND.code, OBJECT_NOT_FOUND.message);
      }
      const stylistObject = Helper.convertParseObjectToJson(stylist, ['requestDeletingAccount']);
      userObject.requestDeletingAccount = _get(stylistObject, ['requestDeletingAccount']);
    }

    // get more infor for customer
    if (role === USER_ROLE.CUSTOMER) {
      const customer = await user.get('customer').fetch({ useMasterKey: true });
      if (!customer) {
        throw new Parse.Error(OBJECT_NOT_FOUND.code, OBJECT_NOT_FOUND.message);
      }
      const customerObject = Helper.convertParseObjectToJson(customer, ['requestDeletingAccount']);
      userObject.requestDeletingAccount = _get(customerObject, ['requestDeletingAccount']);
    }
    return userObject;
  } catch (error) {
    if (error.code === INVALID_EMAIL_PASSWORD.code) {
      Helper.throwInvalidUserPass(error);
    }

    throw error;
  }
};

UserModel.createAdmin = async (params) => {
  return await UserModel.createUser(params, {
    defaultValue: { role: USER_ROLE.ADMIN, status: USER_STATUS.INVITED },
    sendFirstResetPasswordMail: true,
  });
};

UserModel.createSalonOperator = async (params) => {
  const { salonName, email, password, installationId, payoutAccount, holdingCompany } = params;

  const username = await Helper.getRandomUsername(6);
  let cbSalonId;
  try {
    const data = await ControllerBoardModel.addSalon({
      email,
      salonName,
    });
    cbSalonId = _get(data, 'id');
  } catch (error) {
    ParseServerLogger.error(error);

    let salonResponse;
    try {
      salonResponse = await ControllerBoardModel.getListSalon({ email });
    } catch (error) {
      ParseServerLogger.error(error);

      const { message, code } = INVALID_CB_REQUEST;
      throw new Parse.Error(code, message);
    }
    cbSalonId = _get(salonResponse, 'data.0.id');
    if (!cbSalonId) {
      const { code } = INVALID_CB_REQUEST;
      throw new Parse.Error(code, 'cbSalonId undefined');
    }
  }

  try {
    const db = await mongoDB.getMongoDB();
    const now = new Date();
    let insertData = {
      _id: username,
      salonName: salonName,
      slug: Helper.slugify(salonName),
      salonEmail: email,
      cbSalonId,
      _created_at: now,
      _updated_at: now,
      status: SALON_STATUS.ACTIVE,
      payoutAccount,
    };
    if (holdingCompany) {
      insertData = {
        ...insertData,
        holdingCompany,
      };
    }
    await db.collection('Salon').insertOne(insertData);
  } catch (error) {
    ParseServerLogger.error(error);

    const { message, code } = INVALID_MONGO_OPERATION;
    throw new Parse.Error(code, message);
  }

  const salon = Helper.getPointerValue('Salon', username);
  try {
    return await UserModel.createUser(
      { username, email, password, installationId, salon, salonName },
      {
        defaultValue: { role: USER_ROLE.SALON_OPERATOR, status: USER_STATUS.INVITED },
        sendFirstResetPasswordMail: true,
      },
    );
  } catch (error) {
    ParseServerLogger.error(error);
    salon.destroy({ useMasterKey: true }).catch((e) => {
      ParseServerLogger.error(e);
    });

    const { message, code } = INVALID_PARAMS;
    throw new Parse.Error(code, message);
  }
};

UserModel.createCustomer = async (params) => {
  const { email, platform } = params;

  let newCustomer;
  try {
    const customerParse = new Parse.Object('Customer');
    customerParse.set('email', email);
    customerParse.set('isCompletedProfile', false);
    customerParse.set('platform', platform);
    newCustomer = await customerParse.save(null, { useMasterKey: true });
  } catch (error) {
    ParseServerLogger.error(`Error when create Customer - ${email}!`, error);

    const { message, code } = CREATE_CUSTOMER_ERROR;
    throw new Parse.Error(code, message);
  }

  try {
    params.customer = newCustomer;
    return await UserModel.createUser(params, {
      defaultValue: { role: USER_ROLE.CUSTOMER, status: USER_STATUS.INVITED },
      sendFirstResetPasswordMail: false,
    });
  } catch (error) {
    ParseServerLogger.error('Error when create User!', error);

    newCustomer.destroy({ useMasterKey: true }).catch((e) => {
      ParseServerLogger.error(`Error when destroy Customer - ${email}!`, e);
    });

    const { message, code } = INVALID_PARAMS;
    throw new Parse.Error(code, message);
  }
};

// Only used for testing, because it will generate sessionToken of inactive users
UserModel.getUserSessionToken = async (payload) => {
  const user = await Parse.User.logIn(payload.email.toLowerCase(), payload.password);
  return user.get('sessionToken');
};

UserModel.changePassword = async ({ currentUser, currentPassword, newPassword }) => {
  const userName = currentUser.get('username');

  try {
    await request('get', 'verifyPassword', {
      username: userName,
      password: currentPassword,
    });
  } catch (error) {
    if (error.code === INVALID_EMAIL_PASSWORD.code) {
      Helper.throwInvalidUserPass(error);
    }

    throw error;
  }

  currentUser.set('password', newPassword);

  // when change password, Parse will remove old session token
  await currentUser.save(null, { useMasterKey: true });

  const user = await Parse.User.logIn(userName, newPassword);
  return { sessionToken: user.get('sessionToken') };
};

UserModel.resetPassword = async (payload) => {
  const email = payload.email.toLowerCase();
  const { role } = payload;

  const userQuery = BaseQuery.getUserQuery();
  userQuery.select('role');
  userQuery.equalTo('email', email);
  const user = await userQuery.first({ useMasterKey: true });

  if (!user || (role && user.get('role') !== role)) {
    const { message, code } = OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }

  return Parse.User.requestPasswordReset(email);
};

UserModel.sendForgotSalonId = async (email) => {
  const userQuery = BaseQuery.getUserQuery();
  userQuery.select('salon', 'username', 'email', 'status');
  userQuery.equalTo('email', email.toLowerCase());
  userQuery.equalTo('role', USER_ROLE.SALON_OPERATOR);
  const user = await userQuery.first({ useMasterKey: true });

  if (!user || !user.get('salon')) {
    const { message, code } = OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }

  await parseServerConfig.emailAdapter.sendMailByTemplate(
    'forgot-salonId',
    { to: email },
    { salonId: user.get('salon').id, user: user },
  );

  return true;
};

UserModel.deleteAllUsers = async () => {
  const userQuery = BaseQuery.getUserQuery();
  userQuery.exists('objectId');
  userQuery.select('objectId');
  userQuery.limit(1000);
  const allUsers = await userQuery.find({ useMasterKey: true });
  await Parse.Object.destroyAll(allUsers, { useMasterKey: true });
};

UserModel.renewSession = async (requestUser) => {
  try {
    const currentSessionToken = requestUser.getSessionToken();
    const newSessionExpire = moment().add({ second: parseServerConfig['sessionLength'] }).toDate();

    const db = await mongoDB.getMongoDB();
    await db.collection('_Session').updateOne(
      {
        _session_token: `${currentSessionToken}`,
      },
      { $set: { expiresAt: newSessionExpire } },
    );

    return true;
  } catch (err) {
    ParseServerLogger.error(`Error when renewSession - ${requestUser.get('email')}!`, err);
    return false;
  }
};

UserModel.logout = async (requestUser) => {
  try {
    const currentSessionToken = requestUser.getSessionToken();

    const db = await mongoDB.getMongoDB();
    await db.collection('_Session').deleteOne({
      _session_token: `${currentSessionToken}`,
    });

    return true;
  } catch (err) {
    ParseServerLogger.error(`Error when logout - ${requestUser.get('email')}!`, err);
    return false;
  }
};

UserModel.getUserFromStylistId = async (stylistId) => {
  try {
    const stylist = Helper.getPointerValue('Stylist', stylistId);
    const userQuery = BaseQuery.getUserQuery();
    userQuery.equalTo('stylist', stylist);
    const stylistObject = await userQuery.first({ useMasterKey: true });
    if (!stylistObject) {
      throw new Parse.Error(OBJECT_NOT_FOUND.code, OBJECT_NOT_FOUND.message);
    }
    return stylistObject;
  } catch (err) {
    ParseServerLogger.error(`Error getUserFromStylistId`, err);
    throw err;
  }
};

UserModel.getUserFromTokenForVerifyNewEmail = async (token) => {
  try {
    const userQuery = BaseQuery.getUserQuery();
    userQuery.equalTo('tokenForVerifyNewEmail', token);
    return await userQuery.first({ useMasterKey: true });
  } catch (err) {
    ParseServerLogger.error(`Error getUserFromTokenForVerifyNewEmail`, err);
    throw err;
  }
};

UserModel.setNewEmail = async ({ user, password }) => {
  let collectionRole;
  let objectId;
  let setValueForRole;
  switch (user.get('role')) {
    case USER_ROLE.STYLIST:
      collectionRole = 'Stylist';
      objectId = user.get('stylist').id;
      setValueForRole = {
        stylistEmail: user.get('newEmail'),
      };
      break;
    case USER_ROLE.CUSTOMER:
      collectionRole = 'Customer';
      objectId = user.get('customer').id;
      setValueForRole = {
        email: user.get('newEmail'),
      };
      break;
  }
  if (!collectionRole || !objectId) {
    throw new Parse.Error(OBJECT_NOT_FOUND.code, OBJECT_NOT_FOUND.message);
  }
  const setValueForUser = {
    email: user.get('newEmail'),
    username: user.get('newEmail'),
  };
  if (password) {
    setValueForUser.password = password;
    setValueForUser.hasSetPassFirstTime = true;
  }
  if (user.get('status') === USER_STATUS.INVITED) {
    setValueForUser.status = USER_STATUS.ACTIVE;
    setValueForRole.userStatus = USER_STATUS.ACTIVE;
  }
  if (!user.get('emailVerified')) {
    setValueForUser.emailVerified = true;
  }

  const mongodbClient = await mongoDB.getClient();
  await Helper.executeInTransaction(async (session) => {
    const db = await mongoDB.getMongoDB();
    await db.collection('_User').updateOne(
      {
        _id: user.id,
      },
      {
        $set: {
          ...setValueForUser,
        },
        $unset: {
          newEmail: '',
          tokenForVerifyNewEmail: '',
        },
      },
      {
        session,
      },
    );
    await db.collection(collectionRole).updateOne(
      {
        _id: objectId,
      },
      {
        $set: {
          ...setValueForRole,
        },
        $unset: {
          newEmail: '',
        },
      },
      {
        session,
      },
    );
    if (user.get('role') === USER_ROLE.STYLIST) {
      const stylistParse = await user.get('stylist').fetch({ useMasterKey: true });
      await ControllerBoardModel.updateStaffInfo({
        cbStaffId: stylistParse.get('cbStaffId'),
        email: user.get('newEmail'),
      });
    }
  }, mongodbClient);
};

UserModel.checkEmailExists = async (email, userId) => {
  const emailQuery = BaseQuery.getUserQuery();
  emailQuery.equalTo('email', email);

  const newEmailQuery = BaseQuery.getUserQuery();
  newEmailQuery.equalTo('newEmail', email);

  let checkEmailQuery = Parse.Query.or(emailQuery, newEmailQuery);
  if (userId) {
    const userQuery = BaseQuery.getUserQuery();
    userQuery.notEqualTo('objectId', userId);
    checkEmailQuery = Parse.Query.and(checkEmailQuery, userQuery);
  }

  const duplicatedEmail = await checkEmailQuery.first({ useMasterKey: true });
  if (duplicatedEmail) {
    const { message, code } = DUPLICATE_REGISTER_EMAIL;
    throw new Parse.Error(code, message);
  } else {
    return email;
  }
};

UserModel.forceLogout = async ({ session, db, userId }) => {
  await db.collection('_Installation').remove(
    {
      _p_user: `_User$${userId}`,
    },
    {
      session,
    },
  );
  await db.collection('_Session').remove(
    {
      _p_user: `_User$${userId}`,
    },
    {
      session,
    },
  );
};

UserModel.getUserFromCustomerId = async (customerId) => {
  try {
    const customer = Helper.getPointerValue('Customer', customerId);
    const userQuery = BaseQuery.getUserQuery();
    userQuery.equalTo('customer', customer);
    const customerOject = await userQuery.first({ useMasterKey: true });
    if (!customerOject) {
      throw new Parse.Error(OBJECT_NOT_FOUND.code, OBJECT_NOT_FOUND.message);
    }
    return customerOject;
  } catch (err) {
    ParseServerLogger.error(`Error getUserFromCustomerId`, err);
    throw err;
  }
};

UserModel.getUserFromSalonId = async (salonId) => {
  try {
    const salon = Helper.getPointerValue('Salon', salonId);
    const userQuery = BaseQuery.getUserQuery();
    userQuery.equalTo('salon', salon);
    const salonObject = await userQuery.first({ useMasterKey: true });
    if (!salonObject) {
      throw new Parse.Error(OBJECT_NOT_FOUND.code, OBJECT_NOT_FOUND.message);
    }
    return salonObject;
  } catch (err) {
    ParseServerLogger.error(`Error getUserFromCustomerId`, err);
    throw err;
  }
};
