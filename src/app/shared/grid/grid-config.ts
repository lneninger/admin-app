import { I } from '@angular/cdk/keycodes';
import { EventEmitter, Injectable, InjectionToken, NgModule } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DocumentSnapshot } from 'firebase/firestore';
import { combineLatest, from, of, Subscription } from 'rxjs';
import { catchError, startWith, switchMap, tap } from 'rxjs/operators';

export const GridDefaultOptions = new InjectionToken('grid-default-options');

export interface PageDataSort {
  field: string;
  direction: SortDirection;
}


export interface DataRetrieverInput {
  sort?: PageDataSort;
  pageIndex: number;
  pageSize: number;
  lastRetrieved: any;
  retrieveTotalAmount: boolean
}

export interface GridData<T = any> {
  items: T[];
  totalCount?: number;
}


export function defaultGridNewItems<V>(gridConfig: GridConfig<V>, itemsCast: V[]) {
  gridConfig.data = [];
  gridConfig.data = itemsCast;
}

export function gridAppendNewItems<V>(gridConfig: GridConfig<V>, itemsCast: V[]) {
  console.log(`Append items executing`, gridConfig.data, itemsCast);
  gridConfig.data.push(...itemsCast);
}

export interface IGridOptions {
  defaultData?: any[];

  /**
   * External data retrieving function
   */
  dataRetriever: <T>(input: DataRetrieverInput) => Promise<GridData<T>>,
  /**
   * Sort is mandatory to use the pagination mechanism
  */
  defaultSortField: string

  /**
   * External mechanis to fill current page items
   * @param gridConfig
   * @param itemsCast
   */
  addNewItems?: <V>(gridConfig: GridConfig<V>, itemsCast: V[]) => V[];

  onDataReady?: <V>(itemsCast: V[]) => Promise<void>;
}



export declare type SortDirection = 'asc' | 'desc';

export abstract class GridConfig<T> {

  isLoadingResults: boolean;
  isRateLimitReached: boolean;
  resultsLength: any;
  data: T[] = [];
  private force$ = new EventEmitter<any>();
  sort: MatSort;
  paginator: MatPaginator;
  lastRetrieved: T;

  lastPageSize: number;
  previousLastRetrieved: T;

  searchEngine$$: Subscription;
  public extraElements: number;
  gridOptions: IGridOptions;

  constructor(
  ) {
  }

  abstract buildRequest(sort: Sort, paginator: PageEvent): DataRetrieverInput;
  abstract processResponse(items: GridData<T>);

  initialize(paginator: MatPaginator, sort: MatSort, gridOptions?: IGridOptions) {
    this.gridOptions = gridOptions;
    this.clearData();
    if (this.searchEngine$$?.closed == false) {
      this.searchEngine$$?.unsubscribe();
    }

    if (this.gridOptions.defaultData?.length > 0) {
      this.data.push(...this.gridOptions.defaultData);
    }

    this.sort = sort;
    this.paginator = paginator;
    if (paginator) {
      paginator.hasNextPage = () => !this.isRateLimitReached;
    }

    const internalSortChange = this.sort ? this.sort.sortChange : new EventEmitter<Sort>();
    const internalSortChange$ = internalSortChange.pipe(tap(_ => this.clearData()));

    const internalPaginatorPage = this.paginator ? this.paginator.page : new EventEmitter<PageEvent>();

    this.searchEngine$$ = combineLatest([internalSortChange$.pipe(startWith(null as Sort)), internalPaginatorPage.pipe(startWith(null as PageEvent)), this.force$.pipe(startWith(false))])
      .pipe(
        // debounceTime(250),
        switchMap(([sortElem, paginatorElem, force]) => {
          const input = this.buildRequest(sortElem, paginatorElem);
          return from(this.gridOptions.dataRetriever<T>(input));
        }),
        catchError((error) => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          const result = {
            items: [],
            totalCount: 0
          } as GridData<T>;
          return of(result);
        })
      ).subscribe(data => {
        // debugger

        // const itemsCast = (data.items && data.items.map(_ => ({id: _.id, data: _.data() as unknown as T})));
        this.processResponse(data);

      });
  }

  refresh() {
    this.clearData();
    this.force$.emit(true);
  }

  private clearData() {
    this.data.splice(0, this.data.length);
    this.lastRetrieved = undefined;
    this.isRateLimitReached = false;
  }

  dispose() {
    this.searchEngine$$.unsubscribe();
  }

}

