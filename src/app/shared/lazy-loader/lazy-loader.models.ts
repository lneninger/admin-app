import { NgModuleFactory, Type } from '@angular/core';

export interface ILazyLoadContext<T extends object> {
  customView?: string;
  customViewMetadata?: T;
}

export declare type LoadChildrenType = () => Promise<NgModuleFactory<any> | Type<any>>;

export enum LazyLoadingStatus {
  default = 0,
  loading = 1,
  loaded = 2,
}
