import { NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { first, tap } from 'rxjs/operators';
import { IProductCategoryItem } from 'src/app/main/services/product-category/product-category.models';
import { ProductCategoryService } from 'src/app/main/services/product-category/product-category.service';
import { DataRetrieverInput, GridConfig } from 'src/app/shared/grid/grid-config';

import { ProductCategoryComponent } from '../item/product-category.component';
import { IProductCategoryDialogData } from './../../../services/product-category/product-category.models';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'description'];

  gridConfig: GridConfig<IProductCategoryItem>;

  treeControl = new NestedTreeControl<IProductCategoryItem>(node => node.children);

  treeDataSource = new MatTreeNestedDataSource<IProductCategoryItem>()
  currentCategory: IProductCategoryItem;
  dataResponse: IProductCategoryItem[];

  constructor(
    private service: ProductCategoryService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // debugger;
    setTimeout(() => {
      this.gridConfig = new GridConfig<IProductCategoryItem>(this.retrieveData.bind(this), 'name');
      this.gridConfig.initialize(this.paginator, this.sort);
    });


    this.service.reload$.subscribe(_ => {
      this.gridConfig.refresh();
    });
  }


  retrieveData(input?: DataRetrieverInput) {
    // debugger;
    const result = this.service.search(input).pipe(tap(response => {
      // debugger;
      this.dataResponse = response.items;
      this.treeDataSource.data = this.service.formatTreeData([...response.items], null);
      this.treeControl.dataNodes = this.treeDataSource.data

    }));

    return result;
  }

  newProductCategory($event?: Event, parent?: IProductCategoryItem) {
    const dialogRef = this.dialog.open(ProductCategoryComponent, {
      data: {
        parent
      }
    } as MatDialogConfig<IProductCategoryDialogData>);

    dialogRef.afterClosed().pipe(first()).subscribe(async result => {
      await this.retrieveData().toPromise();
      const match = this.dataResponse.find(item => item.id == (this.currentCategory && this.currentCategory.id));
      this.expandNode(match);

      console.log(`Dialog result: ${result}`);
    });
  }

  expandNode(match: IProductCategoryItem) {
    if (match) {
      let current = match;
      while (current) {
        this.treeControl.expand(current);
        current = this.dataResponse.find(item => item.children.some(child => child == current));
      }
    }
  }

  hasChild = (_: number, node: IProductCategoryItem) => node.children && node.children.length > 0;

  setCurrent(item: IProductCategoryItem) {
    this.currentCategory = item;
  }

  newChildCategory(parent: IProductCategoryItem) {
    this.newProductCategory(null, parent);
  }

  async deleteCurrentCategory() {
    await this.service.delete(this.currentCategory.id).toPromise();
    // await this.retrieveData().toPromise();
    this.gridConfig.refresh();

  }
}
