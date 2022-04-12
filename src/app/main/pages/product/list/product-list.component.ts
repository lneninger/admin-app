import { FirestoreGridModule } from './../../../../shared/grid/firestore/firestore-grid.module';
import { AddProductRequest, IProductDialogData } from '../../../services/product/product.models';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { from, of } from 'rxjs';
import { first, tap, map } from 'rxjs/operators';
import { IProductItem } from 'src/app/main/services/product/product.models';
import { ProductService } from 'src/app/main/services/product/product.service';
import { DataRetrieverInput, GridConfig, GridData } from 'src/app/shared/grid/grid-config';
import { ProductComponent } from '../item/product.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { BaseComponent } from 'src/app/shared/base.component';
import { FirestoreGridConfig } from 'src/app/shared/grid/firestore/firestore-grid.service';

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'description'];

  treeControl = new NestedTreeControl<IProductItem>(node => node.children);

  treeDataSource = new MatTreeNestedDataSource<IProductItem>();
  current: IProductItem;
  dataResponse: IProductItem[];

  constructor(
    breadcrumbService: BreadcrumbService,
    private service: ProductService,
    private dialog: MatDialog,
    public gridConfig: FirestoreGridConfig<IProductItem>
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.ADMIN, NavigationItemIds.PRODUCTS);

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.gridConfig.initialize(this.paginator, this.sort, {
      dataRetriever: this.retrieveData.bind(this),
      defaultSortField: 'name'
    });
  }


  retrieveData(input?: DataRetrieverInput) {
    return from(this.service.search(input)).pipe(map(response => {
      return { items: response.result.docs.map(_ => _.data()), totalCount: response.total } as GridData<IProductItem>;
    }));
  }

  newProduct($event?: Event, parent?: IProductItem) {
    const dialogRef = this.dialog.open(ProductComponent, {
      data: {
        parent
      },
      height: '400px'
    } as MatDialogConfig<IProductDialogData>);

    dialogRef.afterClosed().pipe(first()).subscribe(async result => {
      // Leonardo await this.retrieveData().toPromise();
      // Leonardo const match = this.dataResponse.find(item => item.id == (this.current && this.current.id));
      // Leonardo this.expandNode(match);

      console.log(`Dialog result: ${result}`);
    });
  }

  //#region Tree
  expandNode(match: IProductItem) {
    if (match) {
      let current = match;
      while (current) {
        this.treeControl.expand(current);
        current = this.dataResponse.find(item => item.children.some(child => child == current));
      }
    }
  }

  hasChild = (_: number, node: IProductItem) => node.children && node.children.length > 0;

  setCurrent(item: IProductItem) {
    this.current = item;
  }

  newChild(parent: IProductItem) {
    this.newProduct(null, parent);
  }

  async deleteCurrent() {
    await this.service.delete(this.current.id);
    this.gridConfig.refresh();

  }//#endregion
}
