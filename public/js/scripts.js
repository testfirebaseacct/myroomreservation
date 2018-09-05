'use strict';

function test() {
	console.log("Test!")
}

function myRoomReservation() {
  this.checkSetup();

  //signin object
  this.signInButton = document.getElementById('signInButton');


  //signinEvent
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  //initialize Firebase
  this.initFirebase();
}

myRoomReservation.prototype.initFirebase = function () {
  this.auth = firebase.auth();
  this.firestore = firebase.firestore();
  this.storage = firebase.storage();
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
}

myRoomReservation.prototype.signIn = function () {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    'prompt': 'select_account'
  });
  const promise = this.auth.signInWithPopup(provider);
  console.info("User logged in.");
  promise.catch(e => console.log(e.message));
}

myRoomReservation.prototype.onAuthStateChanged = function(user) {
  if (user) { 
    console.log("User is logged in");
  } else {
    console.log("User is NOT logged in");
  }
}

myRoomReservation.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  } else {
  	console.log("Successfully connected to Firebase!");
  }
};

window.onload = function() {
  window.myRoomReservation = new myRoomReservation();
};