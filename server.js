var express = require('express');
var jobModel = require('./models/Job');
var jobsData = require('./jobs-data.js');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api-jobs', function(req, res) {
  jobsData.findJobs().then(function (collection) {
    res.send(collection);
  });
});

app.get('*', function(req, res) {
  res.render('index');
});

// mongoose.connect('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://jobfinder:medusa@ds043210.mongolab.com:43210/heroku_app30484412')
.then(function() {
  console.log('Connected to mongodb succesfully');
  jobModel.seedJobs();
});

app.listen(process.env.PORT || 3000);
