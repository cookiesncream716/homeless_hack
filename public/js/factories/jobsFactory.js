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

	factory.getCompletedJobs = function(userId, callback){
		
		$http.get('/completedJobs' + userId).success(function(result){
			if (result.status){
				callback(result.jobs);
			}
		});
	};

	factory.biz_createJob = function(jobInfo, callback){
		console.log(jobInfo);
		$http.post('/jobs', jobInfo).success(function(output){
			console.log('factory create job back from back')
			callback();
		})
	};

	factory.acceptJob = function(jobInfo, userID, callback){
		var info = {
			'job': jobInfo,
			'userID': userID
		}

		$http.post('/acceptJob', info).success(function(response){
			if (response.status){
				callback();
			}
		});
	};

	return factory;
})
