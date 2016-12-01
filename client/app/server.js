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


export function getRequestItem(reqId, cb){
  var req = readDocument('requestItems', reqId);
  var value = {log : req};
  emulateServerReturn(value, cb);
}

export function getMatchGroup(search_key, cb){
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
  emulateServerReturn(value, cb);
}
/*function getGroupByIdSync(groupId){
  var groupData = readDocument('groups', groupId);
  var userId = groupData.groupOwner;
  groupData.groupOwner = readDocument('users',userId).fullName;
  return groupData;

}*/
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
// Get the User object with the id "user".
var userId = getUserId(userName);
var userData = readDocument('users', userId);
var value = {contents : userData};
emulateServerReturn(value, cb);
}

export function getUserDataById(userId, cb) {
// Get the User object with the id "user".
var userData = readDocument('users', userId);
var value = {contents : userData};
emulateServerReturn(value, cb);
}

function getUserId(fullName){
  for(var i = 1; readDocument('users', i); i++){
    var user = readDocument('users', i);
    if(user.fullName == fullName)
      return user._id;
  }
}

function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

export function getUnReadMsgs(user, cb){
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
  emulateServerReturn(value, cb);
}

/**
* Emulates a REST call to get the feed data for a particular user.
* @param user The ID of the user whose feed we are requesting.
* @param cb A Function object, which we will invoke when the Feed's data is available. */
export function getRecommendPostItem(user, cb) {
// Get the User object with the id "user".
var userData = readDocument('users', user);
var userMaxList = getThreeMaxPost(userData.postItem);
var friendMaxList = getRecommendPostItemFriend(user);

if(friendMaxList[0] != -1){
  for(var j = 0; j < friendMaxList.length; j++){
    if(friendMaxList[j] > userMaxList[0]){
      userMaxList[2] = userMaxList[1];
      userMaxList[1] = userMaxList[0];
      userMaxList[0] = friendMaxList[j];
    }else if(friendMaxList[j] > userMaxList[1]){
      userMaxList[2] = userMaxList[1];
      userMaxList[1] = friendMaxList[j];
    }else if(friendMaxList[j] > userMaxList[2]){
      userMaxList[2] = friendMaxList[j];
    }
  }
}
while(userMaxList.indexOf(-1) != -1){
  userMaxList.splice(-1, 1);
}

var value = {contents : userMaxList};
//value.contents. = feedData.contents.map(getFeedItemSync);
// emulateServerReturn will emulate an asynchronous server operation, which // invokes (calls) the "cb" function some time in the future.
emulateServerReturn(value, cb);
}

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
export function getRecommendPostItemFriend(user) {
  var userData = readDocument('users', user);
  var friendList = userData.friendList;
  var maxList = [-1, -1, -1];
  var index;
  for (index in friendList){
    var friend = readDocument('users', friendList[index]);
    var postItemData = friend.postItem;
    var tempMaxList = [-1, -1, -1];
    if(postItemData.length != 0 ){
      tempMaxList = getThreeMaxPost(postItemData);
        for(var j = 0; j < tempMaxList.length; j++){
          if(tempMaxList[j] > maxList[0]){
            maxList[2] = maxList[1];
            maxList[1] = maxList[0];
            maxList[0] = tempMaxList[j];
          }else if(tempMaxList[j] > maxList[1]){
            maxList[2] = maxList[1];
            maxList[1] = tempMaxList[j];
          }else if(tempMaxList[j] > maxList[2]){
            maxList[2] = tempMaxList[j];
          }
        }
      }
  }
  return maxList;
}

export function getThreeMaxPost(postItemData){
  var recommend_list = [];
  var item;
  var maxViewCount = -1;
  var secondMaxViewCount = -1;
  var thirdMaxViewCount = -1;
  var maxPostIndex = -1;
  var secondMaxPostIndex = -1;
  var thirdMaxPostIndex = -1;
  for (item in postItemData){
    var postItem = readDocument('postItem', postItemData[item]);
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
    recommend_list.push(readDocument('postItem', postItemData[maxPostIndex]));
  else {
    recommend_list.push(maxPostIndex);
  }
  if(secondMaxPostIndex != -1)
    recommend_list.push(readDocument('postItem', postItemData[secondMaxPostIndex]));
  else {
    recommend_list.push(secondMaxPostIndex);
  }
  if(thirdMaxPostIndex != -1)
    recommend_list.push(readDocument('postItem', postItemData[thirdMaxPostIndex]));
  else {
    recommend_list.push(thirdMaxPostIndex);
  }
  return recommend_list;
}


export function readRequest(requestItemId, userId, cb) {
  var requestItem = readDocument('requestItems', requestItemId);
  requestItem.read = true;
  writeDocument('requestItems', requestItem);
  var user = readDocument('users', userId);
  var unRead = user.unread;
  if(unRead.indexOf(requestItemId) != -1){
    user.unread.splice(unRead.indexOf(requestItemId),1);
    writeDocument('users', user);
  }
  // Return a resolved version of the likeCounter
  emulateServerReturn("true", cb);
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

  function getGroup(groupName){
   //var userList = readDocumentNoId('users');
   var groupBase = readDocument('dataBase',2);


   var groupR = -1;

   //var ll = userList.length;
   groupBase.List.forEach((groupId) => {
     var groupData = readDocument('groups', groupId);
     if(groupData.groupName === groupName)
       groupR = groupId;
   });

  return groupR;
}

export function updateUserInfo(userId, name, email, grade, major, description, cb){
  var userData = readDocument('users', userId);
  userData.fullName = name;
  userData.email = email;
  userData.grade = grade;
  userData.major = major;
  userData.description = description;
  writeDocument('users', userData);
  var value = {contents: userData};
  emulateServerReturn(value, cb);
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

    var userId=getUser(userName);
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
    emulateServerReturn(requestData, cb);

  }


// Works as long as messages / requests aren't deleted. Consider revising
export function onMessage(message, authorId, recieverId) {
  var reciever = readDocument('users', recieverId);
    for(var i = 0; i < 100000000; i++) {
      try {
        var request = readDocument('requests', i);
      }
      catch(err) {
        request._id = i;
        request.author = authorId;
        request.reciever = recieverId;
        request.CreateDate = new Date();
        request.status = "false";
        request.title = "Message";
        request.content = message;
        request.read = "false";
        writeDocument('requests', request);
        reciever.mailbox.push(i)
        writeDocument('users', reciever)
        break;
      }
    }
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
