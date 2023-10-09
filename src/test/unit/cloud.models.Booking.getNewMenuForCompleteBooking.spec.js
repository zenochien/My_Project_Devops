const test = require('japa')
const bookingModel = require('../../cloud/models/Booking')
const _ = require('lodash')
test.group('cloud.models.Booking.getNewMenuForCompleteBooking', () => {
    // oldMenus, menusInParams, newMenus,  newMenuIds
    const oldMenus = [
        {
            amount: 1000,
            duration: 10,
            name: 'm1', 
            objectId: 'm1',
        }
    ]
    const newMenus = [
        {
            amount: 2000,
            duration: 20,
            name: 'm2', 
            objectId: 'm2',
        },
        {
            amount: 3000,
            duration: 30,
            name: 'm3', 
            objectId: 'm3',
        },
    ]
    test('newMenuIds is difirent from newMenus', (assert) => {
        const menu2 = { ..._.find(newMenus, { id: 'm2'}) }
        try{
            bookingModel.getNewMenuForCompleteBooking({
                oldMenus: oldMenus.map(a => {return {...a}}),
                menusInParams: [
                    {
                        id: 'm2',
                        isNew: true
                    },
                    {
                        id: 'm3',
                        isNew: true
                    }
                ], 
                newMenus: [menu2],  
                newMenuIds: ['m2', 'm3'] 
            })
        }catch(error){
            if(error.code === 9801){
                assert.equal(1,1)
                return true
            }
        }
        assert.equal(1,2)
    })

    test('newMenus has a new menu price', (assert) => {
        const menu2 = { ..._.find(newMenus, { objectId: 'm2'})}
        const menu3 = { ..._.find(newMenus, { objectId: 'm3'}) }
        menu3.amount = 5000
        menu3.originalPrice = 3000
        const result = bookingModel.getNewMenuForCompleteBooking({
            oldMenus: oldMenus.map(a => {return {...a}}),
            menusInParams: [
                {
                    id: 'm2',
                    isNew: true
                },
                {
                    id: 'm3',
                    isNew: true,
                    newPrice: 5000
                }
            ], 
            newMenus: newMenus.map(a => {return {...a}}),  
            newMenuIds: ['m2', 'm3'] 
        })
        assert.deepEqual(result, [...oldMenus, menu2, menu3])
    })
    
})