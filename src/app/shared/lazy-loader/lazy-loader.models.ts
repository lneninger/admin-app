import { NgModuleFactory, Type } from '@angular/core';

export interface ILazyLoadContext<T extends object> {
    customView?: string;
    customViewMetadata?: T;
}

export declare type LoadChildrenType = () => Promise<NgModuleFactory<any> | Type<any>>;
