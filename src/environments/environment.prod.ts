export const environment = {
  production: true,
  hmr: false,
  appTitle: 'My HCare',

  appVersion: '1.0.0',
  mockedBaseUrl: 'http://localhost:3000/',
  apiUrlNoSlash: 'https://localhost:44350',
  apiUrl: 'https://localhost:44350/',
  apiAccountUrl: 'https://us-central1-firebase-adminsys-20210823.cloudfunctions.net/account/',
  apiBaseUrl: 'https://us-central1-firebase-adminsys-20210823.cloudfunctions.net/',

  uploadUrl: 'https://localhost:44350/api/upload/write',

  tokenUrl: null as string, // For IdentityServer/Authorization Server API. You can set to null if same as baseUrl
  useStorage: false,
  loginUrl: '/login',
  useEmulators: false,
  firebase: {
    apiKey: "AIzaSyBVX_mxqJJZO6gDvUJDER1jA8BL5xr6qcc",
    authDomain: "fir-adminsys-20210823.firebaseapp.com",
    projectId: "firebase-adminsys-20210823",
    storageBucket: "firebase-adminsys-20210823.appspot.com",
    messagingSenderId: "1030745001822",
    appId: "1:1030745001822:web:08f10b9fbd6d084d10c9cf"
  },
  stripe: {
    publicKey: 'pk_test_iOFzxDfz6HHS7YLCWKlHrzIK005l1FQE5O'
  },
  plaid: {
    environment: 'production',
    publicKey: 'f2697b9b441211ed4ee92df3850108'
  }

};
