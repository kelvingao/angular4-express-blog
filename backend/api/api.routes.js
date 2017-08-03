var api = require('express').Router();

// api router will mount other routers
// for all our resources
api.use('/user', require('./user/router'));
api.use('/messages', require('./messages/router'));

module.exports = api;