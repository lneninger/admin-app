export interface IConfig{
  gmail: {
    password: string;
    email: string;
  },
  stripe:{
    apiVersion: '2020-08-27',
    publicKey: string;
    secretKey: string;
  },
  plaid: {
    clientId: string;
    secret: string;
  }
}
