const UserService = require('../../src/services/user.service');
const { NotFoundError } = require('../../src/model/errors');

const mockUser = { first_name: 'John', last_name: 'Doe', username: 'johndoe', mail: 'john@test.com' };

describe('UserService', () => {

  let service;
  let mockRepo;

  beforeEach(() => {
    mockRepo = {
      list: jest.fn(),
      retrieve: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    service = new UserService(mockRepo);
  });

  describe('list', () => {
    it('returns the list from repository', () => {
      mockRepo.list.mockReturnValue(Promise.resolve([mockUser]));

      return service.list().then(result => {
        expect(result).toEqual([mockUser]);
      });
    });
  });

  describe('create', () => {
    it('calls repository.create with a User instance', () => {
      mockRepo.create.mockReturnValue(Promise.resolve());

      return service.create(mockUser).then(() => {
        expect(mockRepo.create).toHaveBeenCalledWith(
          expect.objectContaining({ username: 'johndoe' })
        );
      });
    });
  });

  describe('retrieve', () => {
    it('returns the user when found', () => {
      mockRepo.retrieve.mockReturnValue(Promise.resolve(mockUser));

      return service.retrieve('johndoe').then(result => {
        expect(result).toEqual(mockUser);
      });
    });

    it('throws NotFoundError when user does not exist', () => {
      expect.assertions(1);
      mockRepo.retrieve.mockReturnValue(Promise.resolve(null));

      return service.retrieve('johndoe')
        .catch(err => expect(err).toBeInstanceOf(NotFoundError));
    });
  });

  describe('update', () => {
    it('returns the result when user is found', () => {
      mockRepo.update.mockReturnValue(Promise.resolve({ matchedCount: 1 }));

      return service.update('johndoe', { first_name: 'Jane' }).then(result => {
        expect(result).toEqual({ matchedCount: 1 });
      });
    });

    it('throws NotFoundError when user does not exist', () => {
      expect.assertions(1);
      mockRepo.update.mockReturnValue(Promise.resolve({ matchedCount: 0 }));

      return service.update('johndoe', { first_name: 'Jane' })
        .catch(err => expect(err).toBeInstanceOf(NotFoundError));
    });

    it('uses the url param username, not the body one', () => {
      mockRepo.update.mockReturnValue(Promise.resolve({ matchedCount: 1 }));

      return service.update('johndoe', { username: 'other', first_name: 'Jane' }).then(() => {
        expect(mockRepo.update).toHaveBeenCalledWith(
          expect.objectContaining({ username: 'johndoe' })
        );
      });
    });
  });

  describe('delete', () => {
    it('returns the result when user is deleted', () => {
      mockRepo.delete.mockReturnValue(Promise.resolve({ deletedCount: 1 }));

      return service.delete('johndoe').then(result => {
        expect(result).toEqual({ deletedCount: 1 });
      });
    });

    it('throws NotFoundError when user does not exist', () => {
      expect.assertions(1);
      mockRepo.delete.mockReturnValue(Promise.resolve({ deletedCount: 0 }));

      return service.delete('johndoe')
        .catch(err => expect(err).toBeInstanceOf(NotFoundError));
    });
  });

});
