const UserFunctions = {};
module.exports = UserFunctions;

const yup = require('yup');

const Validation = require('../../utils/validation');
const Helper = require('../../utils/helper');
const { ImageModel } = require('../models');

Object.assign(UserFunctions, {
  uploadImage: async (request) => {
    Validation.loginRequired(request);

    const payload = Validation.checkRequestParams(request, {
      file: yup
        .object()
        .shape({
          originalname: yup.string(),
          size: yup.number(),
          mimetype: yup.string(),
          path: yup.string(),
        })
        .required(),
      type: yup.string().optional(),
    });

    const imageFile = Helper.formatFileImage(payload.file);

    return ImageModel.createImage({
      base64string: imageFile.base64,
      fileSize: imageFile.size,
      fileExtension: imageFile.extension,
      type: payload.type,
      user: request.user,
    });
  },
});
