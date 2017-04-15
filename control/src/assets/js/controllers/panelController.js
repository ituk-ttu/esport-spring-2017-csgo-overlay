app.controller("panelController", ["$q", "$scope", "$stateParams", "store", "socketService", "$rootScope", "$state",
    function($q, $scope, $stateParams, store, socketService, $rootScope, $state) {
        
        $scope.expandTeams = false;
        $scope.working = true;
        $scope.data = null;
        $scope.views = null;
        $scope.activeView = null;

        $scope.isDirty = function (fieldName) {
            return (_.at($scope.unsaved, fieldName)[0] || "") != (_.at($rootScope.data, fieldName)[0] || "");
        };

        $scope.save = function() {
            $scope.working = true;
            $rootScope.socket.emit('save', $scope.unsaved);
            $scope.working = false;
        };

        $scope.setView = function(view) {
            $rootScope.socket.emit('setView', view.id);
        };

        $scope.playReplay = function() {
            $rootScope.socket.emit('replay', null);
        };

        $scope.stopReplay = function() {
            $rootScope.socket.emit('endReplay', null);
        };

        $scope.$watch(function() {
            return $rootScope.activeView;
        }, function() {
            $scope.activeView = $rootScope.activeView;
        }, true);

        $scope.$watch(function() {
            return $rootScope.data;
        }, function() {
            $scope.unsaved = _.cloneDeep($rootScope.data);
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