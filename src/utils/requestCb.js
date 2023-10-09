const axios = require('axios');

const { generalConfig } = require('../config');

let axiosInstance = undefined;
const requestCb = (method, url, data = {}) => {
  try {
    return axiosInstance({ method, url, data });
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports.default = requestCb;

// continue
axiosInstance = axios.create({
  baseURL: generalConfig.controllerBoardBaseUrl,
  headers: {
    Authorization: `Basic ${generalConfig.controllerBoardAuthorization}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    if ([200, 201].includes(response.data.statusCode)) {
      return response.data.data;
    }
    return Promise.reject(response);
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(JSON.stringify(error.response.data));
    }
    if (error.response && error.response.statusText) {
      return Promise.reject(error.response.statusText);
    }
    return Promise.reject(error.response);
  },
);
