const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

// Create express app
const app = express();

// Setup environment variables
require('dotenv').config();

if (!process.env.MONGO_URI) {
  throw new Error('☠️ You must provide a MongoLab URI');
}

// Choose default es6 promise library for mongoose
mongoose.Promise = global.Promise;

// Connect to the mongo db instance
mongoose.connect(process.env.MONGO_URI);
mongoose.connection
  .once('open', () => console.log('⚡ Connected to MongoDB instance.'))
  .on('error', error => console.error('☠️⚡ Error connecting to MongoDB instance: ', error));

// Setup encrypted cookie sessions with express
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}));

// Assign current user to the 'request.user' object
app.use(passport.initialize());
app.use(passport.session());

// Have Express pass requests made to the /graphql route to graphql
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

// Setup Webpack
// Respond to requests to / with webpack bundle.js
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;