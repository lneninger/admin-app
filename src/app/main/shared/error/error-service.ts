import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpRequest } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    data401: RequestError;
    data403: RequestError;

    constructor(private router: Router) { }

    error401(request: string | HttpRequest<any> | RequestError): any {
        if (typeof request === 'string') {
            this.data401 = <RequestError>{ targetRouteName: <string>request };
        }
        else if ((<any>request).targetRouteName || (<any>request).callRequest) {
            this.data401 = <RequestError>request;
        }

        else if ((<any>request).headers) {
            this.data401 = <RequestError>{ targetRouteName: 'Unknown', callRequest: <HttpRequest<any>>request };
        }

        this.router.navigate(['error/401'], { state: this.data401 });

    }

    error403(targetRouteName: string): any {
        this.data403 = { targetRouteName: targetRouteName };
        this.router.navigate(['error/403']);
    }

    error404(): any {
        this.router.navigate(['error/404']);
    }
    
}

export class RequestError {
    targetRouteName: string;
    callRequest?: HttpRequest<any>;
}

export class Error401State extends RequestError{

}

export class Error403State extends RequestError {
}
