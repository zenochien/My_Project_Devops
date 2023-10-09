const Helper = {};
module.exports = Helper;

const _ = require('lodash');
const AWS = require('aws-sdk');
const fs = require('fs');
const mime = require('mime');
const sharp = require('sharp');
const _forEach = require('lodash/forEach');
const _filter = require('lodash/filter');
const _isEmpty = require('lodash/isEmpty');
const _some = require('lodash/some');
const _map = require('lodash/map');
const _groupBy = require('lodash/groupBy');
const _sortBy = require('lodash/sortBy');
const _reduce = require('lodash/reduce');
const _isArray = require('lodash/isArray');
const _minBy = require('lodash/minBy');
const _maxBy = require('lodash/maxBy');
const moment = require('moment');
const momentTZ = require('moment-timezone');
const slug = require('limax');
const axios = require('axios');
const { customAlphabet } = require('nanoid/async');
const { ORDER, MONGO_FIELD } = require('../const/Constants');

const {
  THUMBNAIL_SIZE,
  USER_ROLE,
  PAGING_ORDER,
  MINUTES_PER_HOUR,
  SLOT_INTERVAL,
  ONE_DAY_IN_MS,
  USER_STATUS,
  REASON_DELETE_ACCOUNT,
} = require('../const/Constants');
const { s3Config, resourcePathConfig } = require('../config');
const BaseQuery = require('../cloud/BaseQuery');
const { generalConfig } = require('../config/generalConfig');
const { DEFAULT_TIMEZONE } = require('../const/Constants');
const { INVALID_PARAMS, INVALID_SALONID_PASSWORD, INVALID_EMAIL_PASSWORD } = require('../const/Errors');
const Errors = require('../const/Errors');

const unset = _.unset;

async function getShortLinkFromFirebase({ url, bundleId, urlPrefix }) {
  if (!generalConfig.enableDeepLink) return url;
  try {
    const result = await axios({
      method: 'post',
      url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${generalConfig.firebaseDynamicLinkKey}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        dynamicLinkInfo: {
          domainUriPrefix: urlPrefix,
          link: url,
          iosInfo: {
            iosBundleId: bundleId,
          },
        },
      },
    });
    return result.data.shortLink;
  } catch (error) {
    console.error('Commonhelper.getShortLinkFromFirebase:error:', error.response.data);
    throw new Error(error.message);
  }
}

function getUnavailableSchedule(dayWeeklySchedule, daySalonScheduleStartEnd) {
  const dayUnavailableSchedule = [];

  let daySalonScheduleStartTimeMinutes = 0;
  let daySalonScheduleEndTimeMinutes = 0;
  if (daySalonScheduleStartEnd.startTime && daySalonScheduleStartEnd.endTime) {
    daySalonScheduleStartTimeMinutes = convertToMinutesFromHourFormat(daySalonScheduleStartEnd.startTime);
    daySalonScheduleEndTimeMinutes = convertToMinutesFromHourFormat(daySalonScheduleStartEnd.endTime);
  }

  const getOtherTimeRange = (outsideTimeRangeStartMinutes, insideTimeRangeStartMinutes, insideTimeRangeEndMinutes) => {
    if (outsideTimeRangeStartMinutes < insideTimeRangeStartMinutes) {
      dayUnavailableSchedule.push({
        startTime: convertMinutesToHourFormat(outsideTimeRangeStartMinutes),
        endTime: convertMinutesToHourFormat(insideTimeRangeStartMinutes),
      });
    }
    return insideTimeRangeEndMinutes;
  };

  let outsideTimeRangeStartMinutes = daySalonScheduleStartTimeMinutes;
  _forEach(dayWeeklySchedule, (dayWeeklySched) => {
    const dayWeeklySchedStartTimeMinutes = convertToMinutes(moment(dayWeeklySched.startAt).tz(DEFAULT_TIMEZONE));
    const dayWeeklySchedEndTimeMinutes = convertToMinutes(moment(dayWeeklySched.endAt).tz(DEFAULT_TIMEZONE));

    outsideTimeRangeStartMinutes = getOtherTimeRange(
      outsideTimeRangeStartMinutes,
      dayWeeklySchedStartTimeMinutes,
      dayWeeklySchedEndTimeMinutes,
    );
  });

  if (outsideTimeRangeStartMinutes !== daySalonScheduleEndTimeMinutes) {
    dayUnavailableSchedule.push({
      startTime: convertMinutesToHourFormat(outsideTimeRangeStartMinutes),
      endTime: convertMinutesToHourFormat(daySalonScheduleEndTimeMinutes),
    });
  }

  return dayUnavailableSchedule;
}

function isUnavailableDay(dayWeeklySchedule, daySalonSchedule) {
  if (_isEmpty(daySalonSchedule)) {
    return false;
  }

  let dayWeeklySchedStartTimeMinutes = 0;
  let dayWeeklySchedEndTimeMinutes = 0;
  if (dayWeeklySchedule && dayWeeklySchedule[0] && dayWeeklySchedule[0].startAt && dayWeeklySchedule[0].endAt) {
    dayWeeklySchedStartTimeMinutes = convertToMinutes(moment(dayWeeklySchedule[0].startAt).tz(DEFAULT_TIMEZONE));
    dayWeeklySchedEndTimeMinutes = convertToMinutes(moment(dayWeeklySchedule[0].endAt).tz(DEFAULT_TIMEZONE));
  }

  let daySalonScheduleStartTimeMinutes = 0;
  let daySalonScheduleEndTimeMinutes = 0;
  if (daySalonSchedule.startTime && daySalonSchedule.endTime) {
    daySalonScheduleStartTimeMinutes = convertToMinutesFromHourFormat(daySalonSchedule.startTime);
    daySalonScheduleEndTimeMinutes = convertToMinutesFromHourFormat(daySalonSchedule.endTime);
  }

  // SalonSchedule is available but weeklySchedule is not
  return (
    dayWeeklySchedStartTimeMinutes === dayWeeklySchedEndTimeMinutes &&
    daySalonScheduleStartTimeMinutes !== daySalonScheduleEndTimeMinutes
  );
}

