const ImageTrigger = {};
module.exports = ImageTrigger;

const _isEmpty = require('lodash/isEmpty');
const _forEach = require('lodash/forEach');

const Constants = require('../../const/Constants');
const Helper = require('../../utils/helper');
const Validation = require('../../utils/validation');

const requiredFields = ['type', 'createdBy', 'file'];
const defaultValueMap = {
  status: Constants.STATUS.DELETED,
};
const imageFields = ['thumbLarge', 'thumbSmall', 'thumbMedium', 'file'];

const mapFnUpdateImageUrl = {};

const updateThumbnailUrlForOtherClass = (imageObj) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fn = mapFnUpdateImageUrl[imageObj.get('type')];
      if (!fn) {
        return resolve();
      }

      return resolve(fn(imageObj));
    }, 100);
  });
};

Object.assign(ImageTrigger, {
  beforeSaveImage: {
    class: 'Image',
    handler: async (request) => {
      const imageObject = request.object;

      Validation.checkRequireFields(requiredFields, imageObject);
      Helper.setDefaultValue(imageObject, defaultValueMap);

      if (imageObject.dirty('type') && imageObject.get('type')) {
        imageObject.set('type', imageObject.get('type').toUpperCase());
      }

      if (imageObject.existed() && imageObject.dirty('file')) {
        // clear all thumbs when change file
        imageObject.unset('thumbLarge');
        imageObject.unset('thumbMedium');
        imageObject.unset('thumbSmall');
      }
    },
  },

  afterSaveImage: {
    class: 'Image',
    handler: async (request) => {
      const imageObject = request.object;

      // generate thumbnails
      if (
        imageObject.get('file') &&
        !imageObject.has('thumbLarge') &&
        !imageObject.has('thumbMedium') &&
        !imageObject.has('thumbSmall')
      ) {
        try {
          const map = await Helper.generateThumbnailsWithSharp({
            imageUrl: imageObject.get('file').url(),
            type: imageObject.get('type'),
          });

          if (_isEmpty(map)) {
            return;
          }

          // save thumbnails to image
          _forEach(map, (file, key) => {
            imageObject.set(key, file);
          });
          await imageObject.save();

          console.log(`Image::afterSave Image "${imageObject.id}" just have generated thumbnails.`);

          // update thumbnail url to other class
          updateThumbnailUrlForOtherClass(imageObject);
        } catch (error) {
          console.error('Image::afterSave - Error when generate thumbnails!', error);
        }
      }

      const original = request.original;
      if (original) {
        // Delete images on S3
        const s3Files = imageFields.reduce((array, field) => {
          if (imageObject.get(field) || !original.get(field)) {
            return array;
          }
          const s3File = Helper.buildS3File(original.get(field));
          if (s3File) {
            array.push(s3File);
          }
          return array;
        }, []);

        if (s3Files.length > 0) {
          await Helper.deleteAwsFiles(s3Files);
        }
      }
    },
  },

  beforeDelete: {
    class: 'Image',
    handler: async (request) => {
      const imgObj = request.object;

      // Delete images on S3
      const s3Files = imageFields.reduce((array, field) => {
        const s3File = Helper.buildS3File(imgObj.get(field));
        if (s3File) {
          array.push(s3File);
        }
        return array;
      }, []);

      if (s3Files.length > 0) {
        await Helper.deleteAwsFiles(s3Files);
      }
    },
  },
});
