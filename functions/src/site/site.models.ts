import { IRole } from '../user/user.models';

export interface IAppExternalConfiguration{
  roles: IRole[];
  userRoles: string[];
  modules : ISecuredModule[];
}

export interface ISecuredModule{
  name: string;
  displayName: string;
  path: string;
  moduleClass: string;
  icon: string;
}


export interface IUserSecuredModule{
  userId: string;
  moduleId: string;
}
