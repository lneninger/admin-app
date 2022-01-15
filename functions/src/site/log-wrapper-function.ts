import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import firebase from 'firebase/app';


export async function logHttp(req: functions.https.Request, res: functions.Response, category: string, func: () => Promise<any>): Promise<void> {
  const reqBody = req.body.data;
  let resBody: { [key: string]: any } = {};
  let errorResponse: any;
  try {
    resBody = await func();
  } catch (error) {
    errorResponse = error;
  } finally {

    const user = firebase.auth().currentUser;

    const document = {
      userId: user?.uid || 'N/A',
      user: user?.email || 'N/A',
      category,
      url: req.url,
      reqBody: reqBody || 'N/A',
      resBody: resBody || 'N/A',
      error: errorResponse?.message || 'N/A',
      date: new Date()
    };

    admin.firestore().collection('/functions-log').add(document);

    if (errorResponse) {
      res.status(500).json(errorResponse);
    }

  }
}
