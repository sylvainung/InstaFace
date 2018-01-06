//requiring APIkey from .env file
require('dotenv').config();
const CONFIG = process.env.CONFIG;

//dependency
const firebase = require('firebase');

//initializing firebase database with the APIkey
firebase.initializeApp(CONFIG);

//firebase database
const database = firebase.database();

//firebase functions
readData((path, callback) => { //generalized read data function GET requests
  database.ref(path).once('value').then(function(snapshot) {
    callback(snapshot.val());
  });
});

createUser((username, first_name, last_name, user_ID) => { //create a new user into our '/users' collection
  //I: from CLIENT username, first_name, last_name, user_ID
  database.ref('/users' + user_ID).update({
      username: username,
      first_name: first_name,
      last_name: last_name,
      full_name: `${first_name} ${last_name}`,
      user_ID: user_ID
  });
});

createPhoto((photo_URL, user_ID, caption) => { //create a new photo to user reference to '/photos' collection
   // returns generated photo_ID
   database.ref('/photos' + photo_URL).update({
     photo_ID: 0, //?
     user_ID: user_ID,
     face_ID: 'bla', //from azure
     faceRectangle: faceRectangle,
     likes: 0,
     caption: caption,
     photo_URL: photo_URL
   });
});

addPhotoTags((photo_ID, tag_ID) => { // combines
  //
});

getTagFromName((first_name) => { //when they search for a name. type inthe name to get tag_ID so we can get all photos from that tag_ID
  //returns tag_ID
});

getTagFromPhoto((photo_ID)=> { //
  //returns tag_ID
});

getAllFaceIDs(()=> { //pull up all the faceIDs from all users saved in our db. just the tag.
  //returns [face_ID] in an array?
});

getNameFromTag((tag_ID)=> { // when displaying faceRectangle, want to display the name to prompt the user for confirmation
  //returns full_name
});


getAllPhotos(() => {
  //returns [{photoURL, caption, likes, tags, faceRectangle}]
  readData('/photos', function(allPhotos) {
    return allPhotos;
  })
});

increaseLike((photo_URL) => {
  database.ref('/photos' + photo_URL + likes).transaction((likes) => {
    return likes ++;
  });
});

decreaseLike((photoURL) => {
  database.ref('/photos' + photo_URL + likes).transaction((likes) => {
    (!!likes) ? likes -- : null;
  });
});

getLike((photo_URL) => { //from '/photos' collection, return 'likes' value from 'photoURL' photo.
//returns likes from DB 
  let path = `/photos/${photo_URL}`;

  readData(path, (photo) => {
    return photo.likes; //returns the integer
  });
});

createTagOnPhoto((full_name, user_ID) => { // will add tag reference on a photo

});


module.exports = {createUser, createPhoto, increaseLike, decreaseLike, getLike, getAllPhotos};