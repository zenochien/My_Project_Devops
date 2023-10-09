const PostFunctions = {};
module.exports = PostFunctions;

const _ = require('lodash');
const yup = require('yup');

const { USER_ROLE, STATUS, FACE_SHAPES, PAGING_ORDER } = require('../../const/Constants');
const Validation = require('../../utils/validation');
const { PostModel } = require('../models');
const Errors = require('./../../const/Errors');
const PostService = require('./../services/Post');
const { generalConfig } = require('../../config');

Object.assign(PostFunctions, {
  createPost: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST]);
    const payloadStauts = Validation.checkRequestParams(request, {
      status: yup.string().trim().oneOf([STATUS.PUBLISHED, STATUS.UNPUBLISHED]).optional(),
    });

    const { status = STATUS.PUBLISHED } = payloadStauts;

    const paramsValidate = {
      stylistId: yup.string().trim().optional(),
      images: yup.array().of(yup.string().trim()).min(1).max(3).required(),
      description: yup.string().trim().max(2000).optional(),
      tags: yup.array().of(yup.string().trim().max(15)).max(10).optional(),
      faceShapes: yup.array().of(yup.string().trim().oneOf(FACE_SHAPES)).max(3).optional(),
      menus: yup.array().of(yup.string().trim()).min(1).max(10).required(),
      products: yup.array().of(yup.string().trim()).max(10).optional(),
    };

    if (status === STATUS.UNPUBLISHED) {
      paramsValidate.tags = yup.array().of(yup.string().trim().max(15)).max(10).optional();
      paramsValidate.images = yup.array().of(yup.string().trim()).max(3).optional();
      paramsValidate.menus = yup.array().of(yup.string().trim()).max(10).optional();
    }

    let payload = {};
    try {
      payload = Validation.checkRequestParams(request, paramsValidate);
    } catch (error) {
      const { code, message } = Errors.PUBLISH_POST_ERROR;
      throw new Parse.Error(code, message);
    }

    const user = request.user;
    if (user.get('role') === USER_ROLE.STYLIST) {
      payload.stylistId = user.get('stylist').id;
    }

    return PostModel.createPost(
      {
        ...payload,
        status,
      },
      user,
    );
  },

  updatePost: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST]);

    const payload = Validation.checkRequestParams(request, {
      postId: yup.string().trim().required(),
      images: yup.array().of(yup.string().trim()).max(3).optional(),
      description: yup.string().trim().max(2000).optional(),
      tags: yup.array().of(yup.string().trim().max(15)).max(10).optional(),
      faceShapes: yup.array().of(yup.string().trim().oneOf(FACE_SHAPES)).max(3).optional(),
      status: yup.string().trim().optional(),
      menus: yup.array().of(yup.string().trim()).max(10).optional(),
      products: yup.array().of(yup.string().trim()).max(10).optional(),
    });

    await PostModel.updatePost(payload, request.user);
    return PostModel.getPostDetail({ postId: payload.postId }, request.user);
  },

  removePost: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST]);

    const payload = Validation.checkRequestParams(request, {
      postId: yup.string().trim().required(),
    });

    payload.status = STATUS.DELETED;

    await PostModel.updatePost(payload, request.user);
    return true;
  },

  changePostPublishStatus: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN, USER_ROLE.SALON_OPERATOR, USER_ROLE.STYLIST]);

    const payload = Validation.checkRequestParams(request, {
      postId: yup.string().trim().required(),
    });

    return PostModel.changePostPublishStatus(payload, request.user);
  },

  getPostDetail: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      postId: yup.string().trim().required(),
    });

    return PostModel.getPostDetail(payload, request.user);
  },

  getPostList: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      stylistId: yup.string().trim().optional(),
      status: yup.array().of(yup.string().trim()).optional(),
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).required(),
      limit: yup.number().integer().min(1).required(),
    });

    return PostModel.getPostList(payload, request.user);
  },

  customerGetPostDetailPage: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      postId: yup.string().trim().required(),
      limit: yup.number().optional(),
    });

    const postDetail = await PostModel.getPostDetail(payload, request.user);

    const stylistIdOfPost = _.get(postDetail.stylist, 'objectId');
    const relatedPostOfStylist = await PostModel.getPostList(
      {
        stylistId: stylistIdOfPost,
        excludePostId: postDetail.objectId,
        page: 1,
        limit: payload.limit ? payload.limit : 12,
        orderBy: 'createdAt',
        order: PAGING_ORDER.DESC,
      },
      request.user,
    );

    return {
      post: postDetail,
      relatedPosts: relatedPostOfStylist.list,
    };
  },

  favoritePost: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
    const { postId } = Validation.checkRequestParams(request, {
      postId: yup.string().trim().required(),
    });
    await PostService.favoritePost({ customerId: request.user.get('customer').id, postId });
    return { status: 'success' };
  },

  unfavoritePost: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
    const { postId } = Validation.checkRequestParams(request, {
      postId: yup.string().trim().required(),
    });
    await PostService.unfavoritePost({ customerId: request.user.get('customer').id, postId });
    return { status: 'success' };
  },

  getFavoritePostByCustomer: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.CUSTOMER]);
    const payload = Validation.checkRequestParams(request, {
      status: yup.string().trim().optional(),
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
    });
    const customerId = request.user.get('customer').id;
    return PostModel.getFavoritePostByCustomer({
      ...payload,
      customerId,
    });
  },

  migratePostHasInvalidMenu: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    return PostModel.migratePostHasInvalidMenu();
  },

  getHashtagsByCustomer: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      searchKey: yup.string().trim().required(),
    });
    return PostModel.getHashtagsByCustomer(payload);
  },

  getPostsByHashtag: async (request) => {
    const payload = Validation.checkRequestParams(request, {
      tags: yup.array().of(yup.string().trim()).required(),
      status: yup.array().of(yup.string().trim()).optional(),
      orderBy: yup.string().trim().optional(),
      order: yup.string().trim().optional(),
      page: yup.number().integer().min(1).optional(),
      limit: yup.number().integer().min(1).optional(),
    });

    return PostModel.getPostsByHashtag(payload, request.user);
  },

  migrateStylistStatusForOldPost: async (request) => {
    Validation.requireRoles(request, [USER_ROLE.ADMIN]);
    const payload = request.params;
    if (payload && payload.secretKey !== generalConfig.emailSecretKey) {
      const { code } = Errors.INVALID_PARAMS;
      throw new Parse.Error(code, 'Wrong secret key');
    }
    return PostService.migrateStylistStatusForOldPost();
  },
});
