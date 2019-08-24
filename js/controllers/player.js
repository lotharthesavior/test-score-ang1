
app.controller("playerController", [
    '$scope', 'PlayersService',
    function($scope, PlayersService) {
        $scope.players = PlayersService;

        /**
         * Validated Rules:
         * 1. player's name can't be empty
         *
         * @param player
         * @return {boolean}
         */
        var validatePlayer = function(player) {
            return playerCantBeEmpty(player)
                && playersNameCantBeOnlySpaces(player)
                && playersNameMustBeUnique(player);
        }

        /**
         * @param player
         * @returns {boolean}
         */
        var playerCantBeEmpty = function(player) {
            var check_result = player !== undefined;
            if (!check_result) {
                displayError("Player can't be empty!");
            }
            return check_result;
        }

        /**
         * @param player
         * @returns {boolean}
         */
        var playersNameCantBeOnlySpaces = function(player) {
            var check_result = player.name.replace(/\s+/g,'').length > 0;
            if (!check_result) {
                displayError("Player's name can't have only spaces!");
            }
            return check_result;
        }

        /**
         * @param player
         * @returns {boolean}
         */
        var playersNameMustBeUnique = function(player) {
            var check_result = $scope.players
                .map((player) => player.name)
                .indexOf(player.name) === -1;
            if (!check_result) {
                displayError("Player's name must be unique!");
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

        $scope.addPlayer = function(player) {
            if (!validatePlayer(player)) {
                return;
            }

            player.id = $scope.players.length + 1;
            $scope.players.push(player);
            $scope.player = {};
            hideError();
        }
    }
]);
