const CategoryTrigger = {};
module.exports = CategoryTrigger;

const _get = require('lodash/get');
const _merge = require('lodash/merge');
const mongoDB = require('../../db/mongoDB');

Object.assign(CategoryTrigger, {
  beforeSaveCategory: {
    class: 'Category',
    handler: async (request) => {
      const categoryObject = request.object;
      if (categoryObject.dirty('name')) {
        _merge(request.context, {
          dirtyName: true,
        });
      }
    },
  },

  afterSaveCategory: {
    class: 'Category',
    handler: async (request) => {
      const categoryObject = request.object;
      const dirtyName = _get(request.context, 'dirtyName');

      if (dirtyName) {
        const db = await mongoDB.getMongoDB();
        await db.collection('Menu').updateMany(
          {
            _p_category: `Category$${categoryObject.id}`,
          },
          {
            $set: {
              categoryName: categoryObject.get('name'),
            },
          },
        );
      }
    },
  },
});
