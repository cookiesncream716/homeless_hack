myApp.controller('resumeController', function($scope, authFactory, jobsFactory){
	authFactory.get_user(function(user){
		$scope.user = user;

		jobsFactory.getCompletedJobs(user._id, function(jobs){
			$scope.jobs = jobs;
		});
	});


});
