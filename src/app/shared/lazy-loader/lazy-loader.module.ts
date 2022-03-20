import { NgModule } from '@angular/core';

import { LazyLoaderDirective } from './lazy-loader.directive';

export { LazyLoaderDirective } from './lazy-loader.directive';

@NgModule({
    imports: [

    ],
    declarations: [
        LazyLoaderDirective
    ],
    providers: [

    ],
    exports: [
        LazyLoaderDirective
    ]

})
export class LazyLoaderModule {
}
