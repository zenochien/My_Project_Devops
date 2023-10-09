const HoldingCompanyModel = {};
module.exports = HoldingCompanyModel;

const moment = require('moment-timezone');

const mongoDB = require('../../db/mongoDB');
const BaseQuery = require('../BaseQuery');
const SalonModel = require('./Salon');
const { getInstance } = require('../../utils/Rabbitmq');

const Helper = require('../../utils/helper');
const { STATUS, EVENTS, DEFAULT_TIMEZONE } = require('../../const/Constants');
const Errors = require('../../const/Errors');
const DefaultSelectFields = require('../../const/DefaultSelectFields');

const buildHoldingCompanyInfo = (holdingCompanyParse, includeFields, unsetFields) => {
  return Helper.convertParseObjectToJson(holdingCompanyParse, includeFields, unsetFields);
};

const processDataForUpdateSalon = async (holdingCompanyId, newSalonIds) => {
  const db = await mongoDB.getMongoDB();
  const oldSalons = await db
    .collection('Salon')
    .find(
      {
        'holdingCompany.objectId': holdingCompanyId,
      },
      { projection: { _id: 1 } },
    )
    .toArray();
  const oldSalonIds = oldSalons.map((item) => item._id);
  const assigned = new Set(newSalonIds);
  const unassigned = new Set(oldSalonIds);
  const totalIds = new Set(oldSalons.concat(newSalonIds));
  totalIds.forEach((id) => {
    if (assigned.has(id) && unassigned.has(id)) {
      assigned.delete(id);
      unassigned.delete(id);
    }
  });
  return {
    assigned: [...assigned],
    unassigned: [...unassigned],
  };
};

const setHoldingCompany = async (assigned, holdingCompany, db, session) => {
  const salonUpdated = await db.collection('Salon').updateMany(
    {
      _id: {
        $in: assigned,
      },
    },
    {
      $set: {
        holdingCompany,
      },
    },
    { session },
  );

  if (salonUpdated.modifiedCount === 0) {
    throw new Error('setHoldingCompany');
  }

  await db.collection('SalonEarning').updateMany(
    {
      salonId: {
        $in: assigned,
      },
      isGeneratePayout: false,
    },
    {
      $set: {
        'salonObject.holdingCompany': holdingCompany,
      },
    },
    { session },
  );
};

const unSetHoldingCompany = async (unassigned, db, session) => {
  const salonUpdated = await db.collection('Salon').updateMany(
    {
      _id: {
        $in: unassigned,
      },
    },
    {
      $unset: {
        holdingCompany: 1,
      },
    },
    { session },
  );

  if (salonUpdated.modifiedCount === 0) {
    throw new Error('unSetHoldingCompany');
  }

  await db.collection('SalonEarning').updateMany(
    {
      salonId: {
        $in: unassigned,
      },
      isGeneratePayout: false,
    },
    {
      $unset: {
        'salonObject.holdingCompany': 1,
      },
    },
    { session },
  );
};

HoldingCompanyModel.getHoldingCompanyList = async (params) => {
  const { searchKey, status = [STATUS.ACTIVE], ...pagingParams } = params;

  const holdingCompanytQuery = BaseQuery.getHoldingCompanyQuery();
  holdingCompanytQuery.containedIn('status', status);
  holdingCompanytQuery.select(DefaultSelectFields.HOLDING_COMPANY);

  if (searchKey) {
    const pattern = Helper.escapeRegExp(searchKey);
    holdingCompanytQuery.matches('name', new RegExp(pattern.toLowerCase(), 'i'));
  }

  Helper.queryPagingHandler(holdingCompanytQuery, pagingParams);
  const [holdingCompanyParses, total] = await Promise.all([
    holdingCompanytQuery.find({ useMasterKey: true }),
    holdingCompanytQuery.count(),
  ]);
  return {
    total,
    list: holdingCompanyParses.map((holdingCompanyParse) =>
      buildHoldingCompanyInfo(holdingCompanyParse, null, ['createdAt']),
    ),
  };
};

HoldingCompanyModel.checkHoldingCompanyNameExists = async (name, holdingCompanyId) => {
  const db = await mongoDB.getMongoDB();
  let query = {
    name,
    status: {
      $nin: [STATUS.DELETED],
    },
  };

  query = holdingCompanyId
    ? {
        ...query,
        _id: {
          $nin: [holdingCompanyId],
        },
      }
    : query;
  const exists = await db.collection('HoldingCompany').findOne(query);

  if (exists) {
    const { code, message } = Errors.HOLDING_COMPANY_NAME_EXISTS;
    throw new Parse.Error(code, message);
  }
};

HoldingCompanyModel.createHoldingCompany = async (params) => {
  const { salonIds = [], name, status = STATUS.ACTIVE } = params;

  await HoldingCompanyModel.checkHoldingCompanyNameExists(name);

  if (salonIds && salonIds.length > 0) {
    await SalonModel.checkSalonExistsByIds(salonIds);
  }

  const id = await Helper.getAnNanoId();
  return HoldingCompanyModel.createHoldingCompanyWithSection(
    {
      name,
      status,
      _id: id,
    },
    salonIds,
  );
};

