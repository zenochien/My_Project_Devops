const ImageModel = {};
module.exports = ImageModel;

const _get = require('lodash/get');
const _map = require('lodash/map');
const _find = require('lodash/find');

const BaseQuery = require('../BaseQuery');
const Helper = require('../../utils/helper');
const Errors = require('../../const/Errors');
const { STATUS } = require('../../const/Constants');
const DefaultSelectFields = require('../../const/DefaultSelectFields');

const acceptedFileExtensions = ['.svg', '.jpg', '.jpeg', '.png'];
const maxImageSize = process.env.MAX_MENU_IMAGE_SIZE ? Number(process.env.MAX_MENU_IMAGE_SIZE) : 5 * 1024 * 1024;

ImageModel.createImage = async ({ base64string, fileSize, fileExtension, user, type, limitSize = maxImageSize }) => {
  if (!acceptedFileExtensions.includes(fileExtension) || fileSize > limitSize) {
    const { code, message } = Errors.INVALID_PARAMS;
    throw new Parse.Error(code, message);
  }

  const imgFile = new Parse.File(`hairlie_image${fileExtension}`, {
    base64: base64string,
  });
  const imgParse = new Parse.Object('Image', {
    type,
    file: imgFile,
    createdBy: user,
  });
  return await imgParse.save(null, { useMasterKey: true });
};

ImageModel.activeAndGetImageObjs = async (imageIds) => {
  // Get Images with url and validate if Images exist or not
  const imageQuery = BaseQuery.getImageQuery();
  imageQuery.containedIn('objectId', imageIds);
  imageQuery.select(DefaultSelectFields.IMAGE);
  const imageParses = await imageQuery.find({ useMasterKey: true });

  if (imageParses.length !== imageIds.length) {
    const { code, message } = Errors.OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }

  // Build Image objects, set status of Images to ACTIVE
  const activeImageParses = [];
  const imageObjects = _map(imageParses, (imageParse) => {
    imageParse.set('status', STATUS.ACTIVE);
    activeImageParses.push(imageParse);
    const imageObj = Helper.convertParseObjectToJson(imageParse, DefaultSelectFields.IMAGE);
    return {
      objectId: _get(imageObj, 'objectId'),
      file: _get(imageObj.file, 'url'),
      thumbSmall: _get(imageObj.thumbSmall, 'url'),
      thumbMedium: _get(imageObj.thumbMedium, 'url'),
      thumbLarge: _get(imageObj.thumbLarge, 'url'),
    };
  });

  // Make sure that Image is ACTIVE before doing anything after this func
  await Parse.Object.saveAll(activeImageParses, { useMasterKey: true });

  // Keep Image objects in same order like input array
  return _map(imageIds, (imageId) => _find(imageObjects, (obj) => obj.objectId === imageId));
};
