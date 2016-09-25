myApp.controller('businessController', function($scope, authFactory, jobsFactory){
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
		jobsFactory.biz_createJob($scope.newJob, function(data){
			console.log('businessController returned from jobsFactory', data)
			$scope.newJob = {}
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
	}
})