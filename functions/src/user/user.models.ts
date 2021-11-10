

export interface IUserMetadata {
  displayName: string | null | undefined;
  phoneNumber: string | null | undefined;
}

export interface IUserExists {
  phoneNumber: string;
  email: string;
}

export interface IUserAddRole{
  uid: string;
  role: string;
}

export interface IUserClaims{
  roles: string[];
}
