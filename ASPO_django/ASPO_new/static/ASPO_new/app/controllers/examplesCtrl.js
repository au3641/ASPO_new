(function () {
    "use strict";

    angular.module("ASPO").controller('ExamplesCtrl', ["$scope", "$routeParams",
	function ($scope, $routeParams) {
        var that = this;
		
		$scope.file = !$routeParams.view ? "gonoreja-primer" : $routeParams.view;
		$scope.urlFile = 'app/pages/examples/' + $scope.file + '.md';
		
		$scope.pages = [
		{
			name: 'Gonoreja',
			link: 'gonoreja-primer',
		},
		{
			name: 'Genitalni herpes',
			link: 'herpes-primer',
		},
		{
			name: 'Genitalne bradavice',
			link: 'genitalne-bradavice-primer',
		},
		{
			name: 'Okužba s klamidijo',
			link: 'klamidija-primer',
		},
		{
			name: 'Sifilis',
			link: 'sifilis-primer',
		},
		{
			name: 'Trihomonoza',
			link: 'trihomonoza-primer',
		},
		{
			name: 'Hepatitis B',
			link: 'hepatitisB-primer',
		},
		{
			name: 'Hepatitis C',
			link: 'hepatitisC-primer',
		},
		{
			name: 'HIV/aids',
			link: 'HIV-primer',
		}];
	}]);
})();
