import { TenantStateModel } from './main/services/tenant/states/tenant.state';
import { CurrentRoleStateModel, UserStateModel } from './main/services/user/states/user.models';
import { UserState } from './main/services/user/states/user.state';
import { AppConfigStateModel } from './shared/layout/states/appconfig.state';


export interface AppStateModel {
  AppConfigState: AppConfigStateModel;
  TenantState: TenantStateModel;
  UserState: UserStateModel;
  CurrentRoleState: CurrentRoleStateModel;
}
