var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  text: {
    type: String,
    required: true
  },

  owner: {type: Schema.Types.ObjectId, ref: 'user'},

});

module.exports = mongoose.model('message', messageSchema);
