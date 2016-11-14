import {readDocument, readDocumentNoId, writeDocument, addDocument} from './database.js';

/**
 * Given a feed item ID, returns a FeedItem object with references resolved.
 * Internal to the server, since it's synchronous.
 */
function getFeedItemSync(feedItemId) {
  var feedItem = readDocument('feedItems', feedItemId); // Resolve 'like' counter.
  feedItem.likeCounter =
  feedItem.likeCounter.map((id) => readDocument('users', id)); // Assuming a StatusUpdate. If we had other types of
  // FeedItems in the DB, we would
  // need to check the type and have logic for each type. feedItem.contents.author =
  readDocument('users', feedItem.contents.author);
  // Resolve comment author.
  feedItem.comments.forEach((comment) => {
    comment.author = readDocument('users', comment.author);
  });
  return feedItem;
}

export function getUnReadMsgs(user, cb){
  var userData = readDocument('users', user);
  var unReadList = [];
  if(userData.unread.length != 0){
    for(var i = 0; i<userData.unread.length; i++){
      unReadList.push(readDocument('requests', userData.unread[i]));
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
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

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
  var requestItem = readDocument('requests', requestItemId);
  requestItem.read = "true";
  writeDocument('requests', requestItem);
  var user = readDocument('users', userId);
  var unRead = user.unread;
  if(unRead.indexOf(requestItemId) != -1){
    user.unread.splice(unRead.indexOf(requestItemId),1);
    writeDocument('users', user);
  }
  // Return a resolved version of the likeCounter
  emulateServerReturn("true", cb);
}