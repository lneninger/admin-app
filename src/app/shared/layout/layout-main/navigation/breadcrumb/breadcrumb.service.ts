import { NavigationItem, NavigationService } from './../navigation.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItemIds } from 'src/app/main/main.navigation';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  currentBreadCrumb: NavigationItem[] = [];

  constructor(private navigationService: NavigationService) {

  }

  build(...ids: string[]) {
    this.currentBreadCrumb = this.navigationService.build(...ids);
    return this.currentBreadCrumb;
  }

  updateItems(patch: Partial<NavigationItem>, ids: NavigationItemIds[]) {
    ids.forEach(id => {
      const index = this.currentBreadCrumb.findIndex(item => item.id === id);
      this.currentBreadCrumb.splice(index, 1, {...this.currentBreadCrumb[index], ...patch});
    });

  }

}
