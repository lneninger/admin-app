import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { LayoutsModule } from '../layouts/layouts.module';

import { ErrorService } from './error-service';
import { RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { Error401Component } from './error401/error401.component';
import { Error403Component } from './error403/error403.component';


@NgModule({
    declarations: [
        Error404Component
        , Error401Component
        , Error403Component
    ],
    imports: [
        CommonModule
        , RouterModule
        , ErrorRoutingModule
        , LayoutsModule
    ],
    providers: [
        ErrorService
    ],
    entryComponents: []
})
export class ErrorModule { }
