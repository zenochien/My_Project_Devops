module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Recommendation',
      },
      {
        $set: {
          _id: 'Recommendation',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          receiverId: 'string',
          receiver: 'object',
          salonReceiver: 'object',
          contributorId: 'string',
          contributor: 'object',
          salonContributor: 'object',
          title: 'string',
          content: 'string',
        },
      },
      { upsert: true, session },
    );

    await db
      .collection('Recommendation')
      .createIndex(
        { contributorId: 1, receiverId: 1 },
        { unique: true, name: 'recommendation_contributorId_receiverId' },
      );
  },
};
