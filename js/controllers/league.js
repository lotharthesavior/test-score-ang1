
app.controller("leagueController", [
    '$scope', 'LeagueService',
    function($scope, LeagueService) {
        $scope.league = LeagueService;
    }
]);
