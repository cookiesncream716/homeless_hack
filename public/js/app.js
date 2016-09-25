var myApp = angular.module('myApp', ['ngRoute'])

myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'authController',
			templateUrl
			: 'partials/busLogin.html'
		})
		.when('/userLanding', {
			controller: 'userController'
			templateUrl
			: 'partials/busLogin.html'
		}
		.when('/employerLanding')
			controller: 'userController'
			templateUrl
			: 'partials/busLogin.html'
		}
		.otherwise({
			redirectTo: '/'
		})
})