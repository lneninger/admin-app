import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { environment } from 'src/environments/environment';
import { AppOptionsService } from '../options/app-options.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  appTitle = environment.appTitle;

  searchText: string;
  constructor(public menuService: MenuService, public optionsService: AppOptionsService) {

  }

  ngOnInit() {
    console.log(`appTitle -> ${this.appTitle}`);
  }

}
