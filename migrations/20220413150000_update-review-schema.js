// run query below after migration
// db.Review.updateMany({status: {$exists: false}}, {$set: { status: 'ACTIVE'}})
// db.Review.updateMany({},{$unset: {_p_customer:"",_p_stylist:""}})

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Review',
      },
      {
        $set: {
          _id: 'Review',
          stylist: 'object',
          customer: 'object',
          salon: 'object',
          status: 'string',
        },
      },
      { upsert: true, session },
    );
  },
};
