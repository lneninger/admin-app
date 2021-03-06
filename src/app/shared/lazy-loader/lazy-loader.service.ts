import { Injectable, Injector, Compiler, Inject, NgModuleFactory, Type, ViewContainerRef, InjectionToken, InjectFlags, QueryList, NgZone } from '@angular/core';
import { LAZY_WIDGETS } from './tokens';


/** Injection token that can be used to access the data that was passed in to a dialog. */
export const DYNAMIC_DATA = new InjectionToken<any>('DynamicComponentData');

export class DynamicConfig<T> {
    data: T;
}

export class LazyLoaderInjector implements Injector {
    constructor(
        private parentInjector: Injector,
        private additionalTokens: WeakMap<any, any>
    ) { }

    get<T>(
        token: Type<T> | InjectionToken<T>,
        notFoundValue?: T,
        flags?: InjectFlags
    ): T;
    get(token: any, notFoundValue?: any);
    get(token: any, notFoundValue?: any, flags?: any) {
        const value = this.additionalTokens.get(token);

        if (value) {
            return value;
        }

        return this.parentInjector.get<any>(token, notFoundValue);
    }
}



@Injectable({
    providedIn: 'root'
})
export class LazyLoaderService {

    constructor(
        private injector: Injector,
        private compiler: Compiler,
        @Inject(LAZY_WIDGETS) private lazyWidgets: { [key: string]: () => Promise<NgModuleFactory<any> | Type<any>> },
        private zone: NgZone
    ) { }

    async load(name: string, container: ViewContainerRef, dataToken?: any, data?: any) {
        // debugger;
        if (container.length === 0) {
            const tempModule = await this.lazyWidgets[name]();

            let moduleFactory;

            if (tempModule instanceof NgModuleFactory) {
                // For AOT
                moduleFactory = tempModule;
            } else {
                // For JIT
                moduleFactory = await this.compiler.compileModuleAsync(tempModule);
            }

            let moduleRef: any;
            const entryComponent = (moduleFactory.moduleType as any).entry;

            if (data) {
                const map = new WeakMap<any, any>();
                map.set(dataToken, data);
                moduleRef = moduleFactory.create(new LazyLoaderInjector(this.injector, map));
            } else {
                moduleRef = moduleFactory.create(this.injector);
            }

            const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);

            container.clear();
            container.createComponent(compFactory, undefined, this.injector);
            // setTimeout(() => {
            //   this.zone.run(_ => {});
            //   this.document.
            // });
        }
    }



}
