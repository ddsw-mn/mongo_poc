const mongoose = require('mongoose');

const User = require('../../model/user');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  username:  { type: String, required: true, unique: true },
  mail:      { type: String, required: true },
}, { toJSON: { virtuals: true } });

userSchema.loadClass(User);

module.exports = mongoose.model('User', userSchema);
