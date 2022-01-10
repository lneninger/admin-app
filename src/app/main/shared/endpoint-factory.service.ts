import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { throwError } from 'rxjs';
import { AppStateModel } from 'src/app/app.state';

import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EndpointFactory {
    static readonly apiVersion: string = '1';


    private get token() {
       return this.store.selectSnapshot<string>((selector: AppStateModel) => selector.authState.token);
    }

    constructor(protected http: HttpClient, private store: Store) { }

    protected getRequestHeaders(responseType: string = 'json'): {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    } {

        const headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.token,
            'Content-Type': 'application/json',
            Accept: `application/vnd.iman.v${environment.appVersion}+json, application/json, text/plain, */*`,
            'App-Version': environment.appVersion
        });

        const result = { headers, responseType: responseType as any };
        return result;
    }

    protected handleError(error) {
        if (error.status === 401) {
            return throwError('session expired');
        }
        return throwError(error);
    }
}