function numberWithCommas(x) {
  return x !== undefined ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
}

function formatTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}

function isFirstRequestBookingDay(dateTimeStartDayMoment, nowStartDayMoment) {
  const diffDays = dateTimeStartDayMoment.diff(nowStartDayMoment, 'days');
  const minDay = Math.floor((generalConfig.minRequestBookingTime * 1000) / ONE_DAY_IN_MS);
  return diffDays === minDay;
}

function checkRequestBookingTime(dateTimeMoment, nowMoment) {
  const diffDays = dateTimeMoment.diff(nowMoment, 'days');
  const diffSeconds = dateTimeMoment.diff(nowMoment, 'seconds');

  return diffSeconds >= generalConfig.minRequestBookingTime && diffDays <= generalConfig.maxRequestBookingDays;
}

function checkRequestBookingDay(dateTimeStartDayMoment, nowStartDayMoment) {
  const diffDays = dateTimeStartDayMoment.diff(nowStartDayMoment, 'days');
  const minRequestBookingDays = Math.floor(generalConfig.minRequestBookingTime / (ONE_DAY_IN_MS / 1000));

  return diffDays >= minRequestBookingDays && diffDays <= generalConfig.maxRequestBookingDays;
}

function convertMinutesToHourFormat(minutes) {
  return formatTwoDigits(Math.floor(minutes / MINUTES_PER_HOUR)) + ':' + formatTwoDigits(minutes % MINUTES_PER_HOUR);
}

function convertToMinutes(momentJP) {
  return momentJP.hours() * MINUTES_PER_HOUR + momentJP.minutes();
}

function convertToMinutesFromHourFormat(str) {
  return Number(str.slice(0, 2)) * MINUTES_PER_HOUR + Number(str.slice(3));
}

function getAvailableSlotsFromRange(startMin, endMin, minSlot) {
  const list = [];

  for (let min = startMin; min <= endMin; min += SLOT_INTERVAL) {
    if (min > minSlot) {
      list.push(min);
    }
  }
  return list;
}

function escapeRegExp(str) {
  return str.replace(/[-\[\]\/{}()*+?.\\^$|]/g, '\\$&');
}

function convertCharacter2ByteTo1Byte(txtString) {
  const regex = /[０-ｚ！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～＋／]/g;

  return txtString.replace(regex, (ch) => {
    return String.fromCharCode(ch.charCodeAt(0) - 65248);
  });
}

function removeSpecialsCharacters(txtString) {
  const newStr = convertCharacter2ByteTo1Byte(txtString);
  return newStr.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
}

function trimSpecialsCharacters(txtString, isConvert2BytesTo1Byte) {
  let newStr = txtString;

  isConvert2BytesTo1Byte = isConvert2BytesTo1Byte || false;

  if (isConvert2BytesTo1Byte === true) {
    newStr = convertCharacter2ByteTo1Byte(txtString);
  }

  return escapeRegExp(newStr.replace(/[\\*]/g, '').replace(/\s+/g, ' '));
}

function convertParseObjectFields(parseObject) {
  for (const objKey in parseObject) {
    if (
      _.isObject(parseObject[objKey]) &&
      '__type' in parseObject[objKey] &&
      parseObject[objKey]['__type'] === 'Date'
    ) {
      parseObject[objKey] = parseObject[objKey]['iso'];
    }
  }
  return parseObject;
}

function parseImageObject(object) {
  if (typeof object.has !== 'undefined' && object.has('thumbSmall')) {
    return {
      objectId: object.id,
      thumbSmall: object.get('thumbSmall').toJSON().url,
      thumbLarge: object.get('thumbLarge').toJSON().url,
      original: object.get('file').toJSON().url,
    };
  } else if (typeof object.thumbSmall !== 'undefined') {
    return {
      objectId: object.objectId,
      thumbSmall: object.thumbSmall.url,
      thumbLarge: object.thumbLarge.url,
      original: object.file.url,
    };
  } else if (typeof object.has !== 'undefined' && object.has('file')) {
    return {
      objectId: object.id,
      thumbSmall: object.get('file').toJSON().url,
      thumbLarge: object.get('file').toJSON().url,
      original: object.get('file').toJSON().url,
    };
  } else if (typeof object.file !== 'undefined') {
    return {
      objectId: object.objectId,
      thumbSmall: object.file.url,
      thumbLarge: object.file.url,
      original: object.file.url,
    };
  }
  return undefined;
}

async function generateThumbnailWithSharp(image, options) {
  // create thumbnailImage from original
  const { imgSize, prefixFilename } = options;

  const thumbnailFileName = prefixFilename + '_' + imgSize.width + 'x' + imgSize.height + '.jpg';
  const buffer = await image.resize({ width: imgSize.width, height: imgSize.height, fit: 'inside' }).toBuffer();

  // create parse file
  const thumbnailFile = new Parse.File(thumbnailFileName.toLowerCase(), {
    base64: buffer.toString('base64'),
  });

  return thumbnailFile.save();
}

