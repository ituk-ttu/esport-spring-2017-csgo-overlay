var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");
var clk = require("chalk");
var OBSWebSocket = require('obs-websocket-js').OBSWebSocket;
var obs = new OBSWebSocket();
var config = JSON.parse(fs.readFileSync("config.json"));
var data = config.startData;
var activeView = config.views[0];
var views = config.views;

var obsLocation = "localhost";
var obsPassword = "pw";
var obsTransitionLength = 300;

obs.onConnectionClosed = function() {
    console.log(clk.red.bold('OBS connection closed!'));
    obs.connect(obsLocation, obsPassword);
    console.log(clk.yellow.bold('Trying to reconnect...'));
};

obs.onConnectionFailed = function() {
    console.log(clk.red.bold('OBS connection failed!'));
    obs.connect(obsLocation, obsPassword);
    console.log(clk.yellow.bold('Trying to reconnect...'));
};

obs.onConnectionOpened = function() {
    console.log(clk.green.bold('OBS connected!'));
};

io.on('connection', function(socket) {
    socket.user = null;
    console.log(clk.green.underline.bold(socket.handshake.address) + clk.green(" has connected"));
    console.log(clk.green('Waiting for authentification...'));
    socket.on('authenticate', function (creds) {
        db.get('SELECT * FROM users WHERE username = ?', [creds.username], function (err, result) {
            if (result) {
                if (bcrypt.compareSync(creds.password, result.password)) {
                    socket.user = creds.username;
                    connections.push(socket);
                    console.log(clk.green('User ') + clk.green.bold(creds.username) + clk.green(' has been successfully authenticated'));
                    socket.emit('authenticate', {success: true, user: socket.user});
                } else {
                    console.log(clk.red('User ') + clk.red.bold(creds.username) + clk.red(' failed to authenticate: Wrong password'));
                    socket.emit('authenticate', {success: false, user: null});
                }
            } else {
                console.log(clk.red('User ') + clk.red.bold(creds.username) + clk.red(' failed to authenticate: No such user'));
                socket.emit('authenticate', {success: false, user: null});
            }
        });
    });
    socket.on('disconnect', function() {
            console.log(clk.red.underline.bold(socket.handshake.address) + clk.red(" has disconnected"));
    });
    socket.on('setView', function(view) {
        activeView = views[view];
        io.emit("animate", "out");
        setTimeout(function () {
            obs.setCurrentScene(views[view].scene);
            io.emit("view", views[view].overlay);
            setTimeout(function() {
                io.emit("animate", "in");
            }, obsTransitionLength);
        }, views[view].transitionOutLength);
    });
    socket.on('getAll', function() {
        socket.emit('getAll', {
            activeView: activeView,
            views: views,
            data: data
        })
    });
    socket.on('save', function(payload) {
        data = payload;
        console.log(clk.blue("Updates retrieved"));
        io.emit("data", data);
    });
});

obs.connect(obsLocation, obsPassword);

http.listen(3000, function(){
    console.log('listening on *:3000');
});
