
  export interface ICurrentRole{
    currentRole?: string;
  }
export interface IUserMetadata extends ICurrentRole{
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

export interface IRole{
  name: string;
}
export interface IUserRole{
  userId: string;
  roleId: string;
}


export interface ISetCurrentRole{
  name: string;
}
