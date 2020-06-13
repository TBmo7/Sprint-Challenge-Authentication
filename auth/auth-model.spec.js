const db = require('../database/connection.js')
const Auth = require('./auth-model.js')


describe('auth-model', ()=>{
    describe('add()', async()=>{
        it('should add a user into the db', async ()=>{
            await Auth.add({username:'Will',password:'Sasso'})
            await Auth.add({username: 'Bobby',password:'Lee'})
            const auth = await db('users');
            expect(auth).toHaveLength(2)
        })
    })
    describe('add()', ()=>{
        it('should add users into the db correctly', async()=>{
            await Auth.add({username:'itunes',password:'zune'})
            const auth = await db('users');
            expect(auth).toHaveLength(1)
        })
    })
    describe('find()', ()=>{
        it('should return users', async()=>{
            const auth = await Auth.find();
            expect(auth).toHaveLength(0)
        })
    })

    beforeEach(async()=>{
        await db('users').truncate()
    })




})