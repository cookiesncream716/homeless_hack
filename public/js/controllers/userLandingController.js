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

	$scope.confirmJob = function(cJob){
		console.log("look at cJob", cJob)
		jobsFactory.acceptJob(cJob, $scope.user.id, function(){

		});
	}

	function initControllerScope(){
		authFactory.get_user(function(user){
			$scope.user = user;

			jobsFactory.getJobsForUser(user.id, user.city, function(result){
				console.log(result);
				if (result.status){
					$scope.jobs = result.jobs;

					if ('currentJob' in result){
						$scope.currentJob = result.currentJob;
						$scope.current = true;
					}
				}
			});
		});
	}
});
