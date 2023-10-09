const test = require('japa')
const helper = require('../../utils/helper');

test.group('utils.helper.isFirstSetWeeklySchedule', (group) => {
    const initialschedules = [
        {
            "dayOfWeek": 0,
            "startAt": "2021-11-04T15:00:00.000Z",
            "endAt": "2021-11-04T15:00:00.000Z",
            "startSchedule": "2021-11-04T15:00:00.000Z",
            "endSchedule": null
        },
        {
            "dayOfWeek": 1,
            "startAt": "2021-11-04T15:00:00.000Z",
            "endAt": "2021-11-04T15:00:00.000Z",
            "startSchedule": "2021-11-04T15:00:00.000Z",
            "endSchedule": null
        },
        {
            "dayOfWeek": 2,
            "startAt": "2021-11-04T15:00:00.000Z",
            "endAt": "2021-11-04T15:00:00.000Z",
            "startSchedule": "2021-11-04T15:00:00.000Z",
            "endSchedule": null
        },
        {
            "dayOfWeek": 3,
            "startAt": "2021-11-04T15:00:00.000Z",
            "endAt": "2021-11-04T15:00:00.000Z",
            "startSchedule": "2021-11-04T15:00:00.000Z",
            "endSchedule": null
        },
        {
            "dayOfWeek": 4,
            "startAt": "2021-11-04T15:00:00.000Z",
            "endAt": "2021-11-04T15:00:00.000Z",
            "startSchedule": "2021-11-04T15:00:00.000Z",
            "endSchedule": null
        },
        {
            "dayOfWeek": 5,
            "startAt": "2021-11-04T15:00:00.000Z",
            "endAt": "2021-11-04T15:00:00.000Z",
            "startSchedule": "2021-11-04T15:00:00.000Z",
            "endSchedule": null
        },
        {
            "dayOfWeek": 6,
            "startAt": "2021-11-04T15:00:00.000Z",
            "endAt": "2021-11-04T15:00:00.000Z",
            "startSchedule": "2021-11-04T15:00:00.000Z",
            "endSchedule": null
        }
    ]

  test('initial schedule', (assert) => {
    const result = helper.isFirstSetWeeklySchedule('2021-11-04T00:00:00.000Z', initialschedules);
    assert.equal(result, false)
  })

  test('modified schedule', (assert) => {
    const modifiedSchedules = initialschedules.map(item => ({...item}))
    modifiedSchedules[0].endAt = "2021-11-04T20:00:00.000Z"
    const result = helper.isFirstSetWeeklySchedule('2021-11-04T00:00:00.000Z', modifiedSchedules);
    assert.equal(result, true)
  })

  test('The schedule have been modified but currently it have been reset', (assert) => {
    const result = helper.isFirstSetWeeklySchedule('2021-11-01T00:00:00.000Z', initialschedules);
    assert.equal(result, true)
  })
})