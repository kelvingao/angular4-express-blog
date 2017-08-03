// api/messages router

var msgRouter = require('express').Router();
var Message = require('./model');
var controller = require('./controller');
var utils = require('../../auth/utils'); 

msgRouter.param('ownerId', controller.params);

msgRouter.route('/')
    .get(controller.get)
    .post(utils.checkAuthenticated, controller.post)

msgRouter.route('/:ownerId')
    .get(controller.getOne)

module.exports = msgRouter;