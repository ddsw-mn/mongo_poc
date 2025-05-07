jest.mock('../../src/clients/mongo.client', () => ({ connect: jest.fn() }));

const { connect } = require('../../src/clients/mongo.client');
const UserRepository = require('../../src/repositories/user.repository');

const mockUser = { first_name: 'John', last_name: 'Doe', username: 'johndoe', mail: 'john@test.com' };

describe('UserRepository', () => {

  let repository;
  let mockCollection;

  beforeEach(() => {
    mockCollection = {
      insertOne: jest.fn(),
      find: jest.fn().mockReturnValue({ toArray: jest.fn() }),
      findOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
    };
    connect.mockReturnValue(Promise.resolve({ collection: jest.fn().mockReturnValue(mockCollection) }));
    repository = new UserRepository();
  });

  describe('create', () => {
    it('calls collection.insertOne with the user', () => {
      mockCollection.insertOne.mockReturnValue(Promise.resolve());

      return repository.create(mockUser).then(() => {
        expect(mockCollection.insertOne).toHaveBeenCalledWith(mockUser);
      });
    });
  });

  describe('list', () => {
    it('calls collection.find and returns all users', () => {
      mockCollection.find.mockReturnValue({ toArray: jest.fn().mockReturnValue(Promise.resolve([mockUser])) });

      return repository.list().then(result => {
        expect(mockCollection.find).toHaveBeenCalledWith({});
        expect(result).toEqual([mockUser]);
      });
    });
  });

  describe('retrieve', () => {
    it('calls collection.findOne with username', () => {
      mockCollection.findOne.mockReturnValue(Promise.resolve(mockUser));

      return repository.retrieve('johndoe').then(result => {
        expect(mockCollection.findOne).toHaveBeenCalledWith({ username: 'johndoe' });
        expect(result).toEqual(mockUser);
      });
    });
  });

  describe('update', () => {
    it('calls collection.updateOne with username and $set data', () => {
      mockCollection.updateOne.mockReturnValue(Promise.resolve({ matchedCount: 1 }));

      return repository.update({ username: 'johndoe', first_name: 'Jane' }).then(result => {
        expect(mockCollection.updateOne).toHaveBeenCalledWith(
          { username: 'johndoe' },
          { $set: { first_name: 'Jane' } }
        );
        expect(result).toEqual({ matchedCount: 1 });
      });
    });
  });

  describe('delete', () => {
    it('calls collection.deleteOne with username', () => {
      mockCollection.deleteOne.mockReturnValue(Promise.resolve({ deletedCount: 1 }));

      return repository.delete('johndoe').then(result => {
        expect(mockCollection.deleteOne).toHaveBeenCalledWith({ username: 'johndoe' });
        expect(result).toEqual({ deletedCount: 1 });
      });
    });
  });

});
