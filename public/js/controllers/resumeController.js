myApp.controller('resumeController', function($scope, authFactory, jobsFactory){
	authFactory.get_user(function(user){
		$scope.user = user;

		jobsFactory.getCompletedJobs(user.id, function(jobs){
			for (var i = 0; i < jobs.length; i++){
				jobs[i].createdAt = jobs[i].createdAt.toString().split('T')[0]
			}
			$scope.jobs = jobs;
		});
	});


});
