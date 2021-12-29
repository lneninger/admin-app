import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Stripe } from 'stripe';
import * as Cors from 'cors';
import { ICustomerInputModel } from './payment.models';
import { firstValueFrom, Observable } from 'rxjs';

const cors = Cors({ origin: true });

const stripe = new Stripe(functions.config().stripe.secretKey, { apiVersion: '2020-08-27' });
// const currency = functions.config().stripe.currency || 'USD';

export const customerCreate = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <ICustomerInputModel>req.body.data;

    console.log(`Mapped to model`, data, `original body`, req.body);


    const customer: Stripe.CustomerCreateParams = {
      email: data.email,
      name: data.fullName
    };

    const response = await stripe.customers.create(customer);
    console.log('Customer Create Response:', response);


    // add payment id claim
    const auth = admin.auth();
    const userRecord = await auth.getUser(data.entityId);
    let claims = userRecord.customClaims || {};
    claims = { ...claims, paymentId: response.id };
    await auth.setCustomUserClaims(data.entityId, claims);


    // add payment id to entity metadata
    const entityUpdate = { paymentId: response.id };
    await admin.database().ref(`/entities/${data.entityId}`).update(entityUpdate);

    res.status(200).jsonp({ data: response });


  });



});
