(function () {
	"use strict";

	angular.module("ASPO").factory("AspoService", ["$http", "$q", 
	function ($http, $q) {
	    var that = this;
	    
	    //var baseUrl = "api/"; https://aspo.mf.uni-lj.si/rest/testRest/questions
	    //var baseUrl = "http://localhost:8080/zdravo-mednozje/rest/testRest/";
	    var baseUrl = "https://aspo.mf.uni-lj.si/rest/testRest/";

		
		function getQuestions() {
	        var req = $http.get(baseUrl + "questions");

	        return req.then(_handleSuccess, _handleError);
	    }
		
		function sendData(answeredQuestions) {
			//$http.post(baseUrl + "send-data.php", answeredQuestions);
			$http.post(baseUrl + "answers", answeredQuestions);
		}

	    // Return API
	    return ({
	        getQuestions: getQuestions,
			sendData: sendData
	    });

	    // Private Methods
	    function _handleError(response) {
	        if (!angular.isObject(response.data) || !response.data.message) {
	            return $q.reject("Unknown error occured!");
	        }

	        return $q.reject(response.data.message);
	    }

	    function _handleSuccess(response) {
	        return response.data;
	    }
	}]);
})();