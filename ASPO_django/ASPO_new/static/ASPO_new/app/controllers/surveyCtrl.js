(function () {
    "use strict";

    angular.module("ASPO").controller('SurveyCtrl', ["$scope", "AspoService", function ($scope, aspoService) {

		$scope.displayNr = -1; 		// Index of currently displayed question in carousel
		$scope.actualDisplayNumber = 1;	// Displayed question number shown to user (how many questions did the user see, ignores hidden questions)
		$scope.alertLevel = -1;		// Controls which alert message to display at the end of survey
		$scope.moveOn = false;		// If false, "next" button will be greyed out
		$scope.userConsent = false;	// Tells us if user consented to send his answers for research - by default user consent must be set to false

		// Function is called when radio button selection changes
		$scope.change = function(pk){
			$scope.moveOn = true;	// Enable "next" button

			// When radio button selection changes, reset selected variable of other answers in the question
			for(var i = 0; i < $scope.questions[$scope.displayNr].answers.length; i++)
			{
                if (pk == $scope.questions[$scope.displayNr].answers[i].pk)
                    $scope.questions[$scope.displayNr].answers[i].selected = true;
                else
                    $scope.questions[$scope.displayNr].answers[i].selected = false;
            }
		};

		// Called when returning to previous question
		$scope.back = function() 
		{
			// Make current question inactive (hide on front-end)
			$scope.questions[$scope.displayNr].active = false;

			// if not on first question
			if($scope.displayNr > 0)
			{
				// itterate thorugh hidden (ninja) questions in reverse until we find one that is not hidden
				do
				{
					if($scope.questions[$scope.displayNr].ninja)  // if question is hidden reset it's ninja flag to default
						$scope.questions[$scope.displayNr].ninja = false;
					$scope.displayNr--;
				}while($scope.questions[$scope.displayNr].ninja);
				$scope.actualDisplayNumber--; // decrease number displayed to user by 1
            }

            // Activate question that was not hidden
			$scope.questions[$scope.displayNr].active = true;
			$scope.moveOn = true; // enable "next" button, since anwsers were already chosen on this question
		};

		// Called after the last (non-hidden) question is answered
		function end()
		{
			var green = 0;
			var yellow = 0;
			var red = 0;
			var pinky = 0;
			var alertlevel = 1;
			var pack = {answeredWith: new Array()};		// list of selected answers

			// Count weight values for answered questions
			$scope.questions.forEach(function(question)
			{
				question.answers.forEach(function(answer)
                {
                	// if answer was selected, add it to pack
                	if(answer.selected && (answer.pk != $scope.consentQuestion.consentConfirmPK ||answer.pk != $scope.consentQuestion.consentRefusePK))
						pack["answeredWith"].push(answer.pk);

					if(answer.selected && answer.weight.length != 0)
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

			// Pick alert level, based on weight counts
			if(yellow < 4 && pinky == 0 && red == 0)
				alertlevel = 1; // green
			else if((yellow >= 4 || (pinky > 0 && pinky < 3)) && red == 0)
				alertlevel = 2; // yellow
			else
				alertlevel = 3; // red

			// Set alert level variable that controls alert display
			$scope.alertLevel = alertlevel;
			/*
			ZELENA, vsi odgovori zeleni, ali do vključno trije rumeni
			RUMENA, če so zeleni in vsaj štirje rumeni; če sta 1 ali 2 roza in ostali zeleni/rumeni
			RDEČA, vsaj 1 rdeč; ali če 3 roza
			 */

			// Check through all answers on consent question
			for(var i = 0; i < $scope.consentQuestion.answers.length; i++)
			{
				// If selected answer matched consent confirm answer ID, then the user consented
				if($scope.consentQuestion.answers[i].pk == $scope.consentQuestion.consentConfirmPK)
					if($scope.consentQuestion.answers[i].selected)
						$scope.userConsent = true;
			}

			// If user did not consent, drop all data in pack (do not send) and exit
			if($scope.userConsent == false)
			{
                pack = null;
                return;
            }

            // If user did consent, send data and exit
			if($scope.userConsent == true)
				aspoService.sendData(pack);

			return;
		}

		// Called when procceding to next question
		$scope.next = function() 
		{
			// Make current question inactive (hide on front-end)
			$scope.questions[$scope.displayNr].active = false;

			var skip; // do we skip the question?

			do
			{
				skip = false; // reset variable

				// Go the the next question if any, otherwise procced to the results
				if($scope.displayNr < $scope.questions.length - 1)
					$scope.displayNr++;
				else
					end();

				// Following nested for-loop is not n^3, but more like n*m*o, where:
				//  n = number of disables that apply to the question
				//  m = number of required answers that disable has
				//  o = number of answers on question that has at least one of required answers
				// Usually n*m*o ends up around 8-10

				// Check through possible disables for current question
				for(var i = 0; i < $scope.questions[$scope.displayNr].disables.length && !skip; i++)
				{
					// Check through answers required for these disables to apply
					for(var j = 0; j < $scope.questions[$scope.displayNr].disables[i].requiredAnswers.length && !skip; j++)
					{
						var relatedQID = $scope.questions[$scope.displayNr].disables[i].relatedQAs[j]; // question index of required answer

						// Check through all answers on question that has at least one required answer
						for(var k = 0; k < $scope.questions[relatedQID].answers.length; k++)
						{
							// If the answer in required answer
							if($scope.questions[relatedQID].answers[k].pk == $scope.questions[$scope.displayNr].disables[i].requiredAnswers[j])
							{
								// and if required answer is also selected
								if($scope.questions[relatedQID].answers[k].selected)
								{
									// then skip current question
									$scope.questions[$scope.displayNr].ninja = true;
                                    skip = true;
                                    break;
                                }
							}
						}
					}
				}
			}while(skip); // continue looping through questions until we find one that is not disabled

			$scope.questions[$scope.displayNr].active = true; // show question to the user
			$scope.moveOn = false; // disable "next" button (until user answers)

			// if the question already has an answer selected or if this is a multiple-selection question
			// then re-enable "next" button
			for(var i = 0; i < $scope.questions[$scope.displayNr].answers.length; i++)
			{
				if($scope.questions[$scope.displayNr].answers[i].selected == true || $scope.questions[$scope.displayNr].type == "checkbox")
				{
                    $scope.moveOn = true;
                    break;
                }
			}

			// Increase displayed number by 1
			$scope.actualDisplayNumber++;
		};

		// This function is executed first at survey load
		aspoService.getQuestionnaire().then(function (questionnaire)
        {
        	// We get all the data from the database about our questionnaire and save it in scope
            $scope.questionnaire = questionnaire[0];
        });

		// Service calls this function after it gets questions from the database
		aspoService.getQuestions().then(function (questions)
		{
			// Add aditional parameters to questions
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
            $scope.questions = new Array(); // Prepare scope variable for question storage

            // Only keep questions from selected questionnaire (select questionnaire in *service.js
            for(var i = 0; i < questions.length; i++)
            {
                if(questions[i].questionnaire == $scope.questionnaire.pk)
                    $scope.questions.push(questions[i]);
            }

            // Create consent question on scope for quick access later
			$scope.consentQuestion = {};
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
            $scope.consentQuestion.answers.push({pk: -1, question: -1, text: $scope.questionnaire.consentAcceptText, order: 1, weight: []});
            $scope.consentQuestion.answers.push({pk: -2, question: -1, text: $scope.questionnaire.consentRefuseText, order: 2, weight: []});
            $scope.consentQuestion.consentConfirmPK = -1;
            $scope.consentQuestion.consentRefusePK = -1;

            // Add consent question to question set, just before ordering
            $scope.questions.push($scope.consentQuestion);

			$scope.questions.sort(function (a, b)
			{
				return a.order - b.order;
			});

			// Mark first one as active
			$scope.questions[0].active = true;
		});

		// Service calls this function after it gets answers from the database
		aspoService.getAnswers().then(function (answers)
		{
			// Go through all the data we get
			for(var i = 0; i < answers.length; i++)
			{
				answers[i].selected = false; // did user select this question
				answers[i].weight = -1;		 // answer weight (or in our case alert level)

				for(var j = 0; j < $scope.questions.length; j++)
				{
					// Add answer to the correspoinding question
					if($scope.questions[j].pk == answers[i].question)
                        $scope.questions[j].answers.push(answers[i]);
				}
			}

			// Sort answers on each question in ascending order
			for(var i = 0; i < $scope.questions.length; i++)
			{
				$scope.questions[i].answers.sort(function(a, b)
				{
					return a.order - b.order;
				});
			}
		});

		// Service calls this function after it gets disables from the database
		aspoService.getDisables().then(function (disables)
		{
			// Go through all the data we get
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
				// Check through required answers on current disable
				for(var j = 0; j < disables[i].requiredAnswers.length; j++)
				{
					// Check thorugh every possible questions
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

				// Attach this disable to every question it can disable
				for(var j = 0; j < $scope.questions.length; j++)
				{
					// Add disable to the correspoinding question
					if($scope.questions[j].pk == disables[i].question)
						$scope.questions[j].disables.push(disables[i]);
				}
            }
		});

		// Service calls this function after it gets weights from the database
		aspoService.getAnswerWeights().then(function (weights)
		{
			// Check through all the answer weights we got
			for(var i = 0; i < weights.length; i++)
			{
				// Check through every question
				for(var j = 0; j < $scope.questions.length; j++)
				{
					// Check through every answer on this question
					for(var k = 0; k < $scope.questions[j].answers.length; k++)
					{
						// If current weight belongs to current answer
						if($scope.questions[j].answers[k].pk == weights[i].answer)
							$scope.questions[j].answers[k].weight = weights[i]; // add weight value to the answer
					}
				}
			}
		});
	}]);
})();