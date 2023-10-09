const InstallationRepo = {};
module.exports = InstallationRepo;

class InstallationRepository {
  constructor(logger, mongoClient) {
    this.__logger = logger;
    this.__mongoClient = mongoClient;
  }

  async upsert(context, installationId, userId, appIdentifier, deviceToken, deviceType, appVersion, timeZone) {
    await this.__mongoClient
      .db()
      .collection('_Installation')
      .updateOne(
        {
          appIdentifier,
          deviceToken,
        },
        {
          $set: {
            appIdentifier,
            badge: 0,
            deviceToken,
            deviceType,
            installationId,
            timeZone,

            _created_at: new Date(),
            _updated_at: new Date(),

            _p_user: `_User$${userId}`,
          },
        },
        { upsert: true },
      );

    return Promise.resolve({ result: true });
  }

  async delete(context, installationId) {
    await this.__mongoClient.db().collection('_Installation').deleteOne({
      installationId,
    });

    return Promise.resolve({ result: true });
  }
}

InstallationRepo.NewInstallationMongoRepository = (logger, mongoClient) => {
  return new InstallationRepository(logger, mongoClient);
};
