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
    user: testfirebaseacct@gmail.com,
    pass: firebasetestaccount,
  },
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Reservation';

// [START sendInvitation]
/**
 * Sends an invitation email to participants upon creation of reservation.
 */

exports.sendInvitation = functions.firestore
    .document('test/{email}').onCreate((snap, context) => {
      const email = snap.get('email');
      const displayName = snap.get('displayName'); // The display name of the user.
    });
    return sendInvitationEmail(email, displayName);
  });
//[END sendInvitation]

//[START sendInvitationEmail]
/**
 * Sends the invitation email to the participants
 */
  async function sendInvitationEmail(email, displayName) {
    const mailOptions = {
      from: '${APP_NAME} <noreply@firebase.com>',
      to: email,
    };

    //
    mailOptions.subject = 'Welcome to ${APP_NAME}!';
    mailOptions.text = 'Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.';
    await mailTransport.sendMail(mailOptions);
    return console.log('Email sent to:', email);
  }
