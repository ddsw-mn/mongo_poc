const UserRepository = require('../../src/repositories/user.repository');

const mockUser = { first_name: 'John', last_name: 'Doe', username: 'johndoe', mail: 'john@test.com' };

describe('UserRepository', () => {

  let repository;
  let mockModel;

  beforeEach(() => {
    mockModel = jest.fn().mockImplementation(() => ({
      save: jest.fn().mockReturnValue(Promise.resolve(mockUser)),
    }));
    mockModel.find = jest.fn();
    mockModel.findOne = jest.fn();
    mockModel.findOneAndUpdate = jest.fn();
    mockModel.deleteOne = jest.fn();

    repository = new UserRepository(mockModel);
  });

  describe('create', () => {
    it('instantiates the model and calls save', () => {
      return repository.create(mockUser).then(() => {
        expect(mockModel).toHaveBeenCalledWith(mockUser);
        expect(mockModel.mock.results[0].value.save).toHaveBeenCalled();
      });
    });
  });

  describe('list', () => {
    it('calls model.find', () => {
      mockModel.find.mockReturnValue(Promise.resolve([mockUser]));

      return repository.list().then(result => {
        expect(mockModel.find).toHaveBeenCalled();
        expect(result).toEqual([mockUser]);
      });
    });
  });

  describe('retrieve', () => {
    it('calls model.findOne with username', () => {
      mockModel.findOne.mockReturnValue(Promise.resolve(mockUser));

      return repository.retrieve('johndoe').then(result => {
        expect(mockModel.findOne).toHaveBeenCalledWith({ username: 'johndoe' });
        expect(result).toEqual(mockUser);
      });
    });
  });

  describe('update', () => {
    it('calls model.findOneAndUpdate with username and data', () => {
      mockModel.findOneAndUpdate.mockReturnValue(Promise.resolve(mockUser));

      return repository.update('johndoe', { first_name: 'Jane' }).then(result => {
        expect(mockModel.findOneAndUpdate).toHaveBeenCalledWith(
          { username: 'johndoe' },
          { first_name: 'Jane' }
        );
        expect(result).toEqual(mockUser);
      });
    });
  });

  describe('delete', () => {
    it('calls model.deleteOne with username', () => {
      mockModel.deleteOne.mockReturnValue(Promise.resolve({ deletedCount: 1 }));

      return repository.delete('johndoe').then(result => {
        expect(mockModel.deleteOne).toHaveBeenCalledWith({ username: 'johndoe' });
        expect(result).toEqual({ deletedCount: 1 });
      });
    });
  });

});
