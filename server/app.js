#!/usr/bin/nodejs

// --------------------------------- //
// Initialize Variables
var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
// var hbs = require('hbs');

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// MongoDB Atlas
const MongoClient = require('mongodb').MongoClient;
const BodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectID;
const CONNECTION_URL =
  'mongodb+srv://admin:admin@cluster0-9a9uk.gcp.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = 'users';


app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

var database, collection;

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

// Databasing
app.post('/user', cors(corsOptions), (request, response) => {
  // request.body = JSON.parse(request.body.keys[0]);
  console.log(request.body);
  console.log(request.rawBody);
  collection.insert(request.body, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result.result);
  });
});
app.get('/users', (request, response) => {
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get('/user/:name', (request, response) => {
  collection.findOne({ name: request.params.name }, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get('/user/:id', (request, response) => {
  collection.findOne(
    { _id: new ObjectId(request.params.id) },
    (error, result) => {
      if (error) {
        return response.status(500).send(error);
      }
      response.send(result);
    }
  );
});

app.post('/match', cors(corsOptions), async function (request, response) {
  console.log("Request body: ", request.body);
  // console.log(request.rawBody);
  let user_name = request.body.name
  let user_problems = request.body.problem;

  console.log("Name: ", user_name, ", problem: ", user_problems);
  // let user = await collection.findOne({ name: request.params.name });
  // user_problems = user['problems'];

  let similarUsers = await collection.findOne({
    problem: user_problems,
    name: { $ne: user_name},
  });

  if (similarUsers != null) {
    console.log("Similar user's name: ", similarUsers.name);
    let deletedUser = await collection.deleteOne({name: similarUsers.name})
    console.log("Deleted user's name: ", deletedUser.name);
  }

  console.log("Similar Users: ", similarUsers);
  response.send(similarUsers);
});

// -------------------------------------- //
// Listener to keep the website "alive"
var listener = app.listen(app.get('port'), function () {
  console.log('Express server started on port: ' + listener.address().port);
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection('testUser');
      console.log('Connected to ' + DATABASE_NAME + '!');
    }
  );
});

app.use(
  '/peerjs',
  require('peer').ExpressPeerServer(listener, {
    debug: true,
  })
);
