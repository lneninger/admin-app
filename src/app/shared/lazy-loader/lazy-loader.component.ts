import { AfterViewInit, Directive, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LazyLoadedWidgets } from 'src/app/app-routing-lazy';
import { BaseComponent } from '../base.component';

import { LazyLoaderDirective } from './lazy-loader.directive';
import { LazyLoaderService } from './lazy-loader.service';


@Directive()
export abstract class LazyLoaderBaseComponent extends BaseComponent implements AfterViewInit {

    LazyLoadedWidgets = LazyLoadedWidgets;


    clickInside: boolean;
    listenerOpenRightPanel$$: any;
    defaultRightPanel$$: any;

    lazyLoader$$: Subscription;
    private _lazyComponentDirectives$ = new BehaviorSubject<LazyLoaderDirective[]>(null);
    private _lazyComponentDirectives: LazyLoaderDirective[];
    @ViewChildren(LazyLoaderDirective)
    set lazyComponentDirectives(value: QueryList<LazyLoaderDirective>) {
        this._lazyComponentDirectives = value && value.toArray();
        if (this._lazyComponentDirectives) {
            this._lazyComponentDirectives$.next(this._lazyComponentDirectives);
        }
    }

    constructor(private lazyLoaderService: LazyLoaderService) {
        super();
     }


     async ngAfterViewInit() {
      await this.initializeListener();
    }

    async initializeListener() {
        await this.lazyLoaderService.processDirectives(this._lazyComponentDirectives$.value);
        this.lazyLoader$$ = this._lazyComponentDirectives$.asObservable().subscribe(async views => await this.lazyLoaderService.processDirectives(views));
    }

}
