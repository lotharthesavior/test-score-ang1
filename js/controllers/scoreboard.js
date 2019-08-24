
app.controller("scoreboardController", [
    '$scope', 'PlayersService', 'ResultsService',
    function($scope, PlayersService, ResultsService) {
        $scope.players = PlayersService;
        $scope.results = ResultsService;
        $scope.league = [];

        $scope.addResult = function(result) {
            result.id = $scope.results.length + 1;
            $scope.results.push(result);
            $scope.result = {};
        }
    }
]);
