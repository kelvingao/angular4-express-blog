// auth/ router

var auth = require('express').Router();
var utils = require('./utils');
var User = require('../api/user/model');

// "POST /register" : {
//     "desc": "create a user in mongodb, return its username and token",
//     "response": "200 application/json",
//     "data": {}
// }
auth.route('/register')
    .post((req, res) => {
        var newUser = new User(req.body);
        
        newUser.save((err, user) => {
            if(err) {
                res.status(401).send({success: false, message:'Unable to register user'});
            }
           utils.sendToken(user, res);
        })
    })

// "POST /login": {
//     "desc": "authenticate a user, and send its token",
//     "response": "201 application/json",
//     "data": {}
// },
auth.route('/login')
    .post((req, res) => {
        User.findOne({'username': req.body.username}, (err, user) => {
            if(!user) {
                utils.sendAuthError(res);
            } else if (user.authenticate(req.body.password)) {
                utils.sendToken(user, res);
            } else  // user password error
                utils.sendAuthError(res);
        })
    })

module.exports = auth;