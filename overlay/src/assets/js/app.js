// Environment variables

socketBase = "10.0.25.50:3000";

var app = angular.module("overlay", [
    "ui.router",
    "ui.utils",
    "angular-storage",
    'ui.bootstrap',
    'btford.socket-io'
]).run(function($rootScope, $state, $stateParams, store, socketService, $interval) {
    $rootScope.data = null;
    $rootScope.activeView = null;
    $rootScope.views = null;
    $rootScope.socket = socketService;
    $rootScope.socket.on("getAll", function(response) {
        $rootScope.data = response.data;
        $rootScope.activeView = response.activeView;
        $rootScope.views = response.views;
    });
    $rootScope.socket.on("data", function(payload) {
        $rootScope.data = payload;
    });
    $rootScope.socket.on("view", function(view) {
        $rootScope.activeView = view;
        $state.go(view, {}, {reload: false});
    });
    $rootScope.socket.emit('getAll', null);
}).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("/afk");
    $stateProvider
        .state("afk", {
            url: "/afk",
            templateUrl: "templates/afk.html",
            controller: "afkController"
        })
        .state("maps", {
            url: "/maps",
            templateUrl: "templates/maps.html",
            controller: "mapsController"
        })
        .state("map", {
            url: "/map",
            templateUrl: "templates/map.html",
            controller: "mapController"
        })
        .state("casters", {
            url: "/casters",
            templateUrl: "templates/casters.html",
            controller: "castersController"
        })
});