import { TestBed } from '@angular/core/testing';

export interface TelephonyStateModel {
  telephonySessionState?: TelephonySessionStateModel;
}

export interface TelephonySessionStateModel {
  data: TelephonySession;
}

export class TelephonySession {
  direction: string;
}
