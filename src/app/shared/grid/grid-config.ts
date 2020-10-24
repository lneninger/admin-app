import { NumberFormatStyle } from '@angular/common';
import { APP_INITIALIZER, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

export class GridConfig<T> {
  isLoadingResults: boolean;
  isRateLimitReached: boolean;
  resultsLength: any;
  data: T[];

  constructor(
    private dataRetriever: (input: DataRetrieverInput) => Observable<GridData<T>>,
    private paginator: MatPaginator,
    private sort: MatSort) {
    this.initialize();
  }

  initialize() {
    const internalSortChange = this.sort ? this.sort.sortChange : new EventEmitter<Sort>();
    const internalPaginatorPage = this.paginator ? this.paginator.page : new EventEmitter<PageEvent>();
    merge(internalSortChange, internalPaginatorPage)
      .pipe(
        startWith({}),
        switchMap(() => {
          // debugger;
          this.isLoadingResults = true;

          const input: DataRetrieverInput = {
            sort: { target: this.sort && this.sort.active, direction: this.sort && this.sort.direction },
            pageIndex: this.paginator && this.paginator.pageIndex,
            pageSize: this.paginator && this.paginator.pageSize,
          };

          return this.dataRetriever(input);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => this.data = data);
  }

}



export interface DataRetrieverInput {
  sort: Sort;
  pageIndex: number;
  pageSize: number;
}

export interface Sort {
  target: string;
  direction: SortDirection;
}

export interface GridData<T> {
  items: T[];
  total_count: number;
}

export declare type SortDirection = 'asc' | 'desc' | '';
