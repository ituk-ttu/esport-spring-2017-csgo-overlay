app.controller("afkController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope", "$timeout",
    function($q, $scope, $stateParams, store, socketService, $rootScope, $timeout) {
        $scope.data = $rootScope.data;

        $scope.animateIn = function() {

        };

        $scope.animateOut = function() {

        };

        $scope.$watch(function() {
            return $rootScope.data;
        }, function() {
            $scope.data = $rootScope.data;
        }, true);

        $rootScope.socket.on("animate", function(direction) {
            if (direction === "in") $scope.animateIn();
            if (direction === "out") $scope.animateOut();
        });

    }]);