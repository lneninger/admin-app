import { PermissionValues } from './permission.model';

export interface AuthStateModel {
  permissions?: PermissionValues[];
  rememberMe?: boolean;
  token?: string;
  user?: UserModel;


  app_currentrole?: CurrentRoleStateModel;
}


export class UserLogin {
  constructor(userName?: string, password?: string, rememberMe?: boolean) {
    this.userName = userName;
    this.password = password;
    this.rememberMe = rememberMe;
  }

  userName: string;
  password: string;
  rememberMe: boolean;
}

export class UserModel {
  id: number;
  sub: string;
  name: string;
  userName: any;
  email: any;
  firstName: any;
  lastName: any;
  fullName: string;
  jobTitle: string;
  phoneNumber: string;
  roles: any[];
  isEnabled: boolean;

  constructor(input: Partial<UserModel>) {
    Object.assign(this, input);
  }
}


export class User {
  // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
  constructor(
    id?: string,
    userName?: string,
    fullName?: string,
    email?: string,
    jobTitle?: string,
    phoneNumber?: string,
    roles?: string[]
  ) {

    this.id = id;
    this.userName = userName;
    this.fullName = fullName;
    this.email = email;
    this.jobTitle = jobTitle;
    this.phoneNumber = phoneNumber;
    this.roles = roles;
  }


  get friendlyName(): string {
    let name = this.fullName || this.userName;

    if (this.jobTitle) {
      name = this.jobTitle + ' ' + name;
    }

    return name;
  }


  public id: string;
  public userName: string;
  public fullName: string;
  public email: string;
  public jobTitle: string;
  public phoneNumber: string;
  public isEnabled: boolean;
  public isLockedOut: boolean;
  public roles: string[];
}


export interface CurrentRoleStateModel {
  currentRole: string;
}

export interface IRouteData {
  title?: string;
  allowedRoles?: RoleNames[];
}


export class Role {
  constructor(name?: RoleNames);
  constructor(nameOrObj?: any) {
    if (typeof nameOrObj === 'string') {
      this.name = nameOrObj as RoleNames;
    } else {
      const role = nameOrObj as Role;
      this.name = role.name;
    }
  }
  public name: RoleNames;

  inRole(...args: string[]) {
    return this.internalInRole(args);
  }

  inRoles(args: string[]) {
    return this.internalInRole(args);
  }

  private internalInRole(args: string[]) {
    const array = args as string[];
    return this.name.toUpperCase() === 'ADMIN' || args.some(roleItem => roleItem.toUpperCase() === this.name.toUpperCase());
  }
}


export type RoleNames = 'Admin' | 'Screener' | 'Advocate' | 'Member' | 'QualityAssurance' | 'Tester';


export class RoleList {
  static Administrator: RoleNames = 'Admin';
  static Screener: RoleNames = 'Screener';
  static Advocate: RoleNames = 'Advocate';
  static Member: RoleNames = 'Member';
  static Tester: RoleNames = 'Tester';
  static QualityAssurance: RoleNames = 'QualityAssurance';
}