function stripUndefined(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function replaceRange(str, start, end, substitute) {
  return str.substring(0, start) + substitute + str.substring(end);
}

function createContextFromRequestUser(requestUser) {
  if (!requestUser) {
    return {};
  }
  const parseUserJSON = requestUser.toJSON();

  return {
    user: parseUserJSON && {
      id: parseUserJSON.objectId,
      role: parseUserJSON.role,
      status: parseUserJSON.status,
    },
  };
}

Object.assign(Helper, {
  /**
   * Compare between old prop and new prop in parse object.
   * @param u
   * @param v
   * @return {boolean}
   */
  isEqualParse: (u, v) => {
    if (u === undefined) {
      return v === undefined;
    }

    if (u === null) {
      return v === null;
    }

    if (_.isArray(v)) {
      if (!_.isArray(u)) {
        return false;
      }

      if (v.length !== u.length) {
        return false;
      } else if (v.length === 0) {
        return true;
      } else {
        return !_.some(v, (value, index) => !Helper.isEqualParse(u[index], value));
      }
    }

    if (v.toJSON && u.toJSON) {
      return _.isEqual(v.toJSON(), u.toJSON());
    }

    return _.isEqual(u, v);
  },

  /**
   * Get property in parse object by path
   * @param {Parse.Object | Object} obj
   * @param {string} path
   * @param defaultValue
   * @return {*}
   */
  getParseProp: (obj, path, defaultValue) => {
    if (!path || path.length === 0) return defaultValue;
    let result = obj;
    const fieldPaths = path.split('.');
    for (const field of fieldPaths) {
      if (result === undefined || result === null) {
        break;
      }

      if (result.has && result.get) {
        if (!result.has(field)) return defaultValue;
        result = result.get(field);
      } else {
        if (!_.has(result, field)) return defaultValue;
        result = result[field];
      }
    }
    return result || defaultValue;
  },

  isValidEmail: (email) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email);
  },

  removeSpecialsCharacters,
  trimSpecialsCharacters,
  escapeRegExp,
  stripUndefined,
  replaceRange,
  convertMinutesToHourFormat,
  getAvailableSlotsFromRange,
  convertToMinutes,
  isFirstRequestBookingDay,
  checkRequestBookingTime,
  checkRequestBookingDay,
  numberWithCommas,
  generateThumbnailWithSharp,
  convertToMinutesFromHourFormat,
  createContextFromRequestUser,

  queryPagingHandler: (parseQuery, params) => {
    const page = !_.isNil(params.page) ? Number(params.page) : 1;
    const limit = !_.isNil(params.limit) ? Number(params.limit) : 10;
    parseQuery.skip(limit * (page - 1));
    parseQuery.limit(limit);

    let orderBy = params.orderBy ? params.orderBy.trim() : 'createdAt';
    let order = params.order ? params.order.trim() : 'descending';
    orderBy = `${orderBy},objectId`;
    order = `${order},descending`;
    const orderBys = orderBy.split(',');
    const orders = order.split(',');

    for (let i = 0; i < orderBys.length; i++) {
      if (orders[i] && orders[i] === PAGING_ORDER.ASC) {
        parseQuery.addAscending(orderBys[i]);
      } else {
        parseQuery.addDescending(orderBys[i]);
      }
    }
  },

  addMultiFieldSort: (parseQuery, params) => {
    if (params.orderBys && params.orderBys.length === 0) {
      return parseQuery;
    }
    if (params.order === PAGING_ORDER.ASC) {
      parseQuery.ascending(params.orderBys);
    } else {
      parseQuery.descending(params.orderBys);
    }
  },

  getPointerValue: (className, objectIds) => {
    if (typeof objectIds === 'string') {
      const parseObj = new Parse.Object(className);
      parseObj.id = objectIds;
      return parseObj;
    } else if (_.isArray(objectIds)) {
      return objectIds.map((id) => {
        const parseObj = new Parse.Object(className);
        parseObj.id = id;
        return parseObj;
      });
    }

    return undefined;
  },

  deleteAwsFiles: (s3Files) => {
    if (_.isEmpty(s3Config)) {
      return Promise.reject('Invalid s3 config');
    }

    AWS.config.update({
      accessKeyId: s3Config.accessKey,
      secretAccessKey: s3Config.secretKey,
    });
    const s3 = new AWS.S3();
    const params = {
      Bucket: s3Config.bucket,
      Delete: { Objects: s3Files },
    };

    return new Promise((resolve, reject) => {
      s3.deleteObjects(params, (err) => {
        if (err) {
          return reject(false);
        } else {
          return resolve(true);
        }
      });
    });
  },

  buildS3File: (parseFile) => {
    if (parseFile) {
      const urlParts = parseFile._url.split('/');
      return { Key: urlParts[urlParts.length - 1] };
    }
    return undefined;
  },

  generateThumbnailsWithSharp: async (options) => {
    const mapThumbnailSize = THUMBNAIL_SIZE[options.type] || THUMBNAIL_SIZE.DEFAULT;
    if (!options.imageUrl || !options.type || !mapThumbnailSize) {
      return {};
    }

    const response = await Parse.Cloud.httpRequest({ url: options.imageUrl });

    const image = sharp(response.buffer);
    // create thumbnails
    const thumbnails = await Promise.all(
      _.map(mapThumbnailSize, (imgSize) =>
        Helper.generateThumbnailWithSharp(image, {
          imgSize,
          prefixFilename: options.type,
        }),
      ),
    );

    return _.zipObject(_.keys(mapThumbnailSize), thumbnails);
  },

  convertParseObjectToJson: function (parseObject, includeFields, unsetFields, options, forceJson) {
    const promiseProcessRecord = _.get(options, 'promiseProcessRecord');
    if (!parseObject) {
      return parseObject;
    }
    let jsonParseObject = parseObject;
    if (_.isUndefined(forceJson)) {
      jsonParseObject = jsonParseObject.toJSON();
    }

    unset(jsonParseObject, 'updatedAt');
    unset(jsonParseObject, 'ACL');
    unset(jsonParseObject, '__type');
    unset(jsonParseObject, 'className');
    if (includeFields) {
      includeFields.forEach((includeField) => {
        let fieldValue = jsonParseObject[includeField];
        if (_.isArray(fieldValue)) {
          for (var object in fieldValue) {
            unset(fieldValue, object + '.createdAt');
            unset(fieldValue, object + '.updatedAt');
            unset(fieldValue, object + '.__type');
            unset(fieldValue, object + '.className');
          }
        } else if (fieldValue) {
          if ((fieldValue.thumbSmall && typeof fieldValue.thumbLarge) || fieldValue.file) {
            _.set(jsonParseObject, includeField, parseImageObject(fieldValue));
          } else {
            unset(jsonParseObject, includeField + '.createdAt');
            unset(jsonParseObject, includeField + '.updatedAt');
            unset(jsonParseObject, includeField + '.ACL');
            unset(jsonParseObject, includeField + '.__type');
            unset(jsonParseObject, includeField + '.className');

            fieldValue = convertParseObjectFields(fieldValue);
            if (fieldValue) {
              jsonParseObject[includeField] = fieldValue;
            }
          }
        }
      });
    }
    if (unsetFields) {
      unsetFields.forEach((unsetField) => {
        unset(jsonParseObject, unsetField);
      });
    }
    jsonParseObject = convertParseObjectFields(jsonParseObject);
    if (promiseProcessRecord) {
      jsonParseObject = promiseProcessRecord(jsonParseObject, parseObject);
    }
    return jsonParseObject;
  },

  convertParseObjectsToJson: function (parseObjects, includeFields, unsetFields, options, forceJson) {
    return parseObjects.map((parseObject) =>
      this.convertParseObjectToJson(parseObject, includeFields, unsetFields, options, forceJson),
    );
  },

  stringReplace: (str, data) => {
    const pattern = /{(.*?)}/g;
    return str.replace(pattern, (match, token) => data[token]);
  },

  replaceSNSUrl: (str) => {
    let url;
    try {
      url = new URL(str);
      return url.pathname.substr(1) + url.search;
    } catch (_) {
      return str;
    }
  },

  randomString: (length = 10) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  getPageTemplatePath: (pageName) => {
    return `${resourcePathConfig.pagePath}/${pageName}`;
  },

  /**
   * Set default value into Parse object
   * @param {Parse.Object} parseObj
   * @param {Record<string, any>} defaultValueMap
   */
  setDefaultValue: (parseObj, defaultValueMap) => {
    _.forEach(defaultValueMap, (defaultValue, key) => {
      if (!parseObj.has(key)) {
        parseObj.set(key, defaultValue);
      }
    });
  },

  base64Encoder: async (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { encoding: 'base64' }, (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(`data:${mime.getType(path)};base64,${data}`);
      });
    });
  },

  getFileSize: (base64string) => {
    return Buffer.byteLength(base64string, 'base64');
  },

  throwInvalidUserPass: (error, role) => {
    if (role === USER_ROLE.SALON_OPERATOR) {
      const { code, message } = INVALID_SALONID_PASSWORD;
      throw new Parse.Error(code, message);
    }

    const { code, message } = INVALID_EMAIL_PASSWORD;
    throw new Parse.Error(code, message);
  },

  formatFileImage: (file) => {
    if (!_.isObject(file) || _.isEmpty(file)) {
      return undefined;
    }
    const originalFileName = file.originalname;
    const i = originalFileName.lastIndexOf('.');
    const extFile = i < 0 ? '.jpg' : originalFileName.substr(i);

    const interior = {
      size: file.size,
      type: file.mimetype,
      name: originalFileName,
      extension: extFile,
      base64: new Buffer(fs.readFileSync(file.path)).toString('base64'),
    };
    fs.unlink(file.path, function () {});

    return interior;
  },

  getRandomUsername: async (length = 10) => {
    let newUsername = undefined;
    let existingUser = undefined;
    do {
      newUsername = Helper.randomString(length);
      const userQuery = BaseQuery.getUserQuery();
      userQuery.equalTo('username', newUsername);
      existingUser = await userQuery.first({ useMasterKey: true });
    } while (existingUser !== undefined);

    return newUsername;
  },

  updateDataToParseObj: (parseObj, data, fields) => {
    if (parseObj) {
      _.forEach(fields, (field) => {
        const value = data[field];

        if (!_.isNil(value)) {
          if (_.isString(value)) {
            if (value) {
              parseObj.set(field, data[field]);
            } else {
              parseObj.unset(field, data[field]);
            }
          } else {
            parseObj.set(field, data[field]);
          }
        }
      });
    }
  },

  // cbSchedules must contains schedules of 1 week only
  mergeCBSchedules: (cbSchedules, isCheckDayOfWeek = false) => {
    const sortedSchedules = _sortBy(cbSchedules, (sched) => {
      if (isCheckDayOfWeek) {
        const startAtMoment = moment(sched.startAt).tz(DEFAULT_TIMEZONE);
        if (startAtMoment.isoWeekday() % 7 !== sched.dayOfWeek) {
          const { code } = INVALID_PARAMS;
          throw new Parse.Error(code, 'Wrong dayOfWeek');
        }
      }
      return sched.dayOfWeek + sched.startAt + sched.endAt;
    });

    return _reduce(
      sortedSchedules,
      (mapDayOfWeek, sched) => {
        const arr = mapDayOfWeek[sched.dayOfWeek];
        if (!arr || arr.length === 0) {
          mapDayOfWeek[sched.dayOfWeek] = [sched];
          return mapDayOfWeek;
        }

        if (arr[arr.length - 1].endAt >= sched.startAt && arr[arr.length - 1].endAt <= sched.endAt) {
          arr[arr.length - 1].endAt = sched.endAt;
        } else {
          arr.push(sched);
        }

        return mapDayOfWeek;
      },
      {},
    );
  },

  convertHRLSchedules2CBSchedules: (salonOrStaffSchedules) => {
    const today = new Date().toISOString().slice(0, 11);

    const convertAndPush = (schedules, daySchedule, i) => {
      if (daySchedule.startTime && daySchedule.endTime) {
        schedules.push({
          dayOfWeek: i,
          startAt: today + daySchedule.startTime + ':00+09:00',
          endAt: today + daySchedule.endTime + ':00+09:00',
        });
      } else {
        schedules.push({
          dayOfWeek: i,
          startAt: today + '00:00:00Z',
          endAt: today + '00:00:00Z',
        });
      }
    };

    const schedules = [];
    for (let i = 0; i <= 6; i++) {
      const daySchedules = salonOrStaffSchedules[i];
      if (daySchedules) {
        if (Array.isArray(daySchedules)) {
          _forEach(daySchedules, (daySched) => {
            convertAndPush(schedules, daySched, i);
          });
        } else {
          convertAndPush(schedules, daySchedules, i);
        }
      }
    }
    return schedules;
  },

  getSumScheduleOfDayView: (
    date,
    dayOfWeek, // date's dayOfWeek
    weeklySchedules,
    dailySchedules,
    salonSchedules,
    isGetUnavailableSchedule = true,
    salonScheduleStartEnd,
  ) => {
    const dayDailySchedule = _filter(dailySchedules, (sched) => sched.dayOfWeek === dayOfWeek);
    const dayWeeklySchedule = _filter(
      weeklySchedules[dayOfWeek],
      (sched) => sched.startSchedule < date && (sched.endSchedule === null || sched.endSchedule > date),
    );

    const dayAvailableSchedule = _isEmpty(dayDailySchedule) ? dayWeeklySchedule : dayDailySchedule;
    const availableSchedule = _map(dayAvailableSchedule, (dayAvailableSched) => {
      return {
        startTime: moment(dayAvailableSched.startAt).tz(DEFAULT_TIMEZONE).format('HH:mm'),
        endTime: moment(dayAvailableSched.endAt).tz(DEFAULT_TIMEZONE).format('HH:mm'),
      };
    });

    const daySalonScheduleStartEnd = salonScheduleStartEnd ? salonScheduleStartEnd : salonSchedules[dayOfWeek];
    if (_isEmpty(daySalonScheduleStartEnd)) {
      return { isSalonClosedDate: true };
    }
    if (isGetUnavailableSchedule) {
      const dayUnavailableSchedule = getUnavailableSchedule(dayWeeklySchedule, daySalonScheduleStartEnd);

      return {
        availableSchedule,
        unavailableSchedule: dayUnavailableSchedule,
      };
    }

    return { availableSchedule };
  },

  getSumScheduleOfWeekView: (
    monday,
    weeklySchedules,
    dailySchedules,
    salonSchedules,
    closingDates,
    stylistCreatedAtDate,
  ) => {
    const weekAvailability = [];
    const daysDailySchedules = _groupBy(dailySchedules, 'dayOfWeek');
    const mondayMoment = moment(monday).tz(DEFAULT_TIMEZONE);

    for (let i = 0; i <= 6; i++) {
      const isClosingDate = _some(
        closingDates,
        (closingDate) => moment(closingDate).tz(DEFAULT_TIMEZONE).isoWeekday() % 7 === i,
      );
      if (isClosingDate) {
        weekAvailability.push({ dayOfWeek: i, availability: -2 });
        continue;
      }

      const dayWeeklySchedule = weeklySchedules[i];
      const daySalonSchedule = salonSchedules[i];
      const isUnavailable = isUnavailableDay(dayWeeklySchedule, daySalonSchedule);

      if (isUnavailable) {
        weekAvailability.push({ dayOfWeek: i, availability: -1 });
        continue;
      }

      const dayOrder = i === 0 ? 6 : i - 1; // Monday: 0, ..., Sunday: 6
      const date = mondayMoment.clone().add(dayOrder, 'day').format('YYYY-MM-DD');
      const sumScheduleOfDayView = Helper.getSumScheduleOfDayView(
        date,
        i,
        weeklySchedules,
        dailySchedules,
        salonSchedules,
        false,
      );
      if (sumScheduleOfDayView.isSalonClosedDate === true) {
        weekAvailability.push({ dayOfWeek: i, availability: -3 });
        continue;
      }
      if (stylistCreatedAtDate === date) {
        weekAvailability.push({ dayOfWeek: i, availability: -1 });
        continue;
      }

      const dayAvailableSchedule = _isEmpty(daysDailySchedules[i]) ? dayWeeklySchedule : daysDailySchedules[i];
      const isAvailable = _some(
        dayAvailableSchedule,
        (dayAvailableSched) => dayAvailableSched.startAt !== dayAvailableSched.endAt,
      );
      if (isAvailable === false) {
        weekAvailability.push({ dayOfWeek: i, availability: 0 });
        continue;
      }

      weekAvailability.push({
        dayOfWeek: i,
        availability: 1,
        availableSchedule: sumScheduleOfDayView.availableSchedule,
      });
    }

    return weekAvailability;
  },

  getSalonScheduleStartEnd: (salonSchedules) => {
    const result = { startTime: '23:59', endTime: '00:00' };
    for (const sched in salonSchedules) {
      if (salonSchedules[sched].startTime < result.startTime) {
        result.startTime = salonSchedules[sched].startTime;
      }
      if (salonSchedules[sched].endTime > result.endTime) {
        result.endTime = salonSchedules[sched].endTime;
      }
    }
    return result;
  },

  getOverlappedRange: (dayWeeklySched, daySalonSchedule) => {
    if (
      !(
        daySalonSchedule &&
        dayWeeklySched &&
        daySalonSchedule.startTime &&
        daySalonSchedule.endTime &&
        dayWeeklySched.startAt &&
        dayWeeklySched.endAt
      )
    )
      return undefined;

    const dayAvailableSchedStartTimeMinutes = convertToMinutes(moment(dayWeeklySched.startAt).tz(DEFAULT_TIMEZONE));
    const dayAvailableSchedEndTimeMinutes = convertToMinutes(moment(dayWeeklySched.endAt).tz(DEFAULT_TIMEZONE));

    const daySalonScheduleStartTimeMinutes = convertToMinutesFromHourFormat(daySalonSchedule.startTime);
    const daySalonScheduleEndTimeMinutes = convertToMinutesFromHourFormat(daySalonSchedule.endTime);

    const start = Math.max(dayAvailableSchedStartTimeMinutes, daySalonScheduleStartTimeMinutes);
    const end = Math.min(dayAvailableSchedEndTimeMinutes, daySalonScheduleEndTimeMinutes);

    if (start < end) {
      return { startTime: convertMinutesToHourFormat(start), endTime: convertMinutesToHourFormat(end) };
    }
  },

  getOutsideBookingsOfWeeklySchedules: (bookings, weeklySchedules) => {
    const result = [];
    _forEach(bookings, (booking) => {
      const serviceDateTimeMoment = moment(booking.serviceDateTime.iso).tz(DEFAULT_TIMEZONE);
      const serviceDateTimeMinutes = convertToMinutes(serviceDateTimeMoment);
      const dayOfWeek = serviceDateTimeMoment.isoWeekday() % 7;
      let daySchedules = weeklySchedules[dayOfWeek];
      if (_isEmpty(daySchedules)) {
        result.push(booking);
        return;
      }
      if (!_isArray(daySchedules)) {
        daySchedules = [daySchedules];
      }

      const isInside = _some(
        daySchedules,
        (sched) =>
          serviceDateTimeMinutes >= convertToMinutesFromHourFormat(sched.startTime) &&
          serviceDateTimeMinutes + booking.totalDuration <= convertToMinutesFromHourFormat(sched.endTime),
      );
      if (!isInside) {
        result.push(booking);
      }
    });

    return result;
  },

  formatOutsideBookings: (outsideBookings) => {
    const outsideBookingsInfos = _map(outsideBookings, (booking) => {
      return { objectId: booking.objectId, serviceDateTime: booking.serviceDateTime.iso };
    });
    return _sortBy(outsideBookingsInfos, (bookingsInfos) => bookingsInfos.serviceDateTime);
  },

  slugify: (string) => {
    let slugStr = slug(string);
    if (_isEmpty(slugStr)) {
      slugStr = '-';
    }
    return slugStr;
  },

  isEmptyWeeklySchedule: (daySchedule) => {
    return _some(daySchedule, (sched) => {
      return sched.endSchedule === null && sched.startAt === sched.endAt;
    });
  },

  getDatesArrayByDayOfWeek: (dayOfWeek, from, to) => {
    const datesArr = [];

    const fromMoment = moment(from).startOf('day').tz(DEFAULT_TIMEZONE);
    const toMoment = moment(to).endOf('day').tz(DEFAULT_TIMEZONE);

    // Our day of week is from 0: Sun to 6: Sat, but isoweekday is from 1: Mon to 7: Sun
    const iteratorMoment = from.clone().isoWeekday(dayOfWeek === 0 ? 7 : dayOfWeek);
    while (iteratorMoment <= toMoment) {
      if (fromMoment <= iteratorMoment) {
        datesArr.push(iteratorMoment.format('YYYY-MM-DD'));
      }
      iteratorMoment.add(1, 'weeks');
    }
    return datesArr;
  },

  getUnavailableDaysFromWeeklySchedule: (groupedWeeklySchedule, from, today, tomorrow, endMonth) => {
    const result = [];

    let fromOrTomorrow = from;
    if (from.isSame(today)) {
      fromOrTomorrow = tomorrow;
      const todayDayOfWeek = today.isoWeekday() % 7;
      const todayDaySchedule = groupedWeeklySchedule[todayDayOfWeek];
      const todayEndOfDay = today.clone().endOf('day');
      const isTodayUnavailable = _some(
        todayDaySchedule,
        (sched) =>
          sched.startAt === sched.endAt &&
          sched.startSchedule <= today.toISOString() &&
          sched.endSchedule >= todayEndOfDay.toISOString(),
      );
      isTodayUnavailable && result.push(today.format('YYYY-MM-DD'));
    }
    if (fromOrTomorrow < endMonth) {
      for (let i = 0; i <= 6; i++) {
        if (Helper.isEmptyWeeklySchedule(groupedWeeklySchedule[i])) {
          result.push(...Helper.getDatesArrayByDayOfWeek(i, fromOrTomorrow, endMonth));
        }
      }
    }

    return result;
  },

  buildDynamicLink: (webUrl) => {
    let android = '';
    let ios = '';

    if (generalConfig.androidAppId) {
      android = `&apn=${generalConfig.androidAppId}&afl=${webUrl}`;
    }
    if (generalConfig.iosAppId) {
      ios += `&ifl=${webUrl}`;
      ios += `&ibi=${generalConfig.iosAppId}`;
    }
    if (generalConfig.iosStoreAppId) {
      ios += `&isi=${generalConfig.iosStoreAppId}`;
    }

    return `${generalConfig.dynamicLinkUrl}/?link=${webUrl}${android}${ios}&efr=1`;
  },

  createContextFromRequest: (request) => {
    return createContextFromRequestUser(request.user);
  },

  getMongoWriteOpResult: (result = {}) => {
    const {
      insertedCount,
      matchedCount,
      modifiedCount,
      deletedCount,
      upsertedCount,
      nInserted,
      nMatched,
      nModified,
      nRemoved,
      nUpserted,
    } = result;
    return _.omitBy(
      {
        insertedCount,
        matchedCount,
        modifiedCount,
        deletedCount,
        upsertedCount,
        nInserted,
        nMatched,
        nModified,
        nRemoved,
        nUpserted,
      },
      _.isNil,
    );
  },

  isFirstSetWeeklySchedule: (startDate, schedules) => {
    const nextDate = moment(startDate).add(1, 'day');
    for (let i = 0; i < schedules.length; i++) {
      const isFirstSetting = nextDate
        .tz(DEFAULT_TIMEZONE)
        .isSame(moment(schedules[i].startAt).tz(DEFAULT_TIMEZONE), 'date');
      const isOffDay = moment(schedules[i].endAt)
        .tz(DEFAULT_TIMEZONE)
        .isSame(moment(schedules[i].startAt).tz(DEFAULT_TIMEZONE));
      if (!isFirstSetting || !isOffDay) {
        return true;
      }
    }
    return false;
  },

  getStylistUser: async (stylistId) => {
    if (!stylistId) {
      return Promise.resolve();
    }
    const userQuery = BaseQuery.getUserQuery();
    userQuery.equalTo('stylist', Helper.getPointerValue('Stylist', stylistId));
    const userParse = await userQuery.first({ useMasterKey: true });
    if (!userParse) {
      const { code } = Errors.OBJECT_NOT_FOUND;
      throw new Parse.Error(code, 'User does not exist.');
    }
    return userParse;
  },

  getCustomerUser: async (customerId) => {
    if (!customerId) {
      return Promise.resolve();
    }
    const userQuery = BaseQuery.getUserQuery();
    userQuery.equalTo('customer', Helper.getPointerValue('Customer', customerId));
    const userParse = await userQuery.first({ useMasterKey: true });
    if (!userParse) {
      const { code } = Errors.OBJECT_NOT_FOUND;
      throw new Parse.Error(code, 'User does not exist.');
    }
    return userParse;
  },

  executeInTransaction: async (fn, mongoClient) => {
    const session = mongoClient.startSession();
    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' },
    };

    try {
      await session.withTransaction(async () => {
        await fn(session);
      }, transactionOptions);
    } finally {
      await session.endSession();
    }
  },

  checkIfStylistNeedSetNewPassword: (user) => {
    if (user.get('status') === USER_STATUS.INVITED) {
      return true;
    }
    return false;
  },

  getShortLinkForStylist: (url) => {
    return getShortLinkFromFirebase({
      url,
      bundleId: generalConfig.firebaseDynamicLinkIosBundleIdStylist,
      urlPrefix: generalConfig.firebaseDynamicLinkUriPrefixStylist,
    });
  },

  getShortLinkForCustomer: (url) => {
    return getShortLinkFromFirebase({
      url,
      bundleId: generalConfig.firebaseDynamicLinkIosBundleIdCustomer,
      urlPrefix: generalConfig.firebaseDynamicLinkUriPrefixCustomer,
    });
  },

  getShortWebsiteLink: (params) => {
    const queryString = new URLSearchParams(params).toString();
    let url = 'https://hairlie.jp';
    if (queryString) {
      url = `${url}?${queryString}`;
    }
    return getShortLinkFromFirebase({
      url,
      bundleId: generalConfig.firebaseDynamicLinkIosBundleIdCustomer,
      urlPrefix: generalConfig.firebaseDynamicLinkUriPrefixCustomer,
    });
  },

  getDeletingAccountReasons: (reasons) => {
    const result = [];
    reasons.forEach((item) => {
      const reason = _.find(REASON_DELETE_ACCOUNT, { id: item.id });
      if (reason) {
        const element = {
          ...reason,
        };
        if (reason.hasExtraInput && item.extraInput) {
          element.extraInput = item.extraInput;
        }
        result.push(element);
      }
    });
    return result;
  },
  checkTime: (i) => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  },
  processAttributeForCsv: (parserObjects, attributes, timezone, dateTimeFormat) => {
    return parserObjects.map((salon) => {
      const result = Helper.convertParseObjectToJson(salon, attributes);
      attributes.forEach((attribute) => {
        result[attribute] = result[attribute] || '';
      });
      return {
        ...result,
        createdAt: result.createdAt ? moment(result.createdAt).tz(timezone).format(dateTimeFormat) : '',
      };
    });
  },

  getShortSalonLinkForStylist: (params) => {
    const queryString = new URLSearchParams(params).toString();
    let url = `${generalConfig.salonBaseUrl}/mysalon/booking`;
    if (queryString) {
      url = `${url}?${queryString}`;
    }
    return getShortLinkFromFirebase({
      url,
      bundleId: generalConfig.firebaseDynamicLinkIosBundleIdStylist,
      urlPrefix: generalConfig.firebaseDynamicLinkUriPrefixStylist,
    });
  },
  getSalonImage: (salon) => {
    if (salon.get('salonImage')) {
      return {
        thumbSmall: salon.get('salonImage').get('thumbSmall') ? salon.get('salonImage').get('thumbSmall').url() : '',
        thumbMedium: salon.get('salonImage').get('thumbMedium') ? salon.get('salonImage').get('thumbMedium').url() : '',
        thumbLarge: salon.get('salonImage').get('thumbLarge') ? salon.get('salonImage').get('thumbLarge').url() : '',
      };
    }
    return {};
  },

  getAnNanoId: async () => {
    const newFunction = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
    return await newFunction();
  },

  processOrderAndPaginationMongo: (pagingParams) => {
    const order = !_.isNil(pagingParams.order) ? ORDER[pagingParams.order] : -1;
    const orderBy = !_.isNil(pagingParams.orderBy)
      ? MONGO_FIELD[pagingParams.orderBy] || pagingParams.orderBy
      : '_created_at';
    const page = !_.isNil(pagingParams.page) ? Number(pagingParams.page) : 1;
    const limit = !_.isNil(pagingParams.limit) ? Number(pagingParams.limit) : 10;
    const skip = limit * (page - 1);
    return {
      order,
      orderBy,
      page,
      limit,
      skip,
    };
  },

  getPlatformInfo: function (headers) {
    if (headers && headers['x-parse-platform']) {
      return headers['x-parse-platform'];
    }
    return 'app-ios';
  },

  getNextCycle: () => {
    const curentDateTime = momentTZ().tz(DEFAULT_TIMEZONE).startOf('day');
    let day = Number(curentDateTime.format('DD'));
    const CYCLE_DAY = 15;
    day = day <= CYCLE_DAY ? 16 : 1;
    let startCycle = null;
    let endCycle = null;
    if (day === 16) {
      startCycle = curentDateTime.clone().set({ date: day });
      endCycle = curentDateTime.clone().endOf('month');
    } else {
      startCycle = curentDateTime.clone().add(1, 'month').set({ date: day });
      endCycle = curentDateTime.clone().add(1, 'month').set({ date: 15 }).endOf('day');
    }
    return {
      startCycle: startCycle.toDate(),
      endCycle: endCycle.toDate(),
    };
  },

  getCurrentCycle: () => {
    const curentDateTime = momentTZ().tz(DEFAULT_TIMEZONE).startOf('day');
    let day = Number(curentDateTime.format('DD'));
    const CYCLE_DAY = 15;
    day = day > CYCLE_DAY ? 16 : 1;
    let startCycle = null;
    let endCycle = null;
    if (day === 16) {
      startCycle = curentDateTime.clone().set({ date: day });
      endCycle = curentDateTime.clone().endOf('month');
    } else {
      startCycle = curentDateTime.clone().set({ date: day });
      endCycle = curentDateTime.clone().set({ date: 15 }).endOf('day');
    }
    return {
      startCycle: startCycle.toDate(),
      endCycle: endCycle.toDate(),
    };
  },

  getCycleIdFromStartCycle: (startCycle) => {
    const curentDateTime = momentTZ(startCycle).tz(DEFAULT_TIMEZONE);
    return curentDateTime.format('YYYYMMDD');
  },

  procesStartTimeWithCurentTime: (startAt, endAt) => {
    const BASE_SLOT = 30;
    const startTime = moment(startAt).tz(DEFAULT_TIMEZONE);
    const endTime = moment(endAt).tz(DEFAULT_TIMEZONE);
    const startHours = Number(startTime.clone().format('HH'));

    const curentTime = moment().tz(DEFAULT_TIMEZONE);
    const curentHours = Number(curentTime.clone().format('HH'));
    const curentMinus = Number(curentTime.clone().format('mm'));
    if (startHours > curentHours || startTime > curentTime.clone().endOf('day')) {
      return startTime.clone();
    }
    let newCurentTime = '';
    if (curentMinus >= BASE_SLOT) {
      newCurentTime = curentTime.clone().add(1, 'hours').set({
        minute: 0,
      });
    } else {
      newCurentTime = curentTime.clone().set({
        minute: 30,
      });
    }
    const newStartTime = startTime.clone().set({
      minute: newCurentTime.clone().format('mm'),
      hour: newCurentTime.clone().format('HH'),
    });
    if (moment(endTime).isSameOrAfter(newStartTime)) {
      return newStartTime;
    }
    return endTime;
  },

  convertSpecialCharacterForMongo: (text) => {
    if (text === '') return text;
    return text.replace(/[.*+?^${}()"|[\]\\]/g, '\\$&');
  },

  processBookingStatusExtend: ({ bookingStatus, lastBookingStatus }) => {
    const BOOKING_STATUS = {
      CANCELED_OPERATOR: 'CANCELED_OPERATOR',
      CANCELED_CUSTOMER: 'CANCELED_CUSTOMER',
      CANCELED_STYLIST: 'CANCELED_STYLIST',
      CANCELED_WITH_FEE: 'CANCELED_WITH_FEE',
    };
    switch (bookingStatus) {
      case BOOKING_STATUS.CANCELED_CUSTOMER:
      case BOOKING_STATUS.CANCELED_STYLIST:
      case BOOKING_STATUS.CANCELED_OPERATOR:
        if (lastBookingStatus) {
          return `${lastBookingStatus}_${bookingStatus}`;
        }
        return `REQUESTED_${bookingStatus}`;
      default:
        return bookingStatus;
    }
  },

  getChangeArrayId: (oldIds, newIds) => {
    const assigned = new Set(newIds);
    const unassigned = new Set(oldIds);
    const totalIds = new Set(oldIds.concat(newIds));
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
  },
  processResultMongoFacet: (result) => {
    return {
      total: result.length > 0 && result[0].count[0] ? result[0].count[0].total : 0,
      list: result.length > 0 ? result[0].list : [],
    };
  },
});
