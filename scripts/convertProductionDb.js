const { MongoClient } = require('mongodb');
const { YOPMAIL_SUFFIX, USER_ROLE, DEFAULT_HASH_PASS } = require('../src/const/Constants');
const faker = require('faker/locale/en');
const _omitBy = require('lodash/omitBy');
const _isNil = require('lodash/isNil');

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

const makeClearTableFn = (name) => async (db, session) => {
  console.log('== Clear table ' + name + ' ==');
  await db.collection(name).deleteMany({}, session);
};

async function convertUser(db, session) {
  const updateUserOperatorArray = [];
  await db
    .collection('_User')
    .find({ role: USER_ROLE.SALON_OPERATOR })
    .project({ _id: 1, username: 1 })
    .forEach((user) => {
      updateUserOperatorArray.push({
        updateOne: {
          filter: { _id: user._id },
          update: {
            $set: {
              salonName: user.username,
              email: `${user.username}${YOPMAIL_SUFFIX}`,
              _hashed_password: DEFAULT_HASH_PASS,
            },
          },
          upsert: false,
        },
      });
    });
  if (updateUserOperatorArray.length > 0) {
    console.log(
      '== Convert for User Operator ==',
      getMongoWriteOpResult(await db.collection('_User').bulkWrite(updateUserOperatorArray, { session })),
    );
  }

  const updateUserCustomerArray = [];
  await db
    .collection('_User')
    .find({ role: USER_ROLE.CUSTOMER })
    .project({ _id: 1, _p_customer: 1 })
    .forEach((user) => {
      updateUserCustomerArray.push({
        updateOne: {
          filter: { _id: user._id },
          update: {
            $set: {
              username: `${user._p_customer.replace('Customer$', '')}${YOPMAIL_SUFFIX}`,
              email: `${user._p_customer.replace('Customer$', '')}${YOPMAIL_SUFFIX}`,
              _hashed_password: DEFAULT_HASH_PASS,
            },
          },
          upsert: false,
        },
      });
    });
  if (updateUserCustomerArray.length > 0) {
    console.log(
      '== Convert for User Customer ==',
      getMongoWriteOpResult(await db.collection('_User').bulkWrite(updateUserCustomerArray, { session })),
    );
  }

  const updateUserAdminArray = [];
  await db
    .collection('_User')
    .find({ role: USER_ROLE.ADMIN })
    .project({ _id: 1 })
    .forEach((user) => {
      updateUserAdminArray.push({
        updateOne: {
          filter: { _id: user._id },
          update: {
            $set: {
              username: `${user._id}${YOPMAIL_SUFFIX}`,
              email: `${user._id}${YOPMAIL_SUFFIX}`,
              _hashed_password: DEFAULT_HASH_PASS,
            },
          },
          upsert: false,
        },
      });
    });
  if (updateUserAdminArray.length > 0) {
    console.log(
      '== Convert for User Admin ==',
      getMongoWriteOpResult(await db.collection('_User').bulkWrite(updateUserAdminArray, { session })),
    );
  }
}

async function convertBooking(db, session) {
  await db.collection('Booking').updateMany(
    {},
    {
      $unset: {
        cardInfo: 1,
        transactionNo: 1,
      },
    },
    session,
  );
}

async function convertCustomer(db, session) {
  await db.collection('Customer').updateMany(
    {},
    {
      $set: {
        profileImages: [
          {
            objectId: 'hssaminD2I',
            file: 'https://hairlie-dev.s3.amazonaws.com/56392a13b1cad5f5e6e08fda67bc42ea_hairlie_image.jpg',
            thumbSmall: 'https://hairlie-dev.s3.amazonaws.com/fb30ae23d9746fa4401b7dc6d60acfa4_stylist_250x250.jpg',
            thumbMedium: 'https://hairlie-dev.s3.amazonaws.com/1bf818315f57a5a49d66a4220227f280_stylist_600x600.jpg',
            thumbLarge: 'https://hairlie-dev.s3.amazonaws.com/5fab18beec3c25c2b303058cd899997a_stylist_800x800.jpg',
          },
        ],
        profileImageIds: ['hssaminD2I'],
      },
    },
    session,
  );

  const updateCustomerArray = [];
  await db
    .collection('Customer')
    .find({})
    .project({ _id: 1, _p_customer: 1 })
    .forEach((user) => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      updateCustomerArray.push({
        updateOne: {
          filter: { _id: user._id },
          update: {
            $set: {
              email: `${user._id}${YOPMAIL_SUFFIX}`,
              firstName: firstName,
              lastName: lastName,
              fullName: firstName + ' ' + lastName,
              nickName: faker.name.firstName(),
              phoneticLastName: 'ムラカミ',
              phoneticFirstName: 'ハルキ',
              phoneticFullName: 'ハルキ ムラカミ',
            },
          },
          upsert: false,
        },
      });
    });
  if (updateCustomerArray.length > 0) {
    console.log(
      '== Convert for Customer ==',
      getMongoWriteOpResult(await db.collection('Customer').bulkWrite(updateCustomerArray, { session })),
    );
  }
}

