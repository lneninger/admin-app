import { Type } from '@angular/core';
import { CheckboxFormField } from './checkbox-formfield';
import { DateFormField } from './date-formfield';
import { InputFormField } from './input-formfield';
import { RadioListFormField } from './radiolist-formfield';
import { FormField } from './_base-formfield';

export declare type ControlTypeNames = 'INPUT' | 'CHECKBOX' | 'CHECKBOXLIST' | 'RADIO' | 'RADIOLIST' | 'BOOLEAN' | 'NULLABLEBOOLEAN' | 'SELECT' | 'MULTISELECT' | 'DATE' | 'DATERANGE';

export const formFieldControlMapping = new Map<ControlTypeNames, Type<FormField>>([
  ['INPUT', InputFormField],
  ['NULLABLEBOOLEAN', CheckboxFormField],
  ['RADIOLIST', RadioListFormField],
  ['DATE', DateFormField]
]);
