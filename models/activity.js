var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
  page: String,
  photo: String,
  action: String
});

module.exports = mongoose.model('Activity', ActivitySchema);
