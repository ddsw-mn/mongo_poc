const UserController = require('../../src/controllers/user.controller');

const mockUser = { first_name: 'John', last_name: 'Doe', username: 'johndoe', mail: 'john@test.com' };

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe('UserController', () => {

  let controller;
  let mockService;

  beforeEach(() => {
    mockService = {
      list: jest.fn(),
      retrieve: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    controller = new UserController(mockService);
  });

  describe('list', () => {
    it('calls service.list and responds 200', () => {
      mockService.list.mockReturnValue(Promise.resolve([mockUser]));

      return controller.list({}, res).then(() => {
        expect(mockService.list).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([mockUser]);
      });
    });
  });

  describe('create', () => {
    it('calls service.create and responds 201', () => {
      mockService.create.mockReturnValue(Promise.resolve());

      const req = { body: mockUser };

      return controller.create(req, res).then(() => {
        expect(mockService.create).toHaveBeenCalledWith(mockUser);
        expect(res.status).toHaveBeenCalledWith(201);
      });
    });
  });

  describe('retrieve', () => {
    it('calls service.retrieve and responds 200', () => {
      mockService.retrieve.mockReturnValue(Promise.resolve(mockUser));

      const req = { params: { username: 'johndoe' } };

      return controller.retrieve(req, res).then(() => {
        expect(mockService.retrieve).toHaveBeenCalledWith('johndoe');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
      });
    });
  });

  describe('update', () => {
    it('calls service.update and responds 200', () => {
      mockService.update.mockReturnValue(Promise.resolve());

      const req = { params: { username: 'johndoe' }, body: { first_name: 'Jane' } };

      return controller.update(req, res).then(() => {
        expect(mockService.update).toHaveBeenCalledWith('johndoe', { first_name: 'Jane' });
        expect(res.status).toHaveBeenCalledWith(200);
      });
    });
  });

  describe('delete', () => {
    it('calls service.delete and responds 200', () => {
      mockService.delete.mockReturnValue(Promise.resolve());

      const req = { params: { username: 'johndoe' } };

      return controller.delete(req, res).then(() => {
        expect(mockService.delete).toHaveBeenCalledWith('johndoe');
        expect(res.status).toHaveBeenCalledWith(200);
      });
    });
  });

});
