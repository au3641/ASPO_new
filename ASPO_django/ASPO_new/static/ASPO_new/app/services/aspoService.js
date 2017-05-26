(function () {
	"use strict";

	angular.module("ASPO").factory("AspoService", ["$http", "$q", 
	function ($http, $q) {
	    var that = this;
	    $http.defaults.xsrfCookieName = 'csrftoken';
		$http.defaults.xsrfHeaderName = 'X-CSRFToken';
	    //var baseUrl = "api/"; https://aspo.mf.uni-lj.si/rest/testRest/questions
	    //var baseUrl = "http://localhost:8080/zdravo-mednozje/rest/testRest/";
	    //var baseUrl = "https://aspo.mf.uni-lj.si/rest/testRest/";
	    var baseUrl = "https://aspo.mf.uni-lj.si/ASPO/rest/";
		// var baseUrl = "http://127.0.0.1:8000/ASPO/rest/";


		function getQuestionnaire() {
			var req = $http.get(baseUrl + "questionnaireASPO/?format=json");

			return req.then(_handleSuccess, _handleError);
		}

		function getQuestions() {
	        var req = $http.get(baseUrl + "questionsASPO/?format=json");

	        return req.then(_handleSuccess, _handleError);
	    }

	    function getAnswers() {
			var req = $http.get(baseUrl + "answersASPO/?format=json");

			return req.then(_handleSuccess, _handleError);
		}

		function getDisables() {
			var req = $http.get(baseUrl + "disablesASPO/?format=json");

			return req.then(_handleSuccess, _handleError);
		}

		function getAnswerWeights() {
			var req = $http.get(baseUrl + "answerWeightsASPO/?format=json");

			return req.then(_handleSuccess, _handleError);
		}
		
		function sendData(answeredQuestions) {
			//$http.post(baseUrl + "send-data.php", answeredQuestions);
			$http.post(baseUrl + "sendAnswersASPO/", answeredQuestions);
		}

	    // Return API
	    return ({
			getQuestionnaire: getQuestionnaire,
	        getQuestions: getQuestions,
			getAnswers: getAnswers,
			getDisables: getDisables,
			getAnswerWeights: getAnswerWeights,
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
