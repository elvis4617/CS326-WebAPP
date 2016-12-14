var ObjectID = require('mongodb').ObjectID;

var databaseName = "toGather";

var initialData = {
  // The "user" collection. Contains all of the users in our ToGather system.
  "users": {
    // This user has id "1".
    "1": {
      "_id": new ObjectID("000000000000000000000001"), // id of the user
      "userName": "I am a userName of 1",
      "fullName": "Someone",
      "school": "Umass",
      "grade": "Freshman",
      "password": 123,
      "profilePic": "PIC",
      "email": "someone@something.com",
      "unread": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002")], // list of id's of unread requests
      "major": "Computer Science",
      "description": "I'm a person",
      "friendList": [new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000003")], // list of id's of friends
      "groupList": [new ObjectID("000000000000000000000001")], // list of id's of goups the user belongs to
      "mailbox": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002")], // list of request id's in the users mailbox
      "postItem":  [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000003")] //list of postItem in the
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
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
      "friendList": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000003"),new ObjectID("000000000000000000000004")],
      "groupList": [new ObjectID("000000000000000000000001")],
      "mailbox": [new ObjectID("000000000000000000000003"),new ObjectID("000000000000000000000004")],
      "postItem": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000003")]
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
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
      "friendList": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000004")],
      "groupList": [new ObjectID("000000000000000000000002")],
      "mailbox": [],
      "postItem": []
    },
    "4": {
      "_id": new ObjectID("000000000000000000000004"),
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
      "friendList": [new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000003")],
      "groupList": [new ObjectID("000000000000000000000001")],
      "mailbox": [],
      "postItem": []
    }
  },
  // "group collection"
  "groups": {
    // group with id = 1
    "1": {
      "_id": new ObjectID("000000000000000000000001"), // id of the group
      "groupName":"DC CLUB",
      "groupOwner":new ObjectID("000000000000000000000001"),
      "icon": "icon",
      "owner": new ObjectID("000000000000000000000001"),
      "memberList": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000004")], // list of the id's of the users in the group
      "memberCount": 2,
      "location": "Umass",
      "lastActiveDate": 1453690800000,
      "description": "A study group focused in Computer Science."
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "groupName":"MARVEL CLUB",
      "groupOwner":new ObjectID("000000000000000000000003"),
      "icon": "icon",
      "owner": new ObjectID("000000000000000000000003"),
      "memberList": [new ObjectID("000000000000000000000002"),new ObjectID("000000000000000000000003")],
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
      "_id": new ObjectID("000000000000000000000001"),
      "type":"request",
      "author": new ObjectID("000000000000000000000004"), // id of the user who is the author
      "reciever": new ObjectID("000000000000000000000001"), // id of the user who is recieving the request
      "createDate": 1453690800000,
      "status": false,
      "group":new ObjectID("000000000000000000000001"),
      "title": "friendRequest01",
      "content": "Would you like to be friends? 01",
      "read": false // if the reciever has read the request
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "type":"request",
      "author": new ObjectID("000000000000000000000003"), // id of the user who is the author
      "reciever": new ObjectID("000000000000000000000001"), // id of the user who is recieving the request
      "createDate": 1453590800000,
      "status": false,
      "group":new ObjectID("000000000000000000000001"),
      "title": "friendRequest02",
      "content": "Would you like to be friends? 02",
      "read": false // if the reciever has read the request
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "type":"request",
      "author": new ObjectID("000000000000000000000004"), // id of the user who is the author
      "reciever": new ObjectID("000000000000000000000002"), // id of the user who is recieving the request
      "createDate": 1454690800000,
      "status": false,
      "group":new ObjectID("000000000000000000000002"),
      "title": "friendRequest01000",
      "content": "Would you like to be friends? 01",
      "read": false // if the reciever has read the request
    },
    "4": {
      "_id": new ObjectID("000000000000000000000004"),
      "type":"request",
      "author": new ObjectID("000000000000000000000003"), // id of the user who is the author
      "reciever": new ObjectID("000000000000000000000002"), // id of the user who is recieving the request
      "createDate": 1553590800000,
      "status": false,
      "group":new ObjectID("000000000000000000000001"),
      "title": "friendRequest02000",
      "content": "Would you like to be friends? 02",
      "read": false // if the reciever has read the request
    }
  },
  // postItem collection
  // postItems are viewable in the forums of the author, and the author's friends
  "postItem": {
    "1": {
      "_id": new ObjectID("000000000000000000000001"), // id of the post item
      "author": new ObjectID("000000000000000000000002"), // id of the author
      "postDate": 1453690800000,
      "title": "Midterm",
      "content": "Man that cs250 midterm was awful",
      "viewCount": 1,
      "replyCount": 2,
      "lastReplyAuthor": new ObjectID("000000000000000000000003"), // id of the last user to reply
      "lastReplyDate": 1453690800000,
      "commentThread": [ // list of all comments on the post
        {
          "author": new ObjectID("000000000000000000000001"), // id of the user who commented
          "content": "yeah it was",
          "postDate": 1453690800000
        },
        {
          "author": new ObjectID("000000000000000000000003"),
          "content": "It wasn't that bad.",
          "postDate": 1453690800000
        }
      ]
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"), // id of the post item
      "author": new ObjectID("000000000000000000000002"), // id of the author
      "postDate": 1453690800000,
      "title": "Final",
      "content": "Man that cs250 midterm was awful",
      "viewCount": 2,
      "replyCount": 3,
      "lastReplyAuthor": new ObjectID("000000000000000000000003"), // id of the last user to reply
      "lastReplyDate": 1453690800000,
      "commentThread": [ // list of all comments on the post
        {
          "author": new ObjectID("000000000000000000000001"), // id of the user who commented
          "content": "yeah it was",
          "postDate": 1453690800000
        },
        {
          "author": new ObjectID("000000000000000000000003"),
          "content": "It wasn't that bad.",
          "postDate": 1453690800000
        }
      ]
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"), // id of the post item
      "author": new ObjectID("000000000000000000000003"), // id of the author
      "postDate": 1453690800000,
      "title": "Midterm",
      "content": "Man that cs250 midterm was awful",
      "viewCount": 3,
      "replyCount": 4,
      "lastReplyAuthor": new ObjectID("000000000000000000000003"), // id of the last user to reply
      "lastReplyDate": 1453690800000,
      "commentThread": [ // list of all comments on the post
        {
          "author": new ObjectID("000000000000000000000001"), // id of the user who commented
          "content": "yeah it was",
          "postDate": 1453690800000
        },
        {
          "author": new ObjectID("000000000000000000000003"),
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
      "_id": new ObjectID("000000000000000000000001"), // id of the user / forum
      "contents": [new ObjectID("000000000000000000000001")] // list of the postItems in the forum
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "contents": [new ObjectID("000000000000000000000001")]
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "contents": [new ObjectID("000000000000000000000001")]
    },
    "4": {
      "_id": new ObjectID("000000000000000000000004"),
      "contents": [new ObjectID("000000000000000000000001")]
    }
  }

};

/**
 * Adds any desired indexes to the database.
 */
function addIndexes(db, cb) {
  db.collection('requestItems').createIndex({ "content": "text" }, null, cb);
}

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      addIndexes(db, cb);
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
