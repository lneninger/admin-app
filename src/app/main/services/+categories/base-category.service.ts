import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { MemberStateModel } from './../member/states/member.models';
import { MemberState } from './../member/states/member.state';
import { CaseService } from './../case/case.service';
import { Actions, State, Store, ofActionCompleted, Action, StateContext, Selector } from '@ngxs/store';
import { SetMemberBase64Action } from '../member/states/member.state';
import { BaseCategoryStateModel } from './base-category.models';
import produce from 'immer';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { BaseCategoryState } from './base-category.state';
import { Computed, DataAction } from '@ngxs-labs/data/decorators';

export class InitializeAction {
  static readonly type = '[Category] Initialize';
  constructor(public categoryName: string, public iconFontSet?: string, public icon?: string) { }
}

export class GetCurrentCaseAction {
  static readonly type = '[Category] GetCurrentCase';
  constructor(public base64: string, public productCategoryName: string) {

  }
}

// @State<BaseCategoryStateModel>({
//   name: 'baseCategoryState',
//   defaults: {
//     categoryName: null,
//     currentCase: null
//   }
// })
export class BaseCategoryService extends NgxsDataRepository<BaseCategoryStateModel> {


  @Computed()
  get notifications() {
    const globalMemberState = this.store.selectSnapshot<MemberStateModel>(MemberState.state);
    return globalMemberState.notifications && globalMemberState.notifications.getNotificationsByCategory(this.internalCategoryName);
  }

  get categoryName() {
    return this.internalCategoryName;
  }



  constructor(
    public repository: BaseCategoryState,
    public internalCategoryName: string,
    public iconFontSet: string,
    public icon: string,
    protected store: Store,
    protected actions$: Actions,
    protected caseService: CaseService
  ) {
    super();

    // debugger;
    this.actions$.pipe(ofActionCompleted(SetMemberBase64Action)).subscribe(completion => {
      // debugger
      const base64 = (completion.action as SetMemberBase64Action).base64;
      this.repository.store.dispatch(new GetCurrentCaseAction(base64, this.internalCategoryName));
    });

  }

  @Action(GetCurrentCaseAction)
  async getCurrentCase(ctx: StateContext<BaseCategoryStateModel>, action: GetCurrentCaseAction) {
    const state = await this.caseService.getCurrent(action.base64, action.productCategoryName).toPromise();

    ctx.setState(produce(ctx.getState(), (draft: BaseCategoryStateModel) => {
      draft.currentCase = state;
    }));
  }

}
