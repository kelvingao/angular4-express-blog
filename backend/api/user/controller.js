var User = require('./model');

exports.post = function(req, res) {
    var newUser = new User(req.body);

    newUser.save((err, user) => {
        if(err) {
            res.status(401).send({success: false, message:'Unable to register user'});
        }
        utils.sendToken(user, res);
    })
}

exports.get = function(req, res) {
    User.find({}, (err, users) => {
        res.send(users);
    })
}

exports.getme = function(req, res) {

}

exports.postme = function(req, res) {
    
}