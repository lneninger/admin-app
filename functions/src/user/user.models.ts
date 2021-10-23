

export interface IUserCreate {
  photoUrl: string | null | undefined;
  displayName: string | null | undefined;
  phoneNumber: string | null | undefined;
  email: string;
  password: string;
}

export interface IUserExists {
  phoneNumber: string;
  email: string;
}
