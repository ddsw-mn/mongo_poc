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
      mockRepo.list.mockReturnValue([mockUser]);

      expect(service.list()).toEqual([mockUser]);
    });
  });

  describe('create', () => {
    it('calls repository.create with a User instance', () => {
      service.create(mockUser);

      expect(mockRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ username: 'johndoe' })
      );
    });
  });

  describe('retrieve', () => {
    it('returns the user when found', () => {
      mockRepo.retrieve.mockReturnValue(mockUser);

      expect(service.retrieve('johndoe')).toEqual(mockUser);
    });

    it('throws NotFoundError when user does not exist', () => {
      mockRepo.retrieve.mockReturnValue(null);

      expect(() => service.retrieve('johndoe')).toThrow(NotFoundError);
    });
  });

  describe('update', () => {
    it('returns the updated user when found', () => {
      mockRepo.update.mockReturnValue(mockUser);

      expect(service.update('johndoe', { first_name: 'Jane' })).toEqual(mockUser);
    });

    it('throws NotFoundError when user does not exist', () => {
      mockRepo.update.mockReturnValue(null);

      expect(() => service.update('johndoe', { first_name: 'Jane' })).toThrow(NotFoundError);
    });

    it('uses the url param username, not the body one', () => {
      mockRepo.update.mockReturnValue(mockUser);

      service.update('johndoe', { username: 'other', first_name: 'Jane' });

      expect(mockRepo.update).toHaveBeenCalledWith(
        expect.objectContaining({ username: 'johndoe' })
      );
    });
  });

  describe('delete', () => {
    it('returns the deleted user when found', () => {
      mockRepo.delete.mockReturnValue(mockUser);

      expect(service.delete('johndoe')).toEqual(mockUser);
    });

    it('throws NotFoundError when user does not exist', () => {
      mockRepo.delete.mockReturnValue(null);

      expect(() => service.delete('johndoe')).toThrow(NotFoundError);
    });
  });

});
