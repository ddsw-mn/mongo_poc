const UserService = require("../services/user.service");

class UserController {

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  create(req, res) {
    this.userService.create(req.body);

    res.status(201).json({ message: 'User created successfully' });
  }

  list(_req, res) {
    const users = this.userService.list();

    res.status(200).json(users);
  }

  retrieve(req, res) {
    const user = this.userService.retrieve(req.params.username);

    res.status(200).json(user);
  }

  update(req, res) {
    this.userService.update(req.params.username, req.body);

    res.status(200).json({ message: 'User updated successfully' });
  }

  delete(req, res) {
    const user = this.userService.delete(req.params.username);

    res.status(200).json(user);
  }
}

module.exports = UserController;
