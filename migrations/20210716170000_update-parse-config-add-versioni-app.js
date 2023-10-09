const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    console.log(
      `Update Parse Config: add (stylist/customer)(Android/IOS)Version + privacyUrl + termUrls`,

      Helper.getMongoWriteOpResult(
        await db.collection('_GlobalConfig').updateOne(
          { _id: 1 },

          {
            $set: {
              masterKeyOnly: {
                privacyUrl: false,
                termsCustomerUrl: false,
                termsStylistUrl: false,
                termsSalonUrl: false,

                customerAndroidVersion: false,
                customerIOSVersion: false,
                stylistAndroidVersion: false,
                stylistIOSVersion: false,
              },
              params: {
                privacyUrl: 'https://hairlie.jp/policy',
                termsCustomerUrl: 'https://hairlie.jp/term-of-service/customer',
                termsStylistUrl: 'https://hairlie.jp/term-of-service/stylist',
                termsSalonUrl: 'https://hairlie.jp/term-of-service/salon',

                customerAndroidVersion: '1.0.0',
                customerIOSVersion: '1.0.0',
                stylistAndroidVersion: '1.0.0',
                stylistIOSVersion: '1.0.0',
              },
            },
          },
          { upsert: 1, session },
        ),
      ),
    );
  },
};
