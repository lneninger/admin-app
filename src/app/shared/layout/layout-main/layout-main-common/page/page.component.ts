import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { AppMenuService } from 'src/app/main/shared/menu/app-menu.service';
import { MenuService } from 'src/app/shared/layout/layout-main/navigation/menu/menu.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  @Input() pageIcon: string;
  @Input() pageTitle: string;
  @Input() set navigationItem(value: string){
    if(value){
      this.loadNavigationConfiguration(value);
    }
  }
  pageIconFontset: string;

  @ContentChild('optionsContent', { static: false })
  optionsContent: TemplateRef<any>

  constructor(
    public menuService: MenuService,
    public appMenuService: AppMenuService
  ) { }


  loadNavigationConfiguration(navigationItem) {
    if (navigationItem) {
      const navItem = this.appMenuService.navigationService.findItem(navigationItem);
      if(navItem){
        this.pageTitle = navItem.label;
        this.pageIcon = navItem.icon;
        this.pageIconFontset = navItem.fontSet;
      }
    }
  }

}
