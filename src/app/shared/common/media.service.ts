import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  activeMedia: MediaChange;
  get activeMediaQuery(): string{
    return this.activeMedia && this.activeMedia.mqAlias;
  }
  mediaObserver: MediaObserver;

  constructor(/*public mediaObserver: MediaObserver*/) {
    // this.initialize();
  }

  initialize(mediaObserver: MediaObserver) {
    if (!this.mediaObserver) {
      this.mediaObserver = mediaObserver;

      this.mediaObserver.asObservable().subscribe(medias => {
        // debugger;
        this.activeMedia = medias.find(media => this.mediaObserver.isActive(media.mqAlias));
      });
    }
  }

}
