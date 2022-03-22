import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';


export async function logHttp(req: functions.https.Request, res: functions.Response, category: string, func: () => Promise<any>): Promise<void> {
  const reqBody = req.body.data;
  let resBody: any;
  let resCallback: any;
  let errorResponse: any;
  try {
    resBody = await func();
    if (resBody?.$callBack) {
      resCallback = resBody.$callBack as (res: any) => any;
      resBody = resBody.body;
    } else {
      resBody = resBody as { [key: string]: any };
    }
  } catch (error) {
    errorResponse = error;
  } finally {

    const user = getAuth().currentUser;

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
      try {
        // res.status(500).json(errorResponse);
      } catch (error) {
        console.log('trying to set status 500', error);
      }
    } else {
      if (resCallback != null) {
        resCallback(resBody);
      }
    }

  }
}
