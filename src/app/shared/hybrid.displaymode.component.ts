import { AfterViewInit, Directive, HostBinding, Input, OnDestroy } from '@angular/core';

import { BaseComponent } from './base.component';
import { ComponentDisplayMode } from './general.models';

@Directive()
export abstract class HybridDisplayModeComponent extends BaseComponent implements AfterViewInit, OnDestroy {

  @Input() displayMode: ComponentDisplayMode = ComponentDisplayMode.Component;
  @HostBinding('class.h-max') get hostClasses(){
    return this.isDialog;
  }
  isDialog: boolean;

  ngAfterViewInit() {

  }

}
