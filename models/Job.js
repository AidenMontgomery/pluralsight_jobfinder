var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
  title:{type:String},
  description:{type:String}
});

module.exports.model = mongoose.model('Job', jobSchema);
