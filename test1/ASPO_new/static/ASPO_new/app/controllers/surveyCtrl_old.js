(function () {
    "use strict";

    angular.module("ASPO").controller('SurveyCtrl', ["$scope", "AspoService", function ($scope, aspoService) {
        var that = this; // Save this into that for better minification results.
		
		that.answered = [{questionId: 0, answerId: 0}];
		that.questions = {}; // database of all questions
		$scope.displayedQuestions = []; // Questions in fringe, that were or will be displayed
		$scope.displayNr = -1; // Index of current questions in carousel
		$scope.allowForward = false;
		
		// Mark current answer as inactive and set
		// next questions as active.
		function changeQuestion(direction) {
			for(var i = 0; i < $scope.displayedQuestions.length; i++)
				$scope.displayedQuestions[i].active = false;
			
			$scope.$apply();
			
			$scope.displayNr += direction;
			$scope.displayedQuestions[$scope.displayNr].active = true;
			
			// Enable forward button if answer is already provided
			$scope.allowForward = false;
			$scope.change();
		}
		
		// On each input change, check if user can click next button
		$scope.change = function(){
			var q = $scope.displayedQuestions[$scope.displayNr];
			
			if(q.type == 1 && q.answerNr != -1)
				$scope.allowForward = true;
			else if(q.type == 2)
				$scope.allowForward = true;
		}
		
		
		// Go through conditions if question display conditions
		// were satisfied. 
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
		}
		
		that.addedQuestions = [];
		$scope.back = function() 
		{
			if($scope.displayNr <= 0)
				return;
			
			// Delete number of questions added because of last questio and answer
			for(var i = 0; i < that.addedQuestions[that.addedQuestions.length -1].questions; i++)
			{				
				that.questions.push($scope.displayedQuestions[$scope.displayedQuestions.length-1]);
				$scope.displayedQuestions.pop();
			}
			
			// Also remove all answers user answered
			for(var i = 0; i < that.addedQuestions[that.addedQuestions.length -1].answers; i++)
				that.answered.pop();
			
			// Remove last item history for changes it brought
			that.addedQuestions.pop();
			
			// Bacward one question
			changeQuestion(-1);
		}
		
		$scope.diagnosis = -1;
		
		function end()
		{	
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
			}
			
			// BIG ENDIAN Sorting, starts from behind
			// 0 = no colour 	index: last (colors.length-1)
			// 1 = green		index: last-1
			// 2 = yellow 		index: ...
			// 4 = red
			// 8 = purple
			// 2^n flags...
			
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
			}
		}
		
		$scope.next = function() 
		{		
			// Save all answers from current question
			// Also track how many questions were newly added
			// for back button functionality
			that.addedQuestions.push({ questions: 0, answers: 0 });
			if($scope.displayedQuestions.length > 0)
			{
				var q = $scope.displayedQuestions[$scope.displayNr];
				q.time = new Date();
				
				// Remove all questions for current question to prevent duplicates.
				for(var i = 0; i < that.answered.length; i++)
					if(that.answered[i].questionId == q.id)
						that.answered.splice(i--, 1);
				
				// Go through every possible answer of type CHECKBOX), check if it's answered
				// and save it to answerd array
				if(q.type == 2)
				{
					for(var i = 0; i < q.answers.length; i++)
						if(q.answers[i].selected) 
						{
							that.answered.push({
								questionId: q.id,
								answerId: q.answers[i].answerID
							});
							that.addedQuestions[that.addedQuestions.length-1].answers++;
						}
				}
				// Handle RADIO type inputs
				// Because radio button shoul all be bound to one variable,
				// they are connected to one in question object no per answer as check boxes are.
				else if(q.type == 1)
				{
					that.answered.push({
						questionId: q.id,
						answerId: q.answerNr
					});
					that.addedQuestions[that.addedQuestions.length-1].answers++;
				}
			}
			
			that.questions.sort(function (a, b) {
					return a.sequence -  b.sequence;
				});
			
			// Find all questions that should be displayed afterwards
			// Delete it from all questions
			var added = false;
			for(var i = 0; i < that.questions.length; i++) {
				if(canDisplay(that.questions[i])) 
				{
					added = true;
					$scope.displayedQuestions.push(that.questions[i]);
					that.questions.splice(i--, 1);
					that.addedQuestions[that.addedQuestions.length-1].questions++;
					break;
				}
			}
			
			// No more questions left to display
			if(!added)
				end();
			// Otherwise sort questions and display
			else $scope.displayedQuestions.sort(function (a, b) {
					return a.sequence -  b.sequence;
				});
				
			// Move to next question
			if($scope.displayNr < $scope.displayedQuestions.length-1)
				changeQuestion(+1);
		}
		
		// Call service to get all questions
		aspoService.getQuestions().then(function (questions) {
			// Add property to indicate which one is showed
			// Required for Bootstrap UI Carousel
			for(var i = 0; i < questions.length; i++) {
				questions[i].active = false;
				questions[i].answerNr = -1;
				
				for(var j = 0; j < questions[i].answers.length; j++)
					questions[i].answers[j].selected = false;
			}
				
			// Sort based on display order
			$scope.displayedQuestions.sort(function (a, b) {
				return a.sequence - b.sequence;
			});
			
			// Mark first one as active and save all
			// questions in controller property variable.
			questions[0].active = true;
			$scope.displayNr = 0;
			that.questions = questions;
			
			// Find and display first questions
			$scope.next();
		});
	}]);
})();