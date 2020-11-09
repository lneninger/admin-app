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

  build(...ids: string[]) {
    const result = ids
      .map(id => id === NavigationItemIds.DIVIDER ? {type: 'divider'} as NavigationItem : (this.itemsInternal.find(item => item.id ? item.id.toUpperCase() === id.toUpperCase() : false)))
      .filter(item => item != null);

    // debugger;
    return result;
  }
}


export interface NavigationItem {
  id?: string;
  icon?: string;
  fontSet?: string;
  label?: string;
  routerLink?: any;
  type?: 'divider';
}
