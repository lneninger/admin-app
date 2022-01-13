import { Directive, OnDestroy } from '@angular/core';

@Directive()
export abstract class BaseComponent implements OnDestroy {

  ngOnDestroy(): void {
  }

}
