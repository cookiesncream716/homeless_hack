myApp.controller('authController', function($scope, authFactory, $location){

	$scope.login = function(busInfo){
		console.log('joi')
		authFactory.login(busInfo, 'employer', function(data){
			console.log('this is the callback data:',data);
			$location.url('/home')
		})
	}
	$scope.register = function(){
		authFactory.register($scope.busRegInfo, 'employer', function(data){
			console.log('this is the callback data:', data); 
			$location.url('/home')
		})
	}
	$scope.userLogin = function(){
		console.log($scope.userInfo)
		authFactory.userLogin($scope.userInfo, 'user', function(data){
			console.log('userLogin callback info')
			$location.url('/home')
		})
	}
	$scope.userRegistration = function(){
		console.log($scope.userReg)
		authFactory.userRegister($scope.userReg, 'user', function(data){
			console.log('user callback info')
			$location.url('/home')
		})
	}
})