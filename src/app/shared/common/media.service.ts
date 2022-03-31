import { AppConfigState, MenuMode } from 'src/app/shared/layout/states/appconfig.state';
import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root'
})
export class MediaService  {

  activeMedia: MediaChange;
  get activeMediaQuery(): string{
    return this.activeMedia && this.activeMedia.mqAlias;
  }
  mediaObserver: MediaObserver;

  constructor(private appConfigState: AppConfigState/*public mediaObserver: MediaObserver*/) {
    // this.initialize();
  }

  initialize(mediaObserver: MediaObserver) {
    if (!this.mediaObserver) {
      this.mediaObserver = mediaObserver;

      this.mediaObserver.asObservable().subscribe(medias => {
        this.activeMedia = medias.find(media => this.mediaObserver.isActive(media.mqAlias));
        this.processMedia();
      });
    }
  }
  processMedia() {
    switch(this.activeMedia.mqAlias.toLocaleUpperCase()){
      case 'XS':
      case 'SM':
        this.appConfigState.setMenuMode(MenuMode.Over);
        break;
      case 'MD':
      case 'LG':
      case 'XL':
        this.appConfigState.setMenuMode(MenuMode.Side);
        break;
    }
    console.log(`this.activeMedia => `, this.activeMedia);
  }

}
