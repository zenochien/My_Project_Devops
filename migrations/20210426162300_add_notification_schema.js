module.exports = {
  up: async (db, session) => {
    db.collection('_SCHEMA').updateOne(
      { _id: 'Notification' },
      {
        $set: {
          objectId: 'string',
          data: 'object',
          sender: '*_User',
          senderCustomer: '*Customer',
          receiverId: 'string', // salonId
          booking: '*Booking',
          updatedAt: 'date',
          createdAt: 'date',
          isRead: 'boolean',
          isDeleted: 'boolean',
          isNew: 'boolean',
        },
      },
      { upsert: true, session },
    );
  },
};
