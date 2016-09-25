var myApp = angular.module('myApp', ['ngRoute'])

myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'authController',
			templateUrl
			: 'partials/busLogin.html'
		})
		.when('/business', {
			controller: 'businessController',
			templateUrl: 'partials/business.html'
		})
		// .when('/home', {
		// 	templateUrl: 'partials/example.html'
		// })
		.otherwise({
			redirectTo: '/'
		})
})