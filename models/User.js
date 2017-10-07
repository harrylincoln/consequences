const mongoose = require('mongoose');
const { Schema } = mongoose;

// instance
const userSchema = new Schema({
  googleId: String
});

// collection
mongoose.model('users', userSchema);
