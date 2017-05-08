/**
 * Created by juanleyba on 5/5/17.
 */
var express = require('express');
var fs = require('fs');

var app = express();
var appCtrl = require('./apiController');

app.use('/', express.static(__dirname + '/../build/'));

app.get('/*', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/../build/index.html').pipe(res);
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 9000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

appCtrl(app);

app.listen(server_port, server_ip_address, function () {
    console.log("Listening on " + server_ip_address + ", port " + server_port)
});