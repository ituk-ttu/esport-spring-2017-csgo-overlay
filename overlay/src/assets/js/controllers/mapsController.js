app.controller("mapsController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope", "$timeout",
    function($q, $scope, $stateParams, store, socketService, $rootScope, $timeout) {
        $scope.data = $rootScope.data;

        $scope.animateIn = function() {
            $timeout(function() {
                $('.team-left').removeClass('loading');
            }, 0);
            $timeout(function() {
                $('.team-right').removeClass('loading');
            }, 400);
            $timeout(function() {
                $('.map-1').removeClass('loading');
            }, 500);
            $timeout(function() {
                $('.map-2').removeClass('loading');
            }, 600);
            $timeout(function() {
                $('.map-3').removeClass('loading');
            }, 700);
            $timeout(function() {
                $scope.animateInActive($scope.data.bo3.active);
            }, 1800);
        };

        $scope.animateOut = function() {
            $timeout(function() {
                $scope.animateOutActive();
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
            $timeout(function() {
                $('.map-2').addClass('loading');
            }, 1200);
            $timeout(function() {
                $('.map-3').addClass('loading');
            }, 1300);
        };


        $scope.animateInActive = function (map) {
            if (map !== "NONE" && map < 4 && map > 0) {
                $timeout(function () {
                    $('.map-' + map).addClass('active');
                }, 400);
            }
        };

        $scope.animateOutActive = function () {
            $('.active').removeClass('active');
        };

        $scope.$watch(function() {
            return $rootScope.data;
        }, function() {
            if ($scope.data.bo3.active !== $rootScope.data.bo3.active) {
                $scope.animateOutActive();
                $scope.animateInActive($rootScope.data.bo3.active)
            }
            $scope.data = $rootScope.data;
        }, true);

        $rootScope.socket.on("animate", function(direction) {
            if (direction === "in") $scope.animateIn();
            if (direction === "out") $scope.animateOut();
        });

    }]);