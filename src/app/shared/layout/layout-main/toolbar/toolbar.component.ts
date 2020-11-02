import { Select } from '@ngxs/store';
import { Component, ContentChild, ElementRef, HostListener, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { environment } from 'src/environments/environment';
import { AppOptionsService } from '../options/app-options.service';
import { DOCUMENT } from '@angular/common';
import { LayoutMainService } from '../layout-main.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { MatInput } from '@angular/material/input';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  appTitle = environment.appTitle;

  @ContentChild('toolbarExtraOptions', { static: false })
  toolbarExtraOptions: TemplateRef<any>;

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
