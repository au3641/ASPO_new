(function () {
    "use strict";

    angular.module("ASPO").controller('SymptomsCtrl', ["$scope", "$routeParams",
	function ($scope, $routeParams) {
        var that = this;
		
		$scope.file = !$routeParams.view ? "" : $routeParams.view;
		$scope.urlFile = 'pages/symptoms/' + $scope.file + '.md';
	}]);
})();
