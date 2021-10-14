import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Stripe} from 'stripe';
import * as Cors from 'cors';
import { IPaymentInputModel } from './payment.models';
import { Observable } from 'rxjs';

const cors = Cors({ origin: true });

const stripe = new Stripe(functions.config().stripe.token, {apiVersion: '2020-08-27'});
const currency = functions.config().stripe.currency || 'USD';

export const anonymousPayment = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <IPaymentInputModel>req.body.data;

    console.log(`Mapped to model`, data, `original body`, req.body);

    //const token = data.source;

    const intent: Stripe.PaymentIntentCreateParams = {
      //source: data.source, // paymentintent token
      amount: data.amount,
      currency: currency,
      payment_method_types: ['card'],
    };


    console.log('Sending donation:', intent);

    const response = await stripe.paymentIntents.create(intent);
    console.log('Donation Response:', response);

    await new Observable(observer => {
      admin.database().ref('/payment-log').push(intent).then(() => {
          console.info('transaction saved successfully');
        observer.next();
        observer.complete();
      },
        error => {
          console.error(error);
        });
    })

    res.status(200).jsonp({ data: response });


  });



});
