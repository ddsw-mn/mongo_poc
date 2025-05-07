const User = require("../model/user");

const UserRepository = require("../repositories/user.repository");

const { NotFoundError } = require("../model/errors");

class UserController {

  async create(req, res) {
    await UserRepository.create(new User(req.body));

    res.status(201).json({ message: 'User created successfully' });
  }

  async list(_req, res) {
    const users = await UserRepository.list();

    res.status(200).json(users);
  }

  async retrieve(req, res) {
    const user = await UserRepository.retrieve(req.params.username);

    this.validate(user);

    res.status(200).json(user);
  }

  async update(req, res) {
    const body = req.body;
    delete body.username;

    const toUpdate = new User({ username: req.params.username, ...body });
    const user = await UserRepository.update(toUpdate);

    this.validate(user);

    res.status(200).json({ message: 'User updated successfully' });
  }

  async delete(req, res) {
    const user = await UserRepository.delete(req.params.username);

    this.validate(user);

    res.status(200).json({ message: 'User deleted successfully' });
  }

  validate(user) {
    if (!user || user.deletedCount === 0 || user.matchedCount === 0) {
      throw new NotFoundError('User not found');
    }
  }
}

module.exports = new UserController();