import { MenuService } from 'src/app/shared/layout/layout-main/navigation/menu/menu.service';
import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { AppMenuService } from 'src/app/main/shared/menu/app-menu.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {


  @Input() icon: string;
  @Input() title: string;

  @ContentChild('optionsContent', { static: false })
  optionsContent: TemplateRef<any>

  constructor(
    public menuService: MenuService,
    public appMenuService: AppMenuService
    ) { }

  ngOnInit() {
  }

}
