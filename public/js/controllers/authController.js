myApp.controller('authController', function($scope, authFactory, $location){

	$scope.login = function(busInfo){
		authFactory.login(busInfo, function(data){
			console.log('this is the callback data:',data);
			$scope.busInfo = {};
			$location.url('/home')
		})
	}
	$scope.register = function(){
		authFactory.register($scope.busRegInfo, function(data){
			console.log('this is the callback data:', data);
			$scope.busRegInfo = {}; 
		})
	}
	$scope.userLogin = function(){
		console.log($scope.userInfo)
		authFactory.userLogin($scope.userInfo, function(data){
			console.log('userLogin callback info controller')
			console.log(data)
			$scope.userInfo = {};
			$location.path('/home')
		})
	}
	$scope.userRegistration = function(){
		console.log($scope.userReg)
		authFactory.userRegister($scope.userReg, function(data){
			console.log('user callback info')
			$scope.userReg = {};
		})
	}
})