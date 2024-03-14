const supertest = require('supertest')
const { server } = require('../../server.js')
const api = supertest(server) // Creates a test api that will send requests where we want them to be sent
const User = require('../models/models.js')


beforeAll(async () => {
    await User.deleteOne({username:"testUser"})


})

const dummySave = [{ "name": "Peggy Hill Quotes", "quotes": [{ "quote": "brown betty espanol", "author": "Peggy Hill", "category": "cool" }] }]


describe('Registration', () => {

    test('registering a completely new user', async () => {
        const res = await api.post("/api/register").expect(201)
        
        expect(res).toEqual({
            "auth": true
        })

    })
})

describe('Login', () => {


    test('successful login', async () => {
        const res = await api.post("/api/login").send({ username: "testUser", password: "ishtar" }).expect(200)
        
        expect(res).toEqual({
            "auth": true,
            "user": []
        })

    })
})
describe('/save ', () => {

    test('saving user data', async () => {
        const res = await api.put("/api/save").send({ username: "testUser", save: dummySave }).expect(200)

        expect(Object.keys(res)).toEqual([
            "acknowledged",
            "modifiedCount",
            "upsertedId",
            "upsertedCount",
            "matchedCount"
        ]);
    })
})
describe('/load', () => {

    test('loading user data', async () => {
        const res = await api.get("/api/load").query({ username: "testUser" }).expect(200)

        expect(res).toEqual(dummySave)

    })
})
describe('/login should fail', () => {

    test('incorrect login password', async () => {
        const res = await api.post("/api/login").send({ username: "testUser", password: "grass" }).expect(400)

        expect(res).toEqual({
            "auth": false,
            "error": "incorrect password"
        })
    })
})
describe('/register should fail', () => {

    test('registering a user that already exists', async () => {
        const res = await api.post("/api/register").send({ username: "testUser", password: "grass" }).expect(400)

        expect(res).toEqual({
            "auth": false,
            "error": "user already exists"
        })
    })
})


