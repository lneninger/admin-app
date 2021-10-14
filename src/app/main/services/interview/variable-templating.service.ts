import { UserState } from './../user/states/user.state';
import { UserModel } from '../user/auth.models';
import { MemberWrapperModel } from './../member/states/member.models';
import { MemberState } from './../member/states/member.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { UtilitiesDate } from 'src/app/shared/common/utilities.date';
import { MemberService } from '../member/member.service';
import { UserService } from '../user/user.service';

export interface IMatch {
  startIndex: number;
  length: number;
  text: string;
  fullMatch: string;
}

@Injectable({ providedIn: 'root' })
export class VariableTemplatingService {
  constructor(
    private store: Store,
    private memberService: MemberService,
    private userService: UserService) {

  }

  process(input: string): string {
    let result: string = input;
    let formatted: string = input;
    let match: IMatch;
    let searchIndex = 0;
    while (formatted) {
      // debugger;
      match = this.getNextTemplatePositions(formatted, searchIndex);
      if (match) {
        formatted = this.processsMatch(result, match);
        if (formatted) {
          result = formatted;
        } else {
          formatted = result;
          searchIndex = match.startIndex + 1;
        }
        continue;
      }

      formatted = null;
    }

    return result;
  }

  getNextTemplatePositions(input: string, startIndex: number = 0): IMatch {
    if (!input) {
      return null;
    }

    const imputSubstring = input.slice(startIndex);

    const regexp = /<(?<test>([\w\d])+\s+([\w\d])+)\>/;
    const matches = regexp.exec(imputSubstring);
    if (matches && matches.length >= 2) {
      // console.log(matches);
      // debugger;
      const matchStr = matches[0];
      const matchStrContent = matches[1];
      return { startIndex: imputSubstring.indexOf(matchStr) + startIndex, length: matchStr.length, fullMatch: matchStr, text: matchStrContent } as IMatch;
    }

    return null;
  }

  processsMatch(input: string, match: IMatch): string {
    const [component, request] = match.text.split(' ');
    let replacement: string;
    switch (component.toUpperCase()) {
      case 'MEMBER':
        replacement = this.processMember(request);
        break;
      case 'USER':
        replacement = this.processUser(request);
        break;
    }

    if (replacement) {
      return input.replace(match.fullMatch, replacement);
    }
  }

  processMember(request: string): string {
    const member = (this.store.selectSnapshot<MemberWrapperModel>(MemberState.memberWrapper)).member;
    // const member = this.memberService.member;
    if (!member) {
      return null;
    }

    switch (request.toUpperCase()) {
      case 'SOCIALSECURITY':
        return member.pBP;
      case 'BIRTHDAY':
        return UtilitiesDate.formatDate(member.dateOfBirth);
      case 'FULLNAME':
        // debugger;
        return member.fullName;
      case 'FIRSTNAME':
        // debugger;
        return member.firstName;
      case 'LASTNAME':
        // debugger;
        return member.lastName;
      case 'GENDER':
        // debugger;
        const gender = member.gender;
        return gender === 'unknown' ? '<Mr./Ms.>' : gender;

      case 'EMAIL':
        // debugger;
        let phoneNumber = member.primaryPhone && member.primaryPhone.number;
        if (phoneNumber && member.primaryPhone.extension) {
          phoneNumber += `(${member.primaryPhone.extension})`;
        }
        return phoneNumber;

      case 'PHONENUMBER':
        // debugger;
        return member.emailAddress;

      default:
        return null;
    }
  }

  processUser(request: string): string {
    const user = (this.store.selectSnapshot<UserModel>(UserState.user));
    // const user = this.userService.user;
    if (!user) {
      return null;
    }

    switch (request.toUpperCase()) {

      case 'FULLNAME':
        // debugger;
        return user.fullName;
      default:
        return null;
    }
  }
}
