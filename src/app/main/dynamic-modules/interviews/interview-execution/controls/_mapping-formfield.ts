import { Type } from '@angular/core';
import { ControlTypeNames } from 'functions/src/_services/interviews/models/control-mapping';
import { CheckboxFormField } from './checkbox-formfield';
import { DateFormField } from './date-formfield';
import { InputFormField } from './input-formfield';
import { RadioListFormField } from './radiolist-formfield';
import { FormField } from './_base-formfield';


export const formFieldControlMapping = new Map<ControlTypeNames, Type<FormField>>([
  ['INPUT', InputFormField],
  ['NULLABLEBOOLEAN', CheckboxFormField],
  ['RADIOLIST', RadioListFormField],
  ['DATE', DateFormField]
]);
