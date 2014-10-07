var mongoose = require('mongoose');
var Promise = require('bluebird');

var jobSchema = mongoose.Schema({
  title:{type:String},
  description:{type:String}
});

mongoose.model('Job', jobSchema);
