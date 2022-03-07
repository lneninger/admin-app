import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProductCategoryRequest, IProductCategoryDialogData, IProductCategoryItem } from 'src/app/main/services/product-category/product-category.models';
import { ProductCategoryService } from 'src/app/main/services/product-category/product-category.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  form: FormGroup;
  tagInputControl = new FormControl();
  item: IProductCategoryItem;
  parent: IProductCategoryItem;


  //#region  Category Tags
  productCategoryTags = this.service.productCategoryTags;

  separatorKeysCodes: number[] = [ENTER, COMMA];



  get tagFormControl() {
    return this.form.get('tags');
  }


  get tagsRaw(): string {
    return this.form.get('tags').value as string || '';
  }

  set tagsRaw(value: string) {
    this.tagFormControl.setValue(value);
  }

  get selectedTags(): string[] {
    const value = this.tagsRaw as string;
    return value ? value.split(',').map(item => item.trim().toLocaleUpperCase()) : [] as string[];
  }


  setTags(value: string) {
    const split = (value || '').split(',').map(item => item.trim().toLocaleUpperCase());
    const toAdd: string[] = [];
    split.forEach(newItem => {
      if (newItem.length > 0) {
        if (!this.selectedTags.some(tagsItem => tagsItem === newItem)) {
          toAdd.push(newItem);
        }
      }

    });

    if (toAdd.length > 0) {
      let formValue = this.tagsRaw;
      const newItemsFormatted = this.stringJoin(toAdd);
      formValue = (formValue || '').length === 0 ? newItemsFormatted : (formValue + ',' + newItemsFormatted);
      this.tagsRaw = formValue;
    }

  }
  stringJoin(toAdd: string[], separator = ',') {
    return toAdd.reduce((prev, cur, index, toAdd) => (prev || '') + separator + cur);
  }

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  //#endregion

  constructor(
    private fmBuilder: FormBuilder,
    private service: ProductCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: IProductCategoryDialogData,
    private dialogRef: MatDialogRef<ProductCategoryComponent>
  ) {
    // debugger;
    this.item = data.item;
    this.parent = data.parent;
  }

  ngOnInit(): void {
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

  async onSubmit(event: Event) {
    if (this.form.valid) {
      const request = this.form.getRawValue() as AddProductCategoryRequest;
      try {
        const response = await firstValueFrom(this.service.add(request));
      } catch (error) {

      }

      this.service.reload$.next(null);
      this.dialogRef.close();
    }
  }

  addTag($event: MatChipInputEvent) {
    const input = $event.input;
    const value = $event.value;

    // Add our fruit
    if (value) {
      this.setTags(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagInputControl.setValue(null);
  }

  remove(value: string): void {
    const tags = this.selectedTags;
    const index = tags.indexOf((value || '').trim().toLocaleUpperCase());

    if (index >= 0) {
      tags.splice(index, 1);
      this.tagsRaw = this.stringJoin(tags);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.setTags(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagInputControl.setValue(null);
  }

}
