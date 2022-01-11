import { ProductCategoryService } from 'src/app/main/services/product-category/product-category.service';
import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProductRequest, IProductDialogData, IProductItem } from 'src/app/main/services/product/product.models';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ProductService } from 'src/app/main/services/product/product.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { IProductCategoryItem } from 'src/app/main/services/product-category/product-category.models';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  form: FormGroup;
  tagInputControl = new FormControl();
  item: IProductItem;
  parent: IProductItem;


  //#region  Product Tags
  productTags = this.service.productTags;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  categoryTreeControl = new NestedTreeControl<IProductCategoryItem>(node => node.children);
  categoryTreeDataSource = new MatTreeNestedDataSource<IProductCategoryItem>();
  categoryDataResponse: IProductCategoryItem[];
  currentCategory: IProductCategoryItem;

  currentProduct: IProductItem;

  get tagFormControl() {
    return this.form.get('tags');
  }


  get tagsRaw(): string {
    return this.form.get('tags').value as string || '';
  }

  set tagsRaw(value: string) {
    this.tagFormControl.setValue(value);
  }

  //#endregion

  constructor(
    private fmBuilder: FormBuilder,
    private service: ProductService,
    private categoryService: ProductCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: IProductDialogData,
    private dialogRef: MatDialogRef<ProductComponent>
  ) {
    // debugger;
    this.item = data.item;
    this.parent = data.parent;
  }

  ngOnInit(): void {
    this.retrieveData().pipe(first()).subscribe();
    this.form = this.createForm();
  }

  createForm() {
    return this.fmBuilder.group({
      name: [this.item && this.item.name, [Validators.required]],
      description: [this.item && this.item.description],
      parentId: [(this.parent && this.parent.id)],
      tags: [(this.item && this.parent.tags)]
    });
  }

  retrieveData() {
    // debugger;
    const result = this.categoryService.getAll().pipe(tap(response => {
      // debugger;
      this.categoryDataResponse = response;
      this.categoryTreeDataSource.data = this.categoryService.formatTreeData([...response], null);
      this.categoryTreeControl.dataNodes = this.categoryTreeDataSource.data

    }));

    return result;
  }

  async onSubmit(event: Event) {
    if (this.form.valid) {
      const request = this.form.getRawValue() as AddProductRequest;
      try {
        await this.service.add(request);
      } catch (error) {

      }

      this.dialogRef.close();
    }
  }

  //#region Tree
  expandNode(match: IProductItem) {
    if (match) {
      let current = match;
      while (current) {
        // Leonardo: this.categoryTreeControl.expand(current);
        // Leonardo: this.currentCategory = this.categoryDataResponse.find(item => item.children.some(child => child == current));
      }
    }
  }

  hasChild = (_: number, node: IProductItem) => node.children && node.children.length > 0;

  setCurrentCategory(item?: IProductCategoryItem) {
    item = item || this.currentCategory;
    this.currentCategory = item;
  }

  setCurrentProduct(item: IProductItem) {
    this.currentProduct = item;
  }

  async deleteCurrentProduct() {
    await this.service.delete(this.currentProduct.id);
    // await this.retrieveData().toPromise();

  }//#endregion
}
