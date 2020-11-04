import { Injectable, Injector } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InjectorInstance } from './global/global.service';

@Injectable({
    providedIn: 'root'
})
export class UtilitiesDate {

    static datePipe: DatePipe;

    constructor() {

    }

    public static formatDate(date: string | Date, format: string = null, timeZone: string = null): string {
        UtilitiesDate.datePipe = UtilitiesDate.datePipe || InjectorInstance.get(DatePipe);

        const datePipe = UtilitiesDate.datePipe;

        if (!date) {
            return null;
        } else if (typeof date === 'string') {
            return datePipe.transform(date, format || 'MM/dd/yyyy', timeZone);
        } else if (typeof (date as Date).getMonth === 'function') {
            return datePipe.transform(date, format || 'MM/dd/yyyy');
        }

        return null;
    }

}
