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

const mockUser = { first_name: 'John', last_name: 'Doe', username: 'johndoe', mail: 'john@test.com' };

describe('UserRouter', () => {

  describe('GET /users', () => {
    it('200 - returns list of users', () => {
      mockRepo.list.mockReturnValue([mockUser]);

      return supertest(app)
        .get('/users')
        .expect(200)
        .then(res => expect(res.body).toEqual([mockUser]));
    });
  });

  describe('POST /users', () => {
    it('201 - creates a user', () => {
      mockRepo.create.mockReturnValue(undefined);

      return supertest(app)
        .post('/users')
        .send(mockUser)
        .expect(201);
    });
  });

  describe('GET /users/:username', () => {
    it('200 - returns the user', () => {
      mockRepo.retrieve.mockReturnValue(mockUser);

      return supertest(app)
        .get('/users/johndoe')
        .expect(200)
        .then(res => expect(res.body).toEqual(mockUser));
    });

    it('404 - user not found', () => {
      mockRepo.retrieve.mockReturnValue(null);

      return supertest(app)
        .get('/users/johndoe')
        .expect(404);
    });
  });

  describe('PUT /users/:username', () => {
    it('200 - updates the user', () => {
      mockRepo.update.mockReturnValue(mockUser);

      return supertest(app)
        .put('/users/johndoe')
        .send({ first_name: 'Jane' })
        .expect(200);
    });

    it('404 - user not found', () => {
      mockRepo.update.mockReturnValue(null);

      return supertest(app)
        .put('/users/johndoe')
        .send({ first_name: 'Jane' })
        .expect(404);
    });
  });

  describe('DELETE /users/:username', () => {
    it('200 - deletes the user', () => {
      mockRepo.delete.mockReturnValue(mockUser);

      return supertest(app)
        .delete('/users/johndoe')
        .expect(200);
    });

    it('404 - user not found', () => {
      mockRepo.delete.mockReturnValue(null);

      return supertest(app)
        .delete('/users/johndoe')
        .expect(404);
    });
  });

});
