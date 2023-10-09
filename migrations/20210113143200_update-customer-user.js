const Helper = require('../src/utils/helper');

const cleanupUserTable = async (db, session) => {
  const userPointers = [];
  await db
    .collection('_User')
    .find({ _p_customer: { $exists: 0 }, role: 'CUSTOMER' })
    .project({ _id: 1 })
    .forEach((user) => {
      userPointers.push(`User$${user._id}`);
    });

  if (userPointers.length > 0) {
    await db.collection('Image').deleteMany({ _p_createdBy: { $in: userPointers } }, { session });
    await db.collection('_Session').deleteMany({ _p_user: { $in: userPointers } }, { session });
    await db.collection('_User').deleteMany({ _p_customer: { $exists: 0 }, role: 'CUSTOMER' }, { session });
  }
};

module.exports = {
  up: async (db, session) => {
    const updateArray = [];
    const promises = await db
      .collection('Customer')
      .find()
      .project({ _id: 1, email: 1 })
      .map(async (customer) => {
        const user = await db.collection('_User').findOne({ email: `${customer.email}` }, { projection: { _id: 1 } });
        if (user) {
          user._p_customer = `Customer$${customer._id}`;
          updateArray.push({
            updateOne: {
              filter: { _id: user._id },
              update: { $set: user },
              upsert: false,
            },
          });
        }
      })
      .toArray();

    // customer -> Promise (fetch data + add into updateArray)
    await Promise.all(promises);
    if (updateArray.length > 0) {
      console.log(
        '== Add _p_customer for user ==',
        Helper.getMongoWriteOpResult(await db.collection('_User').bulkWrite(updateArray, { session })),
      );
    }

    await cleanupUserTable(db, session);
  },
};
