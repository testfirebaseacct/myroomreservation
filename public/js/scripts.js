'use strict';

var usersRef;
var roomsRef;
var reservationsRef;
var reservedListRef;
var announcementsRef;
var userAdmin = false;

function myRoomReservation() {
  this.checkSetup();
  //main page entities
  this.loginPage = document.getElementById('login_form_holder');
  this.dash_nav = document.getElementById('dash_nav');
  this.wrapperPage = document.getElementById('wrapper');
  this.header = document.getElementById('one_page_app');
  this.sidebarHeader = document.getElementById('sidebarHead'); 
  this.dash_nav = document.getElementById('dash_nav');
  this.footer = document.getElementById('footer');

  //main pages
  this.dashboardPage = document.getElementById('admin_list_reservations');
  this.usersPage = document.getElementById('admin_list_users');
  this.profilePage = document.getElementById('profile_page');
  this.reservationsPage = document.getElementById('list_my_reservations');
  this.roomsPage = document.getElementById('admin_list_of_rooms');

  //links for navs
  this.dashboardLink = document.getElementById('dashboardLink');
  this.reservationsLink = document.getElementById('reservationsLink');
  this.profileLink = document.getElementById('profileLink');
  this.roomsLink = document.getElementById('roomsLink');
  this.usersLink = document.getElementById('usersLink');
  this.announcementsLink = document.getElementById('announcementsLink');

  //entities from pages
  this.addRoomButton = document.getElementById('add_new_room');
  this.headActionsTable = document.getElementById('actions_head_room');
  this.addReservationPage = document.getElementById('add_new_booking');
  this.editReservationPage = document.getElementById('edit_booking');
  this.addRoomPage = document.getElementById('add_new_room');
  this.editRoomPage = document.getElementById('edit_new_room');

  //userheader
  this.profilePicHead = document.getElementById('profilePic');
  this.userNameHead = document.getElementById('userName');

  //signin object
  this.signInButton = document.getElementById('signInButton');

  //logout object
  this.logoutLink = document.getElementById('logoutLink');

  //navsEvents
  this.dashboardLink.addEventListener('click', this.dashboardShowPages.bind(this));
  this.reservationsLink.addEventListener('click', this.reservationShowPages.bind(this));
  this.profileLink.addEventListener('click', this.profileShowPages.bind(this));
  this.roomsLink.addEventListener('click', this.roomShowPages.bind(this));
  this.usersLink.addEventListener('click', this.userShowPages.bind(this));
  this.announcementsLink.addEventListener('click', this.announcementShowPages.bind(this));

  //signinEvent
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  //logoutEvent
  this.logoutLink.addEventListener('click', this.signOut.bind(this));

  //initialize Firebase
  this.initFirebase();
}


//hide or show pages
myRoomReservation.prototype.dashboardShowPages = function () {

 if(userAdmin) {
  this.dashboardPage.removeAttribute('hidden');
  this.usersPage.setAttribute('hidden', true);
  this.profilePage.setAttribute('hidden', true);
  this.reservationsPage.setAttribute('hidden', true);
  this.roomsPage.setAttribute('hidden', true);
  this.addReservationPage.setAttribute('hidden', true);
  this.editReservationPage.setAttribute('hidden', true);
  this.addRoomPage.setAttribute('hidden', true);
  this.editRoomPage.setAttribute('hidden', true);
 } else {
  this.dashboardPage.removeAttribute('hidden');
  this.usersPage.setAttribute('hidden', true);
  this.profilePage.setAttribute('hidden', true);
  this.reservationsPage.setAttribute('hidden', true);
  this.roomsPage.setAttribute('hidden', true);
  this.addReservationPage.setAttribute('hidden', true);
  this.editReservationPage.setAttribute('hidden', true);
  this.addRoomPage.setAttribute('hidden', true);
  this.editRoomPage.setAttribute('hidden', true);
 }

}


