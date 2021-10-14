import { NavigationItemIds } from 'src/app/main/main.navigation';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

  build(...ids: NavigationItemInput[]) {
    return ids
      .map(idInput => {

        let complex = false;
        let id: string;
        if (idInput instanceof NavigationItemInputComplex) {
          id = (idInput as NavigationItemInputComplex).id;
          complex = true;
        } else {
          id = idInput as string;
        }

        if (id === NavigationItemIds.DIVIDER) {
          return { type: 'divider' } as NavigationItem;
        } else {
          let item = this.itemsInternal.find(internalItem => internalItem.id ? internalItem.id.toUpperCase() === id.toUpperCase() : false);
          return complex ? this.formatComplexNavigationItem(item, idInput) : item;
        }
      })
      .filter(item => item != null);

  }
  formatComplexNavigationItem(item: NavigationItem, idInput: NavigationItemInput): any {
    throw new Error('Method not implemented.');
  }
}


export interface NavigationItem {
  id?: string;
  icon?: string;
  fontSet?: string;
  label?: string;
  routerLink?: any;
  type?: 'divider';
  bottom?: boolean;
}

export class NavigationItemInputComplex {
  id: string;
}

export type NavigationItemInput = string | NavigationItemInputComplex;
