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
				templateUrl : 'ASPO_new/home.html',
				controller  : 'BlankCtrl'
			})
			.when('/vprasalnik', {
				templateUrl : 'ASPO_new/survey.html',
				controller  : 'SurveyCtrl'
			})
			.when('/vprasalnik/uvod', {
				templateUrl : 'ASPO_new/survey-intro.html',
				controller  : 'BlankCtrl'
			})
			.when('/o-spolno-prenosljivih-okuzbah/:view?', {
				templateUrl : 'ASPO_new/std-info.html',
				controller  : 'StdInfoCtrl'
			})
			.when('/bolezenski-znaki/:view?', {
				templateUrl : 'ASPO_new/symptoms.html',
				controller  : 'SymptomsCtrl'
			})
			.when('/pregled-pri-zdravniku', {
				templateUrl : 'ASPO_new/medical-examination.html',
				controller  : 'BlankCtrl'
			})
			.when('/zascita', {
				templateUrl : 'ASPO_new/protection.html',
				controller  : 'BlankCtrl'
			})
			.when('/primeri/:view?', {
				templateUrl : 'ASPO_new/examples.html',
				controller  : 'ExamplesCtrl'
			})
			.when('/o-nas', {
				templateUrl : 'ASPO_new/about.html',
				controller  : 'BlankCtrl'
			})
			.otherwise({ redirectTo: '/' });
	}]);
})();