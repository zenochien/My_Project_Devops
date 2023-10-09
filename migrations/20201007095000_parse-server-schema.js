module.exports = {
  up: async (db, session) => {
    // not part of migration transaction
    await async function () {
      //
    };

    // part of migration transaction -> use session
    // Update _SCHEMA to view new collection/field on Parse Dashboard (OPTIONAL)
    await db.collection('_SCHEMA').updateOne(
      {
        _id: '_User',
      },
      {
        $set: {
          _id: '_User',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          username: 'string',
          email: 'string',
          emailVerified: 'boolean',
          authData: 'object',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
              username_1: {
                username: 1,
              },
              case_insensitive_username: {
                username: 1,
              },
              email_1: {
                email: 1,
              },
              case_insensitive_email: {
                email: 1,
              },
            },
          },
          role: 'string',
          hasSetPassFirstTime: 'boolean',
          status: 'string',
          salonName: 'string',
          salon: '*Salon',
          stylist: '*Stylist',
          isInvalidVerificationLink: 'boolean',
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      { _id: 'Category' },
      {
        $set: {
          _id: 'Category',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          name: 'string',
          status: 'string',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      { _id: 'Image' },
      {
        $set: {
          _id: 'Image',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          type: 'string',
          file: 'file',
          createdBy: '*_User',
          status: 'string',
          thumbLarge: 'file',
          thumbSmall: 'file',
          thumbMedium: 'file',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      { _id: 'JobLog' },
      {
        $set: {
          _id: 'JobLog',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          status: 'string',
          duration: 'number',
          params: 'object',
          result: 'object',
          name: 'string',
          type: 'string',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      { _id: 'Menu' },
      {
        $set: {
          _id: 'Menu',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          name: 'string',
          amount: 'number',
          salon: '*Salon',
          category: '*Category',
          description: 'string',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
          assignedStylistIds: 'array',
          status: 'string',
          categoryName: 'string',
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      { _id: 'Post' },
      {
        $set: {
          _id: 'Post',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          stylist: '*Stylist',
          images: 'array',
          imageIds: 'array',
          description: 'string',
          tags: 'array',
          menus: 'array',
          products: 'array',
          faceShapes: 'array',
          totalPrice: 'number',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
          salon: '*Salon',
          status: 'string',
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      { _id: 'Product' },
      {
        $set: {
          _id: 'Product',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          name: 'string',
          description: 'string',
          salon: '*Salon',
          price: 'number',
          status: 'string',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
          images: 'array',
          imageIds: 'array',
          type: 'string',
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      { _id: 'Salon' },
      {
        $set: {
          _id: 'Salon',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
          salonAddress1: 'string',
          salonName: 'string',
          salonCatchphrase: 'string',
          salonHolidays: 'object',
          salonSNS: 'object',
          salonImage: '*Image',
          phone: 'string',
          salonAddress2: 'string',
          salonDirection: 'string',
          salonNote: 'string',
          salonOpeningHour: 'string',
          salonSeatsNumber: 'number',
          salonOtherNote: 'string',
          salonHour: 'string',
          salonAddress3: 'string',
          salonStaffsNumber: 'number',
          salonEmail: 'string',
          prefix: 'string',
          startTime: 'string',
          endTime: 'string',
          facebook: 'string',
          twitter: 'string',
          youtube: 'string',
          tiktok: 'string',
          instagram: 'string',
          salonPayments: 'string',
          salonNameKatakana: 'string',
        },
      },
      { upsert: true, session },
    );

    await db.collection('_SCHEMA').updateOne(
      { _id: 'Stylist' },
      {
        $set: {
          _id: 'Stylist',
          objectId: 'string',
          updatedAt: 'date',
          createdAt: 'date',
          firstName: 'string',
          lastName: 'string',
          nickName: 'string',
          profileImages: 'array',
          profileText: 'string',
          stylistSNS: 'object',
          salon: '*Salon',
          profileImageIds: 'array',
          _metadata: {
            indexes: {
              _id_: {
                _id: 1,
              },
            },
          },
          fullName: 'string',
          gender: 'string',
        },
      },
      { upsert: true, session },
    );
  },
};
