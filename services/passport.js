const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// fetch from mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); // mongo user model ID
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true // needed because it's hosted on Heroku
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser); // all good, here's the user
      }
      
      const user = await new User({googleId: profile.id }).save();
      done(null, user);
    }
  )
);
