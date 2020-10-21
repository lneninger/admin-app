import { Component, OnDestroy } from '@angular/core';

@Component({
  template: ''
})
export abstract class BaseComponent implements OnDestroy {

  ngOnDestroy(): void {
  }

}
