// api/user router

var userRouter = require('express').Router();
var controller = require('./controller');

var utils = require('../../auth/utils'); 
var User = require('./model');

userRouter.route('/')
    // "POST /user": {
    //     "desc": "create and returns a new user with a token",
    //     "response": "201 application/json",
    //     "data": {}
    // },
    .post(controller.post)

    // "GET /user" : {
    //     "desc": "return all users",
    //     "response": "200 application/json",
    //     "data": [{},{},{}]
    // } 
    .get(controller.get)

userRouter.route('/me')
    .get(controller.postme)
    .post(controller.getme)

module.exports = userRouter;
