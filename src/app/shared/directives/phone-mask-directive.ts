import { Directive, HostListener } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';

@Directive({
  selector: '[formControlName][appPhoneMask],[ngModel][appPhoneMask],input[appPhoneMask],[appPhoneMask]',
})
export class PhoneMaskDirective {

  constructor(public ngControl: NgControl, private ngModel: NgModel) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }


  onInputChange(event, backspace) {
    let newVal = event.replace(/\D/g, '');
    if (backspace && newVal.length <= 6) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '($1)');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    } else {
      newVal = newVal.substring(0, 10);
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }

    this.ngControl.valueAccessor.writeValue(newVal);


    this.ngModel.viewToModelUpdate(newVal);
    this.ngModel.valueAccessor.writeValue(newVal)
  }
}
