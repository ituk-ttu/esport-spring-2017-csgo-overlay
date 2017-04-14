// Environment variables

socketBase = "10.0.25.50:3000";

var app = angular.module("controlPanel", [
    "ui.router",
    "ui.utils",
    "angular-storage",
    'ui.bootstrap',
    'btford.socket-io'
]).run(function($rootScope, $state, $stateParams, store, socketService) {
    $rootScope.inGame = false;
    $rootScope.data = null;
    $rootScope.state = null;
    $rootScope.activeView = null;
    $rootScope.views = null;
    $rootScope.socket = socketService;
    $rootScope.socket.on("getAll", function(response) {
        $rootScope.data = response.data;
        $rootScope.state = response.state;
        $rootScope.activeView = response.activeView;
        $rootScope.views = response.views;
    });
    $rootScope.socket.on("data", function(payload) {
        $rootScope.data = payload;
    });
    $rootScope.socket.on("view", function(viewId) {
        $rootScope.activeView = viewId;
    });
    $rootScope.socket.emit('getAll', null);
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    

}).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("");
    $stateProvider
        .state("panel", {
            url: "",
            templateUrl: "templates/panel.html",
            controller: "panelController"
        })
});