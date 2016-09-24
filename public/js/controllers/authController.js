myApp.controller('authController', function($scope, authFactory){

	$scope.login = function(busInfo){
		authFactory.login(busInfo, function(data){
			console.log('this is the callback data:',data);
		})
	}
	$scope.register = function(){
		authFactory.register($scope.busRegInfo, function(data){
			console.log('this is the callback data:', data); 
		})
	}
})