import { AfterViewInit, Directive, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LazyLoadedWidgets } from 'src/app/app-routing-lazy';
import { BaseComponent } from 'src/app/pages/member/base.member.component';

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


     ngAfterViewInit() {
        this.initializeListener();
    }

    initializeListener() {
        this.lazyLoaderService.processDirectives(this._lazyComponentDirectives$.value);
        this.lazyLoader$$ = this._lazyComponentDirectives$.asObservable().subscribe(views => this.lazyLoaderService.processDirectives(views));
    }

}
