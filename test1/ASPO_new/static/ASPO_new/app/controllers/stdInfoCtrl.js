(function () {
    "use strict";

    angular.module("ASPO").controller('StdInfoCtrl', ["$scope", "$routeParams",
	function ($scope, $routeParams) {
        var that = this;
		
		$scope.file = !$routeParams.view ? "" : $routeParams.view;
		$scope.urlFile = 'pages/std-info/' + $scope.file + '.md';
		
		$scope.pages = [
		{
			name: 'Splošno o SPO',
			link: '',
		},
		{
			name: 'Gonoreja',
			link: 'gonoreja',
		},
		{
			name: 'Genitalni herpes',
			link: 'genitalni-herpes',
		},
		{
			name: 'Genitalne bradavice',
			link: 'genitalne-bradavice',
		},
		{
			name: 'Okužba s klamidijo',
			link: 'okuzba-s-klamidijo',
		},
		{
			name: 'Sifilis',
			link: 'sifilis',
		},
		{
			name: 'Trihomonoza',
			link: 'trihomonoza',
		},
		{
			name: 'Okužba z urogenitalnimi mikoplazmami',
			link: 'okuzba-z-urogenitalnimi-mikoplazmami',
		},
		{
			name: 'Hepatitis B',
			link: 'hepatitis-b',
		},
		{
			name: 'Hepatitis C',
			link: 'hepatitis-c',
		},
		{
			name: 'HIV/aids',
			link: 'hiv-aids',
		}];
	}]);
})();
