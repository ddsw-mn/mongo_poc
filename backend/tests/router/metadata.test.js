const supertest = require('supertest');

const app = require('../../src/app.js');

describe('MetadataRouter', () => {

  it('GET /heath - 200', async () => {
    await supertest(app)
      .get('/health')
      .expect(200);
  });

});