
export interface NavigationItem {
  id?: string;
  icon?: string;
  fontSet?: string;
  label?: string;
  routerLink?: any;
  type?: 'divider';
  bottom?: boolean;
}

export class NavigationItemInputComplex {
  id: string;
  disabled: boolean | BooleanFunc;
}

export type NavigationItemInput = string | NavigationItemInputComplex;

export type BooleanFunc = () => boolean;

export declare type PatchTypeFunction = (item: NavigationItem) => Partial<NavigationItem>;
export declare type PatchType = Partial<NavigationItem> | PatchTypeFunction;
