import { LazyLoadingStatus } from './lazy-loader.models';
import { Directive, EventEmitter, Input, OnDestroy, Output, ViewContainerRef } from '@angular/core';

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
  loading = new EventEmitter<LazyLoadingStatus>();

  constructor(public viewContainerRef: ViewContainerRef) {

  }

  internalSetLoading(loading: LazyLoadingStatus) {
    this.loading.next(loading);
  }

  ngOnDestroy() {
    this.viewContainerRef.clear();
  }

}
