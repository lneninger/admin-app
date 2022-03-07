// import { environment } from '../../src/environments/environment';
// run
// firebase functions:config:get > .runtimeconfig.json
import { initializeApp } from 'firebase/app';
// import * as admin from 'firebase-admin';

initializeApp({
  // name: 'firebase-adminsys-20210823',
  apiKey: 'AIzaSyBVX_mxqJJZO6gDvUJDER1jA8BL5xr6qcc',
});
// admin.initializeApp();


export * from './functions.models';
export * from './_mocker/mocker';

export * from './site/index';
export * from './stripe/index';
export * from './user/index';





