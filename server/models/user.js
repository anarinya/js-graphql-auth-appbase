const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String
});

// Save encrypted version of user's password
UserSchema.pre('save', function save(next) {
  const user = this;

  if (!user.isModified('password')) { 
    return next(); 
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

// Compare encrypted password with salted+hashed version of given password
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
}

mongoose.model('user', UserSchema);
