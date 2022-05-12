export const mockedSignUp1: IUserCreateForm = {
  email: 'lneninger@hotmail.com',
  password: '123123',
  confirmPassword: '123123',
  displayName: 'Leonardo',
  phoneNumber: '+17864553456',
};

export const mockedSignUp2: IUserCreateForm = {
  email: 'lneninger@hipalanet.com',
  password: '123123',
  confirmPassword: '123123',
  displayName: 'Leonardo Hipalanet',
  phoneNumber: '+17864553456',
};

export interface IUserCreateForm {
  email: string,
  password: string,
  confirmPassword: string;
  displayName: string,
  phoneNumber: string,
  photoUrl?: string,
}
