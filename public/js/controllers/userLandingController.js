myApp.controller('userLandingController', function($scope, jobsFactory, $location, authFactory){
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
			for (var i = 0; i < $scope.jobs.length; i++){
				if ($scope.jobs[i]._id == cJob._id){
					$scope.currentJob = $scope.jobs[i];
					$scope.jobs.splice(i, 1);
					$scope.current = true;
				};
			}
		});
	};

	$scope.resume = function(){
		$location.path('/resume')
	};
	function initControllerScope(){
		authFactory.get_user(function(user){
			$scope.user = user;
			console.log("THIS SHOULD BE USER",user);


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
	};
	$scope.logout = function(){
		console.log('logout')
		authFactory.logout(function(){
			$location.path('/')
		})
	}
});

// function initControllerScope(){
// 	authFactory.get_user(function(user){
// 		$scope.user = user;
// 		console.log("THIS SHOULD BE USER",user);


// 		jobsFactory.getJobsForUser(user.id, user.city, function(result){
// 			console.log(result);
// 			if (result.status){
// 				$scope.jobs = result.jobs;

// 				if ('currentJob' in result){
// 					$scope.currentJob = result.currentJob;
// 					$scope.current = true;
// 				}
// 			}
// 		});
// 	});
// }
