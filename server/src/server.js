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
    var newRequest = writeRequest(body.userId, body.recieverName, body.contents, body.title,
                                  body.groupName, body.typeEntry);
    res.status(201);
    res.set('Location','/requestitem/'+ newRequest._id);

    res.send(newRequest);
  } else {
    res.status(401).end();
  }
});

app.put('/group/:groupname/user/:username/requestitem/:requestid',function(req, res){
  var groupName = req.params.groupname;
  var userName = req.params.username;
  var requestId = req.params.requestid;
  var userId=getUser(userName);

  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(userId  == fromUser){

    var groupId=getGroup(groupName);
    var groupData=readDocument('groups',groupId);
    var userData=readDocument('users',userId);
    var joined = groupData.memberList.indexOf(userId);
    var requestData = readDocument('requestItems',requestId);
    requestData.status = true;

    writeDocument('requestItems',requestData);


    if(joined === -1){
      groupData.memberList.push(userId);
      writeDocument('groups',groupData);
      userData.groupList.push(groupId);
      writeDocument("users",userData);
  }
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

  //Elvis here
  //Elvis here
  //Elvis here

  function getMatchGroup(search_key){
    var groupList = [];
    var keys = search_key.toLowerCase().split(" ");
    for(var i = 1; i <= readDocument('dataBase', 2).List.length; i++){
      var group = readDocument('groups', i);
      var groupNameArr = group.groupName.toLowerCase().split(" ");
      var index,index1;
      for(index in groupNameArr){
        for(index1 in keys){
          if(groupNameArr[index].indexOf(keys[index1]) != -1){
            groupList.push(group);
            break;
          }
        }
      }
    }
    var value = {contents : groupList};
    return value;
  }

  app.post('/search', function(req, res){
    if (typeof(req.body) === 'string') {
      var queryText = req.body;
      res.send(getMatchGroup(queryText));
    }else{
      res.status(400).end();
    }
  });

  function getRecommendPostItem() {
    // Get the User object with the id "user".
    var postItem = [];
    for(var i = 1; ; i++){
      try{
        postItem.push(readDocument('postItem', i));
      }catch(e){
        break;
      }
    }
    var userMaxList = getThreeMaxPost(postItem);
    while(userMaxList.indexOf(-1) != -1){
      userMaxList.splice(-1, 1);
    }

    var value = {contents : userMaxList};
    return value;
  }

  function getThreeMaxPost(postItemData){
    var recommend_list =  [];
    var item;
    var maxViewCount = -1;
    var secondMaxViewCount = -1;
    var thirdMaxViewCount = -1;
    var maxPostIndex = -1;
    var secondMaxPostIndex = -1;
    var thirdMaxPostIndex = -1;
    for (item in postItemData){
      var postItem = postItemData[item];
      if(postItem.viewCount > maxViewCount){
        thirdMaxViewCount = secondMaxViewCount;
        thirdMaxPostIndex = secondMaxPostIndex;
        secondMaxViewCount = maxViewCount;
        secondMaxPostIndex = maxPostIndex;
        maxViewCount = postItem.viewCount;
        maxPostIndex = item;
      }else if(postItem.viewCount > secondMaxViewCount){
        thirdMaxViewCount = secondMaxViewCount;
        thirdMaxPostIndex = secondMaxPostIndex;
        secondMaxViewCount = postItem.viewCount;
        secondMaxPostIndex = item;
      }else if(postItem.viewCount > thirdMaxViewCount){
        thirdMaxViewCount = postItem.viewCount;
        thirdMaxPostIndex = item;
      }
    }
    if(maxPostIndex != -1)
      recommend_list.push(postItemData[maxPostIndex]);
    else {
      recommend_list.push(maxPostIndex);
    }
    if(secondMaxPostIndex != -1)
      recommend_list.push(postItemData[secondMaxPostIndex]);
    else {
      recommend_list.push(secondMaxPostIndex);
    }
    if(thirdMaxPostIndex != -1)
      recommend_list.push(postItemData[thirdMaxPostIndex]);
    else {
      recommend_list.push(thirdMaxPostIndex);
    }
    return recommend_list;
  }

  app.get('/postItem', function(req, res){
    res.send(getRecommendPostItem());
  });
//Elvis not here
//Elvis not here
//Elvis not here

// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
