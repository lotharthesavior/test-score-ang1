
app.controller("playerController", [
    '$scope', 'PlayersService',
    function($scope, PlayersService) {
        $scope.players = PlayersService;
        $scope.addPlayer = function(player) {
            player.id = $scope.players.length + 1;
            $scope.players.push(player);
            $scope.player = {};
        }
    }
]);
