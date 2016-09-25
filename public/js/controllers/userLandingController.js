myApp.controller('userLanding', function($scope, jobsFactory, userFactory){
	$scope.user = {};
	$scope.currentJobs = {};
	$scope.activeJobs;

	userFactory.getUser(function(user){
		$scope.user = user;
	});

	jobsFactory.getJobsForUser(function(jobs){
		$scope.availableJobs = jobs.available;
		$scope.currentJobs = jobs.currentJobs;
	})
});
