import { EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DocumentSnapshot } from 'firebase/firestore';
import { combineLatest, from, of } from 'rxjs';
import { catchError, debounceTime, startWith, switchMap } from 'rxjs/operators';



export interface PageDataSort {
  field: string;
  direction: SortDirection;
}


export interface DataRetrieverInput {
  sort?: PageDataSort;
  pageIndex: number;
  pageSize: number;
  lastRetrieved: DocumentSnapshot;
  retrieveTotalAmount: boolean
}

export interface GridData<T> {
  items: T[];
  totalCount: number;
}

export interface GridDataDoc {
  items: DocumentSnapshot[];
  totalCount: number;
}

export declare type SortDirection = 'asc' | 'desc';

export class GridConfig<T> {

  isLoadingResults: boolean;
  isRateLimitReached: boolean;
  resultsLength: any;
  data: T[];
  private force$ = new EventEmitter<any>();
  sort: MatSort;
  paginator: MatPaginator;
  lastRetrieved: DocumentSnapshot;
  constructor(
    private dataRetriever: (input: DataRetrieverInput) => Promise<GridData<DocumentSnapshot>>,
    private defaultSortField: string
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
        switchMap(([sort, paginator, force]) => {
          this.isLoadingResults = true;

          const formattedSort = sort == null ?
            { field: this.defaultSortField, direction: 'asc' } as PageDataSort
            : { field: this.sort && this.sort.active, direction: this.sort && this.sort.direction } as PageDataSort;

          const input: DataRetrieverInput = {
            sort: formattedSort,
            pageIndex: this.paginator?.pageIndex,
            pageSize: (this.paginator?.pageSize || 10) + 2,
            lastRetrieved: this.lastRetrieved,
            retrieveTotalAmount: true
          };

          return from(this.dataRetriever(input));
        }),
        catchError((error) => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          const result = {
            items: [],
            totalCount: 0
          } as GridDataDoc;
          return of(result);
        })
      ).subscribe(data => {
        // debugger
        const itemsCast = (data.items && data.items.map(_ => _.data() as unknown as T));
        this.isLoadingResults = false;
        this.isRateLimitReached = data.items.length < (this.paginator?.pageSize || 10) + 2;
        this.lastRetrieved = data && data.items && data.items.length > 0 && data.items[data.items.length - 1];

        const firstIndex = this.lastRetrieved && data?.items.length > 0 ? 1 : 0;
        this.data = itemsCast.slice(firstIndex, -1) || (itemsCast as unknown as T[]);

        this.resultsLength = data.totalCount || (data as unknown as T[]).length;
        this.paginator.length = (data && data.items && data.items.length === this.paginator.pageSize) ? this.paginator.pageIndex * this.paginator.pageSize + 1 : this.paginator.pageIndex * this.paginator.pageSize;


      });
  }

  refresh() {
    this.force$.emit(true);
  }

}
