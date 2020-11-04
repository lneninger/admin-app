import { InformationSources } from 'src/app/main/shared/general.models';

export interface IAddress {
  id?: number;
  memberId: string;
  type?: number;
  street1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  source?: InformationSources;

  fullAddress?: string;
}

export class MemberAddress {
  isPrimary?: boolean;
  address: Address;

  constructor(input: Partial<MemberAddress>) {
      Object.assign(this, input);
      this.address = new Address(input.address);
    }
}

export class Address implements IAddress {
  id?: number;
  memberId: string;
  type?: number;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  fullAddress?: string;
  source?: InformationSources;

  constructor(input: Partial<Address>) {
    Object.assign(this, input);
    this.fullAddress = this.formatFullAddress();

  }

  private formatFullAddress?(): string {
    let result = `${this.street1}`;
    const street2 = this.street2 && this.street2.trim();
    if (street2 && street2.length > 0) {
      result += ', ' + street2;
    }

    const city = this.city && this.city.trim();
    if (city && city.length > 0) {
      result += ', ' + city;
    }

    const state = this.state && this.state.trim();
    if (state && state.length > 0) {
      result += ', ' + state;
    }

    const postalCode = this.postalCode && this.postalCode.trim();
    if (postalCode && postalCode.length > 0) {
      if (!state || state.length === 0) {
        result += ',';
      }

      result += ' ' + postalCode;
    }

    return result;
  }
}
