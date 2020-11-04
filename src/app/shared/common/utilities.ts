import { Injectable } from '@angular/core';
import { HttpResponseBase, HttpResponse, HttpErrorResponse } from '@angular/common/http';


export function nameof<T>(key: keyof T, instance?: T): keyof T {
    return key;
}

@Injectable({
    providedIn: 'root'
})
export class Utilities {
    public static readonly captionAndMessageSeparator = ':';
    public static readonly noNetworkMessageCaption = 'No Network';
    public static readonly noNetworkMessageDetail = 'The server cannot be reached';
    public static readonly accessDeniedMessageCaption = 'Access Denied!';
    public static readonly accessDeniedMessageDetail = '';
    public static readonly notFoundMessageCaption = 'Not Found';
    public static readonly notFoundMessageDetail = 'The target resource cannot be found';

    constructor() { }
    public static splitInTwo(text: string, separator: string): { firstPart: string, secondPart: string } {
        const separatorIndex = text.indexOf(separator);

        if (separatorIndex === -1) {
            return { firstPart: text, secondPart: null };
        }

        const part1 = text.substr(0, separatorIndex).trim();
        const part2 = text.substr(separatorIndex + 1).trim();

        return { firstPart: part1, secondPart: part2 };
    }
    public static baseUrl() {
        let base = '';
        // debugger;
        if (window.location.origin) {
            base = window.location.origin;
        } else {
            base = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }

        return base.replace(/\/$/, '');
    }
    public static safeStringify(object) {

        let result: string;

        try {
            result = JSON.stringify(object);
            return result;
        } catch (error) {

        }

        const simpleObject = {};

        for (const prop in object) {
            if (!object.hasOwnProperty(prop)) {
                continue;
            }
            if (typeof (object[prop]) === 'object') {
                continue;
            }
            if (typeof (object[prop]) === 'function') {
                continue;
            }
            simpleObject[prop] = object[prop];
        }

        result = '[***Sanitized Object***]: ' + JSON.stringify(simpleObject);

        return result;
    }
    public static JsonTryParse(value: string) {
        try {
            return JSON.parse(value);
        } catch (e) {
            if (value === 'undefined') {
                return void 0;
            }
            return value;
        }
    }
    public static getHttpResponseMessages(data: HttpResponseBase | any): string[] {
        const responses: string[] = [];

        if (data instanceof HttpResponseBase) {
            if (this.checkNoNetwork(data)) {
                responses.push(`${this.noNetworkMessageCaption}${this.captionAndMessageSeparator} ${this.noNetworkMessageDetail}`);
            } else {
                const responseObject = this.getResponseBody(data);

                if (responseObject.error) {
                    if (responseObject.error.message != null) {
                        responses.push(responseObject.error.message);
                    }
                } else if (responseObject && (typeof responseObject === 'object' || responseObject instanceof Object)) {

                    for (const key in responseObject) {
                        if (key) {
                            responses.push(`${key}${this.captionAndMessageSeparator} ${responseObject[key]}`);
                        } else if (responseObject[key]) {
                            responses.push(responseObject[key].toString());
                        }
                    }
                }
            }

            if (!responses.length) {
                if ((data as any).body) {
                    responses.push(`body: ${(data as any).body}`);
                }

                if ((data as any).error) {
                    responses.push(`error: ${(data as any).error}`);
                }
            }
        }

        if (!responses.length) {
            if (this.getResponseBody(data)) {
                responses.push(this.getResponseBody(data).toString());
            } else {
                responses.push(data.toString());
            }
        }

        if (this.checkAccessDenied(data)) {
            responses.splice(0, 0, `${this.accessDeniedMessageCaption}${this.captionAndMessageSeparator} ${this.accessDeniedMessageDetail}`);
        }

        if (this.checkNotFound(data)) {
            let message = `${this.notFoundMessageCaption}${this.captionAndMessageSeparator} ${this.notFoundMessageDetail}`;
            if (data.url) {
                message += `. ${data.url}`;
            }

            responses.splice(0, 0, message);
        }

        return responses;
    }

