
export interface UserStateModel {
  user: UserModel;
  app_currentrole?: CurrentRoleStateModel;
}


export class UserModel {
  id: number;
  name: string;
  userName: any;
  email: any;
  firstName: any;
  lastName: any;
  fullName: string;
  roles: any[];
}


export interface CurrentRoleStateModel {
  currentRole: string;
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
