import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { ErrorLayoutComponent } from '../layouts/error/error.component';
import { Error401Component } from './error401/error401.component';
import { Error403Component } from './error403/error403.component';

const routes: Routes = [
    {
        path: 'error',
        component: ErrorLayoutComponent,
        children: [
            {
                path: '404',
                component: Error404Component,
                data: { title: 'Page Not Found' }
            },
            {
                path: '401',
                component: Error401Component,
                data: { title: 'Not authenticated' }
            },
            {
                path: '403',
                component: Error403Component,
                data: { title: 'Access denied' }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ErrorRoutingModule {}
