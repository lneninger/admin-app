import * as functions from 'firebase-functions';
import  nodemailer = require('nodemailer');


export const onNewslettersSubscriptions = functions.database.ref('/newsletters_subscriptions/{subscriptionId}').onCreate((snapshot, context) => {

  console.log(`Executing onNewslettersSubscriptions cloud function`);
  console.log(functions.config());
  const gmailEmail = encodeURIComponent(functions.config().gmail.email);
  const gmailPassword = encodeURIComponent(functions.config().gmail.password);
  const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);


  const subscription = snapshot.val();

  const mailOptions = {
    to: subscription.email,
    subject: `Subscription received`,
    html: `We received your subscription of our newsletters`
  };

  return mailTransport.sendMail(mailOptions).then(() => console.log(`Mail sent to: ${subscription.email}`));

});