myApp.controller('authController', function($scope, authFactory){

	$scope.login = function(busInfo){
		authFactory.login(busInfo, 'employer' function(data){
			console.log('this is the callback data:',data);
		})
	}
	$scope.register = function(){
		authFactory.register($scope.busRegInfo, 'employer', function(data){
			console.log('this is the callback data:', data); 
		})
	}
	$scope.userLogin = function(){
		console.log($scope.userInfo)
		authFactory.userLogin($scope.userInfo, 'user', function(data){
			console.log('userLogin callback info')
		})
	}
	$scope.userRegistration = function(){
		console.log($scope.userReg)
		authFactory.userRegister($scope.userReg, 'user', function(data){
			console.log('user callback info')
		})
	}
})