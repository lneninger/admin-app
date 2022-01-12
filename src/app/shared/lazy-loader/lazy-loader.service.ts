import { Compiler, Inject, Injectable, InjectFlags, InjectionToken, Injector, NgModuleFactory, Type, ViewContainerRef } from '@angular/core';
import { LoadChildrenType } from './lazy-loader.models';
import { LazyLoaderDirective } from './lazy-loader.module';
import { LAZY_WIDGETS } from './tokens';


/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LAZY_COMPONENT_METADATA = new InjectionToken<any>('DynamicComponentData');

// export class DynamicConfig<T> {
//     data: T;
// }

export class LazyLoaderInjector implements Injector {
    constructor(
        private _parentInjector: Injector,
        private _additionalTokens: WeakMap<any, any>
    ) { }

    get<T>(
        token: Type<T> | InjectionToken<T>,
        notFoundValue?: T,
        flags?: InjectFlags
    ): T;
    get(token: any, notFoundValue?: any);
    get(token: any, notFoundValue?: any, flags?: any) {
        const value = this._additionalTokens.get(token);

        if (value) {
            return value;
        }

        return this._parentInjector.get<any>(token, notFoundValue);
    }
}

@Injectable({
    providedIn: 'root'
})
export class LazyLoaderService {

    constructor(
        private injector: Injector,
        private compiler: Compiler,
        @Inject(LAZY_WIDGETS) private lazyWidgets: { [key: string]: () => Promise<NgModuleFactory<any> | Type<any>> }
    ) { }

    async loadDirective(directive: LazyLoaderDirective) {
        return await this.load(directive.appLazy, directive.viewContainerRef, directive.metadata, directive.default);
    }

    async load(name: string, container: ViewContainerRef, data?: any, dataToken: any = LAZY_COMPONENT_METADATA, defaultName: string = null) {


        if (container.length === 0) {
            const tempModule = await this.downloadResource(name, defaultName);
            if (!tempModule) {
                return;
            }

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

            const map = new WeakMap<any, any>();
            map.set(dataToken, data);
            moduleRef = moduleFactory.create(new LazyLoaderInjector(this.injector, map));

            const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);

            container.clear();
            container.createComponent(compFactory);
        }

    }

    private async downloadResource(name: string, defaultName: string) {
        let result: NgModuleFactory<any> | Type<any>;
        let loadTarget: LoadChildrenType;
        try {
            loadTarget = this.lazyWidgets[name];
            if (loadTarget != null) {
                result = await loadTarget();
            } else {
                throw { error: `${name} is not defined as loading path. Please review in lazyWidgets configuration` };
            }
        } catch (ex) {
            console.error(ex);
            if (defaultName) {
                loadTarget = this.lazyWidgets[defaultName];
                result = await loadTarget();
            } else {
                throw ex;
            }
        }

        return result;
    }

    async processDirectives(views: LazyLoaderDirective[], targetUI?: string) {
        if (views) {
            views.forEach(async viewDirective => {
                const options = viewDirective.metadata && viewDirective.metadata.options;
                if (
                    !options ||
                    ((!options.targetUI && !targetUI) || (options.targetUI) === targetUI)
                ) {
                    await this.load(viewDirective.appLazy, viewDirective.viewContainerRef, viewDirective.metadata, LAZY_COMPONENT_METADATA, viewDirective.default);
                }
            });
        }
    }




}
