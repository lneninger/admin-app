// run
// firebase functions:config:get > .runtimeconfig.json

import * as admin from 'firebase-admin';

admin.initializeApp();

export * from './site/index';
export * from './stripe/index';
export * from './user/index';





