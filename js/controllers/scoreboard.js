
app.controller("scoreboardController", [
    '$scope', 'PlayersService', 'ResultsService', 'LeagueService',
    function($scope, PlayersService, ResultsService, LeagueService) {
        $scope.players = PlayersService;
        $scope.results = ResultsService;
        $scope.league = LeagueService;
        $scope.error_message = "";

        /**
         * Validated Rules:
         * 1. player wins when reach 11 points
         * 2. player only wins when 2 points ahead
         * 3. results can't be empty
         * 4. players must be selected
         *
         * @param result
         * @return {boolean}
         */
        var validateResult = function(result) {
            return resultCantBeEmpty(result)
                && playersMustBeSelected(result)
                && playerHasElevenPoints(result)
                && playerIsTwoPointsAhead(result);
        }

        /**
         * @param result
         * @returns {boolean}
         */
        var playerHasElevenPoints = function(result) {
            var check_result = result.score_1 >= 11 || result.score_2 >= 11;
            if (!check_result) {
                displayError("No player has eleven points yet!");
            }
            return check_result;
        }

        /**
         * @param result
         * @returns {boolean}
         */
        var resultCantBeEmpty = function(result) {
            var check_result = result !== undefined;
            if (!check_result) {
                displayError("Result can't be empty!");
            }
            return check_result;
        }

        /**
         * @param result
         * @returns {boolean}
         */
        var playersMustBeSelected = function(result) {
            var check_result = result.player_1 !== undefined && result.player_2 !== undefined;
            if (!check_result && result.player_1 === undefined) {
                displayError("Player 1 can't be empty!");
            } else if (!check_result && result.player_2 === undefined) {
                displayError("Player 2 can't be empty!");
            }
            return check_result;
        }

        /**
         * @param result
         * @returns {boolean}
         */
        var playerIsTwoPointsAhead = function(result) {
            var check_result = result.score_1 >= result.score_2 + 2 || result.score_2 >= result.score_1 + 2;
            if (!check_result) {
                displayError("No player has 2 points ahead yet!");
            }
            return check_result;
        }

        /**
         * @todo candidate to be reused!
         * @param message
         */
        var displayError = function(message) {
            $scope.error_message = message;
        }

        /**
         * @todo candidate to be reused!
         */
        var hideError = function() {
            $scope.error_message = "";
        }

        $scope.addResult = function(result) {
            if (!validateResult(result)) {
                return;
            }

            result.id = $scope.results.length + 1;
            $scope.results.push(result);
            $scope.result = {};
            $scope.updateLeague();
            hideError();
        }

        $scope.updateLeague = function() {
            var league = [];
            $scope.results.forEach(function(result){
                var victor = null;
                if (result.score_1 > result.score_2) {
                    victor = result.player_1;
                } else {
                    victor = result.player_2;
                }

                var key = league.map((vic) => vic.name).indexOf(victor);
                if (key !== -1 && victor !== 'Steve (CEO)') {
                    league[key].points += 2;
                } else if (key === -1) {
                    var newPoints = 2;
                    if (victor === 'Steve (CEO)') {
                        newPoints = 0;
                    }
                    league.push({
                        name: victor,
                        points: newPoints,
                        ceo: victor === 'Steve (CEO)'
                    });
                }
                $scope.league.updateRank(league);
            });
        }
    }
]);
