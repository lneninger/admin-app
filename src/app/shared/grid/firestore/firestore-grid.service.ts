import { PageEvent } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

import { DataRetrieverInput, defaultGridNewItems, GridConfig, GridData, PageDataSort } from '../grid-config';
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

  processResponse(data: GridData<T>) {
    this.isRateLimitReached = data.items.length < ((this.paginator?.pageSize || 10) + this.extraElements);

        const firstIndex = this.lastRetrieved && data?.items.length > 0 ? 1 : 0;

        let lastIndex = this.lastPageSize - this.extraElements;
        if (this.isRateLimitReached) {
          lastIndex = data.items.length;
        }


        this.gridOptions.addNewItems ?
          this.gridOptions.addNewItems<T>(this, data.items.slice(firstIndex, lastIndex))
          : defaultGridNewItems(this, data.items.slice(firstIndex, lastIndex));

        this.previousLastRetrieved = this.lastRetrieved;
        this.lastRetrieved = data.items.length > 0 && data.items[data.items.length - 2];

        if(this.gridOptions.onDataReady){
          this.gridOptions.onDataReady(this.data);
        }

        setTimeout(() => {
          this.isLoadingResults = false;
        });
  }
}
