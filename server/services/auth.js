const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');

// Provide an identifying token in the user's session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Given a user's ID, obtain the user object, place on request.user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Attempt to authenticate user on login with provided email/pass
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false, 'Invalid Credentials'); }

    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) { return done(null, user); }
      return done(null, false, 'Invalid credentials.');
    });
  });
}));

// Create a new user account
// Check if user exists, save user, provide user to req.logIn
function signup({ email, password, req }) {
  const user = new User({ email, password });
  if (!email || !password) {
    throw new Error('You must provide an email and password.');
  }

  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        throw new Error('Email in use.');
      }
      return user.save();
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        req.login(user, (err) => {
          if (err) { reject(err); }
          resolve(user);
        });
      });
    });
}

// Attempt to log in a user, using local strategy
function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {reject('Invalid credentials.') }
      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

module.exports = { signup, login };