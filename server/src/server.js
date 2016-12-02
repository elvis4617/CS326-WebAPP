var bodyParser = require('body-parser');
var database = require("./database.js");
var readDocument = database.readDocument;
var validate = require('express-jsonschema').validate;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var postThreadSchema = require('./schemas/thread.json');
var userSchema = require('./schemas/user.json');

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
  if(userId === fromUser){
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

  if(userId === fromUser){
    res.send(readDocument('users', userId));
  } else {
    res.status(401).end();
  }
});

//use for account feed
app.get('/userData/:userid', function(req,res) {
  var userId = parseInt(req.params.userid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(userId === fromUser){
    var userData = readDocument('users', userId);
    var value = {contents: userData};
    res.send(value);
    } else {
      res.status(401).end();
    }
});

app.post('/userData/:userid', validate({body: userSchema}), function(req, res) {
  var userId = parseInt(req.params.userid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(userId === fromUser){
    var userData = readDocument('users', userId);
    userData.fullName = req.body.name;
    userData.email = req.body.email;
    userData.grade = req.body.grade;
    userData.major = req.body.major;
    userData.description = req.body.description;
    writeDocument('users', userData);
    var value = {contents: userData};
    res.send(value);
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

//Elvis
app.get('/friend/:userid', function(req, res) {
  var userId = parseInt(req.params.userid, 10);
  var user = readDocument('users', userId);
  var friends = user.friendList;
  var friendList = [];
  for(var i = 0; i<friends.length; i++){
    friendList.push(readDocument('users', friends[i]));
  }
  //var value = {contents: friendList};
  res.send(friendList);
});

// not Tested, should be onhold, future funationality
function onMessage(message, authorId, recieverId){
  var date = new Date().getTime();
  var newMessage = {
    "Type": "Message",
    "author": authorId,
    "reciever": recieverId,
    "createDate": date,
    "status": false,
    "group":0,
    "title": "Message",
    "content": message,
    "read": false
  }
  var newMessage1 = addDocument('requestItems',newMessage);
  var userData = readDocument('users',recieverId);
  userData.mailbox.unshift(newMessage1._id);
  writeDocument('users',userData);
  return newMessage1;
}

//Not Tested
function getUserE(email){
  var targetId = 0;
  var wat = Object.keys(getCollection('users'));
  wat.forEach((userId)=>{
    var userData = readDocument('users', userId);
    if(userData.email === email)
      targetId = userData._id;
  });
  return targetId;
}

//Not Tested
function getUserU(username){
  var targetId = 0;
  var wat = Object.keys(getCollection('users'));
  wat.forEach((userId)=>{
    var userData = readDocument('users', userId);
    if(userData.userName === username)
      targetId = userData._id;
  });
  return targetId;
}

//Not Tested
function onRequest(username, email, authorId){
  var date = new Date().getTime();
  var recieverId;
  if (email === "") {
    recieverId = getUserU(username)
  }
  else {
    recieverId = getUserE(email)
  }
  var newRequest = {
    "Type": "Friend Request",
    "author": authorId,
    "reciever": recieverId,
    "createDate": date,
    "status": false,
    "group":0,
    "title": "Message",
    "content": "Would you like to be friends?",
    "read": false
  }
  var newRequest1 = addDocument('requestItems',newRequest);
  var userData = readDocument('users',recieverId);
  userData.mailbox.unshift(newRequest1._id);
  writeDocument('users',userData);
  return newRequest1;
}

//not Tested
app.post('/friendRequest', function(req, res){
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(body.authorId === fromUser){
    var newRequest = onRequest(body.username, body.email, body.authorId);
    res.status(201);
    res.set('Location', '/message/' + newRequest._id);
    res.send(newRequest);
  }
  else {
    res.status(401).end();
  }
});

//Not Tested
app.post('/message', function(req, res){
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(body.AuthorId === fromUser){
    var newMessage = onMessage(body.Message, body.AuthorId, body.RecieverId);
    res.status(201);
    res.set('Location', '/message/' + newMessage._id);
    res.send(newMessage);
  }
  else {
    res.status(401).end();
  }
});

//Andyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
function writeRequest(userId, recieverName, requestContent, titleEntry, groupName, typeEntry){
  var time = new Date().getTime();

  var recieverId=getUser(recieverName);
  var groupId=getGroup(groupName);

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

//Andyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
var RequestItemSchema = require('./schemas/requestitem.json');

app.post('/requestitem', validate({body: RequestItemSchema}),function(req, res){
  var body = req.body;

  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(body.userId  === fromUser){
    var newRequest = writeRequest(body.userId, body.recieverName, body.contents, body.title,
                                  body.groupName, body.typeEntry);
    res.status(201);
    res.set('Location','/requestitem/'+ newRequest._id);

    res.send(newRequest);
  } else {
    res.status(401).end();
  }
});

//Andyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
app.put('/group/:groupname/user/:username/requestitem/:requestid',function(req, res){
  var groupName = req.params.groupname;
  var userName = req.params.username;
  var requestId = req.params.requestid;
  var userId=getUser(userName);
  var requestData = readDocument('requestItems',requestId);

  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(requestData.author  === fromUser || requestData.reciever === fromUser){

    var groupId=getGroup(groupName);
    var groupData=readDocument('groups',groupId);
    var userData=readDocument('users',userId);
    var joined = groupData.memberList.indexOf(userId);

    requestData.status = true;

     writeDocument('requestItems',requestData);


    if(joined === -1){
      groupData.memberList.push(userId);
      writeDocument('groups',groupData);
      userData.groupList.push(groupId);
      writeDocument("users",userData);
    }

  res.send(requestData);
  } else {
    res.status(401).end();
  }


});

//Andyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
app.get('/username/:name', function(req, res){
  var userName = req.params.name;
  var userId = getUser(userName);
  res.send(readDocument('users', userId));
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

  function getUnReadMsgs(user){
    var userData = readDocument('users', user);
    var unReadList = [];
    if(userData.unread.length != 0){
      for(var i = 0; i<userData.unread.length; i++){
        var request = readDocument('requestItems', userData.unread[i]);
        if(!request.read)
          unReadList.push(request);
      }
    }
    var value = {contents : unReadList};
    return value;
  }


  function readRequest(requestItemId, userId) {
    var requestItem = readDocument('requestItems', requestItemId);
    requestItem.read = true;
    writeDocument('requestItems', requestItem);
    var user = readDocument('users', userId);
    var unRead = user.unread;
    if(unRead.indexOf(requestItemId) != -1){
      user.unread.splice(unRead.indexOf(requestItemId),1);
      writeDocument('users', user);
    }
    return true;
  }

  app.get('/unReadReq/:userId', function(req, res) {
    var userid = parseInt(req.params.userId, 10);
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === userid) {
      // Send response.
      res.send(getUnReadMsgs(userid));
    } else {
      // 401: Unauthorized request.
      res.status(401).end();
    }
  });

  app.put('/readRequest/:requestItemId/:userId', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var requestItemId = req.params.requestItemId;
  var userid = req.params.userId;
  var requestItems = readDocument('requestItems', requestItemId);
  // Check that the requester is the author of this feed item.
  if (fromUser === requestItems.reciever) {
    // Check that the body is a string, and not something like a JSON object.
    // We can't use JSON validation here, since the body is simply text!
    res.send(readRequest(requestItemId, userid));
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});
//Elvis not here
//Elvis not here
//Elvis not here

//Minxin here
//Minxin here
//Minxin here
function getForumData(user){

  var userData = readDocument('users', user);
  var postData = userData.postItem;
  var postList = [];
  for (var item in postData){
    var postItem = readDocument('postItem', postData[item]);
    postItem.author = readDocument('users', postItem.author);
    postItem.lastReplyAuthor = readDocument ('users', postItem.lastReplyAuthor);
    postItem.commentThread.forEach((comment) => {
      comment.author = readDocument('users', comment.author);
    });
    postList.push(postItem);
  }
  var value = {contents: postList};

  return value;
}

app.get('/user/:userid/feeditem', function(req, res) {
  var userid = req.params.userid;
  res.send(getForumData(userid));
});

function postThread(user, title, contents){
  var time = new Date().getTime();
  var newThread = {
    "author": user,
    "postDate": time,
    "title": title,
    "content": contents,
    "viewCount": 0,
    "replyCount": 0,
    "lastReplyAuthor": user,
    "lastReplyDate": time,
    "commentThread": []
  };
  newThread = addDocument('postItem', newThread);
  var userData = readDocument('users', user);

  userData.postItem.unshift(newThread._id);

  writeDocument('users', userData);

  return newThread;
}

app.post('/thread',
  validate({ body: postThreadSchema }), function(req, res) {
    // If this function runs, `req.body` passed JSON validation!
  var body = req.body;
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Check if requester is authorized to post this status update.
  // (The requester must be the author of the update.)
  if (fromUser === body.author) {
    var newUpdate = postThread(body.author, body.title,
      body.contents);
      // When POST creates a new resource, we should tell the client about it
      // in the 'Location' header and use status code 201.
      res.status(201);
      res.set('Location', '/thread' + newUpdate._id);
      // Send the update!
      res.send(newUpdate);
    } else {
      // 401: Unauthorized.
      res.status(401).end();
    }
});

function getPostDataById(Id) {
  var postData = readDocument('postItem', Id);
  postData.author = readDocument('users', postData.author).fullName;
  var value = {contents : postData};
  return value;
}

app.get('/feeditem/:feeditemid', function(req, res) {
  var userid = req.params.feeditemid;
  res.send(getPostDataById(userid));
});


// Starts the server on port 3000!
app.listen(3000, function () {
  console.log('ToGather listening on port 3000!');
});
