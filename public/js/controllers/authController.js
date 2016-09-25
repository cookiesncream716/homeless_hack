myApp.controller('authController', function($scope, authFactory, $location){

	$scope.login = function(busInfo){
		console.log('joi')
		authFactory.login(busInfo, 'employer', function(data){
			console.log('this is the callback data:',data);
			$scope.busInfo = {};
			$location.url('/business')
		})
	}
	$scope.register = function(){
		authFactory.register($scope.busRegInfo, 'employer', function(data){
			console.log('this is the callback data:', data); 
			$location.url('/business')
		})
	}
	$scope.userLogin = function(){
		console.log($scope.userInfo)
		authFactory.userLogin($scope.userInfo, function(data){
			console.log('userLogin callback info controller')
			console.log(data)
			$scope.userInfo = {};
			$location.path('/userLanding')
		})
	}
	$scope.userRegistration = function(){
		console.log($scope.userReg)
		authFactory.userRegister($scope.userReg, function(data){
			console.log('user callback info controller', data)
			$scope.userReg = {};
			$location.path('/userLanding');
		})
	}
})