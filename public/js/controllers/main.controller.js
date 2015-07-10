
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

app.factory('FlashCardsFactory', function ($http) {
    return {
    	getFlashCards: function (category) {
    		var queryParams = {};

            if (category) {
                queryParams.category = category;
            }

    		return $http.get("/cards", {params: queryParams}).then(function (response) {
    			return response.data;
    		});
    	}
	};
});

app.controller("StatsController", function ($scope, ScoreFactory) {
	$scope.scores = ScoreFactory;
});

app.factory("ScoreFactory", function () {
	return {
        correct: 0,
        incorrect: 0
    };
});






