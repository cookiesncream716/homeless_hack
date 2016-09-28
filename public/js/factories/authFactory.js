myApp.factory('authFactory', function($http, AuthTokenFactory){
	var factory = {}; 
	var business = {};
	var user = {};
	factory.login = function (userInfo, type, callback){
		userInfo.type = type;
		// console.log(userInfo)
		$http.post('/login', userInfo).then(function success(response){
				console.log(response.data.token);
				business = {id: response.data.user._id, name: response.data.user.name, email: response.data.user.email};
				// console.log('business:', business)
				AuthTokenFactory.setToken(response.data.token);
					callback(response);

			});


	};

	factory.register = function(regInfo, type, callback){
		regInfo.type = type;
		$http.post('/register', regInfo).then(function success(response){
				business = {id: response.data.user._id, name: response.data.user.name, email: response.data.user.email};
				// console.log('business registration callback', business)
		        AuthTokenFactory.setToken(response.data.token);
		        callback(response)
		})
	};
	factory.get_business = function(callback){
		callback(business)
	};
	factory.userLogin = function(info, callback){
		console.log(info);
		$http.post('/userLogin', info).success(function(output){
			console.log("THIS IS OUTPUT", output)
			console.log('userLogin callback in factory - id: ', output.user._id)
			user = {id: output.user._id, username: output.user.username, city: output.user.city};
			console.log("OUTPUT", output.token);
			AuthTokenFactory.setToken(output.token);
			console.log(user)
			callback(output)
		})
	};
	factory.userRegister = function(info, callback){
		console.log(info);
		$http.post('/userRegister', info).success(function(output){
			user = {id: output.user._id, username: output.user.username, city: output.user.city};
			console.log('userRegister callback in factory')
			callback(output);
		})

	};
	factory.get_user = function(callback){
		console.log('USER:', user)
		callback(user)
	};
	factory.logout = function(callback){
		user = null;
		business = null;
		console.log('Authfactory logout')
		AuthTokenFactory.setToken()
		callback()
	}
	return factory;

})