myApp.factory('jobsFactory', function($http, AuthTokenFactory){
	var factory = {}
	factory.biz_createJob = function(jobInfo, callback){
		console.log(jobInfo);
		$http.post('/jobs', jobInfo).success(function(output){
			console.log('factory create job back from back')
			callback();
		})
	}
	return factory;
})