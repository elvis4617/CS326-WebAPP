

var initialData = {
  // The "user" collection. Contains all of the users in our ToGather system.
  "users": {
    // This user has id "1".
    "1": {
      "_id": 1, // id of the user
      "fullName": "Someone",
      "school": "Umass",
      "password": 123,
      "profilePic": "PIC",
      "email": "someone@something.com",
      "unread": [1], // list of id's of unread requests
      "major": "Computer Science",
      "description": "I'm a person",
      "friendList": [2,3], // list of id's of friends
      "groupList": [1], // list of id's of goups the user belongs to
      "mailbox": [1,2], // list of request id's in the users mailbox
      "postItem":  [] //list of postItem in the
    },
    "2": {
      "_id": 2,
      "fullName": "Someone Else",
      "school": "Umass",
      "password": 123,
      "profilePic": "PIC",
      "email": "someoneelse@something.com",
      "unread": [],
      "major": "Mathematics",
      "description": "I'm a human",
      "friendList": [1,3,4],
      "groupList": [1],
      "mailbox": [],
      "postItem": [1,2,3]
    },
    "3": {
      "_id": 3,
      "fullName": "Another Person",
      "school": "Umass",
      "password": 123,
      "profilePic": "PIC",
      "email": "anotherperson@something.com",
      "unread": [],
      "major": "Liberal Arts",
      "description": "I'm an artist",
      "friendList": [1,2,4],
      "groupList": [2],
      "mailbox": [],
      "postItem": []
    },
    "4": {
      "_id": 4,
      "fullName": "This Guy",
      "school": "Umass",
      "password": 123,
      "profilePic": "PIC",
      "email": "thisguy@something.com",
      "unread": [],
      "major": "Computer Science",
      "description": "I'm me",
      "friendList": [2,3],
      "groupList": [1],
      "mailbox": [],
      "postItem": []
    }
  },
  // "group collection"
  "groups": {
    // group with id = 1
    "1": {
      "_id": 1, // id of the group
      "icon": "icon",
      "memberList": [1,4], // list of the id's of the users in the group
      "memberCount": 2,
      "location": "Umass",
      "lastActiveDate": 1453690800000,
      "description": "A study group focused in Computer Science."
    },
    "2": {
      "_id": 2,
      "icon": "icon",
      "memberList": [2,3],
      "memberCount": 2,
      "location": "Umass",
      "lastActiveDate": 1453690800000,
      "description": "A study group focused in Basic Math."
    }
  },
  // "requests" collection. requests sent to a ToGather user.
  "requestItems": {
    // request with id = 1
    "1": {
      "_id": 1,
      "author": 4, // id of the user who is the author
      "reciever": 1, // id of the user who is recieving the request
      "createDate": 1453690800000,
      "status": false,
      "title": "friendRequest01",
      "content": "Would you like to be friends? 01",
      "read": false // if the reciever has read the request
    },
    "2": {
      "_id": 2,
      "author": 3, // id of the user who is the author
      "reciever": 1, // id of the user who is recieving the request
      "createDate": 1453590800000,
      "status": false,
      "title": "friendRequest02",
      "content": "Would you like to be friends? 02",
      "read": false // if the reciever has read the request
    }
  },
  // postItem collection
  // postItems are viewable in the forums of the author, and the author's friends
  "postItem": {
    "1": {
      "_id": 1, // id of the post item
      "author": 2, // id of the author
      "postDate": 1453690800000,
      "title": "Midterm",
      "content": "Man that cs250 midterm was awful",
      "viewCount": 1,
      "replyCount": 2,
      "lastReplyAuthor": 3, // id of the last user to reply
      "lastReplyDate": 1453690800000,
      "commentThread": [ // list of all comments on the post
        {
          "author": 1, // id of the user who commented
          "content": "yeah it was",
          "postDate": 1453690800000
        },
        {
          "author": 3,
          "content": "It wasn't that bad.",
          "postDate": 1453690800000
        }
      ]
    },
    "2": {
      "_id": 2, // id of the post item
      "author": 2, // id of the author
      "postDate": 1453690800000,
      "title": "Final",
      "content": "Man that cs250 midterm was awful",
      "viewCount": 2,
      "replyCount": 3,
      "lastReplyAuthor": 3, // id of the last user to reply
      "lastReplyDate": 1453690800000,
      "commentThread": [ // list of all comments on the post
        {
          "author": 1, // id of the user who commented
          "content": "yeah it was",
          "postDate": 1453690800000
        },
        {
          "author": 3,
          "content": "It wasn't that bad.",
          "postDate": 1453690800000
        }
      ]
    },
    "3": {
      "_id": 3, // id of the post item
      "author": 2, // id of the author
      "postDate": 1453690800000,
      "title": "Midterm",
      "content": "Man that cs250 midterm was awful",
      "viewCount": 3,
      "replyCount": 4,
      "lastReplyAuthor": 3, // id of the last user to reply
      "lastReplyDate": 1453690800000,
      "commentThread": [ // list of all comments on the post
        {
          "author": 1, // id of the user who commented
          "content": "yeah it was",
          "postDate": 1453690800000
        },
        {
          "author": 3,
          "content": "It wasn't that bad.",
          "postDate": 1453690800000
        }
      ]
    },
    "4":{
      "totalNumOfPost": 3
    }
  },
  // forum collection
  "forums": {
    // forum for user 1
    "1": {
      "_id": 1, // id of the user / forum
      "contents": [1] // list of the postItems in the forum
    },
    "2": {
      "_id": 2,
      "contents": [1]
    },
    "3": {
      "_id": 3,
      "contents": [1]
    },
    "4": {
      "_id": 4,
      "contents": [1]
    }
  }
};

var data = JSON.parse(localStorage.getItem('togather_data'));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

export function readDocumentNoId(collection){
  return JSONClone(data[collection])
}
/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem('togather_data', JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem('togather_data', JSON.stringify(initialData));
  data = JSONClone(initialData);
}
