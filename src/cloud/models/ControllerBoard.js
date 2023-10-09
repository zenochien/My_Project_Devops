const ControllerBoardModel = {};
module.exports = ControllerBoardModel;

const moment = require('moment');
const _map = require('lodash/map');
const _filter = require('lodash/filter');

const { DEFAULT_TIMEZONE } = require('../../const/Constants');
const requestCb = require('../../utils/requestCb').default;
const { generalConfig } = require('../../config/generalConfig');
const Helper = require('../../utils/helper');

const buildBusinessName = (salonName) => {
  if (salonName.length === 1) {
    return '_' + salonName;
  }
  return salonName;
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/salons/createSalon
 *
 * @param {String} params.email
 * @param {String} params.salonName
 * @returns {Promise<any>}
 */
ControllerBoardModel.addSalon = (params) => {
  const { email, salonName } = params;

  return requestCb('post', `/api/v1/apps/${generalConfig.controllerBoardAppId}/salons`, {
    email: email,
    businessName: buildBusinessName(salonName),
  });
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/salons/patch_api_v1_salons__salonId_
 *
 * @param {String} params.cbSalonId
 * @param {String} params.salonName
 * @param {String} params.postalCode
 * @param {String} params.salonAddress1
 * @param {String} params.salonAddress2
 * @param {String} params.salonAddress3
 * @param {String} params.salonAddress4
 * @returns {Promise<any>}
 */
ControllerBoardModel.updateSalonInfo = (params) => {
  const { cbSalonId, salonName, postalCode, salonAddress1, salonAddress2, salonAddress3, salonAddress4, email } =
    params;
  const payload = {
    businessName: buildBusinessName(salonName),
    businessTypes: ['hair'],
    location: {
      postCode: postalCode ? Number(postalCode.replace('-', '')) : 0,
      prefecture: salonAddress1 ? salonAddress1 : 'string',
      cityOrTown: salonAddress2 ? salonAddress1 : 'string',
      address: salonAddress3 ? salonAddress1 : 'string',
      building: salonAddress4 ? salonAddress1 : 'string',
      latLng: {
        lat: 0,
        lng: 0,
      },
      area: {
        id: 'string',
        name: 'string',
        prefecture: {
          id: 'string',
          name: 'string',
          city: {
            id: 'string',
            name: 'string',
          },
        },
      },
    },
  };
  if (email) {
    payload.email = email;
  }
  return requestCb('patch', `/api/v1/apps/${generalConfig.controllerBoardAppId}/salons/${cbSalonId}`, payload);
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/salons/put_api_v1_apps__appId__salons__salonId__schedules
 *
 * @param {String} params.cbSalonId
 * @param {Object} params.schedules
 * @returns {Promise<any>}
 */
ControllerBoardModel.updateSalonSchedule = (params) => {
  const { cbSalonId, schedules } = params;

  return requestCb('put', `/api/v1/apps/${generalConfig.controllerBoardAppId}/salons/${cbSalonId}/schedules`, {
    schedules: Helper.convertHRLSchedules2CBSchedules(schedules),
  });
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/staff/getAllStaffBySystemSalon
 *
 * @param {String} params.[page]
 * @param {String} params.[limit]
 * @param {String} params.[active]
 * @param {String} params.[sort]
 * @param {String} params.[email]
 * @param {String} params.cbSalonId
 * @returns {Promise<any>} If email provided, detail of a staff in a salon. If email not provided, detail of the list of staffs in a salon
 */
ControllerBoardModel.getListStaff = (params) => {
  const {
    page = 1,
    limit = 20,
    active = true,
    sort = 'createdAt desc,updatedAt desc',
    email,
    cbSalonId,
  } = params || {};
  const emailStr = email ? `&email=${encodeURIComponent(email)}` : '';

  return requestCb(
    'get',
    `/api/v1/apps/${
      generalConfig.controllerBoardAppId
    }/salons/${cbSalonId}/staff/?page=${page}&limit=${limit}&active=${active}&sort=${encodeURIComponent(
      sort,
    )}${emailStr}`,
  );
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/salons/getListBySystem
 *
 * @param {String} params.[page]
 * @param {String} params.[limit]
 * @param {String} params.[email]
 * @returns {Promise<any>} If email provided, detail of a salon. If email not provided, detail of the list of salons
 */
ControllerBoardModel.getListSalon = (params) => {
  const { page = 1, limit = 20, email } = params || {};

  let emailQuery = '';
  if (email) {
    emailQuery = `&email=${encodeURIComponent(email)}`;
  }
  const query = `page=${page}&limit=${limit}${emailQuery}`;

  return requestCb('get', `/api/v1/apps/${generalConfig.controllerBoardAppId}/salons/?${query}`);
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/staff/addSystemStaff
 *
 * @param {String} params.cbSalonId
 * @param {String} params.sourceId
 * @param {String} params.email
 * @param {String} params.name
 * @returns {Promise<any>}
 */
ControllerBoardModel.addStaff = (params) => {
  const { cbSalonId, sourceId, email, name } = params;

  return requestCb('post', `/api/v1/apps/${generalConfig.controllerBoardAppId}/salons/${cbSalonId}/staff`, {
    sourceId,
    email,
    name,
  });
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/staff/updateSystemStaff
 *
 * @param {String} params.cbStaffId
 * @param {String} params.name
 * @param {String} params.sourceId
 * @returns {Promise<any>}
 */
ControllerBoardModel.updateStaffInfo = (params) => {
  const { cbStaffId, name, email, sourceId } = params;

  return requestCb('put', `/api/v1/apps/${generalConfig.controllerBoardAppId}/staff/${cbStaffId}`, {
    name,
    sourceId,
    email,
  });
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/staff/updateStaffScheduleBySystem
 *
 * @param {String} params.cbStaffId
 * @param {Object} params.schedules
 * @returns {Promise<any>}
 */
ControllerBoardModel.updateStaffWeeklySchedule = (params) => {
  const { cbStaffId, schedules } = params;

  return requestCb('put', `/api/v1/apps/${generalConfig.controllerBoardAppId}/staff/${cbStaffId}/schedules`, {
    schedules: Helper.convertHRLSchedules2CBSchedules(schedules),
  });
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/staff/updateSystemScheduleDaily
 *
 * @param {String} params.cbStaffId
 * @param {Object} params.schedules
 * @returns {Promise<any>}
 */
ControllerBoardModel.updateStaffDailySchedule = (params) => {
  const { cbStaffId, stylistDailySchedules } = params;

  return requestCb('put', `/api/v1/apps/${generalConfig.controllerBoardAppId}/staff/${cbStaffId}/schedules/daily`, {
    schedules: stylistDailySchedules,
  });
};

/**
 * @param {String}  params.cbSalonId
 * @param {String}  params.[cbStaffId]
 * @param {String}  params.[active]
 * @param {String}  params.[sort]
 * @param {String}  params.[from]         ISOString
 * @param {String}  params.[to]           ISOString
 * @param {Boolean} isFilterInvalidRecord
 * @returns {Promise<any>} Salon's all staff's (without pagination) weekly schedule and daily schedule in a range of time.
 */
ControllerBoardModel.getFullStaffScheduleOfSalon = async (params, isFilterInvalidRecord) => {
  const limit = 1000;

  const fullResult = [];
  let page = 1;
  let pageResult;
  do {
    pageResult = await ControllerBoardModel.getStaffScheduleOfSalon(
      { ...params, limit, page: page++ },
      isFilterInvalidRecord,
    );
    fullResult.push(...pageResult.data);
  } while (pageResult.data.length === limit);
  return fullResult;
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/staff/getStaffScheduleBySystem
 *
 * @param {String}  params.cbSalonId
 * @param {String}  params.[cbStaffId]
 * @param {String}  params.[page]
 * @param {String}  params.[limit]
 * @param {String}  params.[active]
 * @param {String}  params.[sort]
 * @param {String}  params.[from]         ISOString
 * @param {String}  params.[to]           ISOString
 * @param {Boolean} isFilterInvalidRecord default is true
 * @returns {Promise<any>} Salon's all staff's (with pagination) weekly schedule and daily schedule in a range of time.
 */
ControllerBoardModel.getStaffScheduleOfSalon = async (params, isFilterInvalidRecord = true) => {
  const {
    cbSalonId,
    cbStaffId,
    page = 1,
    limit = 20,
    active = true,
    sort = 'createdAt desc,updatedAt desc',
    from,
    to,
  } = params;

  let staffIdQuery = '';
  if (cbStaffId) {
    staffIdQuery = `&ids=${cbStaffId}`;
  }
  const query = `page=${page}&limit=${limit}&active=${active}&sort=${encodeURIComponent(
    sort,
  )}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}${staffIdQuery}`;

  const result = await requestCb(
    'get',
    `/api/v1/apps/${generalConfig.controllerBoardAppId}/salons/${cbSalonId}/staff/schedules?${query}`,
  );

  // Filter valid record of weekly schedule
  if (isFilterInvalidRecord) {
    const fromMoment = moment(from).tz(DEFAULT_TIMEZONE);
    const fromDayOfWeek = fromMoment.isoWeekday() % 7;
    _map(result.data, (stylistObj) => {
      const filterWeeklySchedule = _filter(stylistObj.schedules, (sched) => {
        const dayOrder =
          sched.dayOfWeek - fromDayOfWeek >= 0 ? sched.dayOfWeek - fromDayOfWeek : sched.dayOfWeek - fromDayOfWeek + 7;
        const dayMoment = fromMoment.clone().add(dayOrder, 'day');
        const startOfdate = dayMoment.startOf('day').toISOString();
        const endOfdate = dayMoment.endOf('day').toISOString();
        if (sched.endSchedule === null) {
          return true;
        } else {
          return sched.startSchedule <= startOfdate && sched.endSchedule >= endOfdate;
        }
      });
      stylistObj.schedules = filterWeeklySchedule;
    });
  }
  return result;
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/staff/getScheduleByStaffOnADate
 *
 * @param {String} params.cbStaffId
 * @param {String} params.date       ISOString
 * @returns {Promise<any>} Weekly schedule of a staff on a date
 */
ControllerBoardModel.getWeeklyScheduleByStaff = (params) => {
  const { cbStaffId, date } = params;

  return requestCb(
    'get',
    `/api/v1/apps/${generalConfig.controllerBoardAppId}/staff/${cbStaffId}/schedules?date=${encodeURIComponent(date)}`,
  );
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/staff/systemGetScheduleDaily
 *
 * @param {String} params.cbStaffId
 * @param {String} params.date       ISOString
 * @returns {Promise<any>} Daily schedule of a staff on a date
 */
ControllerBoardModel.getDailyScheduleByStaff = (params) => {
  const { cbStaffId, date } = params;

  return requestCb(
    'get',
    `/api/v1/apps/${generalConfig.controllerBoardAppId}/staff/${cbStaffId}/schedules/daily?date=${encodeURIComponent(
      date,
    )}`,
  );
};

/**
 * https://server.slb-cb.scrum-dev.com/api-docs/#/staff/deleteSystemStaff
 *
 * @param {String} params.cbStaffId
 * @returns {Promise<any>}
 */
ControllerBoardModel.deleteStaff = (params) => {
  const { cbStaffId } = params;

  return requestCb('delete', `/api/v1/apps/${generalConfig.controllerBoardAppId}/staff/${cbStaffId}`);
};
