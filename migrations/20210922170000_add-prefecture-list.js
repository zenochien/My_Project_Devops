const Helper = require('../src/utils/helper');

const PREFECTURE = [
  {
    nameEn: 'Hokkaido',
    nameJp: '北海道',
    value: 'PREFECTURE1',
  },
  {
    nameEn: 'Aomori Prefecture',
    nameJp: '青森県',
    value: 'PREFECTURE2',
  },
  {
    nameEn: 'Iwate Prefecture',
    nameJp: '岩手県',
    value: 'PREFECTURE3',
  },
  {
    nameEn: 'Miyagi Prefecture',
    nameJp: '宮城県',
    value: 'PREFECTURE4',
  },
  {
    nameEn: 'Akita Prefecture',
    nameJp: '秋田県',
    value: 'PREFECTURE5',
  },
  {
    nameEn: 'Yamagata Prefecture',
    nameJp: '山形県',
    value: 'PREFECTURE6',
  },
  {
    nameEn: 'Fukushima Prefecture',
    nameJp: '福島県',
    value: 'PREFECTURE7',
  },
  {
    nameEn: 'Ibaraki Prefecture',
    nameJp: '茨城県',
    value: 'PREFECTURE8',
  },
  {
    nameEn: 'Tochigi Prefecture',
    nameJp: '栃木県',
    value: 'PREFECTURE9',
  },
  {
    nameEn: 'Gunma Prefecture',
    nameJp: '群馬県',
    value: 'PREFECTURE10',
  },

  {
    nameEn: 'Saitama Prefecture',
    nameJp: '埼玉県',
    value: 'PREFECTURE12',
  },
  {
    nameEn: 'Chiba Prefecture',
    nameJp: '千葉県',
    value: 'PREFECTURE13',
  },
  {
    nameEn: 'Tokyo',
    nameJp: '東京都',
    value: 'PREFECTURE14',
  },
  {
    nameEn: 'Kanagawa Prefecture',
    nameJp: '神奈川県',
    value: 'PREFECTURE15',
  },
  {
    nameEn: 'Niigata Prefecture',
    nameJp: '新潟県',
    value: 'PREFECTURE16',
  },
  {
    nameEn: 'Toyama Prefecture',
    nameJp: '富山県',
    value: 'PREFECTURE17',
  },
  {
    nameEn: 'Ishikawa Prefecture',
    nameJp: '石川県',
    value: 'PREFECTURE18',
  },
  {
    nameEn: 'Fukui Prefecture',
    nameJp: '福井県',
    value: 'PREFECTURE19',
  },
  {
    nameEn: 'Yamanashi Prefecture',
    nameJp: '山梨県',
    value: 'PREFECTURE20',
  },
  {
    nameEn: 'Nagano Prefecture',
    nameJp: '長野県',
    value: 'PREFECTURE21',
  },
  {
    nameEn: 'Gifu Prefecture',
    nameJp: '岐阜県',
    value: 'PREFECTURE22',
  },
  {
    nameEn: 'Shizuoka Prefecture',
    nameJp: '静岡県',
    value: 'PREFECTURE23',
  },
  {
    nameEn: 'Aichi Prefecture',
    nameJp: '愛知県',
    value: 'PREFECTURE24',
  },
  {
    nameEn: 'Mie Prefecture',
    nameJp: '三重県',
    value: 'PREFECTURE25',
  },
  {
    nameEn: 'Shiga Prefecture',
    nameJp: '滋賀県',
    value: 'PREFECTURE26',
  },
  {
    nameEn: 'Kyoto Prefecture',
    nameJp: '京都府',
    value: 'PREFECTURE27',
  },
  {
    nameEn: 'Osaka Prefecture',
    nameJp: '大阪府',
    value: 'PREFECTURE28',
  },
  {
    nameEn: 'Hyōgo Prefecture',
    nameJp: '兵庫県',
    value: 'PREFECTURE29',
  },
  {
    nameEn: 'Nara Prefecture',
    nameJp: '奈良県',
    value: 'PREFECTURE30',
  },
  {
    nameEn: 'Wakayama Prefecture',
    nameJp: '和歌山県',
    value: 'PREFECTURE31',
  },
  {
    nameEn: 'Tottori Prefecture',
    nameJp: '鳥取県',
    value: 'PREFECTURE32',
  },
  {
    nameEn: 'Shimane Prefecture',
    nameJp: '島根県',
    value: 'PREFECTURE33',
  },
  {
    nameEn: 'Okayama Prefecture',
    nameJp: '岡山県',
    value: 'PREFECTURE34',
  },
  {
    nameEn: 'Hiroshima Prefecture',
    nameJp: '広島県',
    value: 'PREFECTURE35',
  },
  {
    nameEn: 'Yamaguchi Prefecture',
    nameJp: '山口県',
    value: 'PREFECTURE36',
  },
  {
    nameEn: 'Tokushima Prefecture',
    nameJp: '徳島県',
    value: 'PREFECTURE37',
  },
  {
    nameEn: 'Kagawa Prefecture',
    nameJp: '香川県',
    value: 'PREFECTURE38',
  },
  {
    nameEn: 'Ehime Prefecture',
    nameJp: '愛媛県',
    value: 'PREFECTURE39',
  },
  {
    nameEn: 'Kōchi Prefecture',
    nameJp: '高知県',
    value: 'PREFECTURE40',
  },
  {
    nameEn: 'Fukuoka Prefecture',
    nameJp: '福岡県',
    value: 'PREFECTURE41',
  },
  {
    nameEn: 'Saga Prefecture',
    nameJp: '佐賀県',
    value: 'PREFECTURE42',
  },
  {
    nameEn: 'Nagasaki Prefecture',
    nameJp: '長崎県',
    value: 'PREFECTURE43',
  },
  {
    nameEn: 'Kumamoto Prefecture',
    nameJp: '熊本県',
    value: 'PREFECTURE44',
  },
  {
    nameEn: 'Ōita Prefecture',
    nameJp: '大分県',
    value: 'PREFECTURE45',
  },
  {
    nameEn: 'Miyazaki Prefecture',
    nameJp: '宮崎県',
    value: 'PREFECTURE46',
  },
  {
    nameEn: 'Kagoshima Prefecture',
    nameJp: '鹿児島県',
    value: 'PREFECTURE47',
  },
  {
    nameEn: 'Okinawa Prefecture',
    nameJp: '沖縄県',
    value: 'PREFECTURE48',
  },
];

module.exports = {
  up: async (db, session) => {
    console.log(
      '== Add SCHEMA prefecture list ==\n',
      Helper.getMongoWriteOpResult(
        await db.collection('_SCHEMA').updateOne(
          {
            _id: 'Prefecture',
          },
          {
            $set: {
              _id: 'Prefecture',
              nameEn: 'string',
              nameJp: 'string',
              value: 'string',
              updatedAt: 'date',
              createdAt: 'date',
            },
          },
          { upsert: true, session },
        ),
      ),
    );

    const now = Date();
    const insertPrefectureArray = [];
    PREFECTURE.forEach((pref) => {
      insertPrefectureArray.push({
        insertOne: {
          document: {
            _id: Helper.randomString(),
            nameEn: pref.nameEn,
            nameJp: pref.nameJp,
            value: pref.value,
            _created_at: now,
            _updated_at: now,
          },
        },
      });
    });

    if (insertPrefectureArray.length > 0) {
      console.log(
        '== Add prefecture ==\n',
        Helper.getMongoWriteOpResult(await db.collection('Prefecture').bulkWrite(insertPrefectureArray, { session })),
      );
    }
  },
};
