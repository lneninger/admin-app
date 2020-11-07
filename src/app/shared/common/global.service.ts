import { Injectable, Injector } from '@angular/core';


export let InjectorInstance: Injector;

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    constructor(private injector: Injector) {
        this.initialize();
        InjectorInstance = this.injector;
    }

    initialize() {

    }


}
