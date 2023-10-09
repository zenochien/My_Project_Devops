const _ = require('lodash');
const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const fs = require('fs');

const { ParseServerLogger } = require('../../logger');
const Helper = require('../../utils/helper');
const { USER_ROLE } = require('../../const/Constants');

const defaultOptions = {
  host: process.env.PARSE_SERVER_EMAIL_ADAPTER_HOST || '',
  port: process.env.PARSE_SERVER_EMAIL_ADAPTER_PORT ? Number(process.env.PARSE_SERVER_EMAIL_ADAPTER_PORT) : 465,
  isSSL: !!(process.env.PARSE_SERVER_EMAIL_ADAPTER_IS_SSL ? Number(process.env.PARSE_SERVER_EMAIL_ADAPTER_IS_SSL) : 1),
  user: process.env.PARSE_SERVER_EMAIL_ADAPTER_EMAIL || '',
  password: process.env.PARSE_SERVER_EMAIL_ADAPTER_PASSWORD || '',
  fromAddress: process.env.PARSE_SERVER_EMAIL_ADAPTER_FROM_ADDRESS || '',
  name: process.env.PARSE_SERVER_EMAIL_ADAPTER_NAME_SYSTEM || 'Parse System',
  emailField: process.env.PARSE_SERVER_EMAIL_ADAPTER_FIELD_NAME || 'email',
  viewExtension: process.env.PARSE_SERVER_EMAIL_ADAPTER_VIEW_EXTENSION || 'pug',
  emailTemplatePath: 'views/emails',
};

/**
 * Check email template exists.
 * @param emailTemplatePath
 * @param template
 */
const checkEmailTemplateExists = (emailTemplatePath, template) => {
  return fs.existsSync(`${emailTemplatePath}/${template}`);
};

class ParseEmailAdapter {
  constructor(opts) {
    opts = _.assign({}, defaultOptions, opts);
    if (!opts || !opts.user || !opts.password || !opts.host || !opts.fromAddress) {
      throw 'ParseEmailAdapterOptions requires user, password, host, and fromAddress!';
    }

    this._options = opts;
    this._transporter = nodemailer.createTransport({
      host: opts.host,
      port: opts.port,
      secure: opts.isSSL,
      name: opts.name,
      auth: {
        user: opts.user,
        pass: opts.password,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
    this._emailTemplate = new EmailTemplates({
      message: {
        from: opts.fromAddress,
      },
      send: true,
      views: {
        root: this._options.emailTemplatePath,
        options: {
          extension: this._options.viewExtension,
        },
      },
      transport: this._transporter,
    });
  }

  /**
   * When emailField is defined in adapter options return that field.
   * Otherwise, return email | username.
   *
   * @param {Parse.User} user
   * @return String email
   */
  _getUserEmail(user) {
    let email = Helper.getParseProp(user, 'email') || Helper.getParseProp(user, 'username');

    const emailField = this._options.emailField;
    if (emailField) {
      email = Helper.getParseProp(user, emailField);
    }

    return email;
  }

  _getRole(user) {
    return Helper.getParseProp(user, 'role');
  }

  _getIsInvalidVerificationLink(user) {
    return Helper.getParseProp(user, 'isInvalidVerificationLink');
  }

  /**
   * Parse use this function by default for sends emails.
   * @param mailOpts Object contains to from, to, subject and text / html.
   * @returns {Promise}
   */
  sendMail(mailOpts) {
    if (!mailOpts.from) {
      mailOpts.from = this._options.fromAddress;
    }

    return new Promise((resolve, reject) => {
      this._transporter.sendMail(mailOpts, (error, info) => {
        if (error) {
          ParseServerLogger.error('Error when send mail!', error);
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }

  /**
   * Parse use this function to send email for reset password.
   * @param data Object contains {appName}, {link} and {user} user is Parse.User.
   * @returns {Promise}
   */
  async sendPasswordResetEmail(data) {
    switch (data.user.get('role')) {
      case USER_ROLE.CUSTOMER:
        data.link = await Helper.getShortLinkForCustomer(data.link);
        break;
      case USER_ROLE.STYLIST:
        data.link = await Helper.getShortLinkForStylist(data.link);
        break;
    }
    const template = 'reset-password';
    let result;
    try {
      if (checkEmailTemplateExists(this._options.emailTemplatePath, template)) {
        result = await this._emailTemplate.send({
          template,
          message: { to: this._getUserEmail(data.user) },
          locals: data,
        });
      } else {
        result = await this._transporter.sendMail({
          to: this._getUserEmail(data.user),
          from: this._options.fromAddress,
          subject: 'Reset Password',
          text: data.link,
        });
      }

      return result;
    } catch (error) {
      ParseServerLogger.error('Error when send password reset email!', error);
      throw error;
    }
  }

  /**
   * Parse use this function to send email for email verification.
   * @param data Object contains {appName}, {link} and {user} user is Parse.User.
   * @returns {Promise}
   */

  async sendVerificationEmail(data) {
    if (this._getRole(data.user) !== USER_ROLE.CUSTOMER) {
      return;
    }
    switch (data.user.get('role')) {
      case USER_ROLE.CUSTOMER:
        data.link = await Helper.getShortLinkForCustomer(data.link);
        break;
      case USER_ROLE.STYLIST:
        data.link = await Helper.getShortLinkForStylist(data.link);
        break;
    }

    data.isInvalidVerificationLink = this._getIsInvalidVerificationLink(data.user);
    const template = 'verify-email';
    let result;
    try {
      if (checkEmailTemplateExists(this._options.emailTemplatePath, template)) {
        result = await this._emailTemplate.send({
          template,
          message: { to: this._getUserEmail(data.user) },
          locals: data,
        });
      } else {
        result = await this._transporter.sendMail({
          to: this._getUserEmail(data.user),
          from: this._options.fromAddress,
          subject: 'Verify Email',
          text: data.link,
        });
      }

      return result;
    } catch (error) {
      ParseServerLogger.error('Error when send verification email!', error);
      throw error;
    }
  }

  /**
   * Send mail by template
   * @param {string} template
   * @param {Object} mailOpts
   * @param {String} mailOpts.from
   * @param {String} mailOpts.to
   * @param data
   * @returns {Promise}
   */
  async sendMailByTemplate(template, mailOpts, data) {
    try {
      return await this._emailTemplate.send({
        template,
        message: mailOpts,
        locals: data,
      });
    } catch (error) {
      ParseServerLogger.error(error);
      throw error;
    }
  }
}

module.exports.default = ParseEmailAdapter;
module.exports.ParseEmailAdapter = ParseEmailAdapter;
