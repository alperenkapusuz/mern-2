const mongose = require('mongoose');

const UserSchema = new mongose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongose.model('User', UserSchema);
