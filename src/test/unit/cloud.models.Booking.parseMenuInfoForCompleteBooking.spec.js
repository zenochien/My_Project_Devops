const test = require('japa')
const bookingModel = require('../../cloud/models/Booking')
const _ = require('lodash')
test.group('cloud.models.Booking.parseMenuInfoForCompleteBooking', () => {
    const menuIds = []
    const lastMenus = [
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
    test('menuIds has more menu than old menus', (assert) => {
        const menusInBooking = lastMenus.map(a => {return {...a}})
        const result = bookingModel.parseMenuInfoForCompleteBooking({
            menuIds: ['m1', 'm2', 'm3'],
            lastMenus: menusInBooking
        })
        assert.deepEqual(result, {
            oldObjectMenus: menusInBooking, 
            newMenuIds: ['m3'], 
            menusInParams: []
        })
    })

    test('menuIds has less menu than old menus', (assert) => {
        const menusInBooking = lastMenus.map(a => {return {...a}})
        const result = bookingModel.parseMenuInfoForCompleteBooking({
            menuIds: ['m1'],
            lastMenus: menusInBooking
        })
        assert.deepEqual(result, {
            oldObjectMenus: [_.find(menusInBooking, { objectId: 'm1'})], 
            newMenuIds: [], 
            menusInParams: []
        })
    })

    test('menuIds replace one menu in old menus', (assert) => {
        const menusInBooking = lastMenus.map(a => {return {...a}})
        const result = bookingModel.parseMenuInfoForCompleteBooking({
            menuIds: ['m1', 'm3'],
            lastMenus: menusInBooking
        })
        assert.deepEqual(result, {
            oldObjectMenus: [_.find(menusInBooking, { objectId: 'm1'})], 
            newMenuIds: ['m3'], 
            menusInParams: []
        })
    })

    test('menuIds are the same as old menus', (assert) => {
        const menusInBooking = lastMenus.map(a => {return {...a}})
        const result = bookingModel.parseMenuInfoForCompleteBooking({
            menuIds: ['m1', 'm2'],
            lastMenus: menusInBooking
        })
        assert.deepEqual(result, {
            oldObjectMenus: menusInBooking, 
            newMenuIds: [], 
            menusInParams: []
        })
    })

    test('newMenus has more menu than old menu', (assert) => {
        const menusInBooking = lastMenus.map(a => {return {...a}})
        const m1 = { ..._.find(lastMenus, { objectId: 'm1'})}
        const m2 = { ..._.find(lastMenus, { objectId: 'm2'})}
        const newMenus = [
            {
                id: 'm1',
                isNew: false
            },
            {
                id: 'm2',
                isNew: false,
                memo: 'memo2'
            },
            {
                id: 'm3',
                isNew: true,
                memo: 'memo3'
            }
        ]
        const result = bookingModel.parseMenuInfoForCompleteBooking({
            newMenus,
            lastMenus: menusInBooking
        })
        assert.deepEqual(result, {
            oldObjectMenus: [m1,m2], 
            newMenuIds: ['m3'], 
            menusInParams: newMenus
        })
    })

    test('newMenus has less menu than old menu', (assert) => {
        const menusInBooking = lastMenus.map(a => {return {...a}})
        const newMenus = [
            {
                id: 'm1',
                isNew: false
            }
        ]
        const result = bookingModel.parseMenuInfoForCompleteBooking({
            newMenus,
            lastMenus: menusInBooking
        })
        assert.deepEqual(result, {
            oldObjectMenus: [_.find(menusInBooking, { objectId: 'm1'})], 
            newMenuIds: [], 
            menusInParams: newMenus
        })
    })

    test('newMenus change one old menu price', (assert) => {
        const menusInBooking = lastMenus.map(a => {return {...a}})
        const newMenus = [
            {
                id: 'm1',
                isNew: false
            },
            {
                id: 'm2',
                isNew: true,
                newPrice: 5000
            }
        ]
        const result = bookingModel.parseMenuInfoForCompleteBooking({
            newMenus,
            lastMenus: menusInBooking
        })
        const changedMenu = _.find(menusInBooking, { objectId: 'm2'})
        changedMenu.originalPrice = changedMenu.amount
        changedMenu.amount = 5000
        assert.deepEqual(result, {
            oldObjectMenus: [_.find(menusInBooking, { objectId: 'm1'}), changedMenu], 
            newMenuIds: [], 
            menusInParams: newMenus
        })
    })

    test('newMenus change one new menu price', (assert) => {
        const menusInBooking = lastMenus.map(a => {return {...a}})
        const newMenus = [
            {
                id: 'm1',
                isNew: false
            },
            {
                id: 'm3',
                isNew: true,
                newPrice: 5000
            }
        ]
        const result = bookingModel.parseMenuInfoForCompleteBooking({
            newMenus,
            lastMenus: menusInBooking
        })
        assert.deepEqual(result, {
            oldObjectMenus: [_.find(menusInBooking, { objectId: 'm1'})], 
            newMenuIds: ['m3'], 
            menusInParams: newMenus
        })
    })

    test('newMenus change one old menu price but both prices are the same', (assert) => {
        const menusInBooking = lastMenus.map(a => {return {...a}})
        const newMenus = [
            {
                id: 'm1',
                isNew: false
            },
            {
                id: 'm2',
                isNew: true,
                newPrice: 2000,
                memo: 'hello'
            }
        ]
        const result = bookingModel.parseMenuInfoForCompleteBooking({
            newMenus,
            lastMenus: menusInBooking
        })
        assert.deepEqual(result, {
            oldObjectMenus: menusInBooking, 
            newMenuIds: [], 
            menusInParams: newMenus
        })
    })
    
})