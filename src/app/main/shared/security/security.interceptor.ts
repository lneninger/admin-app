import { AuthService } from './../../services/user/auth.service';
import { environment } from './../../../../environments/environment';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AppStateModel } from 'src/app/app.state';
import { EndpointFactory } from '../endpoint-factory.service';
import { ErrorService } from '../error/error-service';

export const KeepOriginalHeadersKey = 'keep-original';
export const NoAuthorizationHeaderKey = 'no-authorization';

@Injectable()
export class SecurityHttpIOnterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject<any>(null);

  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store,
    private errorService: ErrorService,
    private authService: AuthService
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // debugger;
    const formattedRequest = this.formatRequest(req);

    return next.handle(formattedRequest).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error && error.status === 401) {
          // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          let request: Observable<HttpEvent<any>> = null;
          if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            request = this.refreshTokenSubject.asObservable().pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.formatRequest(req)))
            );
          } else {
            this.refreshTokenInProgress = true;

            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);

            const token = '';//this.authService.reLogin();
            this.refreshTokenSubject.next(token);

            request = next.handle(this.formatRequest(req)).pipe(
              finalize(() => this.refreshTokenInProgress = false)
            );

          }

          return request.pipe(catchError((errorLast: HttpErrorResponse) => {
            console.log('Request error', { error, req });

            if (errorLast && errorLast.status === 401) {
              this.redirectToError401(req);
              return throwError(errorLast);
            }
          }));


        } else {
          console.log('Request error', { error, req });
          return throwError(error);
        }
      })
    );
  }

  formatRequest(req: HttpRequest<any>): HttpRequest<any> {
    // return req;
    const token = this.store.selectSnapshot<string>((store: AppStateModel) => {
      // debugger;
      return store.userState.token;
    });
    const defaultAuthorizationHeaders = {

      Authorization:  req.headers.has('Authorization') && req.headers.get('Authorization') != undefined ? req.headers.get('Authorization') : ('Bearer ' + token),
    };

    const defaultHeaders = {
      ...defaultAuthorizationHeaders, ...{
        'Content-Type': req.headers.has('Content-Type') ? req.headers.get('Content-Type') : 'application/json',
        Accept: req.headers.has('Accept') ? req.headers.get('Accept') : `application/vnd.iman.v${EndpointFactory.apiVersion}+json, application/json, text/plain, */*`,
        'App-Version': req.headers.has('App-Version') ? req.headers.get('App-Version') : environment.appVersion
      }
    };

    let result: HttpRequest<any>;
    if (req.headers.get(KeepOriginalHeadersKey)) {
      let headers = req.headers;
      headers = headers.delete(KeepOriginalHeadersKey);
      if (!req.headers.get(NoAuthorizationHeaderKey)) {
        headers = req.headers.delete(NoAuthorizationHeaderKey);
        headers = headers.set('Authorization', req.headers.has('Authorization') ? req.headers.get('Authorization') : ('Bearer ' + this.store.selectSnapshot<string>((store: AppStateModel) => store.userState.token)));
      }
      result = req.clone({
        headers
      });
    }
    else {
      result = req.clone({
        headers: new HttpHeaders(defaultAuthorizationHeaders)
      });
    }

    return result;
  }

  // private refreshAccessToken(): Observable<string> {
  //   return this.userService.acquireToken();
  // }


  redirectToError401(req: HttpRequest<any>) {
    this.errorService.error401(req);
  }
}


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: SecurityHttpIOnterceptor, multi: true },
];

