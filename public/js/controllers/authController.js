myApp.controller('authController', function($scope, authFactory, $location){
	$scope.employee_reg = false;
	$scope.biz_reg = false;
	$scope.employeeLogin = true;
	$scope.biz_login = true;
	$scope.userInfo = {};
	$scope.busRegInfo = {};
	$scope.userReg = {};

	$scope.showRegBiz = function(){
		$scope.biz_reg = true;
		$scope.employeeLogin = false;
	}
	$scope.showEmployeeReg = function(){
		$scope.biz_login = false;
		$scope.employee_reg = true
	}
	$scope.login = function(busInfo){
		// console.log('joi')
		authFactory.login(busInfo, 'employer', function(data){
			// console.log('this is the callback data:',data);
			$scope.busInfo = {};
			$location.url('/business')
		})
	}
	$scope.register = function(){
		authFactory.register($scope.busRegInfo, 'employer', function(data){
			// console.log('this is the callback data:', data); 
			$location.url('/business')
		})
	}
	$scope.userLogin = function(){
		console.log('user clicked login')
		console.log('user', $scope.userInfo)
		authFactory.userLogin($scope.userInfo, function(data){
			// console.log('userLogin callback info controller')
			// console.log(data)
			$scope.userInfo = {};
			$location.path('/userLanding')
		})
	}
	$scope.userRegistration = function(){
		// console.log($scope.userReg)
		authFactory.userRegister($scope.userReg, function(data){
			// console.log('user callback info controller', data)
			$scope.userReg = {};
			$location.path('/userLanding');
		})
	}
})