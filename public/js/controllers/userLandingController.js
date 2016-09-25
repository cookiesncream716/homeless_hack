myApp.controller('userLandingController', function($scope, jobsFactory, authFactory){
	$scope.user = {};
	$scope.currentJob = {};
	$scope.activeJobs = {};
	$scope.current = false;

	$scope.sortInfo = {
		'type': 'createdAt',
		'ascending': false
	}

	initControllerScope();

	function initControllerScope(){
		authFactory.get_user(function(user){
			$scope.user = user;

			jobsFactory.getJobsForUser(user.id, user.city, function(result){
				console.log(result);
				if (result.status){
					$scope.availableJobs = result.jobs;

					if ('currentJob' in result){
						$scope.currentJob = result.currentJob;
						$scope.current = true;
					}
				}
			});
		});
	}
});
