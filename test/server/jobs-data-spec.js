var should = require('chai').should();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var jobsData = require('../../jobs-data.js');

function resetJobs() {
  return new Promise(function (resolve, reject) {
    mongoose.connection.collections.jobs.drop(resolve, reject);
  });
}

describe('get jobs', function () {

  var jobs;

  before(function (done) {
    jobsData.connectDB('mongodb://localhost/jobfinder')
    .then(resetJobs)
    .then(jobsData.seedJobs)
    .then(jobsData.findJobs)
    .then(function (collection) {
      jobs = collection;
      done();
    });
  });

  after(function () {
    mongoose.connection.close();
  });

  it('should never be empty since jobs are seeded', function () {
      jobs.should.not.be.empty;
  });

  it("should have a job with a title", function () {
    jobs[0].title.should.not.be.empty;
  });

  it("should have a job with a description", function () {
    jobs[0].description.should.not.be.empty;
  });
});


describe('save job', function () {

  var jobs;

  before(function (done) {
    jobsData.connectDB('mongodb://localhost/jobfinder')
    .then(resetJobs)
    .then(jobsData.findJobs)
    .then(function (collection) {
      jobs = collection;
      done();
    });
  });

  after(function () {
    mongoose.connection.close();
  });

  var job = {title: 'testing', description: 'testing description'};

  it('should save the job in the database', function (done) {
    var originalCount;
    originalCount = jobs.length;

    jobsData.saveJob(job)
    .then(jobsData.findJobs).then(function (collection) {
      collection.should.length.above(originalCount);
      done();
    });
  });
});
