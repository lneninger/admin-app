import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


export async function logHttp(req: functions.https.Request, res: functions.Response, category: string, func: () => Promise<any>): Promise<void> {
  const reqBody = req.body.data;
  let resBody: { [key: string]: any } = {};
  try {
    resBody = await func();
  } finally {

    const document = {
      category,
      url: req.url,
      reqBody,
      resBody
    };

    admin.firestore().collection('/functions-log').add(document);

  }
}
