const UserService = require("../services/user.service");

class UserController {

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  create(req, res) {
    return this.userService.create(req.body)
      .then(() => res.status(201).json({ message: 'User created successfully' }));
  }

  list(_req, res) {
    return this.userService.list()
      .then(users => res.status(200).json(users));
  }

  retrieve(req, res) {
    return this.userService.retrieve(req.params.username)
      .then(user => res.status(200).json(user));
  }

  update(req, res) {
    return this.userService.update(req.params.username, req.body)
      .then(() => res.status(200).json({ message: 'User updated successfully' }));
  }

  delete(req, res) {
    return this.userService.delete(req.params.username)
      .then(() => res.status(200).json({ message: 'User deleted successfully' }));
  }
}

module.exports = UserController;
