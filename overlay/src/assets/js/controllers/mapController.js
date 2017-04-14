app.controller("mapController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope", "$timeout",
    function($q, $scope, $stateParams, store, socketService, $rootScope, $timeout) {
        $scope.data = $rootScope.data;

        $scope.animateIn = function() {
            $timeout(function() {
                $('.team-left').removeClass('loading');
            }, 400);
            $timeout(function() {
                $('.team-right').removeClass('loading');
            }, 400);
            $timeout(function() {
                $('.map-1').removeClass('loading');
            }, 500);
            $timeout(function() {
                $('.map-1').addClass('active');
            }, 1200);
        };

        $scope.animateOut = function() {
            $timeout(function() {
                $('.active').removeClass('active');
            }, 0);
            $timeout(function() {
                $('.team-left').addClass('loading');
            }, 1000);
            $timeout(function() {
                $('.team-right').addClass('loading');
            }, 1000);
            $timeout(function() {
                $('.map-1').addClass('loading');
            }, 1100);
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