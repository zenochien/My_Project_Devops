const NotificationRepo = {};
module.exports = NotificationRepo;

class NotificationRepository {
  constructor(logger, client) {
    this.__logger = logger;
    this.__client = client;
  }

  async insert(context, id, receiverId, createdAt, title, inAppTitle, body, data) {
    await this.__client
      .db()
      .collection('Notification')
      .insertOne({
        _id: id,
        title,
        inAppTitle,
        body,
        data,

        _p_receiver: `_User$${receiverId}`,
        _p_booking: `Booking$${data.bookingId}`,

        _created_at: createdAt,
        isDeleted: false,
        isRead: false,
        isNew: true,
      });

    return Promise.resolve({ result: true });
  }

  async countUnread(context, receiverId) {
    const count = await this.__client
      .db()
      .collection('Notification')
      .find({
        _p_receiver: `_User$${receiverId}`,
        isRead: false,
        isDeleted: false,
      })
      .count();

    return { result: count };
  }
}

NotificationRepo.NewNotificationMongoRepository = (logger, client) => {
  return new NotificationRepository(logger, client);
};
