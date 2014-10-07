describe('posting jobs', function () {
  var postRequestJob;
  var newJob = {title: 'Test Title', description: 'Test Description'};

  beforeEach(module('app'));

  it('should call /api/jobs with job data', inject(function ($httpBackend, jobs) {
    $httpBackend.whenPOST('/api/jobs', function (data) {
      postRequestJob = JSON.parse(data);
      postRequestJob.should.not.be.empty;
      return true;
    }).respond(200);

    jobs.save(newJob);

    $httpBackend.flush();
  }));
});
