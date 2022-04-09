import { EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DocumentSnapshot } from 'firebase/firestore';
import { combineLatest, from, of, Subscription } from 'rxjs';
import { catchError, startWith, switchMap, tap } from 'rxjs/operators';



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

export function gridAppendNewItems<V>(gridConfig: GridConfig<V>, itemsCast: V[]): V[] {
  gridConfig.data = gridConfig.data || [];
  gridConfig.data.push(...itemsCast);
  return gridConfig.data;
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

export class GridConfig<T> {

  isLoadingResults: boolean;
  isRateLimitReached: boolean;
  resultsLength: any;
  data: T[];
  private force$ = new EventEmitter<any>();
  sort: MatSort;
  paginator: MatPaginator;
  lastRetrieved: T;
  lastPageSize: number;
  searchEngine$$: Subscription;
  private extraElements: number;

  constructor(private gridOptions: IGridOptions

  ) {
    this.data = this.gridOptions.defaultData;
  }

  initialize(paginator: MatPaginator, sort: MatSort) {
    this.sort = sort;
    this.paginator = paginator;
    if (paginator) {
      paginator.hasNextPage = () => !this.isRateLimitReached;
    }

    const internalSortChange = this.sort ? this.sort.sortChange : new EventEmitter<Sort>();
    const internalSortChange$ = internalSortChange.pipe(tap(_ => this.lastRetrieved = null));

    const internalPaginatorPage = this.paginator ? this.paginator.page : new EventEmitter<PageEvent>();

    this.searchEngine$$ = combineLatest([internalSortChange$.pipe(startWith(null as Sort)), internalPaginatorPage.pipe(startWith(null as Sort)), this.force$.pipe(startWith(false))])
      .pipe(
        // debounceTime(250),
        switchMap(([sort, paginator, force]) => {
          this.isLoadingResults = true;
          this.extraElements = this.lastRetrieved ? 2 : 1;


          const formattedSort = sort == null ?
            { field: this.gridOptions.defaultSortField, direction: 'asc' } as PageDataSort
            : { field: this.sort && this.sort.active, direction: this.sort && this.sort.direction } as PageDataSort;

          this.lastPageSize = (this.paginator?.pageSize || 10) + this.extraElements;
          const input: DataRetrieverInput = {
            sort: formattedSort,
            pageIndex: this.paginator?.pageIndex,
            pageSize: this.lastPageSize,
            lastRetrieved: this.lastRetrieved,
            retrieveTotalAmount: true
          };

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
        this.isLoadingResults = false;


        this.isRateLimitReached = data.items.length < ((this.paginator?.pageSize || 10) + this.extraElements);

        const firstIndex = this.lastRetrieved && data?.items.length > 0 ? 1 : 0;

        let lastIndex = this.lastPageSize - this.extraElements;
        if (this.isRateLimitReached) {
          lastIndex = data.items.length;
        }

        this.data = this.gridOptions.addNewItems ? this.gridOptions.addNewItems<T>(this, data.items.slice(firstIndex, lastIndex)) : data.items.slice(firstIndex, lastIndex);

        // this.resultsLength = data.totalCount || (data as unknown as T[]).length;
        // this.paginator.length = (data && data.items && data.items.length === this.paginator.pageSize) ? this.paginator.pageIndex * this.paginator.pageSize + 1 : this.paginator.pageIndex * this.paginator.pageSize;

        this.lastRetrieved = data.items.length > 0 && data.items[data.items.length - 2];

        if (this.gridOptions?.onDataReady) {
          this.gridOptions?.onDataReady(this.data);
        }

      });
  }

  refresh() {
    this.force$.emit(true);
  }

  dispose() {
    this.searchEngine$$.unsubscribe();
  }

}
