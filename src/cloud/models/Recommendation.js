const helper = require('../../utils/helper');
const mongoDB = require('../../db/mongoDB');
const moment = require('moment-timezone');
const { OBJECT_NOT_FOUND, RECOMMENDATION_DUPLICATE_PERSON } = require('../../const/Errors');
const RecommendationModel = {};

RecommendationModel.create = async (payload) => {
  const { contributorStylistInfo, contributorSalonInfo, receiverStylistInfo, receiverSalonInfo, title, content } =
    payload;
  const id = await helper.getAnNanoId();
  const db = await mongoDB.getMongoDB();

  const toDay = moment().toDate();

  try {
    await db.collection('Recommendation').insertOne({
      _id: id,
      _created_at: toDay,
      _updated_at: toDay,
      receiverId: receiverStylistInfo.objectId,
      receiver: receiverStylistInfo,
      salonReceiver: receiverSalonInfo,
      contributorId: contributorStylistInfo.objectId,
      contributor: contributorStylistInfo,
      salonContributor: contributorSalonInfo,
      title,
      content,
    });
  } catch (error) {
    if (error.name === 'MongoError' && (error.code === 11000 || error.code === 11001)) {
      const { code, message } = RECOMMENDATION_DUPLICATE_PERSON;
      throw new Parse.Error(code, message);
    }
  }
  return {
    success: true,
  };
};
RecommendationModel.update = async ({ recommendationId, attributes }) => {
  const db = await mongoDB.getMongoDB();
  const toDay = moment().toDate();
  let setData = {
    _updated_at: toDay,
    title: attributes.title,
    content: attributes.content,
  };

  if (attributes.receiverStylistInfo) {
    setData = {
      ...setData,
      receiverId: attributes.receiverStylistInfo.objectId,
      receiver: attributes.receiverStylistInfo,
      salonReceiver: attributes.receiverSalonInfo,
    };
  }

  if (attributes.contributorStylistInfo) {
    setData = {
      ...setData,
      contributorId: attributes.contributorStylistInfo.objectId,
      contributor: attributes.contributorStylistInfo,
      salonContributor: attributes.contributorSalonInfo,
    };
  }
  try {
    await db.collection('Recommendation').updateOne(
      { _id: recommendationId },
      {
        $set: setData,
      },
    );
  } catch (error) {
    if (error.name === 'MongoError' && (error.code === 11000 || error.code === 11001)) {
      const { code, message } = RECOMMENDATION_DUPLICATE_PERSON;
      throw new Parse.Error(code, message);
    }
  }
  return {
    success: true,
  };
};

RecommendationModel.getRecommendationById = async (id) => {
  const db = await mongoDB.getMongoDB();
  const recommendation = await db.collection('Recommendation').findOne({
    _id: id,
  });
  if (!recommendation) {
    const { code, message } = OBJECT_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  return recommendation;
};

RecommendationModel.getColection = async () => {
  return mongoDB.getMongoDB();
};

RecommendationModel.deleteRecommendationByAdmin = async (id) => {
  const db = await mongoDB.getMongoDB();
  await db.collection('Recommendation').deleteOne({ _id: id });
  return {
    success: true,
  };
};

module.exports = RecommendationModel;
