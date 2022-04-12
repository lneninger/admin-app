import { PageEvent } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

import { DataRetrieverInput, GridConfig, PageDataSort } from '../grid-config';
import { FirestoreGridModule } from './firestore-grid.module';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: FirestoreGridModule
})
export class FirestoreGridConfig<T> extends GridConfig<T>{
  buildRequest(sort: Sort, paginator: PageEvent) {
    this.isLoadingResults = true;
    this.extraElements = this.lastRetrieved ? 2 : 1;

    const formattedSort = sort == null ?
      { field: this.gridOptions.defaultSortField, direction: 'asc' } as PageDataSort
      : { field: sort?.active, direction: sort?.direction } as PageDataSort;

    this.lastPageSize = (paginator?.pageSize || 10) + this.extraElements;


    return {
      sort: formattedSort,
      pageIndex: paginator?.pageIndex,
      pageSize: this.lastPageSize,
      lastRetrieved: this.lastRetrieved,
      retrieveTotalAmount: true
    } as DataRetrieverInput;
  }
}
