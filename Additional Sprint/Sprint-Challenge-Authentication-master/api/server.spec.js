const request = require('supertest');
const server = require('./server.js');


describe('server.js', ()=>{

    it('should return 200 ok', ()=>{
        return request(server).get('/')
        .then(res=>{
            expect(res.status).toBe(200)
        })
    })

    it('should return 200 using async', async ()=>{
        const res = await request(server).get('/')
        expect(res.status).toBe(200)
    })

    it('should return 200 ok', ()=>{
        return request(server).get('/api/auth/')
        .then(res=>{
            expect(res.status).toBe(200)
        })
    })

    it('should return 201', async ()=>{
        let req = {username:'Bobby',password:'Lee'}
        const res = await request(server).post('/api/auth/register')
        .send(req)
       expect(res.status).toBe(201)
    })

    it('should return 201', ()=>{
        return request(server).post('/api/auth/register')
        .send({username:"Theo",password:"Von"})
        .then(res=>{
            expect(res.status).toBe(201)
        })
    })

    it('should return 401',()=>{
        return request(server).post('/api/auth/login')
        .send({username:'Will', password:'Sasso'})
        .then(res=>{
            expect(res.status).toBe(401)
        })
    })

    it('should return 400', async ()=>{
        let req = {username:"John"}
        const res = await request(server).post('/api/auth/login')
        .send(req)
        expect(res.status).toBe(400)
    })
   
})

