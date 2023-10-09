// nodejs
// node -r dotenv/config ./scripts/deleteCustomer.js dotenv_config_path=.env [customerId]
const _omitBy = require('lodash/omitBy');
const _isNil = require('lodash/isNil');
const { MongoClient } = require('mongodb');
const { Error } = require('parse');

const { STATUS } = require('../src/const/Constants');

const uri = process.env.DB_URI || 'mongodb://localhost:27017/hairDev';

const getMongoWriteOpResult = (result = {}) => {
  const {
    insertedCount,
    matchedCount,
    modifiedCount,
    deletedCount,
    upsertedCount,
    nInserted,
    nMatched,
    nModified,
    nRemoved,
    nUpserted,
  } = result;
  return _omitBy(
    {
      insertedCount,
      matchedCount,
      modifiedCount,
      deletedCount,
      upsertedCount,
      nInserted,
      nMatched,
      nModified,
      nRemoved,
      nUpserted,
    },
    _isNil,
  );
};

async function deleteCustomer(client) {
  const db = client.db();
  const session = client.startSession();
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
  };
  try {
    await session.withTransaction(async () => {
      const user = await db
        .collection('_User')
        .findOne({ _p_customer: `Customer$${customerId}` }, { projection: { _id: 1 }, session });
      if (!user) {
        console.log('User not found for customerId', customerId);
        return;
      }
      console.log('User Id:', user._id);

      const bookings = await db
        .collection('Booking')
        .find({ _p_customer: `Customer$${customerId}` }, { session })
        .toArray();
      if (!isForceDeleteBooking && bookings.length > 0) {
        console.warn(
          "Warning: This customer have at least one booking. Add '-f' as third argument to force delete booking and continue.",
        );
        return;
      }

      console.log(
        '== Delete documents in Session ==',
        getMongoWriteOpResult(
          await db.collection('_Session').deleteMany({ _p_user: `_User$${user._id}` }, { session }),
        ),
      );
      console.log(
        '== Delete documents in Notification ==',
        getMongoWriteOpResult(
          await db.collection('Notification').deleteMany({ _p_senderCustomer: `Customer$${customerId}` }, { session }),
        ),
      );
      console.log(
        '== Delete documents in Booking ==',
        getMongoWriteOpResult(
          await db.collection('Booking').deleteMany({ _p_customer: `Customer$${customerId}` }, { session }),
        ),
      );
      console.log(
        "== Update documents's status to DELETED in Image ==",
        getMongoWriteOpResult(
          await db
            .collection('Image')
            .updateMany({ _p_createdBy: `_User$${user._id}` }, { $set: { status: STATUS.DELETED } }, { session }),
        ),
      );
      console.log(
        '== Delete document in Customer ==',
        getMongoWriteOpResult(await db.collection('Customer').deleteOne({ _id: customerId }, { session })),
      );
      console.log(
        '== Delete document in _User ==',
        getMongoWriteOpResult(await db.collection('_User').deleteOne({ _id: user._id }, { session })),
      );
      const veritransInfo = await db
        .collection('VeriTransInformation')
        .findOne({ _p_client: `Customer$${customerId}` }, { projection: { veriTransAccountId: 1 }, session });
      if (veritransInfo) {
        console.log(
          `Check & delete list card in Veritrans by Postman, veriTransAccountId=${veritransInfo.veriTransAccountId}`,
        );
        console.log(
          '== Delete document in VeriTransInformation ==',
          getMongoWriteOpResult(
            await db.collection('VeriTransInformation').deleteOne({ _p_client: `Customer$${customerId}` }, { session }),
          ),
        );
      } else {
        console.log("This user doesn't have veriTransAccount");
      }
    }, transactionOptions);
  } finally {
    await session.endSession();
  }
}

const myArgs = process.argv.slice(2);
if (myArgs.length < 2) {
  console.log('Illegal number of parameters');
  console.log(
    'node -r dotenv/config ./scripts/deleteCustomer.js dotenv_config_path=[DOTENV_CONFIG_PATH] [CUSTOMER_ID]',
  );
  console.log('Example: node -r dotenv/config ./scripts/deleteCustomer.js dotenv_config_path=.env abc12345');
  return;
}

const customerId = myArgs[1];
const isForceDeleteBooking = myArgs[2] === '-f';

async function run() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    await deleteCustomer(client);
    console.log('Script completed');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.error);
