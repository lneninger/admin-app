
export interface ISelectorConfig {
  items: ISelectorConfigItem[];
}

export interface ISelectorConfigItem {
  identifier: string;
  label: string;
  type: SelectorConfigItemType;
  operators: string[];
  valueOptions?: ISelectorConfigItemOptionValue[];
}

export interface ISelectorConfigItemOptionValue {
  label: string;
  value: any;
}

export interface ISelectorConfigItemUserData {
  identifier: string;
  isNew?: boolean;
  editing?: boolean;
  operator?: string;
  value?: any;
}

export type SelectorConfigItemType = 'input' | 'multiSelect';
