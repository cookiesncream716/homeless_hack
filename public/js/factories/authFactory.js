myApp.factory('authFactory', function($http, AuthTokenFactory){
	var factory = {}; 

	factory.login = function (userInfo, callback){
   //      $http.post('/login', userInfo)
   //      .then(function (data){
			// console.log('factory.login callback data', data);
			// callback(data);
   //      });
		$http.post('/login', userInfo).then(function success(response){
				// console.log(response.data.token)
				// AuthTokenFactory.setToken(response.data.token);
				return response;
			});

	};

	factory.register = function(regInfo, callback){
		console.log(regInfo);
		$http.post('/register', regInfo).then(function success(response){
				user = response.data.user;
		        AuthTokenFactory.setToken(response.data.token);
		        return response;
			})
	}
	return factory;

})