app.factory("socketService", ["socketFactory", function(socketFactory) {

    var myIoSocket = io.connect(socketBase);

    return socketFactory({
        ioSocket: myIoSocket
    });
}]);