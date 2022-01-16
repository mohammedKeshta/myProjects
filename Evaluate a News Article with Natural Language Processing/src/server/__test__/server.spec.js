import 'babel-polyfill';

const request = require('supertest');
const { app } = require('../index');

describe("testing server ", () => {
    test('defined invalid url give 404', (done) => {
        request(app)
            .get('/error').then(response => {
                expect(response.statusCode).toBe(404)
                done()
            })
    })
    test('defined root status code = 200', (done) => {
        request(app)
            .get('/').then(response => {
                expect(response.statusCode).toBe(200)
                done()
            })
    })
})