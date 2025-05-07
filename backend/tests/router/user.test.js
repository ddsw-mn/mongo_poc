const supertest = require('supertest');

const mockRepo = {
  list: jest.fn(),
  retrieve: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../../src/repositories/user.repository.js', () => jest.fn(() => mockRepo));

const app = require('../../src/app.js');
const User = require('../../src/repositories/schemas/user.schema.js');

const mockUser = { firstName: 'John', lastName: 'Doe', username: 'johndoe', mail: 'john@test.com' };

describe('UserRouter', () => {

  describe('GET /users', () => {
    it('200 - returns list of users', () => {
      mockRepo.list.mockReturnValue(Promise.resolve([mockUser]));

      return supertest(app)
        .get('/users')
        .expect(200)
        .then(res => expect(res.body).toEqual([mockUser]));
    });
  });

  describe('POST /users', () => {
    it('201 - creates a user', () => {
      mockRepo.create.mockReturnValue(Promise.resolve(mockUser));

      return supertest(app)
        .post('/users')
        .send(mockUser)
        .expect(201);
    });
  });

  describe('GET /users/:username', () => {
    it('200 - returns the user', () => {
      mockRepo.retrieve.mockReturnValue(Promise.resolve(mockUser));

      return supertest(app)
        .get('/users/johndoe')
        .expect(200)
        .then(res => expect(res.body).toEqual(mockUser));
    });

    it('200 - response includes fullName', () => {
      const userDoc = new User({ firstName: 'John', lastName: 'Doe', username: 'johndoe', mail: 'john@test.com' });
      mockRepo.retrieve.mockReturnValue(Promise.resolve(userDoc));

      return supertest(app)
        .get('/users/johndoe')
        .expect(200)
        .then(res => expect(res.body.fullName).toBe('John Doe'));
    });

    it('404 - user not found', () => {
      mockRepo.retrieve.mockReturnValue(Promise.resolve(null));

      return supertest(app)
        .get('/users/johndoe')
        .expect(404);
    });
  });

  describe('PUT /users/:username', () => {
    it('200 - updates the user', () => {
      mockRepo.update.mockReturnValue(Promise.resolve(mockUser));

      return supertest(app)
        .put('/users/johndoe')
        .send({ firstName: 'Jane' })
        .expect(200);
    });

    it('404 - user not found', () => {
      mockRepo.update.mockReturnValue(Promise.resolve(null));

      return supertest(app)
        .put('/users/johndoe')
        .send({ firstName: 'Jane' })
        .expect(404);
    });
  });

  describe('DELETE /users/:username', () => {
    it('200 - deletes the user', () => {
      mockRepo.delete.mockReturnValue(Promise.resolve({ deletedCount: 1 }));

      return supertest(app)
        .delete('/users/johndoe')
        .expect(200);
    });

    it('404 - user not found', () => {
      mockRepo.delete.mockReturnValue(Promise.resolve({ deletedCount: 0 }));

      return supertest(app)
        .delete('/users/johndoe')
        .expect(404);
    });
  });

});
