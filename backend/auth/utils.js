var jwt = require('jsonwebtoken');
var User = require('../api/user/model');

exports.sendAuthError = function(res) {
    res.status(401).send({ success: false, message: 'username or password incorrect'});
}

exports.sendToken = function(user, res) {
    var token = jwt.sign(
        {_id: user._id}, 
        '123', 
        {expiresIn: 24 * 60 * 10});

    res.json({username: user.username, token: token});
}

exports.checkAuthenticated = function(req, res, next) {

    var token = req.header('Authorization').split(' ')[1];
    var decoded = jwt.verify(token, '123');  

     User.findById(decoded._id, (err, user) => {
        if(!user) {
            res.status(401).send('Unauthorized');
        } else {
            req.user = user;
            next();
        }
     })
}