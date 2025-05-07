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
      mockService.list.mockReturnValue([mockUser]);

      controller.list({}, res);

      expect(mockService.list).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([mockUser]);
    });
  });

  describe('create', () => {
    it('calls service.create and responds 201', () => {
      const req = { body: mockUser };

      controller.create(req, res);

      expect(mockService.create).toHaveBeenCalledWith(mockUser);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe('retrieve', () => {
    it('calls service.retrieve and responds 200', () => {
      mockService.retrieve.mockReturnValue(mockUser);

      const req = { params: { username: 'johndoe' } };

      controller.retrieve(req, res);

      expect(mockService.retrieve).toHaveBeenCalledWith('johndoe');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('update', () => {
    it('calls service.update and responds 200', () => {
      const req = { params: { username: 'johndoe' }, body: { first_name: 'Jane' } };

      controller.update(req, res);

      expect(mockService.update).toHaveBeenCalledWith('johndoe', { first_name: 'Jane' });
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe('delete', () => {
    it('calls service.delete and responds 200', () => {
      mockService.delete.mockReturnValue(mockUser);

      const req = { params: { username: 'johndoe' } };

      controller.delete(req, res);

      expect(mockService.delete).toHaveBeenCalledWith('johndoe');
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

});
