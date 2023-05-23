# Website

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Configuring Cloud Functions

### sendEmailNotification

firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY"
firebase functions:config:set email.recipient="YOUR_EMAIL_ADDRESS"
firebase deploy --only functions
