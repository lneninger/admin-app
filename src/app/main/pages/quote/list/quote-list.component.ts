import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { IQuoteItem } from 'src/app/main/services/quote/quote.models';
import { QuoteService } from 'src/app/main/services/quote/quote.service';
import { FirestoreGridConfig } from 'src/app/shared/grid/firestore/firestore-grid.service';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';

import { DataRetrieverInput, GridConfig } from '../../../../shared/grid/grid-config';
import { NavigationItemIds } from '../../../main.navigation';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 12, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 13, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 14, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 15, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 16, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 17, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 18, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.scss']
})
export class QuoteListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['description'];


  dataResponse: IQuoteItem[];

  @ViewChild(MatTable) table: MatTable<IQuoteItem>;

  constructor(
    breadcrumbService: BreadcrumbService,
    private service: QuoteService,
    private router: Router,
    public gridConfig: FirestoreGridConfig<IQuoteItem>
  ) {

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.QUOTES);
  }


  ngOnInit(): void {
  }

  async ngAfterViewInit() {
    this.gridConfig.initialize(this.paginator, this.sort, {
      dataRetriever: this.retrieveData.bind(this),
      defaultSortField: 'description'
    });
    this.gridConfig.refresh();
  }


  retrieveData(input?: DataRetrieverInput) {
    return this.service.search(input).pipe(tap(response => {
      this.dataResponse = response.items;
      this.table.renderRows();

    }));
  }

  async newQuote($event?: Event) {
    await this.router.navigate(['/app/quotes/new']);
  }

  async openQuote(row: IQuoteItem) {
    await this.router.navigate(['/app/quotes/', row.id]);

  }
}
