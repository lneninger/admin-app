import { DOCUMENT } from '@angular/common';
import { HostListener, Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutMainService {
  fullScreen: boolean;

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes(event) {
    this.chkScreenMode();
  }

  constructor(
    @Inject(DOCUMENT) private document: any
    ) { }



  openFullscreen() {
    const elem = this.document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }

    this.fullScreen = true;
  }

  chkScreenMode() {
    if (document.fullscreenElement) {
      // fullscreen
      this.fullScreen = true;
    } else {
      // not in full screen
      this.fullScreen = false;
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    const document = this.document;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
    this.fullScreen = false;
  }

}
