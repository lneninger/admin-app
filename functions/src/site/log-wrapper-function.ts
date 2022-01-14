import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import firebase from 'firebase/app';


export async function logHttp(req: functions.https.Request, res: functions.Response, category: string, func: () => Promise<any>): Promise<void> {
  const reqBody = req.body.data;
  let resBody: { [key: string]: any } = {};
  try {
    resBody = await func();
  } finally {

    const user = firebase.auth().currentUser;

    const document = {
      userId: user?.uid,
      user: user?.email,
      category,
      url: req.url,
      reqBody,
      resBody,
      date: new Date()
    };

    admin.firestore().collection('/functions-log').add(document);

  }
}
