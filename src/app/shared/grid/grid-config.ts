import { NumberFormatStyle } from '@angular/common';
import { APP_INITIALIZER, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { combineLatest, merge, Observable, of } from 'rxjs';
import { catchError, debounceTime, filter, map, startWith, switchMap, tap } from 'rxjs/operators';

export class GridConfig<T> {

  isLoadingResults: boolean;
  isRateLimitReached: boolean;
  resultsLength: any;
  data: T[];
  private force$ = new EventEmitter<any>();
  sort: MatSort;
  paginator: MatPaginator;
  lastRetrieved: T;
  constructor(
    private dataRetriever: (input: DataRetrieverInput) => Promise<GridData<T>>,
    ) {
  }

  initialize(paginator: MatPaginator, sort: MatSort) {
    this.sort = sort;
    this.paginator = paginator;
    const internalSortChange = this.sort ? this.sort.sortChange : new EventEmitter<Sort>();
    const internalPaginatorPage = this.paginator ? this.paginator.page : new EventEmitter<PageEvent>();

    combineLatest([internalSortChange.pipe(startWith(null as Sort)), internalPaginatorPage.pipe(startWith(null as Sort)), this.force$.pipe(startWith(false))])
      .pipe(
        debounceTime(250),
        // tap(([sort, paginator, force]) => {
        //   console.log(`hit page`)
        // }),
        // filter(([sort, paging, force]) => !!force && (!!sort || !!paging)),
        // tap(([sort, paginator, force]) => {
        //   console.log(`hit page`)
        // }),
        switchMap(([sort, paginator, force]) => {
          // debugger;
          this.isLoadingResults = true;

          const input: DataRetrieverInput = {
            // sort: { field: this.sort && this.sort.active, direction: this.sort && this.sort.direction },
            pageIndex: this.paginator && this.paginator.pageIndex,
            pageSize: this.paginator && this.paginator.pageSize,
            lastRetrieved: this.lastRetrieved,
            retrieveTotalAmount: true
          };

          return this.dataRetriever(input);
        }),
        catchError(() => {
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
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.lastRetrieved = data && data.items && data.items.length > 0 && data.items[data.items.length - 1];
        this.resultsLength = data.totalCount || (data as unknown as T[]).length;
        this.data = data.items || (data as unknown as T[]);
        this.paginator.length = (data && data.items && data.items.length === this.paginator.pageSize) ? this.paginator.pageIndex*this.paginator.pageSize+1 : this.paginator.pageIndex*this.paginator.pageSize;
      });
  }

  refresh() {
    this.force$.emit(true);
  }

}

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

export interface GridData<T> {
  items: T[];
  totalCount: number;
}

export declare type SortDirection = 'asc' | 'desc' | '';
