
import * as admin from 'firebase-admin';
import { vitae1 } from './mocker.models';



export const initializeInterviews = async (): Promise<void> => {
const firestore = admin.firestore();
console.log('Trace: Interview start');
  if ((await firestore.collection('app-interview-definitions').limit(1).get()).size === 0) {
    console.trace('Trace: Interview running');
    try {
      const interviews = firestore.collection('app-interview-definitions');
      // BASIC
      await interviews.doc('vitae1').set(vitae1);
    } catch (ex) {
      console.error(ex);
    }
  }
  console.log('Trace: Interview end');
}
