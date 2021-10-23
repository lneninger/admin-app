import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Stripe} from 'stripe';
import * as Cors from 'cors';
import { ICustomerInputModel } from './payment.models';
import { Observable } from 'rxjs';

const cors = Cors({ origin: true });

const stripe = new Stripe(functions.config().stripe.token, {apiVersion: '2020-08-27'});
// const currency = functions.config().stripe.currency || 'USD';

export const anonymousPayment = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <ICustomerInputModel>req.body.data;

    console.log(`Mapped to model`, data, `original body`, req.body);


    const customer: Stripe.CustomerCreateParams = {
      email: data.email,
      name: data.fullName
    };

    const response = await stripe.customers.create(customer);
    console.log('Customer Create Response:', response);

    const entityUpdate: any = {paymentId: response.id};

    await new Observable(observer => {
      admin.database().ref(`/entities/${data.entityId}`).update(entityUpdate).then(() => {
          console.info('DB saved successfully');
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
