const express = require('express'); 
const router = express.Router(); 

//l1fb - requiring firebase DB controller
const firebaseDatabase = require('../firebaseDb');

router.route('/users/createUser').post((req, res) => { //complete
  let username = req.body.username;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let user_ID = req.body.user_ID;
  console.log("route is working correctly", req.body);
  firebaseDatabase.createUser(username, first_name, last_name, user_ID);
  res.send(req.body);
});

router.route('/photos/createPhoto').post((req, res) => { //completed
  let photo_URL = req.body.photo_URL;
  let user_ID = req.body.user_ID;
  let caption = req.body.caption || null;
  console.log("createPhoto route is responding!", 'AND this is the req:', req.body);
  firebaseDatabase.createPhoto(photo_URL, user_ID, caption);
  res.send(req.body);
});

router.route('/photos/getAllPhotos').get((req, res) => { //completed
  firebaseDatabase.getAllPhotos(function(allPhotos) {
    res.status(200).send(allPhotos);
  });  
});

router.route('/photos/increaseLike').put((req, res) => { //completed
  firebaseDatabase.increaseLike(req.body.photo_URL);
  // console.log("increaseLike routes responding!", req);
  res.send("Increased a Like! Spread the love..");
});

router.route('/photos/decreaseLike').put((req, res) => { //completed
  firebaseDatabase.decreaseLike(req.body.photo_URL);
  // console.log("decreaseLike routes responding!", req);
  res.send("Decresased a Like :( why tho..");
});

router.route('/photos/getphotoInfo').get((req, res) => { //completed - gets each photos object with the photo_URL
  //
  firebaseDatabase.getPhotoInfo(req.headers.query, function(photoInfo) {
    res.status(200).send(photoInfo);
  })
});

router.route('/photos/addPhotoTags').put((req, res) => {
  firebaseDatabase.addPhotoTags(req.body.photo_URL, req.body.tag_name);
  res.send('successfully added a tag on the photo');
});

module.exports = router; 
