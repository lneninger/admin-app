import * as functions from 'firebase-functions';
import  nodemailer = require('nodemailer');


export const onContactus = functions.firestore.document('/contactus/{contactId}').onCreate((snapshot, context) => {

  console.log('Executing onNContactus cloud function');
  console.log(functions.config());
  const emailUser = encodeURIComponent(functions.config().email.user);
  const emailPassword = encodeURIComponent(functions.config().email.password);
  const mailTransport = nodemailer.createTransport(`smtps://${emailUser}:${emailPassword}@smtp.gmail.com`);


  const data = snapshot.data();

  const toContactEmailOptions = {
    to: data.email,
    subject: 'Your message was received',
    html: 'We received your message. After review it, we\'ll contact you for further information. Thanks'
  };

  mailTransport.sendMail(toContactEmailOptions).then(() => console.log(`Mail sent to: ${data.email}`));


  const toUsEmailOptions = {
    to: emailUser,
    subject: 'Contact us received',
    html: `<ol>
            <dt>Email: </dt>
            <dd>${data.email}</dd>
            <dt>Name: </dt>
            <dd>${data.name}</dd>
            <dt>Phone: </dt>
            <dd>${data.phone}</dd>
            <dt>Message: </dt><hr/>
            <dd><pre>${data.phone}</pre></dd>
          </dl>`
  };

  mailTransport.sendMail(toUsEmailOptions).then(() => console.log(`Mail sent to: ${data.email}`));

  return;

});
