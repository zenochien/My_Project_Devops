const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { ParseServerLogger } = require('../logger');

const ROUTE_PATH = {
  UPLOAD_IMAGE: '/upload/image',
};

const DEFAULT_FIELD_NAME = 'file';

const makeUploadImageFn =
  ({ fieldName = DEFAULT_FIELD_NAME, type } = {}) =>
  (req, res) => {
    const params = { file: req[fieldName], type: type || req.body.type };

    Parse.Cloud.run('uploadImage', params, { sessionToken: req.headers['x-parse-session-token'] })
      .then((result) => res.json(result))
      .catch((error) => {
        ParseServerLogger.error(error);
        return res.json({
          status: 0,
          errorMsg: error,
        });
      });
  };

module.exports.default = function () {
  const router = express.Router();
  router.use(bodyParser.json());

  router.post(ROUTE_PATH.UPLOAD_IMAGE, upload.single(DEFAULT_FIELD_NAME), makeUploadImageFn());

  return router;
};
