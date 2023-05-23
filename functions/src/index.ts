/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
import * as logger from 'firebase-functions/logger';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

admin.initializeApp();

export const sendEmailNotification = functions
  .region('europe-west1')
  .firestore.document('users/{userId}/messages/{messageId}')
  .onCreate(async (snap, context) => {
    logger.info('Sending email notification to user');
    logger.info('Message snapshot', snap.data());
    const msg = {
      to: functions.config().email.recipient,
      from: 'daniel@espino.codes', // Use your verified sender
      subject: 'New Message Notification',
      text: `New message received: ${snap.data().message}`,
    };

    sgMail.setApiKey(functions.config().sendgrid.key);
    await sgMail
      .send(msg)
      .then(() => {
        logger.info('Email notification sent successfully');
      })
      .catch((error) => {
        logger.error(error);
      });
  });
