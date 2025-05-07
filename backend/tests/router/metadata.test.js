const supertest = require('supertest');

const app = require('../../src/app.js');

describe('MetadataRouter', () => {

  it('GET /health - 200', () => {
    return supertest(app)
      .get('/health')
      .expect(200);
  });

});
