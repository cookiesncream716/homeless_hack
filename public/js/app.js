var myApp = angular.module('myApp', ['ngRoute'])

myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'authController',
			templateUrl
			: 'partials/busLogin.html'
		})
		.when('/userLanding', {
			controller: 'userLandingController',
			templateUrl
			: 'partials/userLanding.html'
		})
		// .when('/busLanding', {
		// 	controller: 'busController',
		// 	templateUrl
		// 	: 'partials/busLanding.html'
		// })
		.when('/business', {
			controller: 'businessController',
			templateUrl: 'partials/business.html'
		})
		// .when('/home', {
		// 	templateUrl: 'partials/example.html'
		// })
		.when('/resume', {
			controller: 'resumeController',
			templateUrl: 'partials/resume.html'
		})
		.otherwise({
			redirectTo: '/'
		})
})