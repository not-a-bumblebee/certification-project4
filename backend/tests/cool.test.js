const supertest = require('supertest')
const { server } = require('../../server.js')
const api = supertest(server) // Creates a test api that will send requests where we want them to be sent
