const { getNextCycle } = require('../src/utils/helper');

module.exports = {
  up: async (db, session) => {
    await db.collection('_SCHEMA').updateOne(
      {
        _id: 'Stylist',
      },
      {
        $set: {
          commissonRate: 'array',
        },
      },
      { session },
    );
  },
};

// module.exports = {
//   up: async (db, session) => {
//     const { startCycle } = getNextCycle();
//     await db.collection('Stylist').updateMany(
//       {
//         $or: [
//           {
//             commissonRate: [],
//           },
//           {
//             commissonRate: {
//               $exists: false,
//             },
//           },
//         ],
//       },
//       {
//         $set: {
//           commissonRate: [
//             {
//               percent: 20,
//               startCycle: dateInput.toISOString(),
//             },
//           ],
//         },
//       },
//       { session },
//     );
//   },
// };
