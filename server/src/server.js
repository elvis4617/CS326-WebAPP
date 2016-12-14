var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/toGather';


MongoClient.connect(url, function(err, db) {

    var bodyParser = require('body-parser');
    var database = require("./database.js");
    var readDocument = database.readDocument;
    var validate = require('express-jsonschema').validate;
    var writeDocument = database.writeDocument;
    var addDocument = database.addDocument;
    var postThreadSchema = require('./schemas/thread.json');
    var userSchema = require('./schemas/user.json');
    var commentSchema = require('./schemas/comment.json');

    var mongo_express = require('mongo-express/lib/middleware');
    // Import the default Mongo Express configuration
    var mongo_express_config = require('mongo-express/config.default.js');



    // Imports the express Node module.
    var express = require('express');
    // Creates an Express server.
    var app = express();

    app.use('/mongo_express', mongo_express(mongo_express_config));

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
        if (typeof id === 'string') {
          return id;
      } else {
      // Not a number. Return -1, an invalid ID.
        return "";
      }
      } catch (e) {
      // Return an invalid ID.
        return "";
      }
    }

    /* Andyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
     * Resolved requestItems aka. mails
     * Also, server version of getRequestData
     */
    function resolveUserObjects(userList, callback) {
       // Special case: userList is empty.
       // It would be invalid to query the database with a logical OR
       // query with an empty array.
       if (userList.length === 0) {
         callback(null, {});
       } else {
         // Build up a MongoDB "OR" query to resolve all of the user objects
         // in the userList.
         var query = {
           $or: userList.map((id) => { return {_id: id } })
         };
         // Resolve 'like' counter
         db.collection('users').find(query).toArray(function(err, users) {
           if (err) {
             return callback(err);
           }
           // Build a map from ID to user object.
           // (so userMap["4"] will give the user with ID 4)
           var userMap = {};
           users.forEach((user) => {
             userMap[user._id] = user;
           });
           callback(null, userMap);
         });
       }
     }

    function resolveGroupObjects(groupList, callback) {
       // Special case: userList is empty.
       // It would be invalid to query the database with a logical OR
       // query with an empty array.
       if (groupList.length === 0) {
         callback(null, {});
       } else {
         // Build up a MongoDB "OR" query to resolve all of the user objects
         // in the userList.
         var query = {
           $or: groupList.map((id) => { return {_id: id } })
         };
         // Resolve 'like' counter
         db.collection('groups').find(query).toArray(function(err, groups) {
           if (err) {
             return callback(err);
           }
           // Build a map from ID to user object.
           // (so userMap["4"] will give the user with ID 4)
           var groupMap = {};
           groups.forEach((group) => {
             groupMap[group._id] = group;
           });
           callback(null, groupMap);
         });
       }
     }



    function getRequestItem(requestItemId, callback){
      db.collection('requestItems').findOne({
        _id:requestItemId
      }, function(err, requestItem){
        if(err){
          return callback(err);
        } else if(requestItem == null){
          return callback(null, null);
        }

        var userList= [requestItem.author, requestItem.reciever];

        resolveUserObjects(userList, function(err, userMap){
          if(err){
            return callback(err);
          }

          requestItem.author = userMap[requestItem.author];
          requestItem.reciever = userMap[requestItem.reciever];

          var groupList = [requestItem.group];
          groupList = groupList.concat(requestItem.author.groupList);
          groupList = groupList.concat(requestItem.reciever.groupList);

          resolveGroupObjects(groupList, function(err, groupMap){
            if(err){
              return callback(err);
            }
            requestItem.group = groupMap[requestItem.group];
            requestItem.author.groupList = requestItem.author.groupList.map((groupId) => groupMap[groupId]);
            requestItem.reciever.groupList = requestItem.reciever.groupList.map((groupId) => groupMap[groupId]);
            callback(null, requestItem);
          });
        });



      });
    }

    //get mailbox of a particular user
    function getRequestData(user, callback){
      db.collection('users').findOne({
        _id: user
      }, function(err, userData){
        if(err){
          return callback(err);
        } else if (userData === null){
          return callback(null, null);
        }

        var resolvedContents = [];

        function processNextRequestItem(i){
          getRequestItem(userData.mailbox[i], function(err, requestItem){
            if(err){
              callback(err);
            } else{
                resolvedContents.push(requestItem);
                if(resolvedContents.length === userData.mailbox.length){
                  userData.mailbox = resolvedContents;
                  callback(null, userData);
                } else{
                  processNextRequestItem(i-1)
                }
            }
          });
        }

        if(userData.mailbox.length===0){
          callback(null, userData);
        } else{
          processNextRequestItem(userData.mailbox.length-1);
        }

      });
    }


    //get mailbox of a particular user
    app.get('/user/:userid/mailbox', function(req, res){
      var userId = req.params.userid;
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      if(userId === fromUser){

        getRequestData(new ObjectID(userId), function(err, requestData){
          if(err){
            res.status(500).send("Database error: "+err);
          }else if(requestData===null){
            res.status(400).send("Could not look up feed for user " + userId);
          } else{
            res.send(requestData.mailbox);
          }
        });

      } else {
        res.status(403).end();
      }
    });

    function getUserData(user, callback){
      db.collection('users').findOne({
        _id:user
      }, function(err, userData){
        if(err){
          return callback(err);
        } else if (userData === null){
          return callback(null, null);
        }

        var userList = userData.friendList;
        resolveUserObjects(userList, function(err, userMap){
          if(err){
            return callback(err);
          }

          var resolvedFriendList = [];
          userData.friendList.forEach((friendId) => resolvedFriendList.push(userMap[friendId]));
          userData.friendList = resolvedFriendList;


          resolveGroupObjects(userData.groupList, function(err, groupMap){
            if(err){
              return callback(err);
            }

            var resolvedGroupList = [];
            userData.groupList.forEach((groupId) => resolvedGroupList.push(groupMap[groupId]));
            userData.groupList = resolvedGroupList;


              callback(null, userData);

          });
        });
      });
    }
    // get USER by ID
    app.get('/user/:userid', function(req, res){
      var userId = req.params.userid;
      var fromUser = getUserIdFromToken(req.get('Authorization'));

      if(userId === fromUser){
        getUserData(new ObjectID(userId), function(err, userData){
          if(err){
            res.status(500).send("Database error: "+err);
          }else if(userData===null){
            res.status(400).send("Could not look up feed for user " + userId);
          } else{
            res.send(userData);
          }
        });
      } else {
        res.status(403).end();
      }
    });

    //use for account feed
    app.get('/userData/:userid', function(req,res) {
      var userId = req.params.userid;
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      if(userId === fromUser){
        db.collection('users').findOne({_id: new ObjectID(userId)}, function(err,userObject) {
          var value = {contents: userObject};
          res.send(value);
        });
        } else {
          res.status(401).end();
        }
    });

    app.post('/userData/:userid', validate({body: userSchema}), function(req, res) {
      var userId = req.params.userid;
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      if(userId === fromUser){
        db.collection('users').updateOne({ _id: new ObjectID(userId) },
          { $set: {
            email: req.body.email,
            fullName: req.body.name,
            grade: req.body.grade,
            major: req.body.major,
            description: req.body.description
            } }, function(err) {
            if (err) {
              return res.status(500).send("Database error");
            }
            db.collection('users').findOne({_id: new ObjectID(userId)}, function(err,userObject) {
                var value = {contents: userObject};
                res.send(value);
              });
          });
      } else {
        res.status(401).end();
      }
    });
    var getCollection = database.getCollection;

    //Andyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
    function getUserObjectByName(userName, callback){

      db.collection('users').findOne({fullName: userName}, function(err, userObject){
        if(err){
          return callback(err);
        } else{
          callback(null, userObject);
        }
      });
    }

    function getGroupObjectByName(groupName, callback){
      db.collection('groups').findOne({groupName: groupName}, function(err, groupObject){
        if(err){
          return callback(err);
        } else{
          callback(null, groupObject);
        }
      });
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
        "type": "Friend Request",
        "author": authorId,
        "reciever": recieverId,
        "createDate": date,
        "status": false,
        "group": -1,
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

    //Andyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
    app.put('/user/:userid/friend/:friendname', function(req, res){
      var friendName = req.params.friendname;
      var userId = parseInt(req.params.userid, 10);
      var friendId = getUser(friendName);

      var fromUser = getUserIdFromToken(req.get('Authorization'));
      if(userId === fromUser){

        var userData = readDocument('users',userId);
        var friended = userData.friendList.indexOf(friendId);
        if(friended == -1){
          userData.friendList.push(friendId);
          writeDocument('users', userData);
        }

        res.send(userData);
      } else{
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
    function writeRequest(userId, recieverName, requestContent, titleEntry, groupName, typeEntry, callback){
      var time = new Date().getTime();

      getUserObjectByName(recieverName, function(err, userObject){
        if(err){
          return callback(err);
        } else if(userObject === null){
          return callback(null, null);
        }

        var recieverId=userObject._id;

        getGroupObjectByName(groupName, function(err, groupObject){
          if(err){
            return callback(err);
          } else if(groupObject === null){
            return callback(null, null);
          }

          var groupId = groupObject._id;
          var newRequest ={
            "type":typeEntry,
            "author": new ObjectID(userId),
            "reciever": recieverId,
            "createDate":time,
            "status": false,
            "group":groupId,
            "title":titleEntry,
            "content":requestContent,
            "read":false
          };

          db.collection('requestItems').insertOne(newRequest, function(err, result){
            if(err){
              return callback(err);
            }
            newRequest._id = result.insertedId;

            db.collection('users').updateOne({_id: new ObjectID(userId)},
              {
                $addToSet:{
                  mailbox: newRequest._id
                }
              },function(err){
              if(err){
                return callback(err);
              }
              getRequestItem(newRequest._id, function(err, requestItem){
                if(err){
                  callback (err);
                }
                callback(err, requestItem)
              });
            });
          });
        });
      });


    }

    //Andyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
    var RequestItemSchema = require('./schemas/requestitem.json');

    app.post('/requestitem', validate({body: RequestItemSchema}),function(req, res){
      var body = req.body;

      var fromUser = getUserIdFromToken(req.get('Authorization'));
      if(body.userId  === fromUser){
        writeRequest(body.userId, body.recieverName, body.contents, body.title,
                                      body.groupName, body.typeEntry,function(err, requestItem){
          if(err){
            res.status(500).send("A database error occured: " + err);
          } else{

            res.status(201);
            res.set('Location', '/requestItems/'+requestItem._id);
            res.send(requestItem);
          }
      });

      } else {
        res.status(401).end();
      }
    });

    //Andyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
    app.put('/group/:groupname/user/:username/requestitem/:requestid',function(req, res){
      var groupName = req.params.groupname;
      var userName = req.params.username;
      var requestId = req.params.requestid;

      var fromUser = getUserIdFromToken(req.get('Authorization'));
      resolveUserObjects([new ObjectID(fromUser)], function(err, userMap){
        if(err)
          res.status(500).send("A database error occured: " + err);

          getRequestItem(new ObjectID(requestId), function(err, requestItem){
            if(err)
              res.status(500).send("A database error occured: " + err);

            if(requestItem===null)
              return res.status(400).end();

            if(userMap[fromUser].fullName === requestItem.author.fullName || userMap[fromUser].fullName === requestItem.reciever.fullName){

              getUserObjectByName(userName, function(err, userObject){
                if(err){
                  res.status(500).send("A database error occured: " + err);
                } else if(userObject === null){
                  return res.status(400).end();
                }

                getGroupObjectByName(groupName, function(err, groupObject){
                  if(err){
                    res.status(500).send("A database error occured: " + err);
                  } else if(groupObject === null){
                    return res.status(400).end();
                  }

                  db.collection('groups').updateOne({_id:groupObject._id},{
                    $addToSet:{
                      memberList: userObject._id
                    },
                    $inc:{
                      memberCount: 1
                    }
                  }, function(err){
                    if(err){
                      res.status(500).send("A database error occured: " + err);
                    }

                    db.collection('users').updateOne({_id:userObject._id},{
                      $addToSet:{
                        groupList:groupObject._id
                      }
                    }, function(err){
                      if(err){
                        res.status(500).send("A database error occured: " + err);
                      }

                      db.collection('requestItems').updateOne({_id: new ObjectID(requestId)},{
                        $set:{
                          status:true
                        }
                      } ,function(err){
                        if(err)
                          res.status(500).send("A database error occured: " + err);

                        resolveGroupObjects([groupObject._id], function(err, groupMap){
                            if(err){
                              res.status(500).send("A database error occured: " + err);
                            }

                            res.send(groupMap[groupObject._id]);

                        }); //resolveGroupObjects
                      });

                  }); //db collection users
                }); //db collection groups
              });  //getGroupObjectByName
          }); //getUserObjectByName
        } else{
          res.status(403).end();
        }



      });//getRequestItem

    }); //resolveUserObjects
   }); //app

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
        console.log(typeof(req.body));
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
        if (true) {
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

  function getForumItem(postItemId, callback) {
  // Get the feed item with the given ID.
  db.collection('postItem').findOne({
    _id: postItemId
  }, function(err, postItem) {
    if (err) {
      // An error occurred.
      return callback(err);
    } else if (postItem === null) {
      // Feed item not found!
      return callback(null, null);
    }

    var userList = [postItem.author];
    userList.push(postItem.lastReplyAuthor);
    postItem.commentThread.forEach((comment) => userList.push(comment.author));
    resolveUserObjects(userList, function(err, userMap) {
      if (err) {
        return callback(err);
      }
      postItem.author = userMap[postItem.author];
      postItem.lastReplyAuthor = userMap[postItem.lastReplyAuthor];
      postItem.commentThread.forEach((comment) => {
        comment.author = userMap[comment.author];
      });
      callback(null, postItem);
    });
  });
}

    function getForumData(user, callback){

      db.collection('users').findOne({
        _id: user
      }, function (err, userData){
        if(err){
          return callback(err);
        } else if (userData === null){
          return callback(null, null);
        }
          var resolvedContents = [];

          function processNextPostItem(i){
            getForumItem(userData.postItem[i], function(err, postItem){
                if(err){
                  callback(err);
                } else {
                  resolvedContents.push(postItem);
                  if(resolvedContents.length === userData.postItem.length){
                    userData.postItem = resolvedContents;
                    callback(null, userData.postItem);
                  } else {
                    processNextPostItem(i+1);
                  }
                }
              });
            }

            if (userData.postItem.length === 0){
              callback(null, userData.postItem);
            } else {
              processNextPostItem(0);
            }
          });
      }

    app.get('/user/:userid/feeditem', function(req, res) {
      var userid = req.params.userid;
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      if (fromUser === userid) {
        // Convert userid into an ObjectID before passing it to database queries.
        getForumData(new ObjectID(userid), function(err, forumData) {
          if (err) {
        // A database error happened.
        // Internal Error: 500.
          res.status(500).send("Database error: " + err);
        } else if (forumData === null) {
          // Couldn't find the feed in the database.
          res.status(400).send("Could not look up forum for user " + userid);
        } else {
          // Send data.
          //console.log(forumData);
          res.send(forumData);
        }
      });
    } else {
      // 403: Unauthorized request.
      res.status(403).end();
    }
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
      postData.commentThread.forEach((comment) => {
        comment.author = readDocument('users', comment.author);
      });
      var value = {contents : postData};
      return value;
    }

    app.get('/feeditem/:feeditemid', function(req, res) {
      var feeditemid = req.params.feeditemid;
      getForumItem(new ObjectID(feeditemid), function(err, forumItem) {
        // console.log("forum data: " +  forumItem);
        if (err) {
      // A database error happened.
      // Internal Error: 500.
        res.status(500).send("Database error: " + err);
      } else if (forumItem === null) {
        // Couldn't find the feed in the database.
        res.status(400).send("Could not look up post");
      } else {
        // Send data.
        console.log(forumItem);
        res.send(forumItem);
        }
      });
    });


    function postReply(user, contents, Id){
      var postData = readDocument('postItem', Id);
      postData.commentThread.push({
        "author": user,
        "postDate": new Date().getTime(),
        "content": contents
      });
      writeDocument('postItem', postData);

      return postData.commentThread;
    }

    app.post('/thread/comments',
      validate({ body: commentSchema }), function(req, res) {
        // If this function runs, `req.body` passed JSON validation!
      var body = req.body;
      var fromUser = getUserIdFromToken(req.get('Authorization'));
      // Check if requester is authorized to post this comment.
      // (The requester must be the author of the comment.)
      if (fromUser === body.author) {
        var newComment = postReply(body.author, body.contents, body.threadid);
          // When POST creates a new resource, we should tell the client about it
          // in the 'Location' header and use status code 201.
          res.status(201);
          res.set('Location', '/thread/comments' + newComment._id);
          // Send the update!
          res.send(newComment);
        } else {
          // 401: Unauthorized.
          res.status(401).end();
        }
    });


    // Starts the server on port 3000!
    app.listen(3000, function () {
      console.log('ToGather listening on port 3000!');
    });

});
