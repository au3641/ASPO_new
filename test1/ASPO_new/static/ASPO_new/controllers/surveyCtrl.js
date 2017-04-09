(function () {
    "use strict";

    angular.module("ASPO").controller('SurveyCtrl', ["$scope", "AspoService", function ($scope, aspoService) {


		$scope.displayNr = -1; // Index of current questions in carousel
		$scope.weDoneHereBoyz = -1;
		$scope.moveOn = true;

		// Go through conditions if question display conditions
		// were satisfied.
		/*
		function canDisplay(question) 
		{
			if(question.dependencies.length == 0)
				return false;
			
			var matchedDependecies = 0;
			
			// All conditions should be satisfied (and logical operation)
			for(var i = 0; i < question.dependencies.length; i++) {
				var dep = question.dependencies[i];
				
				// If previous questions has an ID 0, means always display
				if(dep.previusQuestionID == 0)
					return true;
				
				else
					// Go through all answered questions
					for(var j = 0; j < that.answered.length; j++) {
						// Match question dependency to already answered questions
						// Skip if not found
						if(that.answered[j].questionId*1 !== Math.abs(dep.previusQuestionID))
							continue;
						
						// If number is negative use OR
						if(dep.previusQuestionID < 0 && that.answered[j].answerId == dep.answerID)
							return true;
							
						// if matched and answerID == 0, match any as in question ID
						// also match in specific question dependecy matches
						if(dep.answerID == 0 ||							
						   that.answered[j].answerId == dep.answerID)
							matchedDependecies++;
					}
			}
			
			// If all conditions were met, return true, otherwise false.
			return question.dependencies.length <= matchedDependecies;
		}*/

		$scope.change = function(){
			return;
		};

		$scope.back = function() 
		{
			$scope.questions[$scope.displayNr].active = false;

			if($scope.displayNr > 0)
				$scope.displayNr--;

			$scope.questions[$scope.displayNr].active = true;
		};

		function end()
		{
			return;
			/*
			that.answered.shift();		
			aspoService.sendData(that.answered);
			
			var colors = new Array(32);
			for(var i = 0; i < colors.length; i++)
				colors[i] = 0;
			
			// Count answer colours user provided.
			for(var i = 0; i < $scope.displayedQuestions.length; i++) {
				var q = $scope.displayedQuestions[i];

				// By current design checkboxes can be ignored
				if(q.type == 2)
					continue;
				
				for(var j = 0; j < q.answers.length; j++)
				{			
					if(q.answers[j].answerID != q.answerNr)
						continue;
					
					var bin = (q.answers[j].flag >>> 0).toString(2);
					
					for(var k = 0; k < bin.length; k++)
						colors[colors.length-k-1] += 1*bin[bin.length-k-1]; // 1* lazy cast from char to int
					
					break;
				}
			}*/
			
			// BIG ENDIAN Sorting, starts from behind
			// 0 = no colour 	index: last (colors.length-1)
			// 1 = green		index: last-1
			// 2 = yellow 		index: ...
			// 4 = red
			// 8 = purple
			// 2^n flags...
			/*
			var last = colors.length-1;
			// Decide which warning to show
			if(colors[last-3] >= 3 || colors[last-2])
				$scope.diagnosis = 3;
			else if(colors[last-3] >= 1 || colors[last-1] >= 4)
				$scope.diagnosis = 2;
			else
				$scope.diagnosis = 1;
			
			switch($scope.diagnosis)
			{
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
			}*/
		}
		
		$scope.next = function() 
		{
			$scope.questions[$scope.displayNr].active = false;

			if($scope.displayNr < $scope.questions.length)
				$scope.displayNr++;
			else
				end();

			$scope.questions[$scope.displayNr].active = true;
		};

		// Call service to get all questions
		aspoService.getQuestions().then(function (questions)
		{
			// Add property to indicate which one is showed
			// Required for Bootstrap UI Carousel
			for(var i = 0; i < questions.length; i++)
			{
				questions[i].active = false;
				questions[i].answers = [];
			}
			
			// Mark first one as active and save all
			// questions in controller property variable.
			questions[0].active = true;
			$scope.displayNr = 0;
			$scope.questions = questions;

			$scope.questions.sort(function (a, b)
			{
				return a.sequence - b.sequence;
			});
		});

		aspoService.getAnswers().then(function (answers)
		{
			for(var i = 0; i < answers.length; i++)
			{
				answers[i].selected = false;
				for(var j = 0; j < $scope.questions.length; j++)
				{
					if($scope.questions[j].pk == answers[i].question)
						$scope.questions[j].answers.push(answers[i]);
				}
			}

			for(var i = 0; i < $scope.questions.length; i++)
			{
				$scope.questions[i].answers.sort(function(a, b)
				{
					return a.order - b.order;
				});
			}

			// Find and display first questions
			//$scope.next();
		});
	}]);
})();