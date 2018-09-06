const functions = require('firebase-functions');

const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "testfirebaseacct@gmail.com",
    pass: "firebasetestaccount",
  },
});

// Your company name to include in the emails
const APP_NAME = 'skedME';

//Trigger to send welcome email to newly registered user
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {

  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.

  return sendWelcomeEmail(email, displayName);
});

//Trigger to send an invitation email to all participants upon creation of reservation.
exports.sendInvitation = functions.firestore
    .document('/reservations/reservationDetails/reservedList/{emailList}').onCreate((snap, context) => {

      const entry = snap.data();
      const attachments = entry.attachments;
      const creationTime = entry.created;
      const description = entry.description;
      const reservedBy = entry.reservedBy;
      const reservedSchedule = entry.reservedSchedule;
      const reservedRoom = entry.room;
      const status = entry.status;
      const title = entry.title;
      const guests = entry.guests;
      const optionalGuests = entry.optionalGuests;
      var guestList = null;

      if(optionalGuests){
       guestList = guests+","+optionalGuests;
      } else {
       guestList = guests;
     }
    return sendInvitationEmail(guestList,attachments,reservedBy,reservedSchedule,reservedRoom,title,description);
  });

// Implements the logic for sending the welcome email
async function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
      from: 'skedMe Team <noreply@firebase.com>',
      to: email,
    };
    //
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}!
    \nThanks for signing up, We're happy to have you!
    \nIf you haven't signed up, please ignore this email.
    \nCheers,
    \nThe skedMe Team`;
    await mailTransport.sendMail(mailOptions);
    return console.log('Welcome Email sent to:', email);
  }

// Implements the logic for sending the invitation email
async function sendInvitationEmail(guestList,attachments,reservedBy,reservedSchedule,reservedRoom,title,description) {
    const mailOptions = {
      from: 'skedMe Team <noreply@firebase.com>',
      to: guestList,
    };
    //
    mailOptions.subject = `Room ${reservedRoom || ''} reserved by ${reservedBy || ''} on ${reservedSchedule || ''} `;
    mailOptions.text = `Hey there,
    \nYou've received this email as you, or someone else on behalf of you, had reserved a room through ${APP_NAME}
    \nPlease see the details below:
    \nTopic: ${title}
    \nDescription: ${description}
    \nRoom Reserved: ${reservedRoom}
    \nReserved by: ${reservedBy}
    \nReserved Schedule: ${reservedSchedule}
    \nAttachments: ${attachments}
    \n Cheers,
    \n The skedMe Team`;
    await mailTransport.sendMail(mailOptions);
    return console.log('Invitation Emails sent to:', guestList);
  }
