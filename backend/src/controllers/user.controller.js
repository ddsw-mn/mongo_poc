const User = require("../model/user");

const { NotFoundError } = require("../model/errors");

class UserController {

  async create(req, res) {
    const user = new User(req.body)
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  }

  async list(_req, res) {
    res.status(200).json(await User.find());
  }

  async retrieve(req, res) {
    const user = await User.findOne({ username: req.params.username });

    this.validate(user);

    res.status(200).json(user);
  }

  async update(req, res) {
    const body = req.body;
    delete body.username;

    const result = await User.findOneAndUpdate({ username: req.params.username }, body);

    this.validate(result);

    res.status(200).json({ message: 'User updated successfully' });
  }

  async delete(req, res) {
    const result = await User.deleteOne({ username: req.params.username });

    this.validate(result);

    res.status(200).json({ message: 'User deleted successfully' });
  }

  validate(user) {
    if (!user || user.deletedCount === 0) {
      throw new NotFoundError('User not found');
    }
  }
}

module.exports = new UserController();