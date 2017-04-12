app.controller("castersController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope", "$timeout",
    function($q, $scope, $stateParams, store, socketService, $rootScope, $timeout) {
        $scope.data = $rootScope.data;

        $scope.animateIn = function() {
            $timeout(function() {
                $('.logo-box').removeClass('loading2');
            }, 0);
            $timeout(function() {
                $('.logo-box').removeClass('loading1');
            }, 400);
            $timeout(function() {
                $('.caster-left').removeClass('loading');
            }, 500);
            $timeout(function() {
                $('.caster-right').removeClass('loading');
            }, 500);
        };

        $scope.animateOut = function() {
            $timeout(function() {
                $('.caster-right').addClass('loading');
            }, 0);
            $timeout(function() {
                $('.caster-left').addClass('loading');
            }, 0);
            $timeout(function() {
                $('.logo-box').addClass('loading1');
            }, 500);
            $timeout(function() {
                $('.logo-box').addClass('loading2');
            }, 900);
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