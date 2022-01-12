import { LazyLoaderDirective } from './lazy-loader.directive';
import { SimpleChanges } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { delay, filter } from 'rxjs/operators';

export function LazyLoader() {
    return (constructor: Function) => {
        constructor.prototype._lazyComponentDirectives$ = new BehaviorSubject<LazyLoaderDirective[]>(null);
        constructor.prototype._lazyComponentDirectives = [];


        let val;
        const propertyName = 'lazyComponentDirectives';
        const originalDescriptor = Object.getOwnPropertyDescriptor(constructor, propertyName);
        Object.defineProperty(constructor, propertyName, {

            set(value) {
                this._lazyComponentDirectives = value && value.toArray();
                if (this._lazyComponentDirectives) {
                    this._lazyComponentDirectives$.next(this._lazyComponentDirectives);
                }
            },
        });


        constructor.prototype.$lazyLoaderListener = () => {

            const directives: BehaviorSubject<LazyLoaderDirective[]> = this._lazyComponentDirectives$;
            this.lazyLoadContent$$ = combineLatest([directives.asObservable()])
                .pipe(filter(([directivesElements]) => (!!directivesElements && directivesElements.length > 0)), delay(0))
                .subscribe(async ([lazyComponentDirectives]) => {

                    for (const directive of lazyComponentDirectives) {
                        if (directive && directive.appLazy) {
                            await this.lazyLoaderService.load(`${directive.appLazy}`, directive.viewContainerRef, directive.metadata);
                        }
                    }
                });
        }
    };
}