async function convertImage(db, session) {
  await db.collection('Image').updateMany(
    {},
    {
      $set: {
        thumbLarge: '5fab18beec3c25c2b303058cd899997a_stylist_800x800.jpg',
        thumbMedium: '1bf818315f57a5a49d66a4220227f280_stylist_600x600.jpg',
        thumbSmall: 'fb30ae23d9746fa4401b7dc6d60acfa4_stylist_250x250.jpg',
        file: '56392a13b1cad5f5e6e08fda67bc42ea_hairlie_image.jpg',
      },
    },
    session,
  );
}

async function convertPayment(db, session) {
  await db.collection('Payment').updateMany(
    {},
    {
      $unset: {
        response: 1,
        error: 1,
        request: 1,
        transactionNo: 1,
      },
    },
    session,
  );
}

async function convertPost(db, session) {
  await db.collection('Post').updateMany(
    {},
    {
      $set: {
        images: [
          {
            objectId: 'hssaminD2I',
            file: 'https://hairlie-dev.s3.amazonaws.com/56392a13b1cad5f5e6e08fda67bc42ea_hairlie_image.jpg',
            thumbSmall: 'https://hairlie-dev.s3.amazonaws.com/fb30ae23d9746fa4401b7dc6d60acfa4_stylist_250x250.jpg',
            thumbMedium: 'https://hairlie-dev.s3.amazonaws.com/1bf818315f57a5a49d66a4220227f280_stylist_600x600.jpg',
            thumbLarge: 'https://hairlie-dev.s3.amazonaws.com/5fab18beec3c25c2b303058cd899997a_stylist_800x800.jpg',
          },
        ],
        imageIds: ['hssaminD2I'],
      },
    },
    session,
  );
}

async function convertProduct(db, session) {
  await db.collection('Product').updateMany(
    {},
    {
      $set: {
        images: [
          {
            objectId: 'hssaminD2I',
            file: 'https://hairlie-dev.s3.amazonaws.com/56392a13b1cad5f5e6e08fda67bc42ea_hairlie_image.jpg',
            thumbSmall: 'https://hairlie-dev.s3.amazonaws.com/fb30ae23d9746fa4401b7dc6d60acfa4_stylist_250x250.jpg',
            thumbMedium: 'https://hairlie-dev.s3.amazonaws.com/1bf818315f57a5a49d66a4220227f280_stylist_600x600.jpg',
            thumbLarge: 'https://hairlie-dev.s3.amazonaws.com/5fab18beec3c25c2b303058cd899997a_stylist_800x800.jpg',
          },
        ],
        imageIds: ['hssaminD2I'],
        url: 'https://www.google.com/search?q=s%E1%BA%A3n+ph%E1%BA%A9m+l%C3%A0m+t%C3%B3c+nh%E1%BA%ADt+b%E1%BA%A3n',
      },
    },
    session,
  );
}

