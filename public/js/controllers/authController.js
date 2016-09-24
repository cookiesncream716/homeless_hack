myApp.controller('authController', function($scope, authFactory){

	$scope.login = function(userInfo){
		authFactory.login(userInfo, function(data){
			console.log('this is the callback data:',data)
		})

	}

	$scope.register = function(regInfo){
		authFactory.register(regInfo, function(data){
			console.log('this is the callback data:', data)
		})
	}
})