import { MemberStateModel } from './main/services/member/states/member.models';
import {  TelephonyStateModel } from './main/services/telephony/states/telephony.models';
import { TenantStateModel } from './main/services/tenant/states/tenant.state';
import { CurrentRoleStateModel, UserStateModel } from './main/services/user/states/user.models';
import { AppConfigStateModel } from './shared/layout/states/appconfig.state';


export interface AppStateModel {
  appConfigState: AppConfigStateModel;
  tenantState: TenantStateModel;
  userState: UserStateModel;
  currentRoleState: CurrentRoleStateModel;
  currentMemberState: MemberStateModel;
  telephonyState: TelephonyStateModel;

}
