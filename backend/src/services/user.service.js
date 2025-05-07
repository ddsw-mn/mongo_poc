const User = require("../model/user");

const UserRepository = require("../repositories/user.repository");

const { NotFoundError } = require("../model/errors");

class UserService {

  constructor(userRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  create(data) {
    this.userRepository.create(new User(data));
  }

  list() {
    return this.userRepository.list();
  }

  retrieve(username) {
    const user = this.userRepository.retrieve(username);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  update(username, data) {
    delete data.username;
    const user = this.userRepository.update(new User({ username, ...data }));
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  delete(username) {
    const user = this.userRepository.delete(username);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }
}

module.exports = UserService;
