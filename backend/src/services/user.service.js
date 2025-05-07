const User = require("../model/user");

const UserRepository = require("../repositories/user.repository");

const { NotFoundError } = require("../model/errors");

class UserService {

  constructor(userRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  create(data) {
    return this.userRepository.create(new User(data));
  }

  list() {
    return this.userRepository.list();
  }

  retrieve(username) {
    return this.userRepository.retrieve(username).then(user => {
      if (!user) throw new NotFoundError('User not found');
      return user;
    });
  }

  update(username, data) {
    delete data.username;
    return this.userRepository.update(new User({ username, ...data })).then(result => {
      if (result.matchedCount === 0) throw new NotFoundError('User not found');
      return result;
    });
  }

  delete(username) {
    return this.userRepository.delete(username).then(result => {
      if (result.deletedCount === 0) throw new NotFoundError('User not found');
      return result;
    });
  }
}

module.exports = UserService;