HoldingCompanyModel.createHoldingCompanyWithSection = async (atributes, salonIds) => {
  const db = await mongoDB.getMongoDB();
  const mongodbClient = await mongoDB.getClient();
  try {
    await Helper.executeInTransaction(async (session) => {
      const input = {
        ...atributes,
        _updated_at: moment().tz(DEFAULT_TIMEZONE).toDate(),
        _created_at: moment().tz(DEFAULT_TIMEZONE).toDate(),
      };
      await db.collection('HoldingCompany').insertOne(input, { session });
      if (salonIds.length > 0) {
        const holdingCompany = {
          name: atributes.name,
          objectId: atributes._id,
          status: atributes.status,
        };
        await setHoldingCompany(salonIds, holdingCompany, db, session);
      }
    }, mongodbClient);
  } catch (error) {
    const { code, message } = Errors.HOLDING_COMPANY_CREATE_ERROR;
    throw new Parse.Error(code, message);
  }

  return {
    name: atributes.name,
    objectId: atributes._id,
  };
};

HoldingCompanyModel.getHoldingCompanyById = async (id) => {
  const holdingCompanytQuery = BaseQuery.getHoldingCompanyQuery();
  holdingCompanytQuery.equalTo('objectId', id);
  holdingCompanytQuery.containedIn('status', [STATUS.ACTIVE]);
  const holdingCompanyParse = await holdingCompanytQuery.first({ useMasterKey: true });
  if (!holdingCompanyParse) {
    const { code, message } = Errors.HOLDING_COMPANY_NOT_FOUND;
    throw new Parse.Error(code, message);
  }
  return holdingCompanyParse;
};

HoldingCompanyModel.updateHoldingCompany = async (params) => {
  const { id, name, status, salonIds = [] } = params;
  const holdingCompanyParse = await HoldingCompanyModel.getHoldingCompanyById(id);

  await HoldingCompanyModel.checkHoldingCompanyNameExists(name, id);

  let needUpdatedHoldingCompany = false;

  needUpdatedHoldingCompany = name && name !== holdingCompanyParse.get('name') ? true : needUpdatedHoldingCompany;
  needUpdatedHoldingCompany = status && status !== holdingCompanyParse.get('status') ? true : needUpdatedHoldingCompany;
  if (salonIds.length > 0) {
    await SalonModel.checkSalonExistsByIds(salonIds);
  }
  return HoldingCompanyModel.updateHoldingCompanyWithSection(
    {
      name: name ? name : holdingCompanyParse.get('name'),
      status: status ? status : holdingCompanyParse.get('status'),
      _id: id,
    },
    salonIds,
    needUpdatedHoldingCompany,
  );
};

HoldingCompanyModel.deleteHoldingCompany = async (params) => {
  const { id } = params;
  const db = await mongoDB.getMongoDB();
  const mongodbClient = await mongoDB.getClient();

  try {
    await Helper.executeInTransaction(async (session) => {
      const holdingCompanyUpdated = await db.collection('HoldingCompany').updateMany(
        {
          _id: id,
        },
        {
          $set: {
            status: STATUS.DELETED,
          },
        },
        { session },
      );

      if (holdingCompanyUpdated.modifiedCount === 0) {
        throw new Error('holdingCompanyDeleted');
      }

      const { unassigned } = await processDataForUpdateSalon(id, []);
      if (unassigned.length > 0) {
        await unSetHoldingCompany(unassigned, db, session);
      }
    }, mongodbClient);
  } catch (error) {
    console.log('deleteHoldingCompany:', error);
    const { code, message } = Errors.HOLDING_COMPANY_UPDATED_ERROR;
    throw new Parse.Error(code, message);
  }
  return {
    success: true,
  };
};

HoldingCompanyModel.updateHoldingCompanyWithSection = async (atributes, salonIds, needUpdatedHoldingCompany) => {
  const db = await mongoDB.getMongoDB();
  const mongodbClient = await mongoDB.getClient();
  let salonChangeIds = [];
  try {
    await Helper.executeInTransaction(async (session) => {
      if (needUpdatedHoldingCompany) {
        const holdingCompanyUpdated = await db.collection('HoldingCompany').updateMany(
          {
            _id: atributes._id,
          },
          {
            $set: {
              name: atributes.name,
              status: atributes.status,
              _updated_at: moment().tz(DEFAULT_TIMEZONE).toDate(),
            },
          },
          { session },
        );
        if (holdingCompanyUpdated.modifiedCount === 0) {
          throw new Error('holdingCompanyUpdated');
        }
      }

      const { assigned, unassigned } = await processDataForUpdateSalon(atributes._id, salonIds);
      salonChangeIds = salonChangeIds.concat([...assigned, ...unassigned]);
      if (assigned.length > 0) {
        const holdingCompany = {
          name: atributes.name,
          objectId: atributes._id,
          status: atributes.status,
        };
        await setHoldingCompany(assigned, holdingCompany, db, session);
      }

      if (unassigned.length > 0) {
        await unSetHoldingCompany(unassigned, db, session);
      }
    }, mongodbClient);
  } catch (error) {
    console.log('updateHoldingCompanyWithSection:', error);
    const { code, message } = Errors.HOLDING_COMPANY_UPDATED_ERROR;
    throw new Parse.Error(code, message);
  }
  if (needUpdatedHoldingCompany) {
    await HoldingCompanyModel.triggerSalonChangeProfile(salonChangeIds, ['holdingCompany']);
  }

  return {
    name: atributes.name,
    objectId: atributes._id,
  };
};

HoldingCompanyModel.triggerSalonChangeProfile = async (salonIds, dirtyKeys) => {
  const rabbitmqManager = getInstance();
  const salonQuery = BaseQuery.getSalonQuery();
  salonQuery.containedIn('objectId', salonIds);
  const salons = await salonQuery.find({ useMasterKey: true });
  salons.forEach((salon) => {
    rabbitmqManager.publish({
      data: {
        dirtyKeys,
        objectData: salon.toJSON(),
      },
      eventName: EVENTS.SALON_CHANGE_PROFILE,
    });
  });
};
