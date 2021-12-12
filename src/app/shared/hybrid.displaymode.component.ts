import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { BaseComponent } from './base.component';
import { ComponentDisplayMode } from './general.models';

@Component({
  template: ''
})
export abstract class HybridDisplayModeComponent extends BaseComponent implements AfterViewInit, OnDestroy {

  @Input() displayMode: ComponentDisplayMode = ComponentDisplayMode.Component;
  isDialog: boolean;

  ngAfterViewInit() {

  }

}
