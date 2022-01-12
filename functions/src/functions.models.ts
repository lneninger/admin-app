export interface IConfig{
  gmail: {
    password: string;
    email: string;
  },
  stripe:{
    apiversion: '2020-08-27',
    publickey: string;
    secretkey: string;
  },
  plaid: {
    clientid: string;
    secret: string;
  }
}
