'use strict';

var usersRef;
var roomsRef;
var reservationsRef;
var reservedListRef;

function myRoomReservation() {
  this.checkSetup();

  //signin object
  this.signInButton = document.getElementById('signInButton');


  //signinEvent
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  //initialize Firebase
  this.initFirebase();
}

//initialize Firebase services
myRoomReservation.prototype.initFirebase = function () {
  this.auth = firebase.auth();
  this.firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  this.firestore.settings(settings);
  this.storage = firebase.storage();
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));

  usersRef = this.firestore.collection("users");
  roomsRef = this.firestore.collection("rooms");
  reservationsRef = this.firestore.collection("reservations");
  reservedListRef = this.firestore.collection("reservations").doc("reservationDetails").collection("reservedList");
}

//sign-in account
myRoomReservation.prototype.signIn = function () {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    'prompt': 'select_account'
  });
  this.auth.signInWithPopup(provider)
  .then(function () {
	  console.info("User logged in successfully.");
  }).catch(e => {
  	console.log("Error logging in: ", e.message)
  });
}

myRoomReservation.prototype.onAuthStateChanged = function(user) {
  if (user) {
    this.addUserInFirestore(user);
  } else {
    console.log("User is NOT logged in.");
  }
}

//adds user in Firestore DB
myRoomReservation.prototype.addUserInFirestore = function(user) {

	var checkUserExists = usersRef.doc(user.uid).get()
	.then(function(doc) {
		if (doc.exists) {
			console.info("User already existing.");
		} else {
			var addUser = usersRef.doc(user.uid).set({
				admin: false,
				email: user.email,
				name: user.displayName,
				profilePicture: user.photoURL || '/images/profile_placeholder.png',
				userId: user.uid
			}).then(function () {
				console.log("User successfully added.")
			}).catch(err => {
				console.error("Failed to add user: ", err);
			})
		}
	})
	.catch(err => {
		console.error("Failed to query user: ", err);
	})

}

//checks setup of the Firebase connection
myRoomReservation.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  } else {
  	console.log("Successfully connected to Firebase!");
  }
};

//instantiates backend operations
window.onload = function() {
  window.myRoomReservation = new myRoomReservation();
};