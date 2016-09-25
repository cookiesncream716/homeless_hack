myApp.controller('businessController', function($scope, $location, authFactory, jobsFactory){
	authFactory.get_business(function(data){
		// console.log(data)
		$scope.biz_info = data;
		console.log($scope.biz_info.id)
	});
	jobsFactory.biz_getJobs($scope.biz_info.id, function(data){
		$scope.currentJobs = data
	});
	$scope.addJob = function(){
		console.log('clicked add Job');
		console.log($scope.newJob);
		// var info = $scope.newJob;
		// info._employer = $scope.biz_info.id;
		jobsFactory.biz_createJob($scope.newJob, function(data){
			console.log('businessController returned from jobsFactory', data)
			jobsFactory.biz_getJobs($scope.biz_info.id, function(jobs){
				$scope.newJob = {}
				$scope.currentJobs = jobs;
			})
		});
	};
	$scope.completed = function(id){
		console.log('job id:' + id);
		jobsFactory.completedJob(id, function(data){
			console.log('in businessController', data)
			$scope.currentJobs = data
			jobsFactory.biz_getJobs($scope.biz_info.id, function(data){
				$scope.currentJobs = data
			})
		})
	};
	$scope.logout = function(){
		console.log('logout')
		authFactory.logout(function(){
			console.log('finished logout')
			$location.path('/');
		})
	}
})