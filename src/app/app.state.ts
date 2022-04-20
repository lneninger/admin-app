import { UserStateModel } from './main/services/user/user.models';
import {  TelephonyStateModel } from './main/services/telephony/states/telephony.models';
import { CurrentRoleStateModel, AuthStateModel } from './main/services/user/auth.models';
import { AppConfigStateModel } from './shared/layout/states/appconfig.state';


export interface AppStateModel {
  authState: AuthStateModel;
  appConfigState: AppConfigStateModel;
  userState: UserStateModel;
  currentRoleState: CurrentRoleStateModel;
  telephonyState: TelephonyStateModel;

}
