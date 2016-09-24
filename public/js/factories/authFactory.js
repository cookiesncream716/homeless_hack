myApp.factory('authFactory', function($http, AuthTokenFactory){
	var factory = {}; 

	factory.login = function (userInfo, callback){
   //      $http.post('/login', userInfo)
   //      .then(function (data){
			// console.log('factory.login callback data', data);
			// callback(data);
   //      });
		$http.post('/login',userInfo).then(function success(response){
				// console.log(response.data.token)
				// AuthTokenFactory.setToken(response.data.token);
				return response;
			});

	};

	factory.register = function(regInfo, type, callback){
		regInfo.type = type;
		$http.post('/register', regInfo).then(function success(response){

				user = response.data.user;
		        AuthTokenFactory.setToken(response.data.token);
		        return response;
			})

	};
	factory.userLogin = function(info, callback){
		console.log(info);
		$http.post('/userLogin', info).success(function(output){
			console.log('userLogin callback in factory')
		})
	}
	factory.userRegister = function(info, callback){
		console.log(info);
		$http.post('/userRegister', info).success(function(output){
			console.log('userRegister callback in factory')
		})

	}
	return factory;

})