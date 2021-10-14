import { MemberStateModel } from './main/services/member/states/member.models';
import {  TelephonyStateModel } from './main/services/telephony/states/telephony.models';
import { TenantStateModel } from './main/services/tenant/tenant.models';
import { CurrentRoleStateModel, AuthStateModel } from './main/services/user/auth.models';
import { AppConfigStateModel } from './shared/layout/states/appconfig.state';


export interface AppStateModel {
  appConfigState: AppConfigStateModel;
  tenantState: TenantStateModel;
  userState: AuthStateModel;
  currentRoleState: CurrentRoleStateModel;
  currentMemberState: MemberStateModel;
  telephonyState: TelephonyStateModel;

}
