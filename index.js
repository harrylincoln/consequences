const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// models
require('./models/User');

// services
require('./services/passport');

// db
mongoose.connect(keys.mongoDbURI);

// routing
const app = express();

// middlewares
app.use(
  cookieSession({ // config obj
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey] // can add more, it will pick one randomly
  })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
