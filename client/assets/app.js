var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngMaterial']);
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/landingPage.html',
		controller: 'userController'
	})
	.when('/homepage', {
		templateUrl: 'partials/homepage.html',
		controller: 'projectController'
	})
	.when('/projects/:id', {
		templateUrl: 'partials/project.html',
		controller: 'projectController'
	})
});
