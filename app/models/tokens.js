const mongoose = require('mongoose');

const { Schema } = mongoose;

const TokenSchema = new Schema({
  token: {
    type: String
  },
  expiredDate: {
    type: Date
  }
});

const Token = mongoose.model('Token', TokenSchema);
module.exports = Token;
