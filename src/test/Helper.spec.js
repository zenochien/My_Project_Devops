const chai = require('chai');
const test = require('japa')
var expect = chai.expect;
const Helper = require('../utils/helper');
const moment = require('moment-timezone');
const { DEFAULT_TIMEZONE } = require('../const/Constants');

test.group('Test some functions in Helper', () => {
  test('getDatesArrayByDayOfWeek', () => {
    // From the first day to the last day of a month, with all day of week
    let from = moment('2030-10-01T00:00:00.000+09:00').tz(DEFAULT_TIMEZONE); // day of week: 2
    let to = moment('2030-10-31T23:59:59.999+09:00').tz(DEFAULT_TIMEZONE); // day of week: 4

    let arr = Helper.getDatesArrayByDayOfWeek(0, from, to);
    expect(arr).to.deep.equal(['2030-10-06', '2030-10-13', '2030-10-20', '2030-10-27']);

    arr = Helper.getDatesArrayByDayOfWeek(1, from, to);
    expect(arr).to.deep.equal(['2030-10-07', '2030-10-14', '2030-10-21', '2030-10-28']);

    arr = Helper.getDatesArrayByDayOfWeek(2, from, to);
    expect(arr).to.deep.equal(['2030-10-01', '2030-10-08', '2030-10-15', '2030-10-22', '2030-10-29']);

    arr = Helper.getDatesArrayByDayOfWeek(3, from, to);
    expect(arr).to.deep.equal(['2030-10-02', '2030-10-09', '2030-10-16', '2030-10-23', '2030-10-30']);

    arr = Helper.getDatesArrayByDayOfWeek(4, from, to);
    expect(arr).to.deep.equal(['2030-10-03', '2030-10-10', '2030-10-17', '2030-10-24', '2030-10-31']);

    arr = Helper.getDatesArrayByDayOfWeek(5, from, to);
    expect(arr).to.deep.equal(['2030-10-04', '2030-10-11', '2030-10-18', '2030-10-25']);

    arr = Helper.getDatesArrayByDayOfWeek(6, from, to);
    expect(arr).to.deep.equal(['2030-10-05', '2030-10-12', '2030-10-19', '2030-10-26']);

    // From the fifth day to the last day of a month, with Friday day of week, the first Friday is excluded
    from = moment('2030-10-05T00:00:00.000+09:00').tz(DEFAULT_TIMEZONE); // day of week: 6
    to = moment('2030-10-31T23:59:59.999+09:00').tz(DEFAULT_TIMEZONE); // day of week: 4
    arr = Helper.getDatesArrayByDayOfWeek(5, from, to);
    expect(arr).to.deep.equal(['2030-10-11', '2030-10-18', '2030-10-25']);

    // From the fifth day to the last day of a month, with Sunday day of week, the first Sunday is still include
    from = moment('2030-10-05T00:00:00.000+09:00').tz(DEFAULT_TIMEZONE); // day of week: 6
    to = moment('2030-10-31T23:59:59.999+09:00').tz(DEFAULT_TIMEZONE); // day of week: 6
    arr = Helper.getDatesArrayByDayOfWeek(0, from, to);
    expect(arr).to.deep.equal(['2030-10-06', '2030-10-13', '2030-10-20', '2030-10-27']);

    // From the sixth day to the 22nd day of a month, with Thursday day of week, the 1st, 4th, 5th Thursday is still excluded
    from = moment('2030-10-06T23:59:59.999+09:00').tz(DEFAULT_TIMEZONE); // day of week: 0
    to = moment('2030-10-22T23:59:59.999+09:00').tz(DEFAULT_TIMEZONE); // day of week: 2
    arr = Helper.getDatesArrayByDayOfWeek(4, from, to);
    expect(arr).to.deep.equal(['2030-10-10', '2030-10-17']);
  });

  test('getUnavailableDaysFromWeeklySchedule', () => {
    // from and endmonth is the same as today's month
    let groupedWeeklySchedule = {
      0: [
        {
          dayOfWeek: 0,
          startAt: '2021-09-11T00:00:00.000Z',
          endAt: '2021-09-11T01:00:00.000Z',
          startSchedule: '2021-09-10T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      1: [
        {
          dayOfWeek: 1,
          startAt: '2021-09-10T23:00:00.000Z',
          endAt: '2021-09-11T09:00:00.000Z',
          startSchedule: '2021-09-10T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      2: [
        {
          dayOfWeek: 2,
          startAt: '2021-09-10T15:00:00.000Z',
          endAt: '2021-09-10T15:00:00.000Z',
          startSchedule: '2021-09-10T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      3: [
        {
          dayOfWeek: 3,
          startAt: '2021-09-11T00:00:00.000Z',
          endAt: '2021-09-11T09:00:00.000Z',
          startSchedule: '2021-09-10T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      4: [
        {
          dayOfWeek: 4,
          startAt: '2021-09-11T00:00:00.000Z',
          endAt: '2021-09-11T09:00:00.000Z',
          startSchedule: '2021-09-10T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      5: [
        {
          dayOfWeek: 5,
          startAt: '2021-09-11T00:00:00.000Z',
          endAt: '2021-09-11T14:30:00.000Z',
          startSchedule: '2021-09-10T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      6: [
        {
          dayOfWeek: 6,
          startAt: '2021-09-10T15:00:00.000Z',
          endAt: '2021-09-10T15:00:00.000Z',
          startSchedule: '2021-09-10T15:00:00.000Z',
          endSchedule: null,
        },
      ],
    };
    let from = moment('2021-09-16T00:00:00+09:00').tz(DEFAULT_TIMEZONE);
    let today = moment('2021-09-16T00:00:00+09:00').tz(DEFAULT_TIMEZONE);
    let tomorrow = moment('2021-09-17T00:00:00+09:00').tz(DEFAULT_TIMEZONE);
    let endMonth = moment('2021-09-30T23:59:59+09:00').tz(DEFAULT_TIMEZONE);

    let arr = Helper.getUnavailableDaysFromWeeklySchedule(groupedWeeklySchedule, from, today, tomorrow, endMonth);
    expect(arr).to.deep.equal(['2021-09-21', '2021-09-28', '2021-09-18', '2021-09-25']);

    // The same as above except the day of week 4 was updated
    groupedWeeklySchedule = {
      0: [
        {
          dayOfWeek: 0,
          startAt: '2021-09-17T00:00:00.000Z',
          endAt: '2021-09-17T01:00:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      1: [
        {
          dayOfWeek: 1,
          startAt: '2021-09-16T15:00:00.000Z',
          endAt: '2021-09-17T14:30:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      2: [
        {
          dayOfWeek: 2,
          startAt: '2021-09-16T15:00:00.000Z',
          endAt: '2021-09-16T15:00:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      3: [
        {
          dayOfWeek: 3,
          startAt: '2021-09-17T00:00:00.000Z',
          endAt: '2021-09-17T09:00:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      4: [
        {
          dayOfWeek: 4,
          startAt: '2021-09-16T15:00:00.000Z',
          endAt: '2021-09-16T15:00:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
        {
          dayOfWeek: 4,
          startAt: '2021-09-11T00:00:00.000Z',
          endAt: '2021-09-11T09:00:00.000Z',
          startSchedule: '2021-09-10T15:00:00.000Z',
          endSchedule: '2021-09-16T14:59:59.999Z',
        },
      ],
      5: [
        {
          dayOfWeek: 5,
          startAt: '2021-09-17T00:00:00.000Z',
          endAt: '2021-09-17T14:30:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      6: [
        {
          dayOfWeek: 6,
          startAt: '2021-09-16T15:00:00.000Z',
          endAt: '2021-09-16T15:00:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
    };
    from = moment('2021-09-16T00:00:00+09:00').tz(DEFAULT_TIMEZONE);
    today = moment('2021-09-16T00:00:00+09:00').tz(DEFAULT_TIMEZONE);
    tomorrow = moment('2021-09-17T00:00:00+09:00').tz(DEFAULT_TIMEZONE);
    endMonth = moment('2021-09-30T23:59:59+09:00').tz(DEFAULT_TIMEZONE);

    arr = Helper.getUnavailableDaysFromWeeklySchedule(groupedWeeklySchedule, from, today, tomorrow, endMonth);
    expect(arr).to.deep.equal(['2021-09-21', '2021-09-28', '2021-09-23', '2021-09-30', '2021-09-18', '2021-09-25']);

    // from and endMonth of a future month
    groupedWeeklySchedule = {
      0: [
        {
          dayOfWeek: 0,
          startAt: '2021-09-17T00:00:00.000Z',
          endAt: '2021-09-17T01:00:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      1: [
        {
          dayOfWeek: 1,
          startAt: '2021-09-16T15:00:00.000Z',
          endAt: '2021-09-17T14:30:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      2: [
        {
          dayOfWeek: 2,
          startAt: '2021-09-16T15:00:00.000Z',
          endAt: '2021-09-16T15:00:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      3: [
        {
          dayOfWeek: 3,
          startAt: '2021-09-17T00:00:00.000Z',
          endAt: '2021-09-17T09:00:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      4: [
        {
          dayOfWeek: 4,
          startAt: '2021-09-16T15:00:00.000Z',
          endAt: '2021-09-16T15:00:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      5: [
        {
          dayOfWeek: 5,
          startAt: '2021-09-17T00:00:00.000Z',
          endAt: '2021-09-17T14:30:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
      6: [
        {
          dayOfWeek: 6,
          startAt: '2021-09-16T15:00:00.000Z',
          endAt: '2021-09-16T15:00:00.000Z',
          startSchedule: '2021-09-16T15:00:00.000Z',
          endSchedule: null,
        },
      ],
    };

    from = moment('2021-11-01T00:00:00+09:00').tz(DEFAULT_TIMEZONE);
    today = moment('2021-09-16T00:00:00+09:00').tz(DEFAULT_TIMEZONE);
    tomorrow = moment('2021-09-17T00:00:00+09:00').tz(DEFAULT_TIMEZONE);
    endMonth = moment('2021-11-30T23:59:59+09:00').tz(DEFAULT_TIMEZONE);

    arr = Helper.getUnavailableDaysFromWeeklySchedule(groupedWeeklySchedule, from, today, tomorrow, endMonth);
    expect(arr).to.deep.equal([
      '2021-11-02',
      '2021-11-09',
      '2021-11-16',
      '2021-11-23',
      '2021-11-30',
      '2021-11-04',
      '2021-11-11',
      '2021-11-18',
      '2021-11-25',
      '2021-11-06',
      '2021-11-13',
      '2021-11-20',
      '2021-11-27',
    ]);
  });
});
