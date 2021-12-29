export interface IConfig{
  gmail: {
    password: string;
    email: string;
  },
  stripe:{
    publicKey: string;
    secretKey: string;
  },
  plaid: {
    clientId: string;
    secret: string;
  }
}
