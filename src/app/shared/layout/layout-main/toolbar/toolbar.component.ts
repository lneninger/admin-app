import { Select } from '@ngxs/store';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { environment } from 'src/environments/environment';
import { AppOptionsService } from '../options/app-options.service';
import { DOCUMENT } from '@angular/common';
import { LayoutMainService } from '../layout-main.service';
import { animate, state, style, transition, trigger, useAnimation, AnimationEvent } from '@angular/animations';
import { bounce, bounceInLeft, fadeInLeft, fadeInRight, fadeOutLeft, fadeOutRight } from 'ng-animate';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { MatInput } from '@angular/material/input';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: {
    '(@searchToggle.done)': 'captureDoneEvent($event)',
  },
  animations: [
    trigger('searchToggle', [

      state('open', style({
        width: '100%',
        padding: '1rem'
      })),
      state('close', style({
        width: '0px',
      })),
      transition('void => close', [animate('0s')]),
      transition('* => close', [animate('0.2s')]),
      transition('* => open', [animate('0.5s')]),

    ])
  ],
})
export class ToolbarComponent implements OnInit {
  appTitle = environment.appTitle;


  @ViewChild('searchContainer')
  searchContainer: ElementRef;

  @ViewChild('searchInput')
  searchInput: ElementRef;

  showSearch: boolean;
  searchText: string;
  clickInside: boolean;
  constructor(
    public layoutMainService: LayoutMainService,
    public menuService: MenuService,
    public optionsService: AppOptionsService) {

  }

  async ngOnInit() {
    console.log(`appTitle -> ${this.appTitle}`);
  }

  @HostListener('click')
  click() {
    this.clickInside = true;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    // debugger;
    if (!this.clickInside) {
      // debugger;
      this.showSearch = false;
    }

    this.clickInside = false;
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


  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  captureDoneEvent(event: AnimationEvent) {
    if (event.toState === 'open') {
      // debugger;
      this.searchInput.nativeElement.focus();
    }
  }

  search() {

  }
}