myRoomReservation.prototype.userShowPages = function () {

 if(userAdmin) {
  this.dashboardPage.setAttribute('hidden', true);
  this.usersPage.removeAttribute('hidden');
  this.profilePage.setAttribute('hidden', true);
  this.reservationsPage.setAttribute('hidden', true);
  this.roomsPage.setAttribute('hidden', true);
  this.addReservationPage.setAttribute('hidden', true);
  this.editReservationPage.setAttribute('hidden', true);
  this.addRoomPage.setAttribute('hidden', true);
  this.editRoomPage.setAttribute('hidden', true);
 } else {
  this.dashboardPage.setAttribute('hidden', true);
  this.usersPage.setAttribute('hidden', true);
  this.profilePage.setAttribute('hidden', true);
  this.reservationsPage.setAttribute('hidden', true);
  this.roomsPage.setAttribute('hidden', true);
  this.addReservationPage.setAttribute('hidden', true);
  this.editReservationPage.setAttribute('hidden', true);
  this.addRoomPage.setAttribute('hidden', true);
  this.editRoomPage.setAttribute('hidden', true);
 }

}

myRoomReservation.prototype.roomShowPages = function () {

 if(userAdmin) {
  this.dashboardPage.setAttribute('hidden', true);
  this.usersPage.setAttribute('hidden', true);
  this.profilePage.setAttribute('hidden', true);
  this.reservationsPage.setAttribute('hidden', true);
  this.roomsPage.removeAttribute('hidden');
  this.addRoomButton.setAttribute('hidden', true);
  this.headActionsTable.removeAttribute('hidden');
  this.addReservationPage.setAttribute('hidden', true);
  this.editReservationPage.setAttribute('hidden', true);
  this.addRoomPage.setAttribute('hidden', true);
  this.editRoomPage.setAttribute('hidden', true);
 } else {
  this.dashboardPage.setAttribute('hidden', true);
  this.usersPage.setAttribute('hidden', true);
  this.profilePage.setAttribute('hidden', true);
  this.reservationsPage.setAttribute('hidden', true);
  this.roomsPage.removeAttribute('hidden');
  this.addRoomButton.removeAttribute('hidden');
  this.headActionsTable.setAttribute('hidden', true);
  this.addReservationPage.setAttribute('hidden', true);
  this.editReservationPage.setAttribute('hidden', true);
  this.addRoomPage.setAttribute('hidden', true);
  this.editRoomPage.setAttribute('hidden', true);
 }

}

myRoomReservation.prototype.profileShowPages = function () {

 if(userAdmin) {
  this.dashboardPage.setAttribute('hidden', true);
  this.usersPage.setAttribute('hidden', true);
  this.profilePage.removeAttribute('hidden');
  this.reservationsPage.setAttribute('hidden', true);
  this.roomsPage.setAttribute('hidden', true);
  this.addReservationPage.setAttribute('hidden', true);
  this.editReservationPage.setAttribute('hidden', true);
  this.addRoomPage.setAttribute('hidden', true);
  this.editRoomPage.setAttribute('hidden', true);
 } else {
  this.dashboardPage.setAttribute('hidden', true);
  this.usersPage.setAttribute('hidden', true);
  this.profilePage.removeAttribute('hidden');
  this.reservationsPage.setAttribute('hidden', true);
  this.roomsPage.setAttribute('hidden', true);
  this.addReservationPage.setAttribute('hidden', true);
  this.editReservationPage.setAttribute('hidden', true);
  this.addRoomPage.setAttribute('hidden', true);
  this.editRoomPage.setAttribute('hidden', true);
 }

}

myRoomReservation.prototype.reservationShowPages = function () {

 if(userAdmin) {
  this.dashboardPage.setAttribute('hidden', true);
  this.usersPage.setAttribute('hidden', true);
  this.profilePage.setAttribute('hidden', true);
  this.reservationsPage.removeAttribute('hidden');
  this.roomsPage.setAttribute('hidden', true);
  this.addReservationPage.setAttribute('hidden', true);
  this.editReservationPage.setAttribute('hidden', true);
  this.addRoomPage.setAttribute('hidden', true);
  this.editRoomPage.setAttribute('hidden', true);
 } else {
  this.dashboardPage.setAttribute('hidden', true);
  this.usersPage.setAttribute('hidden', true);
  this.profilePage.setAttribute('hidden', true);
  this.reservationsPage.removeAttribute('hidden');
  this.roomsPage.setAttribute('hidden', true);
  this.addReservationPage.setAttribute('hidden', true);
  this.editReservationPage.setAttribute('hidden', true);
  this.addRoomPage.setAttribute('hidden', true);
  this.editRoomPage.setAttribute('hidden', true);
 }

}

