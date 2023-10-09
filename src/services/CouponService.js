const jwt = require('jsonwebtoken');
const axios = require('axios');
const queryString = require('query-string');
class CouponService {
  constructor({ privateKey, urlServer, appId, passphrase, expiresIn }) {
    this._privateKey = privateKey;
    this._urlServer = urlServer;
    this._appId = appId;
    this._passphrase = passphrase;
    this._expiresIn = Number(expiresIn) >= 7 ? Number(expiresIn) : 7;
    this._apiInstance = axios.create({
      baseURL: this._urlServer,
      responseType: 'json',
      validateStatus: () => true,
      headers: { 'Accept-Language': 'ja' },
    });
    this._apiInstance.interceptors.response.use(
      (response) => {
        if (response.data.error) {
          console.log(response.data);
          const error = new Error(response.data.error);
          return Promise.reject(error);
        }
        return response.data;
      },
      (error) => {
        console.error(error);
        error.message = 'Internal error';
        return Promise.reject(error);
      },
    );
  }

  _api() {
    this._apiInstance.defaults.headers.common.Authorization = `Bearer ${this.generateToken()}`;
    return this._apiInstance;
  }

  generateToken() {
    return jwt.sign(
      {
        id: this._appId,
      },
      { key: this._privateKey, passphrase: this._passphrase },
      { algorithm: 'RS256', expiresIn: `${this._expiresIn}d` },
    );
  }

  async checkCoupon(payload) {
    const { data } = await this._api().patch('/application/coupons/check', payload);
    return data;
  }

  async useCoupon({ code, ...payload }) {
    const { data } = await this._api().put(`application/coupons/${code}/using`, payload);
    return data;
  }

  async cancelTransaction(id) {
    const { data } = await this._api().patch(`application/transactions/${id}/status/cancel`);
    return data;
  }

  async getAnnouncementList(payload = {}) {
    const { data } = await this._api().get(`/application/announcements?${queryString.stringify(payload)}`);
    return data;
  }

  async getAnnouncement({ id, ...payload }) {
    const { data } = await this._api().get(`/application/announcements/${id}?${queryString.stringify(payload)}`);
    return data;
  }

  async getCoupons(payload = {}) {
    const { data } = await this._api().get(`/application/coupons?${queryString.stringify(payload)}`);
    return data;
  }

  async getCouponDetail({ id }) {
    const { data } = await this._api().get(`/application/coupons/${id}`);
    return data;
  }
}

let connection;
module.exports = {
  init: function ({ privateKey, urlServer, appId, passphrase, expiresIn = 7 }) {
    if (!privateKey || !urlServer || !appId || !passphrase) {
      throw new Error('Please enter valid params');
    }
    connection = new CouponService({ privateKey, urlServer, appId, passphrase, expiresIn });
    return connection;
  },

  getCouponService: function () {
    if (connection) {
      return connection;
    }
    throw new Error('Please init connection first');
  },
};
