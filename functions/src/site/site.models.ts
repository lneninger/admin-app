import { IRole } from '../user/user.models';

export interface IAppExternalConfiguration {
  roles: IRole[];
  userRoles: string[];
  modules: ISecuredModule[];
  stripe: IAppPlaidConfig;
  plaid: IAppStripeConfig;
}


export interface IAppPlaidConfig {
  publicKey: string;
  apiVersion: string;
}

export interface IAppStripeConfig {
  publicKey: string;
  environment: string;
}

export interface ISecuredModule {
  name: string;
  displayName: string;
  path: string;
  moduleClass: string;
  icon: string;
}


export interface IUserSecuredModule {
  userId: string;
  moduleId: string;
}

