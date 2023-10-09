const axios = require('axios');

const { parseServerConfig } = require('../config');

let axiosInstance = undefined;
const request = (method, url, data = {}) => {
  try {
    return axiosInstance({ method: method, url: url, data: data });
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports.default = request;

// continue
axiosInstance = axios.create({
  baseURL: parseServerConfig.serverURL,
  headers: {
    'X-Parse-Application-Id': parseServerConfig.appId,
    'X-Parse-REST-API-Key': parseServerConfig.restAPIKey,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if ([200, 201].includes(response.status)) {
      const result = response.data;
      result.statusCode = response.status;
      return response.data;
    }
    return Promise.reject(response);
  },
  (error) => {
    if (error.response.data.code) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.response.statusText);
  },
);
