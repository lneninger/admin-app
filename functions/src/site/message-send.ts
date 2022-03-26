import * as functions from 'firebase-functions';
import  nodemailer = require('nodemailer');


export const onNewslettersSubscriptions = functions.firestore.document('/newsletters_subscriptions/{subscriptionId}').onCreate((snapshot) => {

  console.log('Executing onNewslettersSubscriptions cloud function');
  console.log(functions.config());
  const emailUser = encodeURIComponent(functions.config().email.user);
  const emailPassword = encodeURIComponent(functions.config().email.password);
  const mailTransport = nodemailer.createTransport(`smtps://${emailUser}:${emailPassword}@smtp.gmail.com`);


  const subscription = snapshot.data();

  const mailOptions = {
    to: subscription.email,
    subject: 'Subscription received',
    html: 'We received your subscription of our newsletters'
  };

  return mailTransport.sendMail(mailOptions).then(() => console.log(`Mail sent to: ${subscription.email}`));

});
