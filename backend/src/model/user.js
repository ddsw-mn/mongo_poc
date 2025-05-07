const mongoose = require('mongoose');

const UserModel = mongoose.model('User', new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  mail: { type: String, required: true },
}));

class User extends UserModel {

  constructor(user) {
    super(user)
  }

}

module.exports = User;