async function convertSalon(db, session) {
  await db.collection('Salon').updateMany(
    {},
    {
      $set: {
        images: [
          {
            objectId: 'hssaminD2I',
            file: 'https://hairlie-dev.s3.amazonaws.com/56392a13b1cad5f5e6e08fda67bc42ea_hairlie_image.jpg',
            thumbSmall: 'https://hairlie-dev.s3.amazonaws.com/fb30ae23d9746fa4401b7dc6d60acfa4_stylist_250x250.jpg',
            thumbMedium: 'https://hairlie-dev.s3.amazonaws.com/1bf818315f57a5a49d66a4220227f280_stylist_600x600.jpg',
            thumbLarge: 'https://hairlie-dev.s3.amazonaws.com/5fab18beec3c25c2b303058cd899997a_stylist_800x800.jpg',
          },
        ],
        imageIds: ['hssaminD2I'],
        url: 'https://www.google.com/search?q=s%E1%BA%A3n+ph%E1%BA%A9m+l%C3%A0m+t%C3%B3c+nh%E1%BA%ADt+b%E1%BA%A3n',

        salonDirection: 'salonDirection',
        salonOtherNote: 'salonOtherNote',
        salonNameKatakana: 'ハルキ ムラカミ',
        salonCatchphrase: 'salonCatchphrase',
        salonHolidays: {
          texts: 'Open daily',
          holidays: [],
          weekdays: [],
        },
        salonAddress1: 'salonAddress1',
        salonAddress2: 'salonAddress2',
        salonAddress3: 'salonAddress3',
        salonAddress4: 'salonAddress4',
        postalCode: '123-4567',
        slug: 'slug',
        salonSNS: {
          facebook: '',
          instagram: '',
          twitter: '',
          tiktok: '',
          youtube: '',
        },
      },
    },
    session,
  );

  const updateSalonArray = [];
  await db
    .collection('Salon')
    .find({})
    .project({ _id: 1 })
    .forEach((salon) => {
      updateSalonArray.push({
        updateOne: {
          filter: { _id: salon._id },
          update: {
            $set: {
              salonEmail: `${salon._id}${YOPMAIL_SUFFIX}`,
              salonName: faker.company.companyName(),
              phone: faker.phone.phoneNumber('+81#########'),
            },
          },
          upsert: false,
        },
      });
    });
  if (updateSalonArray.length > 0) {
    console.log(
      '== Convert for Salon ==',
      getMongoWriteOpResult(await db.collection('Salon').bulkWrite(updateSalonArray, { session })),
    );
  }
}

async function convertStylist(db, session) {
  await db.collection('Stylist').updateMany(
    {},
    {
      $set: {
        profileImages: [
          {
            objectId: 'hssaminD2I',
            file: 'https://hairlie-dev.s3.amazonaws.com/56392a13b1cad5f5e6e08fda67bc42ea_hairlie_image.jpg',
            thumbSmall: 'https://hairlie-dev.s3.amazonaws.com/fb30ae23d9746fa4401b7dc6d60acfa4_stylist_250x250.jpg',
            thumbMedium: 'https://hairlie-dev.s3.amazonaws.com/1bf818315f57a5a49d66a4220227f280_stylist_600x600.jpg',
            thumbLarge: 'https://hairlie-dev.s3.amazonaws.com/5fab18beec3c25c2b303058cd899997a_stylist_800x800.jpg',
          },
        ],
        profileImageIds: ['hssaminD2I'],

        profileText: 'profileText',
        slug: 'slug',
        stylistSNS: {},
      },
    },
    session,
  );

  const operations = [];
  await db
    .collection('Stylist')
    .find({})
    .project({ _id: 1 })
    .forEach((salon) => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      operations.push({
        updateOne: {
          filter: { _id: salon._id },
          update: {
            $set: {
              salonEmail: `${salon._id}${YOPMAIL_SUFFIX}`,
              firstName: firstName,
              lastName: lastName,
              fullName: firstName + lastName,
              nickName: faker.name.firstName(),
            },
          },
          upsert: false,
        },
      });
    });
  if (operations.length > 0) {
    console.log(
      '== Convert for Stylist ==',
      getMongoWriteOpResult(await db.collection('Stylist').bulkWrite(operations, { session })),
    );
  }
}

async function convertWithSession(client, db, convertFunction) {
  const session = client.startSession();
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
  };

  try {
    await session.withTransaction(async () => {
      await convertFunction(db, session);
    }, transactionOptions);
  } finally {
    await session.endSession();
  }
}

async function convert(client) {
  const db = client.db();

  const functionArr = [
    convertUser,
    convertCustomer,
    convertSalon,
    convertStylist,
    convertPost,
    convertProduct,
    convertBooking,
    convertPayment,
    convertImage,
    makeClearTableFn('_Idempotency'),
    makeClearTableFn('_Role'),
    makeClearTableFn('_SCHEMA'),
    makeClearTableFn('_Session'),
    makeClearTableFn('fs.chunks'),
    makeClearTableFn('fs.files'),
    makeClearTableFn('migrations'),
    makeClearTableFn('ContactUs'),
    makeClearTableFn('VeriTransInformation'),
    makeClearTableFn('Payment'),
  ];
  for (const fn of functionArr) {
    await convertWithSession(client, db, fn);
  }
}

async function run() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    await convert(client);
    console.log('Convert Production Db Completed');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.error);
