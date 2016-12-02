var initialData = {
  // The "user" collection. Contains all of the users in our ToGather system.
  "users": {
    // This user has id "1".
    "1": {
      "_id": 1, // id of the user
      "userName": "I am a userName of 1",
      "fullName": "Someone",
      "school": "Umass",
      "grade": "Freshman",
      "password": 123,
      "profilePic": "PIC",
      "email": "someone@something.com",
      "unread": [1,2], // list of id's of unread requests
      "major": "Computer Science",
      "description": "I'm a person",
      "friendList": [2,3], // list of id's of friends
      "groupList": [1], // list of id's of goups the user belongs to
      "mailbox": [1,2], // list of request id's in the users mailbox
      "postItem":  [1,2,3] //list of postItem in the
    },
    "2": {
      "_id": 2,
      "userName": "I am a userName of 2",
      "fullName": "Someone Else",
      "grade": "Sophrmore",
      "school": "Umass",
      "password": 123,
      "profilePic": "PIC",
      "email": "someoneelse@something.com",
      "unread": [],
      "major": "Mathematics",
      "description": "I'm a human",
      "friendList": [1,3,4],
      "groupList": [1],
      "mailbox": [3,4],
      "postItem": [1,2,3]
    },
    "3": {
      "_id": 3,
      "userName": "I am a userName of 3",
      "fullName": "Another Person",
      "grade": "Junior",
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
      "userName": "I am a userName of 4",
      "fullName": "This Guy",
      "grade": "Senior",
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
      "groupName":"DC CLUB",
      "groupOwner":1,
      "icon": "icon",
      "owner": 1,
      "memberList": [1,4], // list of the id's of the users in the group
      "memberCount": 2,
      "location": "Umass",
      "lastActiveDate": 1453690800000,
      "description": "A study group focused in Computer Science."
    },
    "2": {
      "_id": 2,
      "groupName":"MARVEL CLUB",
      "groupOwner":3,
      "icon": "icon",
      "owner": 2,
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
      "type":"request",
      "author": 4, // id of the user who is the author
      "receiver": 1, // id of the user who is recieving the request
      "createDate": 1453690800000,
      "status": false,
      "group":1,
      "title": "friendRequest01",
      "content": "Would you like to be friends? 01",
      "read": false // if the reciever has read the request
    },
    "2": {
      "_id": 2,
      "type":"request",
      "author": 3, // id of the user who is the author
      "receiver": 1, // id of the user who is recieving the request
      "createDate": 1453590800000,
      "status": false,
      "group":1,
      "title": "friendRequest02",
      "content": "Would you like to be friends? 02",
      "read": false // if the reciever has read the request
    },
    "3": {
      "_id": 3,
      "type":"request",
      "author": 4, // id of the user who is the author
      "receiver": 2, // id of the user who is recieving the request
      "createDate": 1454690800000,
      "status": false,
      "group":2,
      "title": "friendRequest01000",
      "content": "Would you like to be friends? 01",
      "read": false // if the reciever has read the request
    },
    "4": {
      "_id": 4,
      "type":"request",
      "author": 3, // id of the user who is the author
      "receiver": 2, // id of the user who is recieving the request
      "createDate": 1553590800000,
      "status": false,
      "group":1,
      "title": "friendRequest02000",
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
  },
  "dataBase":{
    "1":{
      "_id":1,
      "type":"userbase",
      "List":[1,2,3,4]
    },
    "2":{
      "_id":2,
      "type":"groupbase",
      "List":[1,2]
    }
  }
};

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
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
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
  function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
