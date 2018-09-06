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
  this.dash_nav = document.getElementById('dash_nav');
  this.wrapperPage = document.getElementById('wrapper');
  this.header = document.getElementById('one_page_app');
  this.sidebarHeader = document.getElementById('sidebarHead'); 
  this.dash_nav = document.getElementById('dash_nav');
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
    this.dash_nav.removeAttribute('hidden');
    this.footer.removeAttribute('hidden');
    this.wrapperPage.removeAttribute('style');
  } else {
    this.loginPage.removeAttribute('hidden');
    this.header.removeAttribute('class');
    this.sidebarHeader.setAttribute('hidden', true);
    this.dash_nav.setAttribute('hidden', true);
    this.footer.setAttribute('hidden', true);
    this.wrapperPage.setAttribute('style','display:none');
    console.log("User is NOT logged in.");
  }
}

//adds user in Firestore DB
myRoomReservation.prototype.addUserInFirestore = function(user) {
	var checkUserExists = usersRef.doc(user.uid).get()
	.then(function(doc) {
		if (doc.exists) {
			console.info("User already existing.");
      userAdmin = this.checkAdmin(user);
		} else {
			var addUser = usersRef.doc(user.uid).set({
				admin: userAdmin,
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
	});
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

//check user if admin
myRoomReservation.prototype.checkAdmin = function(user) {
  var checkUserAdmin = usersRef.doc(user.uid).get()
  .then(function(doc) {
    console.log("Check Admin: ", doc.data().admin);
    this.listReservedRooms(user);
    return doc.data().admin;
  }).catch(err => {
    console.error("Error checking admin: ", err);
  });

  return false;
}

//reserved rooms list
myRoomReservation.prototype.listReservedRooms = function(user) {
	var dateToday = new Date();
	console.log("admin: ", this.checkAdmin(user));
	console.log("dateToday: ", dateToday);
	if(this.checkAdmin(user)) { //for admins
		var listAllReserved = reservedListRef.where("reservedSchedule.from", ">=", dateToday).where("status", "==", "reserved").orderBy("reservedSchedule.from", "desc")
		.onSnapshot(function(list) {
	        if(list) {
		        $('#list_reservation').empty();
		        	var count = 0; 
		            list.forEach(function(rooms) {
                  var roomName;
                  var userName;
		                var roomDetails = rooms.data();

                    var userRef = firebase.firestore().doc(rooms.get("reservedBy").path).get().then(function(usr) {
                      userName = usr.data().name;
                    }).then(() => {
                      console.info("Getting user details successful.");

                      var roomRef = firebase.firestore().doc(rooms.get("room").path).get().then(function(rm) {
                        roomName = rm.data().name;
                      }).then(() => {
                        console.info("Getting room details successful.");
                        
                        count += 1;
                        $('#list_reservation').append($('<tr>',{
                          html: "<td>" + count + "</td>" + 
                          "<td>" + roomName + "</td>" +
                          "<td>" + userName + "</td>" +
                          "<td>From: " + roomDetails.reservedSchedule.from.toDate() + "<br>To: " + roomDetails.reservedSchedule.to.toDate() + "</td>" +
                          "<td><span class='text-success'><a href='#'' class='waves-effect' id='cancel_reserve' onclick='cancelReservation(" + rooms.id + ")'><i class='fa fa-external-link fa-fw' aria-hidden='true'></i></a></span></td></tr>"
                        }));
                      }).catch(err => {
                        console.error("Error getting room details: ", err);
                      });
                    }).catch(err => {
                      console.error("Error getting user details: ", err);
                    });
		            })
		        console.log("Rooms list query completed!");
	        }
	    });
	} else { //for non-admins
		var listAllReserved = reservedListRef.where("reservedSchedule.from", ">=", dateToday).orderBy("reservedSchedule.from", "desc")
    .onSnapshot(function(list) {
          if(list) {
            $('#list_reservation').empty();
              var count = 0; 
                list.forEach(function(rooms) {
                  var roomName;
                    var roomDetails = rooms.data();

                    if(rooms.get("reservedBy").path == "users/" + user.uid) {

                      var roomRef = firebase.firestore().doc(rooms.get("room").path).get().then(function(rm) {
                        roomName = rm.data().name;
                      }).then(() => {
                        console.info("Getting room details successful.");

                        count += 1;
                        $('#list_reservation').append($('<tr>',{
                          html: "<td>" + count + "</td>" + 
                          "<td>" + roomName + "</td>" +
                          "<td>" + roomDetails.status + "</td>" +
                          "<td>From: " + roomDetails.reservedSchedule.from.toDate() + "<br>To: " + roomDetails.reservedSchedule.to.toDate() + "</td>" +
                          "<td><span class='text-success'><a href='#'' class='waves-effect' id='cancel_reserve' onclick='cancelReservation(" + rooms.id + ")'><i class='fa fa-external-link fa-fw' aria-hidden='true'></i></a></span></td></tr>"
                        }));
                      }).catch(err => {
                        console.error("Error getting room details: ", err);
                      });
                    }
                })
            console.log("Rooms list query completed!");
          }
      });
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