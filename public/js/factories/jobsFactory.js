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

	return factory;
});