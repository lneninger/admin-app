import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { ConfigurationService } from './configuration.service';

@Injectable({
    providedIn: 'root'
})
export class EndpointFactory {
    static readonly apiVersion: string = '1';

    private _userService: UserService;

    private get userService() {
        if (!this._userService) {
            this._userService = this.injector.get(UserService);
        }

        return this._userService;
    }

    constructor(protected http: HttpClient, protected configurations: ConfigurationService, private injector: Injector) { }

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
            Authorization: 'Bearer ' + this.userService.token,
            'Content-Type': 'application/json',
            Accept: `application/vnd.iman.v${EndpointFactory.apiVersion}+json, application/json, text/plain, */*`,
            'App-Version': ConfigurationService.appVersion
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
