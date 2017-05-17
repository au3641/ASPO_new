(function () {
    "use strict";

    angular.module("ASPO").controller('SurveyCtrl', ["$scope", "AspoService", function ($scope, aspoService) {

		$scope.displayNr = -1; // Index of current questions in carousel
		$scope.actualDisplayNumber = 1;
		$scope.alertLevel = -1;
		$scope.moveOn = false;
		$scope.userConsent = false;

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

		$scope.change = function(pk){
			$scope.moveOn = true;

			// When radio button selection changes, reset selected variable of other answers in the question
			for(var i = 0; i < $scope.questions[$scope.displayNr].answers.length; i++)
			{
                if (pk == $scope.questions[$scope.displayNr].answers[i].pk)
                    $scope.questions[$scope.displayNr].answers[i].selected = true;
                else
                    $scope.questions[$scope.displayNr].answers[i].selected = false;
            }
		};

		$scope.back = function() 
		{
			$scope.questions[$scope.displayNr].active = false;

			if($scope.displayNr > 0)
			{
				do
				{
					if($scope.questions[$scope.displayNr].ninja)
						$scope.questions[$scope.displayNr].ninja = false;
					$scope.displayNr--;
				}while($scope.questions[$scope.displayNr].ninja);
				$scope.actualDisplayNumber--;
            }

			$scope.questions[$scope.displayNr].active = true;
			$scope.moveOn = true;
		};

		function end()
		{
			var green = 0;
			var yellow = 0;
			var red = 0;
			var pinky = 0;
			var alertlevel = 1;

			$scope.questions.forEach(function(question)
			{
				question.answers.forEach(function(answer)
                {
					if(answer.selected)
					{
						if(answer.weight.type == "semafor")
						{
							switch (answer.weight.value)
							{
								case 1: green++; break;
								case 2: yellow++; break;
								case 3: red++; break;
								case 4: pinky++; break;
							}
						}
					}
				});
			});

			if(yellow < 4 && pinky == 0 && red == 0)
				alertlevel = 1; // green
			else if((yellow >= 4 || (pinky > 0 && pinky < 3)) && red == 0)
				alertlevel = 2; // yellow
			else
				alertlevel = 3; // red

			$scope.alertLevel = alertlevel;
			/*
			ZELENA, vsi odgovori zeleni, ali do vključno trije rumeni
			RUMENA, če so zeleni in vsaj štirje rumeni; če sta 1 ali 2 roza in ostali zeleni/rumeni
			RDEČA, vsaj 1 rdeč; ali če 3 roza
			 */

			for(var i = 0; i < $scope.consentQuestion.answers.length; i++)
			{
				if($scope.consentQuestion.answers[i].pk == $scope.consent.consentConfirmPK)
					if($scope.consentQuestion.answers[i].selected)
						$scope.userConsent = true;
			}

			// TODO save results into database

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

			var skip;

			do
			{
				skip = false;
				if($scope.displayNr < $scope.questions.length - 1)
					$scope.displayNr++;
				else
					end();

				// Check answer if disabled
				for(var i = 0; i < $scope.questions[$scope.displayNr].disables.length && !skip; i++)
				{
					for(var j = 0; j < $scope.questions[$scope.displayNr].disables[i].requiredAnswers.length && !skip; j++)
					{
						var relatedQID = $scope.questions[$scope.displayNr].disables[i].relatedQAs[j]; // index of question of required answer
						for(var k = 0; k < $scope.questions[relatedQID].answers.length; k++)
						{
							if($scope.questions[relatedQID].answers[k].pk == $scope.questions[$scope.displayNr].disables[i].requiredAnswers[j])
							{
								if($scope.questions[relatedQID].answers[k].selected)
								{
									$scope.questions[$scope.displayNr].ninja = true;
                                    skip = true;
                                    break;
                                }
							}
						}
					}
				}
			}while(skip);

			$scope.questions[$scope.displayNr].active = true;
			$scope.moveOn = false;

			for(var i = 0; i < $scope.questions[$scope.displayNr].answers.length; i++)
			{
				if($scope.questions[$scope.displayNr].answers[i].selected == true || $scope.questions[$scope.displayNr].type == "checkbox")
				{
                    $scope.moveOn = true;
                    break;
                }
			}
			$scope.actualDisplayNumber++;
		};

		aspoService.getQuestionnaire().then(function (questionnaire)
        {
            $scope.questionnaire = questionnaire;
        });

		// Call service to get all questions
		aspoService.getQuestions().then(function (questions)
		{
			for(var i = 0; i < questions.length; i++)
			{
				// Add property 'active' to indicate which question is displayed
				questions[i].active = false;// Required for Bootstrap UI Carousel
				questions[i].answers = [];	// array filled by getAnswers
				questions[i].disables = []; // array filled by getDisables
				questions[i].ninja = false; // ninja == disabled == hidden (ninja is not reserved in JS ^^)
				// if question is ninja, then do not send it's answer in a result
			}

			$scope.displayNr = 0; // Tells us which question is active
            $scope.questions = [];

            // Only keep questions from selected questionnaire (select questionnaire in *service.js
            for(var i = 0; i < questions.length; i++)
            {
                if(questions[i].questionnaire == $scope.questionnaire.pk)
                    $scope.questions.push(questions[i]);
            }

            // Create consent question on scope for quick access later
            $scope.consentQuestion.pk = -1;
            $scope.consentQuestion.questionnaire = $scope.questionnaire.pk;
            $scope.consentQuestion.text = $scope.questionnaire.consentQuestionText;
            $scope.consentQuestion.order = $scope.questionnaire.consentShowOrder;
            $scope.consentQuestion.type = "radio";
            $scope.consentQuestion.active = false;
            $scope.consentQuestion.answers = [];
            $scope.consentQuestion.disables = [];
            $scope.consentQuestion.ninja = false;

            // -1 private key is accept, -2 is refuse
            $scope.consentQuestion.answers.push({pk: -1, question: -1, text: $scope.questionnaire.consentAcceptText, order: 1});
            $scope.consentQuestion.answers.push({pk: -2, question: -1, text: $scope.questionnaire.consentRefuseText, order: 2});
            $scope.consentQuestion.consentConfirmPK = -1;

            // Add consent question to question set, just before ordering
            $scope.questions.push($scope.consentQuestion);

			$scope.questions.sort(function (a, b)
			{
				return a.order - b.order;
			});

			// Mark first one as active
			$scope.questions[0].active = true;
		});

		// Call service to get all answers
		aspoService.getAnswers().then(function (answers)
		{
			for(var i = 0; i < answers.length; i++)
			{
				answers[i].selected = false;
				answers[i].weight = -1;

				for(var j = 0; j < $scope.questions.length; j++)
				{
					// Add answers to the correspoinding questions
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
		});

		// Call service to get all disables
		aspoService.getDisables().then(function (disables)
		{
			for(var i = 0; i < disables.length; i++)
			{
				// Sort requiredAnswers in ascending order
				disables[i].requiredAnswers.sort(function (a, b)
				{
					return a.requiredAnswers - b.requiredAnswers;
				});

				// Array of question IDs (array index)
				// It tells us on which question each requiredAnswers is attached to (for faster runtime look-up)
				disables[i].relatedQAs = [];

				// Find corresponding question IDs
				for(var j = 0; j < disables[i].requiredAnswers.length; j++)
				{
					for(var k = 0; k < $scope.questions.length; k++)
					{
						// If answer we seek is in this question
						for(var l = 0; l < $scope.questions[k].answers.length; l++)
						{
                            if ($scope.questions[k].answers[l].pk == disables[i].requiredAnswers[j])
                                disables[i].relatedQAs.push(k); // Add question id to related
                        }
					}
				}

				// Attach disable object to question this disable object can disable
				for(var j = 0; j < $scope.questions.length; j++)
				{
					// Add disables to the correspoinding questions
					if($scope.questions[j].pk == disables[i].question)
						$scope.questions[j].disables.push(disables[i]);
				}
            }
		});

		aspoService.getAnswerWeights().then(function (weights)
		{
			for(var i = 0; i < weights.length; i++)
			{
				for(var j = 0; j < $scope.questions.length; j++)
				{
					for(var k = 0; k < $scope.questions[j].answers.length; k++)
					{
						if($scope.questions[j].answers[k].pk == weights[i].answer)
							$scope.questions[j].answers[k].weight = weights[i];
					}
				}
			}
		});
	}]);
})();