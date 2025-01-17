const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // This creates an index
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: val => /^\S+@\S+\.\S+$/.test(val),
      message: 'Invalid email format.'
    }
  },
  createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model('User', userSchema);
