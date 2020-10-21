import { Component, Inject, OnInit } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { environment } from 'src/environments/environment';
import { AppOptionsService } from '../options/app-options.service';
import { DOCUMENT } from '@angular/common';
import { LayoutMainService } from '../layout-main.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  appTitle = environment.appTitle;

  searchText: string;
  constructor(
    public layoutMainService: LayoutMainService,
    public menuService: MenuService,
    public optionsService: AppOptionsService) {

  }

  async ngOnInit() {
    console.log(`appTitle -> ${this.appTitle}`);
  }


  toggleFullscreen() {
    // debugger;
    if (this.layoutMainService.fullScreen) {
      this.closeFullscreen();
    } else {
      this.openFullscreen();
    }
  }

  openFullscreen() {
    this.layoutMainService.openFullscreen();
  }
  /* Close fullscreen */
  closeFullscreen() {
    this.layoutMainService.closeFullscreen();
  }

}
