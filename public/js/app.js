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
			: 'partials/userLanding.html'
		})
		.when('/busLanding', {
			controller: 'busController'
			templateUrl
			: 'partials/busLanding.html'
		})
		.otherwise({
			redirectTo: '/'
		})
})