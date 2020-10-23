import { APP_INITIALIZER } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

export class GridConfig {
  isLoadingResults: boolean;
  isRateLimitReached: boolean;
  resultsLength: any;
  data: any[];

  constructor(
    private dataRetriever: (input: DataRetrieverInput) => Observable<any>,
    private paginator: MatPaginator,
    private sort: MatSort) {
    this.initialize();
  }
  initialize() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          const input: DataRetrieverInput = {
            sort: this.sort.active,
            sortDirection: this.sort.direction,
            pageIndex: this.paginator.pageIndex
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


}
