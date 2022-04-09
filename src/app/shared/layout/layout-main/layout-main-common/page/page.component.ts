import { MenuService } from 'src/app/shared/layout/layout-main/navigation/menu/menu.service';
import { Component, ContentChild, Input, OnInit, TemplateRef, AfterViewInit } from '@angular/core';
import { AppMenuService } from 'src/app/main/shared/menu/app-menu.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewInit {


  @Input() pageIcon: string;
  @Input() pageTitle: string;
  @Input() navigationItem: string;
  pageIconFontset: string;

  @ContentChild('optionsContent', { static: false })
  optionsContent: TemplateRef<any>

  constructor(
    public menuService: MenuService,
    public appMenuService: AppMenuService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.navigationItem) {
        const navItem = this.appMenuService.navigationService.findItem(this.navigationItem);
        if(navItem){
          this.pageTitle = navItem.label;
          this.pageIcon = navItem.icon;
          this.pageIconFontset = navItem.fontSet;
        }
      }
    });
  }

}
