// Fisrt migration
// this migration may be use on exists environemt that already contain a set of collections
// so we cannot use transaction in this migration (leave session variable unused)
// for other migrations, use session when possible to keep migration run correctly when error occurr

module.exports = {
  up: async (db, session) => {
    // Not part of migration transaction, don't set session option (it will cause error: Cannot run '<operation>' in a multi-document transaction.)
    // (operations that cause creation of collection/index in transaction are not supported by MongoDB)
    await (async function () {
      const collectionNames = [
        'Category',
        'Image',
        'JobLog',
        'Menu',
        'Post',
        'Product',
        'Salon',
        'Stylist',

        // Parse Server collections
        '_SCHEMA',
      ];

      const existingCollections = await db.listCollections().toArray();
      const collections = collectionNames.filter((name) => !existingCollections.find((c) => c.name === name));

      // for each collection that not exist
      for (const c of collections) {
        await db.createCollection(c);
      }

      // idempotent operations (don't need exists checking)
      await db.collection('_User').createIndex(
        {
          username: 1,
        },
        {
          unique: true,
          name: 'username_1',
          background: true,
          sparse: true,
        },
      );

      await db.collection('_User').createIndex(
        {
          username: 1,
        },
        {
          name: 'case_insensitive_username',
          background: true,
          sparse: true,
          collation: {
            locale: 'en_US',
            caseLevel: false,
            caseFirst: 'off',
            strength: 2,
            numericOrdering: false,
            alternate: 'non-ignorable',
            maxVariable: 'punct',
            normalization: false,
            backwards: false,
          },
        },
      );

      await db.collection('_User').createIndex(
        {
          email: 1,
        },
        {
          unique: true,
          name: 'email_1',
          background: true,
          sparse: true,
        },
      );

      await db.collection('_User').createIndex(
        {
          email: 1,
        },
        {
          name: 'case_insensitive_email',
          background: true,
          sparse: true,
          collation: {
            locale: 'en_US',
            caseLevel: false,
            caseFirst: 'off',
            strength: 2,
            numericOrdering: false,
            alternate: 'non-ignorable',
            maxVariable: 'punct',
            normalization: false,
            backwards: false,
          },
        },
      );
    })();

    //
    // Part of migration transaction
    // note: can do implicitly or explicitly creation (MongoDB 4.4+)

    // for this migration this will be leave blank
  },
};
