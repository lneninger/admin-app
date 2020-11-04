import { NgModule } from '@angular/core';
import { AuthorizationGuard } from './authorization.guard';
import { httpInterceptorProviders } from './security.interceptor';



@NgModule({
    imports: [

    ],
    providers: [
        AuthorizationGuard,
        httpInterceptorProviders
    ],
})
export class SecurityModule {

}
