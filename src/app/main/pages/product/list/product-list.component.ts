import { AddProductRequest, IProductDialogData } from '../../../services/product/product.models';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { IProductItem } from 'src/app/main/services/product/product.models';
import { ProductService } from 'src/app/main/services/product/product.service';
import { DataRetrieverInput, GridConfig } from 'src/app/shared/grid/grid-config';
import { ProductComponent } from '../item/product.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'description'];

  gridConfig: GridConfig<IProductItem>;

  treeControl = new NestedTreeControl<IProductItem>(node => node.children);

  treeDataSource = new MatTreeNestedDataSource<IProductItem>();
  current: IProductItem;
  dataResponse: IProductItem[];

  constructor(
    breadcrumbService: BreadcrumbService,
    private service: ProductService,
    private dialog: MatDialog
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.ADMIN, NavigationItemIds.PRODUCTS);

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // debugger;
    // Leonardo this.gridConfig = new GridConfig<IProductItem>(this.retrieveData.bind(this));

    this.gridConfig.initialize(this.paginator, this.sort);
  }


  // retrieveData(input?: DataRetrieverInput) {
  //   // debugger;
  //   const result = this.service.search(input).pipe(tap(response => {
  //     // debugger;
  //     this.dataResponse = response;
  //     this.treeDataSource.data = this.service.formatTreeData([...response], null);
  //     this.treeControl.dataNodes = this.treeDataSource.data

  //   }));

  //   return result;
  // }

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
