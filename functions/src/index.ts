


// import { environment } from '../../src/environments/environment';
// run
// firebase functions:config:get > .runtimeconfig.json
import * as firebase from 'firebase/app';
import * as admin from 'firebase-admin';

firebase.initializeApp({
  // name: 'firebase-adminsys-20210823',
  apiKey: 'AIzaSyBVX_mxqJJZO6gDvUJDER1jA8BL5xr6qcc',
});

admin.initializeApp();
// admin.initializeApp();


export * from './functions.models';
export * from './_mocker/mocker';

export * from './site/index';
export * from './stripe/index';
export * from './user/index';
export * from './config/index';
export * from './azure/index';