    public static getHttpResponseMessage(data: HttpResponseBase | any): string {
        const httpMessage =
            Utilities.findHttpResponseMessage(Utilities.noNetworkMessageCaption, data) ||
            Utilities.findHttpResponseMessage(Utilities.notFoundMessageCaption, data) ||
            Utilities.findHttpResponseMessage('error_description', data) ||
            Utilities.findHttpResponseMessage('error', data) ||
            Utilities.getHttpResponseMessages(data).join();

        return httpMessage;
    }

    public static findHttpResponseMessage(messageToFind: string, data: HttpResponse<any> | any, seachInCaptionOnly = true, includeCaptionInResult = false): string {
        const searchString = messageToFind.toLowerCase();
        const httpMessages = this.getHttpResponseMessages(data);

        for (const message of httpMessages) {
            const fullMessage = Utilities.splitInTwo(message, this.captionAndMessageSeparator);

            if (fullMessage.firstPart && fullMessage.firstPart.toLowerCase().indexOf(searchString) !== -1) {
                return includeCaptionInResult ? message : fullMessage.secondPart || fullMessage.firstPart;
            }
        }

        if (!seachInCaptionOnly) {
            for (const message of httpMessages) {

                if (message.toLowerCase().indexOf(searchString) !== -1) {
                    if (includeCaptionInResult) {
                        return message;
                    } else {
                        const fullMessage = Utilities.splitInTwo(message, this.captionAndMessageSeparator);
                        return fullMessage.secondPart || fullMessage.firstPart;
                    }
                }
            }
        }

        return null;
    }

    public static getResponseBody(response: HttpResponseBase) {
        if (response instanceof HttpResponse) {
            return response.body;
        }

        if (response instanceof HttpErrorResponse) {
            return response.error || response.message || response.statusText;
        }
    }

    public static checkNoNetwork(response: HttpResponseBase) {
        if (response instanceof HttpResponseBase) {
            return response.status === 0;
        }

        return false;
    }

    public static checkAccessDenied(response: HttpResponseBase) {
        if (response instanceof HttpResponseBase) {
            return response.status === 403;
        }

        return false;
    }

    public static checkNotFound(response: HttpResponseBase) {
        if (response instanceof HttpResponseBase) {
            return response.status === 404;
        }

        return false;
    }

    public static checkIsLocalHost(url: string, base?: string) {
        if (url) {
            const location = new URL(url, base);
            return location.hostname === 'localhost' || location.hostname === '127.0.0.1';
        }

        return false;
    }

    public static toTitleCase(text: string) {
        return text.replace(/\w\S*/g, (subString) => {
            return subString.charAt(0).toUpperCase() + subString.substr(1).toLowerCase();
        });
    }

    public static formatPhoneNumber(phoneNumber: string) {
        const clean = phoneNumber.replace(/[\(\)-\s]/g, '');
        const result = clean.replace(/(\d{3})(\d{3})(\d{4})/, (match, $1, $2, $3) => `(${$1}) ${$2}-${$3}`);
        return result;
    }

    static camelize(str): string {
        if (!str) {
            return str;
        }

        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    static getVariableCaseInsensitive(object: any, variableName: string) {
        let result: string;
        if (object != null && variableName != null) {
            const variableNameLower = variableName.toLowerCase();
            result = Object.getOwnPropertyNames(object).find(objPropName => objPropName.toLowerCase() === variableNameLower);
        }

        return result;
    }


    static allPropertiesAreUnset(object: any): boolean {
        const setProperties: any[] = [];
        Object.getOwnPropertyNames(object).forEach(prop => {
            if (object[prop] != null) {
                setProperties.push(prop);
            }
        });

        return setProperties.length === 0;
    }

    static somePropertiesSet(object: any): boolean {
        let set = false;
        Object.getOwnPropertyNames(object).forEach(prop => {
            if (!set && object[prop]) {
                set = true;
            }
        });

        return set;
    }


    static groupBy(xs: any[], keyOrFunc: string | GroupByFunctionSelector) {
        if (typeof keyOrFunc === 'string') {
            const key = keyOrFunc as string;
            return xs.reduce((rv, x) => {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        } else {
            const selectorFunction = keyOrFunc as GroupByFunctionSelector;
            return xs.reduce((rv, x) => {
                const key = selectorFunction(x);
                (rv[key] = rv[key] || []).push(x);
                return rv;
            }, {});
        }
    }
}

export type GroupByFunctionSelector = (x: any) => any;
