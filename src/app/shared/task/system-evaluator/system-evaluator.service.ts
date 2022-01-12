import { TelephonyService } from 'src/app/services/telephony/telephony.service';
import { TelephonyStateModel } from './../../telephony/telephony.state.models';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Utilities } from 'src/app/services/utilities';

import { AppStateModel } from '../../+redux/redux.models';
import { MemberStateModel } from '../../member/member.models';
import { TelephonyFormattedQueryParams } from '../../telephony/telephony.state.models';
import { Telephony } from 'src/app/models/telephony';


@Injectable({
    providedIn: 'root'
})
export class SystemEvaluatorService {
    internalEvaluator = new SystemEvaluatorInternalService();

    get user() {
        return {
            role: this.store.selectSnapshot<string>((state: AppStateModel) => state.roleState.currentRoleName)
        }
    }

    get member() {
        const memberState = this.store.selectSnapshot<MemberStateModel>((state: AppStateModel) => state.memberState);
        return {
            id: memberState.memberId,
            base64: memberState.base64,
            tenant: {
                id: memberState.tenantId,
            },
            oncall: memberState.memberContext.metadata.onCall,
            sessionStatus: memberState.sessionStatus
        }
    }

    get screener() {
        const telephonyParams = this.store.selectSnapshot<TelephonyFormattedQueryParams>((state: AppStateModel) => state.telephonyQueryParamsState && state.telephonyQueryParamsState.formattedQueryParams);
        //#region no params
        const noScreenerParams = !!telephonyParams && Utilities.allPropertiesAreUnset(telephonyParams);
        //#endregion
        //#region pending params
        const pendingParams = !!telephonyParams && ((telephonyParams.direction === 'OUTBOUND' && telephonyParams.reasonId != null) || (telephonyParams.direction == 'INBOUND' && telephonyParams.originId != null)) && telephonyParams.tenantId != null;
        //#endregion

        let status: string;
        if (noScreenerParams) {
            status = 'empty';
        } else if (pendingParams) {
            status = 'partial';
        } else {
            status = 'full';
        }

        const telephonyState = this.store.selectSnapshot<TelephonyStateModel>((state: AppStateModel) => state.telephonyState)
        let context: Telephony;
        if (telephonyState.memberSession) {
            if (telephonyState.memberSession.memberGroupHash) {
                context = TelephonyService.getContextByMemberGroupHash(telephonyState.contexts, telephonyState.memberSession.memberGroupHash);
            } else {
                context = TelephonyService.getContextByIdentifier(telephonyState.contexts, (telephonyState.memberSession.identifier));
            }
        }

        return {
            status,
            direction: telephonyParams && telephonyParams.directionValue,
            inputorigin: telephonyParams && telephonyParams.origin,
            inputreason: telephonyParams && telephonyParams.reason,
            originid: context && context.originId,
            origin: context && context.origin,
            // originexternalid: context && context.originExternalId,
            reasonid: context && context.reasonId,
            reason: context && context.reason,
            // reasonexternalid: context && context.reasonExternalId,
            rpccompleted: context && context.rpcComplete
        }
    }

    get iteration() {
        return {
            'member-note': {
                added: false
            },
            'facilityrequest-note': {
                added: false
            }
        }
    }

    constructor(private store: Store) { }


    evaluate<T extends any = any>(expression: string): T {
        const formatted = expression.replace(/system\./g, 'this.');
        return this.internalEvaluator.runExpression.call(this, formatted) as T;
    }
}


class SystemEvaluatorInternalService {
    runExpression(expression: any) {
        try {
            return eval(expression);
        } catch (err) {
            return true;
        }
    }
}
