const Helper = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    console.log(
      `Update Parse Config: add createStylistUrl`,

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

                createStylistUrl: false,
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

                createStylistUrl:
                  'https://docs.google.com/forms/d/e/1FAIpQLSeAmI4zFCmBw0NpN9CLoRSn7ULEwh5Ly5nukfD1uX_Tqf1xZw/viewform',
              },
            },
          },
          { upsert: 1, session },
        ),
      ),
    );
  },
};
