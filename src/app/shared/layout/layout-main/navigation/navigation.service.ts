import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItemIds } from 'src/app/main/main.navigation';

import { NavigationItem, NavigationItemInput, NavigationItemInputComplex } from './navigation.models';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private itemsInternal: NavigationItem[] = [];
  currentBreadCrumb: NavigationItem[] = [];

  get items(): NavigationItem[] {
    return [...this.itemsInternal];
  }

  constructor(private router: Router) {

  }

  addItem(...addItems: NavigationItem[]) {
    addItems.forEach(addItem => {
      if (!this.itemsInternal.some(item => item.id.toUpperCase() === addItem.id.toUpperCase())) {
        this.itemsInternal.push(addItem);
      }
    });
  }

  clear() {
    this.itemsInternal = [];
  }

  async build(...ids: NavigationItemInput[]) {
    const result:  NavigationItem[] = [];
    let generatedItem: NavigationItem;
    for (let idInput of ids) {

      let complex = false;
      let id: string;
      if (idInput instanceof NavigationItemInputComplex) {
        id = (idInput as NavigationItemInputComplex).id;
        complex = true;
      } else {
        id = idInput as string;
      }

      if (id === NavigationItemIds.DIVIDER) {
        generatedItem = { type: 'divider' } as NavigationItem;
      } else {
        let item = this.itemsInternal.find(internalItem => internalItem.id ? internalItem.id.toUpperCase() === id.toUpperCase() : false);
        generatedItem = complex ? await this.formatComplexNavigationItem(item, idInput as NavigationItemInputComplex) : item;
      }

      result.push(generatedItem);
    }


    return result.filter(item => item != null);

  }

  async formatComplexNavigationItem(item: NavigationItem, idInput: NavigationItemInputComplex): Promise<NavigationItem> {
    const disabled = typeof (idInput.disabled) === 'boolean' ? idInput.disabled : await idInput.disabled();

    return {
      ...item,
      disabled
    } as NavigationItem;
  }
}



