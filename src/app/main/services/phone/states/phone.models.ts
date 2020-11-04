import { InformationSources } from 'src/app/main/shared/general.models';

export interface IPhoneNumber {
  type?: number;
  number?: string;
  extension?: string;
  source: InformationSources;
}


export class Phone implements IPhoneNumber {
  id?: number;
  memberId: string;
  type?: number;
  number?: string;
  isValid?: boolean;
  extension?: string;
  source: InformationSources;


  constructor(obj: any)
  constructor(input: Partial<Phone>) {
    Object.assign(this, input);
  }
}


export class MemberPhone {
  isPrimary?: boolean;
  phone: Phone;
  extension: string;

  constructor(input: Partial<MemberPhone>) {
    Object.assign(this, input);
    this.phone = new Phone(input.phone);
  }
}
