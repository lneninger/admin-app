

export interface IUserMetadata {
  displayName: string | null | undefined;
  phoneNumber: string | null | undefined;
}

export interface IUserExists {
  phoneNumber: string;
  email: string;
}
