var myApp = angular.module('myApp', ['ngRoute'])

myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'authController',
			templateUrl
			: 'partials/busLogin.html'
		})
		.when('/business', {
<<<<<<< HEAD
			controller: 'businessController'
=======
			controller: 'businessController',
>>>>>>> 7113ba8173ac934abba3bb43f4b9dbbeed1a5d5c
			templateUrl: 'partials/business.html'
		})
		// .when('/home', {
		// 	templateUrl: 'partials/example.html'
		// })
		.otherwise({
			redirectTo: '/'
		})
})