myRoomReservation.prototype.announcementShowPages = function () {

 if(userAdmin) {
  this.dashboardPage.setAttribute('hidden', true);
  this.usersPage.setAttribute('hidden', true);
  this.profilePage.setAttribute('hidden', true);
  this.reservationsPage.setAttribute('hidden', true);
  this.roomsPage.setAttribute('hidden', true);
  this.addReservationPage.setAttribute('hidden', true);
  this.editReservationPage.setAttribute('hidden', true);
  this.addRoomPage.setAttribute('hidden', true);
  this.editRoomPage.setAttribute('hidden', true);
 } else {
  this.dashboardPage.setAttribute('hidden', true);
  this.usersPage.setAttribute('hidden', true);
  this.profilePage.setAttribute('hidden', true);
  this.reservationsPage.setAttribute('hidden', true);
  this.roomsPage.setAttribute('hidden', true);
  this.addReservationPage.setAttribute('hidden', true);
  this.editReservationPage.setAttribute('hidden', true);
  this.addRoomPage.setAttribute('hidden', true);
  this.editRoomPage.setAttribute('hidden', true);
 }

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
  announcementsRef = this.firestore.collection("announcements");
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
    this.userNameHead.innerHTML = user.displayName;
    this.profilePicHead.setAttribute('src', user.photoURL);
    this.dashboardPage.removeAttribute('hidden');
    this.usersPage.setAttribute('hidden', true);
    this.profilePage.setAttribute('hidden', true);
    this.reservationsPage.setAttribute('hidden', true);
    this.roomsPage.setAttribute('hidden', true);
    this.addReservationPage.setAttribute('hidden', true);
    this.editReservationPage.setAttribute('hidden', true);
    this.addRoomPage.setAttribute('hidden', true);
    this.editRoomPage.setAttribute('hidden', true);
    
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
      userAdmin = checkAdmin(user);
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

//reserved rooms list
function listReservedRooms(user, admin) {
	var dateToday = new Date();
	console.log("Load list of rooms...");
	if(admin) { //for admins
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
                          "<td><span class='text-success'><a href='#' class='waves-effect' onclick='editReservation(\"" + roomDetails.id + "\")'><i class='fa fa-edit' aria-hidden='true' title='Edit Reservation'></i></a><br>" +
                          "<a href='#' class='waves-effect' onclick='cancelReservation(\"" + roomDetails.id + "\")'><i class='fa fa-trash-o' aria-hidden='true' title='Delete Reservation'></i></a></span></td></tr>"
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
		var listAllReserved = reservedListRef.where("reservedSchedule.from", ">=", dateToday).where("status", "==", "reserved").orderBy("reservedSchedule.from", "desc")
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
                          "<td><span class='text-success'><a href='#' class='waves-effect' onclick='editReservation(\"" + roomDetails.id + "\")'><i class='fa fa-edit' aria-hidden='true' title='Edit Reservation'></i></a><br>" +
                          "<a href='#' class='waves-effect' onclick='cancelReservation(\"" + roomDetails.id + "\")'><i class='fa fa-trash-o' aria-hidden='true' title='Delete Reservation'></i></a></span></td></tr>"
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

//list users
function listUsers(user, admin) {
  console.log("Load list of users...");
  if(admin) { //for admins
    var listAllUsers = usersRef.orderBy("name")
    .onSnapshot(function(list) {
          $('#list_users').empty();
          if(list && list.size > 0) {
              var count = 0; 
                list.forEach(function(users) {
                  if(users.data().userId != user.uid) {
                    count += 1;
                    if(users.data().admin) {
                      $('#list_users').append($('<tr>',{
                          html: "<td>" + count + "</td>" + 
                          "<td>" + users.data().name + "</td>" +
                          "<td>" + users.data().email + "</td>" +
                          "<td style='width: 10% !important'><label class='container'>Admin<input type='checkbox' checked='checked' onchange='changeRole(\"" + users.data().userId + "\")'><span class='checkmark'></span></label></td></tr>"
                      }));
                    } else {
                      $('#list_users').append($('<tr>',{
                          html: "<td>" + count + "</td>" + 
                          "<td>" + users.data().name + "</td>" +
                          "<td>" + users.data().email + "</td>" +
                          "<td style='width: 10% !important'><label class='container'>Admin<input type='checkbox' onchange='changeRole(\"" + users.data().userId + "\")'><span class='checkmark'></span></label></td></tr>"
                      }));
                    }
                  }
                })
            console.log("Users list query completed!");
          }
      });
  }
}

//list rooms
 function listRooms(admin) {
  console.log("Load list of rooms...");
    var listAllRooms = roomsRef.orderBy("name")
    .onSnapshot(function(list) {
          $('#list_rooms').empty();
          if(list) {
              var count = 0; 
                list.forEach(function(rms) {
                  count += 1;
                  var available = "No";
                  if(rms.data().available) {
                    available = "Yes";
                  }
                  if(admin) {
                    $('#list_rooms').append($('<tr>',{
                        html: "<td>" + rms.data().name + "</td>" + 
                        "<td>" + rms.data().floor + "</td>" +
                        "<td>" + available + "</td>" +
                        "<td>" + rms.data().capacity + "</td>" +
                        "<td>" + rms.data().equipments + "</td>" +
                        "<td class='cil-md-1'><span class='text-success'><a href='#' class='waves-effect' onclick='editRoom(\"" + rms.id + "\")'><i class='fa fa-pencil-square-o fa-fw' aria-hidden='true' title='Edit Room'></i></a></span></td>" +
                        "<td class='cil-md-1'><span class='text-success'><a href='#' class='waves-effect' onclick='deleteRoom(\"" + rms.id + "\")'><i class='fa fa-trash-o fa-fw' aria-hidden='true' title='Delete Room'></i></a></span></td></tr>"
                    }));
                  } else {
                    $('#list_rooms').append($('<tr>',{
                        html: "<td>" + rms.data().name + "</td>" + 
                        "<td>" + rms.data().floor + "</td>" +
                        "<td>" + available + "</td>" +
                        "<td>" + rms.data().capacity + "</td>" +
                        "<td>" + rms.data().equipments + "</td></tr>"
                    }));
                  }
                })
            console.log("Rooms list query completed!");
          }
      });
 }

//check user if admin
function checkAdmin(user) {
  var checkUserAdmin = usersRef.doc(user.uid).get()
  .then(function(doc) {
    console.log("Check Admin: ", doc.data().admin);
    listReservedRooms(user, doc.data().admin);
    listUsers(user, doc.data().admin);
    listRooms(doc.data().admin);
  }).catch(err => {
    console.error("Error checking admin: ", err);
  });
}

//change user role
function changeRole(userId) {
  console.log("Changing role...");
  var userRoleRef = usersRef.doc(userId).get().then(function(usr) {
    var isUserAdmin = usr.data().admin;
    var addAdmin = true;
    if(isUserAdmin) {
      addAdmin = false;
    }

    usersRef.doc(userId).update({
      admin: addAdmin
    }).then(() => {
      console.log("User role changed.");
    }).catch(err => {
      console.error("Error changing role: ", err);
    });

  }).catch(err => {
    console.error("Fetching user for role changes failed: ", err);
  });
  
}

//cancelling of reservation
function cancelReservation(reservationId) {
  var cancelReservedRoom = reservedListRef.doc(reservationId).delete()
  .then(() => {
    console.log("Cancelation successful.");
  }).catch(err => {
    console.error("Reservation cancelation failed: ", err);
  });
}

//room deletion
function deleteRoom(roomId) {
  var deleteRoom = roomsRef.doc(roomId).delete()
  .then(() => {
    console.log("Room deleted successfully.");
  }).catch(err => {
    console.error("Room deletion failed: ", err);
  });
}

//announcement deletion
function deleteAnnouncement(announcementId) {
  var deleteAnnouncement = announcementsRef.doc(announcementId).delete()
  .then(() => {
    console.log("Announcement deleted successfully.");
  }).catch(err => {
    console.error("Announcement deletion failed: ", err);
  });
}

//change rool availability
function changeRoomAvailability(roomId) {
  var userRoleRef = roomsRef.doc(roomId).get().then(function(rm) {

    var isRoomAvailable = rm.data().available;
    var roomAvailable = false;
    if(!isRoomAvailable) {
      roomAvailable = true;
    }

    roomsRef.doc(roomId).update({
      available: roomAvailable
    }).then(() => {
      console.log("Room availability has been changed.");
    }).catch(err => {
      console.error("Error changing room availability: ", err);
    });
  }).catch(err => {
    console.error("Fetching room for availability changes failed: ", err);
  });
  
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