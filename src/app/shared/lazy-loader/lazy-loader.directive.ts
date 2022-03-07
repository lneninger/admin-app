import { Directive, ViewContainerRef, Input, OnDestroy, InjectionToken, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appLazy],[app-lazy]'
})
export class LazyLoaderDirective implements OnDestroy {




  get setLoading() {
    return this.internalSetLoading.bind(this);
  }

  @Input()
  appLazy: string;

  @Input('appLazyData')
  metadata: any;

  @Input('appLazyDefault')
  default: string;

  @Output('appLazyLoading')
  loading = new EventEmitter<boolean>();

  constructor(public viewContainerRef: ViewContainerRef) {

  }

  internalSetLoading(loading: boolean) {
    this.loading.next(loading);
  }

  ngOnDestroy() {
    this.viewContainerRef.clear();
  }

}
