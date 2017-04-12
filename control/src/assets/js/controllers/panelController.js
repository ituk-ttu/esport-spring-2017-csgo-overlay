app.controller("panelController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope", "$state",
    function($q, $scope, $stateParams, store, socketService, $rootScope, $state) {
        
        $scope.expandTeams = false;
        $scope.working = true;
        $scope.data = null;
        $scope.views = null;
        $scope.activeView = null;

        $scope.save = function() {
            $scope.working = true;
            $rootScope.socket.emit('save', $scope.unsaved);
            $scope.working = false;
        };

        $scope.setView = function(view) {
            $rootScope.socket.emit('view', view);
        };

        $scope.$watch(function() {
            return $rootScope.activeView;
        }, function() {
            $scope.activeView = $rootScope.activeView;
        }, true);

        $scope.$watch(function() {
            return $rootScope.data;
        }, function() {
            $scope.unsaved = $rootScope.data;
        }, true);

        $scope.$watch(function() {
            return $rootScope.views;
        }, function() {
            $scope.views = $rootScope.views;
        }, true);

        $scope.$watch(function() {
            return $rootScope.state;
        }, function() {
            $scope.state = $rootScope.state;
        }, true);

        $scope.working = false;

    }]);