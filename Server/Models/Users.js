const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  email: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
});
const UsersModel = mongoose.model('Users', userSchema);
module.exports = UsersModel;