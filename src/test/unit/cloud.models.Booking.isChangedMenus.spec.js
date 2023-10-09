const test = require('japa')
const bookingModel = require('./../../cloud/models/Booking')
test.group('cloud.models.Booking.isChangedMenus', () => {
    const oldMenus = [
        {
            amount: 1000,
            duration: 20,
            name: 'm1', 
            objectId: 'm1',
        },
        {
            amount: 2000,
            duration: 20,
            name: 'm2', 
            objectId: 'm2',
        }
    ]
    const newMenus = [
        {
            amount: 1000,
            duration: 20,
            name: 'm1', 
            objectId: 'm1',
        },
        {
            amount: 2000,
            duration: 20,
            name: 'm2', 
            objectId: 'm2',
        }
    ]
    const menu = {
        amount: 3000,
        duration: 30,
        name: 'm3', 
        objectId: 'm3',
    }
    test('new menus has more menu than old menus', (assert) => {
        const result = bookingModel.isChangedMenus({
            oldMenus,
            newMenus: [...newMenus, menu]
        })
        assert.equal(result, true)
    })
    test('new menus has less menu than old menus', (assert) => {
        const result = bookingModel.isChangedMenus({
            oldMenus: [...oldMenus, menu],
            newMenus
        })
        assert.equal(result, true)
    })
    test('new menus has one deffirent amount from old menus', (assert) => {
        const changedMenus = newMenus.map(a => {return {...a}})
        changedMenus[0].amount = 10
        const result = bookingModel.isChangedMenus({
            oldMenus,
            newMenus: changedMenus
        })
        assert.equal(result, true)
    })
    test('new menus has one deffirent menu from old menus', (assert) => {
        const changedMenus = newMenus.map(a => {return {...a}})
        changedMenus[0].objectId = 'm10'
        const result = bookingModel.isChangedMenus({
            oldMenus,
            newMenus: changedMenus
        })
        assert.equal(result, true)
    })
    test('new menus is the same as old menus', (assert) => {
        const result = bookingModel.isChangedMenus({
            oldMenus,
            newMenus
        })
        assert.equal(result, false)
    })
})