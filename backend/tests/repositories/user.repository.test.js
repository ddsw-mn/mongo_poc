const UserRepository = require('../../src/repositories/user.repository');

const mockUser = { first_name: 'John', last_name: 'Doe', username: 'johndoe', mail: 'john@test.com' };
const anotherUser = { first_name: 'Jane', last_name: 'Doe', username: 'janedoe', mail: 'jane@test.com' };

describe('UserRepository', () => {

  let repository;

  beforeEach(() => {
    repository = new UserRepository();
  });

  describe('create', () => {
    it('adds the user to the list', () => {
      repository.create(mockUser);

      expect(repository.list()).toContainEqual(mockUser);
    });
  });

  describe('list', () => {
    it('returns all users', () => {
      repository.create(mockUser);
      repository.create(anotherUser);

      expect(repository.list()).toEqual([mockUser, anotherUser]);
    });

    it('returns empty array when no users exist', () => {
      expect(repository.list()).toEqual([]);
    });
  });

  describe('retrieve', () => {
    it('returns the user by username', () => {
      repository.create(mockUser);

      expect(repository.retrieve('johndoe')).toEqual(mockUser);
    });

    it('returns null when user does not exist', () => {
      expect(repository.retrieve('johndoe')).toBeUndefined();
    });
  });

  describe('update', () => {
    it('updates and returns the user', () => {
      repository.create(mockUser);
      const updated = { ...mockUser, first_name: 'Jane' };

      const result = repository.update(updated);

      expect(result).toEqual(updated);
      expect(repository.retrieve('johndoe')).toEqual(updated);
    });

    it('returns null when user does not exist', () => {
      expect(repository.update(mockUser)).toBeNull();
    });
  });

  describe('delete', () => {
    it('removes and returns the user', () => {
      repository.create(mockUser);

      const result = repository.delete('johndoe');

      expect(result).toEqual(mockUser);
      expect(repository.retrieve('johndoe')).toBeUndefined();
    });

    it('returns null when user does not exist', () => {
      expect(repository.delete('johndoe')).toBeNull();
    });
  });

});
