const mongoose = require('mongoose');

userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  mail: { type: String, required: true },
});


const User = mongoose.model('User', userSchema);
module.exports = User;