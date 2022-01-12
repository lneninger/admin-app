import { Directive, ViewContainerRef, Input, OnDestroy } from '@angular/core';

@Directive({
    selector: '[appLazy],[app-lazy]'
})
export class LazyLoaderDirective implements OnDestroy {

    @Input()
    appLazy: string;

    @Input('appLazyData')
    metadata: any;

    @Input('appLazyDefault')
    default: string;

    loading: boolean;

    constructor(public viewContainerRef: ViewContainerRef) {

    }

    ngOnDestroy() {
        this.viewContainerRef.clear();
    }

}
