import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


export async function log(req: functions.https.Request, res: functions.Response, category: string, func: () => Promise<void>): Promise<void> {
  const data = req.body.data;
  try {

    return func();
  } finally {
    const response = res.json

    const document = {
      category,
      url: req.url,
      body: data,
      response
    };

    admin.database().ref('/functions-log').push(document);

  }
}
