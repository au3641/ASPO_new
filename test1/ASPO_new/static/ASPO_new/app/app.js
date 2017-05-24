(function() {
    "use strict";

    var app = angular.module("ASPO", [
        "ngRoute",
		"ngAnimate",
        "ui.bootstrap",
		"ngSanitize",
    ]);

    app.constant("_", window._);
	
	app.config(["$routeProvider",
		function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'app/pages/home.html',
				controller  : 'BlankCtrl'
			})
			.when('/vprasalnik', {
				templateUrl : 'app/pages/survey.html',
				controller  : 'SurveyCtrl'
			})
			.when('/vprasalnik/uvod', {
				templateUrl : 'app/pages/survey-intro.html',
				controller  : 'BlankCtrl'
			})
			.when('/o-spolno-prenosljivih-okuzbah/:view?', {
				templateUrl : 'app/pages/std-info.html',
				controller  : 'StdInfoCtrl'
			})
			.when('/bolezenski-znaki/:view?', {
				templateUrl : 'app/pages/symptoms.html',
				controller  : 'SymptomsCtrl'
			})
			.when('/pregled-pri-zdravniku', {
				templateUrl : 'app/pages/medical-examination.html',
				controller  : 'BlankCtrl'
			})
			.when('/zascita', {
				templateUrl : 'app/pages/protection.html',
				controller  : 'BlankCtrl'
			})
			.when('/primeri/:view?', {
				templateUrl : 'app/pages/examples.html',
				controller  : 'ExamplesCtrl'
			})
			.when('/o-nas', {
				templateUrl : 'app/pages/about.html',
				controller  : 'BlankCtrl'
			})
			.otherwise({ redirectTo: '/' });
	}]);
})();