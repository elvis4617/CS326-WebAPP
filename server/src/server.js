var bodyParser = require('body-parser');
var database = require("./database.js");
var readDocument = database.readDocument;
var validate = require('express-jsonschema').validate;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;

// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();

app.use(bodyParser.text());
// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());
// You run the server from `server`, so `../client/build` is `server/../client/build`.
// '..' means "go up one directory", so this translates into `client/build`!
app.use(express.static('../client/build'));

function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number.
    if (typeof id === 'number') {
      return id;
  } else {
  // Not a number. Return -1, an invalid ID.
    return -1;
  }
  } catch (e) {
  // Return an invalid ID.
    return -1;
  }
}

/* Andyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
 * Resolved requestItems aka. mails
 * Also, server version of getRequestData
 */
function getRequestItemSync(requestItemId) {
  var requestItem = readDocument('requestItems', requestItemId);

  requestItem.author = readDocument('users', requestItem.author).fullName;
  requestItem.reciever = readDocument('users', requestItem.reciever).fullName;
  requestItem.group = readDocument('groups',requestItem.group).groupName;
  return requestItem;
}

app.get('/user/:userid/mailbox', function(req, res){
  var userId = parseInt(req.params.userid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(userId == fromUser){
    //Get the user
    var userData = readDocument('users',userId);
    var mailboxData = userData.mailbox;
    //Read user's mailbox and parse it
    var requestList=[];
    mailboxData.forEach((requestId) =>{

      requestList.push(getRequestItemSync(requestId));

    });

    res.send(requestList);

  } else {
    res.status(401).end();
  }
});

// get USER by ID
app.get('/user/:userid', function(req, res){

  var userId = parseInt(req.params.userid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(userId == fromUser){
    res.send(readDocument('users', userId));
  } else {
    res.status(401).end();
  }
});

var getCollection = database.getCollection;

function getUser(userName){

  var targetId = 0;
  var wat = Object.keys(getCollection('users'));
  wat.forEach((userId)=>{
    var userData = readDocument('users', userId);
    if(userData.fullName === userName)
      targetId = userData._id;
  });

  return targetId;
}

function getGroup(groupName){
  var targetId = 0;
  var wat = Object.keys(getCollection('groups'));
  wat.forEach((userId)=>{
    var groupData = readDocument('groups', userId);
    if(groupData.groupName === groupName)
      targetId = groupData._id;
  });

  return targetId;
}



function writeRequest(userId, recieverName, requestContent, titleEntry, groupName, typeEntry){
  var time = new Date().getTime();
//  var requestItem = readDocument('requestItems', requestItemId);
  //Find the user id via user name
  var recieverId=getUser(recieverName);
  var groupId=getGroup(groupName);
  //var groupId = 2;
  //recieverId=2;
  //If user/reciever name not found, abort mission
  if (recieverId <= 0 || groupId <= 0)
    return null;

  var newRequest ={
    "type":typeEntry,
    "author": userId,
    "reciever": recieverId,
    "createDate":time,
    "status": false,
    "group":groupId,
    "title":titleEntry,
    "content":requestContent,
    "read":false
  };

  newRequest = addDocument('requestItems',newRequest);
  var userData = readDocument('users',userId);

  userData.mailbox.unshift(newRequest._id);
  writeDocument('users',userData);
  return newRequest;
}

var RequestItemSchema = require('./schemas/requestitem.json');

app.post('/requestitem', validate({body: RequestItemSchema}),function(req, res){
  var body = req.body;

  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(body.userId  == fromUser){
    var newRequest = writeRequest(body.userId, body.recieverName, body.requestContent, body.title,
                                  body.groupName, body.typeEntry);
    res.status(201);
    res.set('Location','/user/'+ body.userId);

    res.send(newRequest);
  } else {
    res.status(401).end();
  }
});
/**
* Translate JSON Schema Validation failures into error 400s.
*/
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    // Set a bad request http response status
    res.status(400).end();
  } else {
    // It's some other sort of error; pass it to next error middleware handler
    next(err);
  }
});

// Reset database.
  app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
  });

// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
