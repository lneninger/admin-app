// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appTitle: 'My HCare',
  hmr: true,

  // app
  appVersion: '1.0.0',
  // apiBaseUrl: 'https://localhost:5001/',
  apiBaseUrl: 'http://localhost:6099/firebase-adminsys-20210823/us-central1/',

  uploadUrl: 'https://localhost:44350/api/uploads/write',

  useStorage: false,
  loginUrl: '/login',
  useEmulators: true,
  firebase: {
    apiKey: "AIzaSyBVX_mxqJJZO6gDvUJDER1jA8BL5xr6qcc",
    authDomain: "fir-adminsys-20210823.firebaseapp.com",
    projectId: "firebase-adminsys-20210823",
    storageBucket: "firebase-adminsys-20210823.appspot.com",
    messagingSenderId: "1030745001822",
    appId: "1:1030745001822:web:08f10b9fbd6d084d10c9cf"
  },
  stripeKey: 'pk_test_iOFzxDfz6HHS7YLCWKlHrzIK005l1FQE5O'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
