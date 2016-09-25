myApp.factory('jobsFactory', function($http){
	var factory = {};

	factory.getJobsForUser = function(city, callback, sort, asc){
		var aSign;

		if(!sort){
			sort = "createdAt"
		}

		if(!asc){
			aSign = "-" else
		}else{
			aSign = "+"
		}

		var url = "/jobsForUser/" + '/' + city + '/' sort + "/" + aSign;
		$http.get(url).success(function(result){
			if(result.status){
				callback(result.jobs);
			}
		});
		}
		
	}
	return factory
})