const axios = require('axios');
const _ = require('lodash');
const queryString = require('query-string');
class PayoutService {
  constructor({ appId, token, urlServer }) {
    this._token = token;
    this._appId = appId;
    this._urlServer = urlServer;
    this._apiInstance = axios.create({
      baseURL: this._urlServer,
      responseType: 'json',
      validateStatus: () => true,
      headers: {
        'Accept-Language': 'ja',
        'X-C2C-AppId': this._appId,
      },
    });
    this._apiInstance.interceptors.response.use(
      (response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.data;
        }
        let message = 'Internal error';
        if (response.data && response.data.messages && _.isArray(response.data.messages)) {
          message = response.data.messages[0];
        }
        // console.error('[PayoutService]:status:', response);
        return Promise.reject(new Error(message));
      },
      (error) => {
        console.error('[PayoutService]:error:', error);
        error.message = 'Internal error';
        return Promise.reject(error);
      },
    );
  }

  _api() {
    this._apiInstance.defaults.headers.common.Authorization = `Bearer ${this._token}`;
    return this._apiInstance;
  }

  async _createAccount(payload) {
    return await this._api().post('/api/v1/accounts', payload);
  }

  async _getPayouts(payload) {
    return this._api().get(`/api/v1/earnings/payouts?${queryString.stringify(payload)}`);
  }

  async _getPayoutById(id) {
    return this._api().get(`/api/v1/earnings/payouts/${id}`);
  }
  async _cancelPayoutById(id) {
    return this._api().post(`/api/v1/earnings/payouts/${id}/cancel`);
  }

  async _makePayoutById(id, metaData) {
    return this._api().post(`/api/v1/earnings/balances/${id}/makepayout`, metaData);
  }

  async _updateMetaDataPayoutById(id) {
    return this._api().patch(`/api/v1/earnings-api/payouts/${id}`);
  }

  async _completePayout(id) {
    return this._api().post(`api/v1/earnings/payouts/${id}/complete`);
  }

  async _getPayoutSummary(payload) {
    return this._api().get(`/api/v1/earnings/payouts/aggregate?${queryString.stringify(payload)}`);
  }

  async createAccount() {
    const account = await this._createAccount({
      ownerId: 'hairlie',
      country: 'JP',
      currency: 'jpy',
    });
    return await this.getAccountDetail({ id: account.id });
  }

  async getPayouts(pagingParams) {
    return this._getPayouts(pagingParams);
  }

  async getPayoutById(id) {
    return this._getPayoutById(id);
  }

  async getAccountDetail({ id }) {
    return await this._api().get(`/api/v1/accounts/${id}`);
  }

  async getEarnings(payload) {
    return await this._api().get(`/api/v1/earnings/earnings?${queryString.stringify(payload)}`);
  }

  async createEarning(payload) {
    return await this._api().post('/api/v1/earnings/earnings', payload);
  }

  async depositPayment({ balanceId, ...payload }) {
    return await this._api().post(`/api/v1/earnings/balances/${balanceId}/deposit`, payload);
  }

  async getPayments(payload) {
    return await this._api().get(`/api/v1/earnings/payments?${queryString.stringify(payload)}`);
  }

  async completePayout(id) {
    return this._completePayout(id);
  }

  async createPayout({ balanceId, ...payload }) {
    return await this._api().post(`/api/v1/earnings/balances/${balanceId}/makepayout`, payload);
  }

  async cancelPayoutById(id) {
    return this._cancelPayoutById(id);
  }

  async makePayoutById(id, metaData) {
    return this._makePayoutById(id, metaData);
  }

  async updateMetaDataPayoutById(id) {
    return this._updateMetaDataPayoutById(id);
  }

  async getPayoutSummary(pagingParams) {
    return this._getPayoutSummary(pagingParams);
  }
}

let connection;
module.exports = {
  init: function ({ appId, token, urlServer }) {
    if (!appId || !token || !urlServer) {
      throw new Error('Please enter valid params');
    }
    connection = new PayoutService({ appId, token, urlServer });
    return connection;
  },

  getPayoutService: function () {
    if (connection) {
      return connection;
    }
    throw new Error('Please init connection first');
  },
};
