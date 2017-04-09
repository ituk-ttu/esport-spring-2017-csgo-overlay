var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");
var clk = require("chalk");
var OBSRemote = require('obs-remote');
var config = JSON.parse(fs.readFileSync("config.json"));
var overlayers = [];
var state = "ANIMATE_IN_FINISHED";
var data = config.startData;
var activeView = config.views[0];
var views = config.views;
var obs = new OBSRemote();
obs.connect('10.0.24.55');

io.on('connection', function(socket) {
    console.log(clk.green.underline.bold(socket.handshake.address) + clk.green(" has connected"));
    socket.on('disconnect', function() {
        if(searchOverlayer(socket.handshake.address) != -1) {
            overlayers.splice(searchOverlayer(socket.handshake.address), 1);
            console.log(clk.red.underline.bold(socket.handshake.address) + clk.red(" has disconnected as ") +
                clk.red.bold("overlayer"))
        } else {
            console.log(clk.red.underline.bold(socket.handshake.address) + clk.red(" has disconnected"));
        }
    });
    socket.on('setOverlayer', function() {
        if(searchOverlayer(socket.handshake.address) == -1) {
            overlayers.push(socket.handshake.address);
            console.log(clk.green.underline.bold(socket.handshake.address) + clk.green(" has been set to ") +
                    clk.green.bold("overlayer"))
        }
    });
    socket.on('state', function(newState) {
        state = newState;
        io.emit("state", state);
        if(state == "ANIMATE_OUT_FINISHED") {
            obs.setCurrentScene(activeView.scene);
            setTimeout(function () {
                io.emit("view", activeView);
            }, 300);
        }
    });
    socket.on('getAll', function() {
        socket.emit('getAll', {
            state: state,
            activeView: activeView,
            views: views,
            data: data
        })
    });
    socket.on('view', function(view) {
        io.emit('animateOut',activeView);
        activeView = view;
        console.log(clk.blue("Next view set to " + view.name));
    });
    socket.on('save', function(payload) {
        data = payload;
        console.log(clk.blue("Updates retrieved"));
        io.emit("data", data);
    });
});

function searchOverlayer(ip) {
    for(var i = 0; i < overlayers.length; i++) {
        if(overlayers[i] == ip) {
            return i
        }
    }
    return -1
}

http.listen(3001, function(){
    console.log('listening on *:3001');
});