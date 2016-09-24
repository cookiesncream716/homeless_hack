myApp.factory('authFactory', function($http){
	var factory = {}; 
	factory.login = function (userInfo, callback){
        console.log(userInfo);
        $http.post('/login', userInfo)
        .then(function (data){
			console.log('factory.login callback data', data);
			callback(data);
        });
	};

	factory.register = function(regInfo, callback){
		console.log(regInfo);
		$http.post('register', regInfo)
		.then(function(data){
			console.log('factory.register callback data', data); 
			callback(data);
		})
	}
	return factory;

})