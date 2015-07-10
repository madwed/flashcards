
app.controller('MainController', function ($scope, FlashCardsFactory, ScoreFactory) {

	var getFlashCards = function (category) {
		FlashCardsFactory.getFlashCards(category).then(function (cards) {
			$scope.flashCards = cards;
		});
	};

	$scope.categories = [
		"MongoDB",
		"Express",
		"Angular",
		"Node"
	];

	$scope.getCategoryCards = function (category) {
		getFlashCards(category);
		$scope.currentCategory = category;
	};

	getFlashCards();

	$scope.answerQuestion = function (answer, flashCard) {
		if (!flashCard.answered) {
			flashCard.answered = true;
			flashCard.answeredCorrectly = answer.correct;
			if(answer.correct){
				ScoreFactory.correct++;
			}else{
				ScoreFactory.incorrect++;
			}
		}
	};

});

