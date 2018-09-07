// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

// Add the public key generated from the console here.
messaging.usePublicVapidKey("BKK_C2FftO7qWMtSqbC3qgS3eIDJkD9NwvzJBAyfbA9wtX4qGE-r3fjTIaN59fmZw5Jep1gqZlPbMqA8Pqdxcb4");

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(refreshedToken) {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false);
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        // ...
        console.log("refreshedToken",refreshedToken);
    }).catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
        showToken('Unable to retrieve refreshed token ', err);
    });
});

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
    // ...
});

messaging.requestPermission().then(function() {
    console.log('Notification permission granted.');
    retrieveToken();
    }).catch(function(err) {
    console.log('Unable to get permission to notify.', err);
});

function retrieveToken() {
// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then(function(currentToken) {
    if (currentToken) {
        // sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
        sendTokenToServer(currentToken);
        console.log("current token: ", currentToken);
    } else {
            // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            // updateUIForPushPermissionRequired();
            // setTokenSentToServer(false);
            messaging.requestPermission().then(function() {
                console.log('Notification permission granted.');
                retrieveToken();
                }).catch(function(err) {
                console.log('Unable to get permission to notify.', err);
            });
            
        }
    }).catch(function(err) {
            console.log('An error occurred while retrieving token. ', err);
            // showToken('Error retrieving Instance ID token. ', err);
            // setTokenSentToServer(false);
        });
}


function sendTokenToServer(token) {


}