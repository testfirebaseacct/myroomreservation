'use strict';

var usersRef;
var roomsRef;
var reservationsRef;
var reservedListRef;
var userAdmin = false;

function myRoomReservation() {
  this.checkSetup();

  //pages
  this.loginPage = document.getElementById('login_form_holder');
  this.wrapperPage = document.getElementById('wrapper');
  this.header = document.getElementById('one_page_app');
  this.sidebarHeader = document.getElementById('sidebarHead'); 
  this.footer = document.getElementById('footer');

  //signin object
  this.signInButton = document.getElementById('signInButton');

  //logout object
  this.logoutButton = document.getElementById('logoutButton');

  //signinEvent
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  //logoutEvent
  this.logoutButton.addEventListener('click', this.signOut.bind(this));

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
    this.loginPage.setAttribute('hidden', true);
    this.header.setAttribute('class', 'fix-header');
    this.sidebarHeader.removeAttribute('hidden');
    this.footer.removeAttribute('hidden');
    this.listReservedRooms();
  } else {
    this.loginPage.removeAttribute('hidden');
    this.header.removeAttribute('class');
    this.sidebarHeader.setAttribute('hidden', true);
    this.footer.setAttribute('hidden', true);
    console.log("User is NOT logged in.");
  }
}

//adds user in Firestore DB
myRoomReservation.prototype.addUserInFirestore = function(user) {

	var checkUserExists = usersRef.doc(user.uid).get()
	.then(function(doc) {
		if (doc.exists) {
			console.info("User already existing.");
			userAdmin = doc.data().admin;
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

//reserved rooms list
myRoomReservation.prototype.listReservedRooms = function() {
	var dateToday = new Date();
	console.log("admin: ", userAdmin);
	console.log("dateToday: ", dateToday);
	if(true) {
		var listAllReserved = reservedListRef.where("reservedSchedule", ">=", dateToday).orderBy("reservedSchedule", "desc")
		.onSnapshot(function(list) {
	        if(list) {
		        $('#list_reservation').empty();
		        	var count = 0; 
		            list.forEach(function(rooms) {
		                var roomDetails = rooms.data();
		                var roomRef = roomDetails.room;
		                console.log("Room Ref: ", roomRef);
		                count += 1;
		                $('#list_reservation').append($('<tr>',{
		                  html: "<td>" + count + "</td>" + 
		                  "<td>" + roomRef.name + "</td>" +
		                  "<td>" + roomDetails.status + "</td>" +
		                  "<td>" + roomDetails.reservedSchedule.toDate() + "</td></tr>"
		                }));
		            })
		        console.log("Rooms list query completed!");
	        }
	    });
	} else {
		//...different list
	}
}

//signout
myRoomReservation.prototype.signOut = function () {
  this.auth.signOut();
  console.info("User logged out.");
  window.location.reload();
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