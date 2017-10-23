const mongoose = require('mongoose');
const { Schema } = mongoose;

// instance
const userSchema = new Schema({
  name: String,
  googleId: String,
  lastLoggedIn: Date,
  role: { type: Number, default: 0 }
});



// collection
mongoose.model('users', userSchema);
