const ProductModel = {};
module.exports = ProductModel;

const _reduce = require('lodash/reduce');

const BaseQuery = require('../BaseQuery');
const Helper = require('../../utils/helper');
const { STATUS, USER_ROLE, PRODUCT_TYPE } = require('../../const/Constants');
const Errors = require('../../const/Errors');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const { ParseServerLogger } = require('../../logger');
const ImageModel = require('./Image');

/** PRODUCT STATUS:
 *
 * Status list: [PUBLISHED, UNPUBLISHED, DELETED]
 * Status rules:
 * - No role can see [DELETED]
 * - ADMIN and SALON can see [PUBLISHED, UNPUBLISHED]
 * - CUSTOMER can see [PUBLISHED]
 */

const buildProductInfo = (productParse, unsetFields = []) => {
  if (productParse.get('type') === PRODUCT_TYPE.SALON) {
    unsetFields.push('price');
  }

  return Helper.convertParseObjectToJson(productParse, DefaultSelectFields.PRODUCT, unsetFields);
};

const checkExistingProductOfSalon = async (name, salonParse, currentId) => {
  const existingProductQuery = BaseQuery.getProductQuery();
  currentId && existingProductQuery.notEqualTo('objectId', currentId);
  existingProductQuery.notEqualTo('status', STATUS.DELETED);
  existingProductQuery.equalTo('name', name);
  existingProductQuery.equalTo('salon', salonParse);
  const existingProduct = await existingProductQuery.first({ useMasterKey: true });
  if (existingProduct) {
    const { code, message } = Errors.DUPLICATE_VALUE;
    throw new Parse.Error(code, message);
  }
};

ProductModel.createProduct = async (params, requestUser) => {
  const { images: imageIds, name, price, description, type, url } = params;
  const salonParse = requestUser.get('salon');

  await checkExistingProductOfSalon(name, salonParse);

  const imageObjects = await ImageModel.activeAndGetImageObjs(imageIds);

  const productParse = new Parse.Object('Product');
  productParse.set('images', imageObjects);
  productParse.set('imageIds', imageIds);
  productParse.set('salon', salonParse);
  productParse.set('status', STATUS.PUBLISHED);
  productParse.set('name', name);
  productParse.set('price', price);
  productParse.set('type', type);
  productParse.set('description', description);
  productParse.set('url', url);

  const newProduct = await productParse.save(null, { useMasterKey: true });
  return ProductModel.getProductDetail({ productId: newProduct.id }, requestUser);
};

ProductModel.updateProduct = async (params, requestUser) => {
  const { productId, images: imageIds, name } = params;
  const salonParse = requestUser.get('salon');

  const productQuery = BaseQuery.getProductQuery();
  productQuery.select('imageIds');
  productQuery.notEqualTo('status', STATUS.DELETED);

  //Salon Operator can only update their Product
  if (requestUser && requestUser.get('role') !== USER_ROLE.ADMIN) {
    productQuery.equalTo('salon', salonParse);
  }
  const productParse = await productQuery.get(productId, { useMasterKey: true });

  if (name) {
    await checkExistingProductOfSalon(name, salonParse, productParse.id);
  }

  const prevImageIds = productParse.get('imageIds');
  if (imageIds) {
    const imageObjects = await ImageModel.activeAndGetImageObjs(imageIds);
    productParse.set('images', imageObjects);
    productParse.set('imageIds', imageIds);
  }

  Helper.updateDataToParseObj(productParse, params, ['name', 'price', 'type', 'description', 'status', 'url']);

  await productParse.save(null, { useMasterKey: true });

  if (imageIds) {
    const deletedImageParses = _reduce(
      prevImageIds,
      (array, imageId) => {
        if (imageIds.includes(imageId)) {
          return array;
        }
        const deletedImageParse = Helper.getPointerValue('Image', imageId);
        deletedImageParse.set('status', STATUS.DELETED);
        array.push(deletedImageParse);
        return array;
      },
      [],
    );

    Parse.Object.saveAll(deletedImageParses, { useMasterKey: true }).catch((error) => ParseServerLogger.error(error));
  }

  return true;
};

ProductModel.changeProductPublishStatus = async (params, requestUser) => {
  const { productId } = params;

  const productQuery = BaseQuery.getProductQuery();
  productQuery.select('status');
  productQuery.containedIn('status', [STATUS.PUBLISHED, STATUS.UNPUBLISHED]);
  const productParse = await productQuery.get(productId, { useMasterKey: true });

  const prevStatus = productParse.get('status');
  if (prevStatus === STATUS.PUBLISHED) {
    productParse.set('status', STATUS.UNPUBLISHED);
  } else if (prevStatus === STATUS.UNPUBLISHED) {
    productParse.set('status', STATUS.PUBLISHED);
  }

  await productParse.save(null, { useMasterKey: true });
  return ProductModel.getProductDetail({ productId }, requestUser);
};

ProductModel.getProductDetail = async (params, requestUser) => {
  const { productId } = params;

  const productQuery = BaseQuery.getProductQuery();
  productQuery.notEqualTo('status', STATUS.DELETED);
  productQuery.select(DefaultSelectFields.PRODUCT);

  /**
   * SALON can only see their product
   */
  if (!requestUser || requestUser.get('role') === USER_ROLE.CUSTOMER) {
    productQuery.equalTo('status', STATUS.PUBLISHED);
  } else if (requestUser.get('role') === USER_ROLE.SALON_OPERATOR) {
    productQuery.equalTo('salon', requestUser.get('salon'));
  }

  const productParse = await productQuery.get(productId, { useMasterKey: true });

  return buildProductInfo(productParse);
};

ProductModel.getProductList = async (params, requestUser) => {
  const { salonId, searchKey, status, ...pagingParams } = params;

  const productQuery = BaseQuery.getProductQuery();
  status && productQuery.equalTo('status', status);
  productQuery._andQuery([BaseQuery.getProductQuery().notEqualTo('status', STATUS.DELETED)]);
  productQuery.select(DefaultSelectFields.PRODUCT);
  Helper.queryPagingHandler(productQuery, pagingParams);

  /**
   * SALON can only see their product
   */
  if (!requestUser || requestUser.get('role') === USER_ROLE.CUSTOMER) {
    productQuery.equalTo('status', STATUS.PUBLISHED);
  }
  if (requestUser && requestUser.get('role') === USER_ROLE.SALON_OPERATOR) {
    productQuery.equalTo('salon', requestUser.get('salon'));
  } else if (salonId) {
    productQuery.equalTo('salon', Helper.getPointerValue('Salon', salonId));
  }

  if (searchKey) {
    const pattern = Helper.escapeRegExp(searchKey);
    productQuery.matches('name', new RegExp(pattern.toLowerCase(), 'i'), undefined);
  }

  const [productParses, total] = await Promise.all([productQuery.find({ useMasterKey: true }), productQuery.count()]);

  return {
    total,
    list: productParses.map((productParse) => buildProductInfo(productParse)),
  };
};
