import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-overlay',
  templateUrl: './custom-overlay.component.html',
  styleUrls: ['./custom-overlay.component.scss']
})
export class CustomOverlayComponent implements OnInit {

  public isOverlayDisplayed = false;

  @Input()
  target: ElementRef;

  @ContentChild('overlayContent', { static: false })
  overlayContent: TemplateRef<any>;

  public readonly overlayOptions: Partial<CdkConnectedOverlay> = {
    hasBackdrop: true,
    positions: [
      { originX: 'end', originY: 'bottom', overlayX: 'start',  overlayY: 'top'}
    ],
    /* You can add to this object all of these options */
    // backdropClass: '',
    // flexibleDimensions: false,
    // growAfterOpen: false,
    // height: 'auto',
    // width: 'auto',
    // lockPosition: true,
    // minHeight: 'unset',
    // minWidth: 'unset',
    // offsetX: 0,
    // offsetY: 0,
    // panelClass: '',
    // positionStrategy,
    // push,
    // scrollStrategy,
    // transformOriginSelector,
    // viewportMargin,
  };

  constructor() { }

  ngOnInit() {
  }

  public displayOverlay(): void {
    this.isOverlayDisplayed = true;
  }

  public hideOverlay(): void {
    this.isOverlayDisplayed = false;
  }


}
