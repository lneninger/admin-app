

export interface IUserMetadata {
  displayName: string | null | undefined;
  phoneNumber: string | null | undefined;
}

export interface IUserExists {
  phoneNumber: string;
  email: string;
}

export interface IAttachRole{
  uid: string;
  role: string;
}

export interface IUserRemoveRole{
  uid: string;
  userRoleId: string;
  roleId: string;
  role: string;
}

export interface IUserClaims{
  roles: string[];
}
