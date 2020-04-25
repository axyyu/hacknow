#!/usr/bin/nodejs

// --------------------------------- //
// Initialize Variables
var express = require('express');
var app = express();
var path = require('path');
// var hbs = require('hbs');

// --------------------------------- //
// Initial Express and Port
app.set('port', process.env.PORT || 8000);

// app.set('view engine', 'hbs');

// app.use('/js', express.static(path.join(__dirname, 'js')));
// app.use("/css", express.static(path.join(__dirname, "css")));
// app.use("/pics", express.static(path.join(__dirname, "images")));

// -------------------------------------- //
//Define Helper Functions

// ------------------------------------------------------ //
// Expreses "get" handlers for sending and rendering pages

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/peerfunctions.js', function (req, res) {
  res.sendFile(__dirname + '/peerfunctions.js');
});

// -------------------------------------- //
// Listener to keep the website "alive"
var listener = app.listen(app.get('port'), function () {
  console.log('Express server started on port: ' + listener.address().port);
});

app.use(
  '/peerjs',
  require('peer').ExpressPeerServer(listener, {
    debug: true,
  })
);
