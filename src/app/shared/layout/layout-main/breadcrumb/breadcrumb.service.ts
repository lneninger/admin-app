import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private itemsInternal: BreadCrumbItem[] = [];
  currentBreadCrumb: BreadCrumbItem[] = [];

  get items(): BreadCrumbItem[] {
    return [...this.itemsInternal];
  }

  constructor(private router: Router) {

  }

  addItem(addItem: BreadCrumbItem) {
    if (!this.itemsInternal.some(item => item.id.toUpperCase() === addItem.id.toUpperCase())) {
      this.itemsInternal.push(addItem);
    }
  }

  clear() {
    this.itemsInternal = [];
  }

  build(...ids: string[]) {
    this.currentBreadCrumb = ids
      .map(id => this.itemsInternal.find(item => item.id ? item.id.toUpperCase() === id.toUpperCase() : false))
      .filter(item => item != null);
  }
}


export interface BreadCrumbItem {
  id?: string;
  icon?: string;
  fontSet?: string;
  label: string;
  routerLink: any;
}
