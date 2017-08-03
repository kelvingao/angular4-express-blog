var Message = require('./model');
var mongoose = require('mongoose');

exports.get = function(req, res) {
    Message.find({})
        .populate('owner', 'username')
        .exec()
        .then(function(messages) {
            res.json(messages);
        })
}

exports.post = function(req, res) {
    var message = req.body;
    message.owner = req.user._id;

    // Insert a new one
    Message.findOneAndUpdate({_id: mongoose.Types.ObjectId()}, message, {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        populate: {path: 'username'}
    })
      .populate('owner', 'username')
      .exec()
      .then(function(msg) {
        res.json(msg);
      })
}

exports.params = function(req, res, next, ownerId) {
  Message.find({'owner': ownerId})
    .populate('owner','username')
    .exec()
    .then(function(messages) {
      if (!messages) {
        next(new Error('No messages with that id'));
      } else {
        req.messages = messages;
        next();
      }
    })
}

exports.getOne = function(req, res) {
    res.json(req.messages);
}