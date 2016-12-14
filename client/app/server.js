
// token is for 'id: 2'
//var token = 'eyJpZCI6Mn0='; // <-- Put your base64'd JSON token here
//eyJpZCI6MX0=

// for 'id: 1'
var token = 'eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJ9';
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
  if(search_key != 'undefined' && search_key.length != 0 && search_key.trim()){
    sendXHR('POST', '/search', search_key, (xhr) => {
      cb(JSON.parse(xhr.responseText));
    });
  }
}

export function getRecommendPostItem(user, cb) {
  sendXHR('GET', '/postItem', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getUnReadMsgs(userId, cb){
  sendXHR('GET', '/unReadReq/' + userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function readRequest(requestItemId, userId, cb) {
  sendXHR('PUT', '/readRequest/' + requestItemId +'/' + userId , undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

//friend
export function getFriendDataById(userId, cb){
  sendXHR('GET', '/friend/' + userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText))
  });
}
//Elvis not here
//Elvis not here
//Elvis not here

export function getUserDataByName(userName, cb) {
  sendXHR('GET','/username/'+userName, undefined,
           (xhr)=>{cb(JSON.parse(xhr.responseText))
           });
}

//use for account feed
export function getUserDataById(userId, cb) {
// Get the User object with the id "user".
  sendXHR('GET', '/userData/' + userId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
});
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



  export function getUserById(userId, cb){
    sendXHR('GET', '/user/' + userId, undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
    });
  }

export function updateUserInfo(userId, name, email, grade, major, description, cb){
  sendXHR('POST', '/userData/' + userId, {
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

export function onRequest(username, authorId, cb) {
  sendXHR('POST', '/friendRequest', {
    username: username,
    authorId: authorId
  },
  (xhr) => {
      cb(JSON.parse(xhr.responseText));
  });
}

export function getForumData(user, cb){
  sendXHR('GET', '/user/' + user + '/feeditem', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function postThread(user, title, contents, cb){
  sendXHR('POST', '/thread', {
    author: user,
    title: title,
    contents: contents
  }, (xhr) => {
    // Return the new status update.
    cb(JSON.parse(xhr.responseText));
});
}

export function getPostDataById(Id, cb) {
  sendXHR('GET', '/feeditem/' + Id, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getForumItem(Id, cb) {
  sendXHR('GET', '/feeditem/' + Id, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}


export function postReply(user, contents, Id, cb){
  sendXHR('POST', '/thread/comments', {
    author: user,
    contents: contents,
    threadid: Id
  }, (xhr) => {
    // Return the new status update.
    cb(JSON.parse(xhr.responseText));
});
}
