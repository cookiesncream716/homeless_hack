myApp.factory('jobsFactory', function($http, AuthTokenFactory){
	var factory = {}
	factory.biz_createJob = function(jobInfo, callback){
		console.log(jobInfo);
		$http.post('/jobs', jobInfo).success(function(output){
			console.log('factory create job back from back')
			callback();
		})
	};
	factory.biz_getJobs = function(id, callback){
		console.log('biz id:' + id);
		$http.post('/jobs/' + id).success(function(output){
			console.log(output)
			callback(output)
		})
	};
	factory.completedJob = function(id, callback){
		console.log('factory', id)
		$http.get('/jobs/' + id).success(function(output){
			console.log('job marked as completed');
			// factory.biz_getJobs(id, callback)
			// console.log()
			callback()
		})
	}
	return factory;
})