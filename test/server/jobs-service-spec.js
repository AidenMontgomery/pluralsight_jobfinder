var express = require('express');
var should = require('chai').should();
var request = require('supertest');
var Promise = require('bluebird');

var app = express();

var dataSavedJob;

var db = {
  saveJob: function (job) {
    dataSavedJob = job;
  },
  findJobs: function () {
    return new Promise(function (resolve, reject) {
      resolve(['hi']);
    });
  }
};

var jobService = require('../../jobs-service')(db, app);

describe('Save Jobs', function () {
  describe('validation', function () {
    it('should validate that the title is greater than 4 characters');
    it('should validate that the title is less than 40 characters');
    it('should validate that the description is greater than 4 characters');
    it('should validate that the description is less than 250 characters');
  });

  var newJob = {title:'Cook', description:'You will be making bagels'};

  it('should pass the job to the dabase save', function (done) {
    request(app).post('/api/jobs').send(newJob).end(function (err, res) {
      dataSavedJob.should.deep.equal(newJob);
      done();
    });
  });

  it('should return a status of 200 to the front end if hte database saved', function (done) {
    request(app).post('/api/jobs').send(newJob).end(function (err, res) {
      res.status.should.equal(200);
      done();
    });
  });

  it('should return a job with an id');
  it('should return an error if the database failed');
});

describe('Get jobs', function () {
  it('should get all of the jobs out of the database', function (done) {
    request(app).get('/api/jobs')
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      res.body.should.be.a('Array');
      done();
    });
  });
});
