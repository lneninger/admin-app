export interface IConfig {
  environment: {
    apptitle: string;
    production: boolean;
    referer: string | string[];
  },
  gmail: {
    password: string;
    email: string;
  },
  stripe: {
    apiversion: '2020-08-27',
    publickey: string;
    secretkey: string;
    webhookdomain: string;
  },
  plaid: {
    clientid: string;
    secret: string;
    publickey: string;
    environment: string;
  }
}
