import {readDocument, writeDocument, addDocument} from './database.js';

// token is for 'id: 2'
//var token = 'eyJpZCI6Mn0='; // <-- Put your base64'd JSON token here
//eyJpZCI6MX0=

// for 'id: 1'
var token = 'eyJpZCI6MX0=';
/**
* Properly configure+send an XMLHttpRequest with error handling,
* authorization token, and other needed properties.
*/
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  // The below comment tells ESLint that ToGatherError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global ToGatherError */
  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      ToGatherError('Could not ' + verb + " " + resource + ": Received " +
      statusCode + " " + statusText + ": " + responseText);
    }
  });
  // Time out the request if it takes longer than 10,000
  // milliseconds (10 seconds)
  xhr.timeout = 10000;
  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    ToGatherError('Could not ' + verb + " " + resource +
    ": Could not connect to the server.");
  });
  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    ToGatherError('Could not ' + verb + " " + resource +
    ": Request timed out.");
  });
  switch (typeof(body)) {
    case 'undefined':
    // No body to send.
    xhr.send();
    break;
    case 'string':
    // Tell the server we are sending text.
    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    xhr.send(body);
    break;
    case 'object':
    // Tell the server we are sending JSON.
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Convert body into a JSON string.
    xhr.send(JSON.stringify(body));
    break;
    default:
    throw new Error('Unknown body type: ' + typeof(body));
  }
}
//Elvis here
//Elvis here
//Elvis here
export function getMatchGroup(search_key, cb){
  sendXHR('POST', '/search', search_key, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getRecommendPostItem(user, cb) {
  sendXHR('GET', '/postItem', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getUnReadMsgs(user, cb){
  sendXHR('POST', '/unReadReq', user, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}


export function readRequest(requestItemId, userId, cb) {
  sendXHR('PUT', '/readRequest/' + requestItemId +"/" +userId ,undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

//not Elvis
//not Elvis
//not Elvis
export function getFriendDataById(userId, cb){
  var user = readDocument('users', userId);
  var friends = user.friendList;
  var friendList = [];
  for(var i = 0; i<friends.length; i++){
    friendList.push(readDocument('users', friends[i]));
  }
  var value = {contents : friendList};
  emulateServerReturn(value, cb);
}

export function getUserDataByName(userName, cb) {
  sendXHR('GET','/username/'+userName, undefined,
           (xhr)=>{cb(JSON.parse(xhr.responseText))

           });
}

export function getUserDataById(userId, cb) {
// Get the User object with the id "user".
sendXHR('GET', '/user/' + userId, undefined, (xhr) => {
  cb(JSON.parse(xhr.responseText));
});
}



function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}



/*
 *Andy, Andy is here
 *Andy, Andy is here
 *Andy, Andy is here
 *Andy, Andy is here
 *Andy, Andy is here
 */

export function getRequestData(userId, cb){

  sendXHR('GET', '/user/'+ userId + '/mailbox', undefined, (xhr) => {
  cb(JSON.parse(xhr.responseText));
  });
}

// Dont use this function
 function getUser(userName){
  //var userList = readDocumentNoId('users');
  var userBase = readDocument('dataBase',1);

  var userR = -1;
  //var ll = userList.length;
  userBase.List.forEach((userId) => {
    var userData = readDocument('users', userId);
    if(userData.fullName === userName)
      userR = userId;
  });
    return userR;
}

  export function getUserById(userId, cb){

    sendXHR('GET', '/user/' + userId, undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
    });
  }

export function updateUserInfo(userId, name, email, grade, major, description, cb){
  sendXHR('PUT', '/user/' + userId, {
    userId: userId,
    name: name,
    email: email,
    grade: grade,
    major: major,
    description: description
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}


export function writeRequest(userId, recieverName, requestContent, titleEntry, groupName, typeEntry, cb){
  sendXHR('POST', '/requestitem', {
    userId: userId,
    recieverName: recieverName,
    contents: requestContent,
    title: titleEntry,
    groupName: groupName,
    typeEntry: typeEntry
  },
  (xhr) => {
      cb(JSON.parse(xhr.responseText));
    });
}


  export function joinGroup(userName, groupName, requestId, cb){

    sendXHR('PUT', '/group/'+groupName+'/user/'+userName+'/requestitem/'+requestId,
            undefined,
            (xhr) =>{
              cb(JSON.parse(xhr.responseText));
            });
  }


// Send a Message
export function onMessage(message, authorId, recieverId, cb) {
  sendXHR('POST', '/message', {
    Message: message,
    AuthorId: authorId,
    RecieverId: recieverId
  },
  (xhr) => {
      cb(JSON.parse(xhr.responseText));
  });
}

function getUserE(email) {
  //var userList = readDocumentNoId('users');
  var userBase = readDocument('dataBase',1);

  var userR = -1;
  //var ll = userList.length;
  userBase.List.forEach((userId) => {
    var userData = readDocument('users', userId);
    if(userData.email === email)
      userR = userId;
  });
    return userR;
}

// Works as long as messages / requests aren't deleted. Consider revising
export function onRequest(username, email, authorId) {
  var reciever;
  if (username === "") {
    reciever = getUserE(email); }
  else {
    reciever = getUser(username); }
  for(var i = 0; i < 100000000; i++) {
    try {
      var request = readDocument('requests', i);
    }
    catch(err) {
      request._id = i;
      request.author = authorId;
      request.reciever = reciever._id;
      request.CreateDate = new Date();
      request.status = "false";
      request.title = "Friend Request";
      request.content = "Will you be my friend?";
      request.read = "false";
      writeDocument('requests', request);
      reciever.mailbox.push(i)
      writeDocument('users', reciever)
      break;
    }
  }
}

export function getForumData(user, cb){

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

  emulateServerReturn(value, cb);
}

export function postThread(user, title, contents, cb){
  var time = new Date().getTime();
  var newThread = {
    "author": user,
    "title": title,
    "postDate": time,
    "contents": contents,
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

  emulateServerReturn(newThread, cb);
}

export function getPostDataById(Id, cb) {
  var postData = readDocument('postItem', Id);
  postData.author = readDocument('users', postData.author).fullName;
  var value = {contents : postData};
  emulateServerReturn(value, cb);
}
