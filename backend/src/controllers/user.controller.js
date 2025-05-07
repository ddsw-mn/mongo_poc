const User = require("../model/user");

const UserRepository = require("../repositories/user.repository");

const { NotFoundError } = require("../model/errors");

class UserController {

  create(req, res) {
    UserRepository.create(new User(req.body));

    res.status(201).json({ message: 'User created successfully' });
  }

  list(_req, res) {
    const users = UserRepository.list();

    res.status(200).json(users);
  }

  retrieve(req, res) {
    const user = UserRepository.retrieve(req.params.username);

    this.validate(user);

    res.status(200).json(user);
  }

  update(req, res) {
    const body = req.body;
    delete body.username;

    const toUpdate = new User({ username: req.params.username, ...body });
    const user = UserRepository.update(toUpdate);

    this.validate(user);

    res.status(200).json({ message: 'User updated successfully' });
  }

  delete(req, res) {
    const user = UserRepository.delete(req.params.username);

    this.validate(user);

    res.status(200).json(user);
  }

  validate(user) {
    if (!user) throw new NotFoundError('User not found');
  }
}

module.exports = new UserController();