const postModel = require('../cloud/models/Post');
const { getInstance } = require('../utils/Rabbitmq');
const { EVENTS } = require('../const/Constants');
const PostService = require('../cloud/services/Post');

module.exports = {
  changePostInfo: async ({ postIds, dirtyKeys }) => {
    const rabbitmqManager = getInstance();
    try {
      const posts = await postModel.getPostInfoByIds({ postIds });
      for (let i = 0; i < postIds.length; i++) {
        const post = posts[i];
        await rabbitmqManager.publish({
          data: {
            dirtyKeys,
            objectData: post.toJSON(),
          },
          eventName: EVENTS.EXTERNAL_CHANGE_POST_INFO,
        });
      }
    } catch (error) {
      console.log('[Listener][Post][changePostInfo]:error:', error, { postIds, dirtyKeys });
    }
  },
  createPost: async (postInfo) => {
    const rabbitmqManager = getInstance();
    try {
      await rabbitmqManager.publish({
        data: {
          objectData: postInfo,
        },
        eventName: EVENTS.EXTERNAL_CREATE_POST,
      });
    } catch (error) {
      console.log('[Listener][Post][createPost]:error:', error, { postInfo });
    }
  },
  stylistChangeProfile: async ({ dirtyKeys, objectData }) => {
    console.log('stylistChangeProfile Post');
    const requireFields = ['status', 'userStatus'];
    await PostService.stylistChangeProfile({ dirtyKeys, objectData, requireFields });
  },
};
