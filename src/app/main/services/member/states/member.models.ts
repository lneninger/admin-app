import { Genders, Language, Languages, PreIdentifiedStatus } from 'src/app/main/shared/general.models';
import { Utilities } from 'src/app/shared/common/utilities';
import { Address, MemberAddress } from '../../address/states/address.models';
import { IPhoneNumber, MemberPhone } from '../../phone/states/phone.models';

import * as moment from 'moment';

export interface MemberStateModel {
  member: MemberWrapperModel;
}

export class MemberWrapperModel {
  member: Member;
  context: MemberContext;

  constructor(input: Partial<MemberWrapperModel>) {
    this.member = new Member(input.member);
    this.context = new MemberContext(input.context, this.member);
  }
}

export class Member {
  id: string;
  mbi?: string;
  cardNumber: string;
  hContract: string;
  pBP?: string;
  source?: string;
  dateOfBirth: Date | string;
  // gender: Gender;
  gender: string;
  language: Language | string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  emailAddress: string;
  allowMail?: boolean;
  allowTelephony?: boolean;
  stateTo?: string;
  calculatedScore?: number;
  sourceFileType?: string;
  riskScore?: number;
  preIdentifiedStatus?: PreIdentifiedStatus;
  masterGroup?: string;
  isDualSpecialNeedsProgram?: boolean = null;
  primaryAddress?: Address;
  primaryPhone?: IPhoneNumber;
  fullName?: string;
  daysToBirthday?: number;
  originType?: string;
  memberType?: string;
  isPotentialVeteran?: boolean;
  isVeteran?: boolean;
  isDeceased?: boolean;
  doNotSolicit?: boolean;
  tenantMemberStatus: string;

  addresses: MemberAddress[];
  phones: MemberPhone[];
  tenantId?: string;

  constructor(input: Partial<Member>, base64?: string) {
    Object.assign(this, input);


    const gender = Genders.find(item => item.value == input.gender || item.label.toUpperCase() == input.gender.toUpperCase());
    const language = Languages.find(item => input.language && (item.id == input.language.toString() || item.name == input.language.toString()));


    if (base64) {
      const parts = Utilities.splitInTwo(atob(base64), '|');
      this.tenantId = parts.firstPart;
      this.id = Utilities.splitInTwo(parts.secondPart, '|').firstPart;
    }

    this.language = language && language.id;
    this.gender = gender && gender.value;


    this.primaryAddress = input.primaryAddress && new Address(input.primaryAddress);


    this.addresses = input.addresses && (input.addresses as any[]).map(memberAddress => new MemberAddress(memberAddress));
    this.phones = input.phones && (input.phones as any[]).map(memberPhone => new MemberPhone(memberPhone));

    this.fullName = `${this.firstName} ${this.lastName}`;
    const today = moment();
    const year = today.year();
    const yearBirthday = moment(this.dateOfBirth).year(year);
    if (yearBirthday.isBefore(today)) {
      yearBirthday.year(year + 1);
    }

    const ms = yearBirthday.diff(today);
    this.daysToBirthday = Math.abs(Math.ceil(moment.duration(ms).asDays()));
  }
}

export class MemberContext {
  overview: MemberContextOverview;

  constructor(input: Partial<MemberContext>, member: Member) {
    this.overview = new MemberContextOverview(input && input.overview, member);

  }
}

export class MemberContextOverview {
  status: string;
  constructor(input: Partial<MemberContextOverview>, member: Member) {
    if (input) {
      Object.assign(this, input);

    } else {
      this.defaultOverview(member);
    }

  }
  defaultOverview(member: Member) {
    const tenantMemberStatus = member.tenantMemberStatus && member.tenantMemberStatus.toUpperCase();
    if (tenantMemberStatus !== 'INACTIVE') {
      switch (member.memberType) {
        case 'C':
          this.status = 'change';
          break;
        case 'S':
          this.status = 'suspend';
          break;
        case 'UHG':
          this.status = 'uhg';
          break;
        default:
          this.status = 'white';
          break;
      }
    } else {
      this.status = 'inactive';
    }

    this.status = this.status || 'change';

  }
}
