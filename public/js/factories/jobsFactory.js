myApp.factory('jobsFactory', function($http){
	var factory = {};

	factory.getJobsForUser = function(userID, city, callback, sort, asc){
		var aSign;
	
		if(!sort){
			sort = "createdAt"
		}

		if(!asc){
			aSign = "-"
		}else{
			aSign = "+"
		}

		var url = "/jobsForUser/" + userID + '/' + city + '/' + sort + "/" + aSign; 
		console.log('URL!!', url)
		$http.get(url).success(function(result){
			console.log(result)
				callback(result);
		});
		
	};

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
		})
	}

	factory.acceptJob = function(jobInfo, userID, callback){
		var info = {
			'job': jobInfo,
			'userID': userID
		}

		$http.post('/acceptJob', info).success(function(response){

		});
	}
	return factory;
})
