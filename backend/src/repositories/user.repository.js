const User = require("./schemas/user.schema");

class UserRepository {

  constructor(model = User) {
    this.model = model;
  }

  create(data) {
    return new this.model(data).save();
  }

  list() {
    return this.model.find();
  }

  retrieve(username) {
    return this.model.findOne({ username });
  }

  update(username, data) {
    return this.model.findOneAndUpdate({ username }, data);
  }

  delete(username) {
    return this.model.deleteOne({ username });
  }
}

module.exports = UserRepository;
