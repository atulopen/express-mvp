const request = require('supertest');
const app = require('../../app');
const {connectToMongo, disconnectMongo} = require("../../services/mongo");


describe('Launches API', () => {
    beforeAll(async () => {
        await connectToMongo();
    })

    afterAll(async ()=>{
        await disconnectMongo();
    })

    describe('Test GET /launches', () => {
        test('it should return 200 response', async () => {
            await request(app)
                .get('/v1/launches')
                .expect(200)
                .expect('Content-Type', /json/)
        })
    });

    describe('Test POST /launches', () => {

        const launchDataWithoutDate = {
            target: 'Kepler-1410 b',
            rocket: 'unit testing rocket',
            mission: 'unit testing mission',
        }

        const completeLaunchData = {
            launchDate: '29 December, 2021',
            ...launchDataWithoutDate,
        }

        test('responds with json', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(completeLaunchData)
                .expect(201)
                .expect('Content-Type', /json/);

            const launchDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseLaunchDate = new Date(response.body.launchDate).valueOf();

            expect(launchDate).toBe(responseLaunchDate);

            expect(response.body).toMatchObject(launchDataWithoutDate);

        })

        test('it should handle missing required fields', async () => {

            const response = await request(app)
                .post('/v1/launches')
                .expect(400)
                .expect('Content-Type', /json/);

            expect(response.body).toMatchObject({
                error: 'Missing Required Fields'
            });

        })
    })
})
