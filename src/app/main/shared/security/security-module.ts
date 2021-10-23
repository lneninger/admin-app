import { NgModule } from '@angular/core';
import { httpInterceptorProviders } from './security.interceptor';



@NgModule({
    imports: [

    ],
    providers: [
        httpInterceptorProviders
    ],
})
export class SecurityModule {

}
