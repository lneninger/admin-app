import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-empty',
  templateUrl: './layout-empty.component.html',
  styleUrls: ['./layout-empty.component.scss']
})
export class LayoutEmptyComponent implements OnInit {

@HostBinding('class.app-wrapper') appWrapper = true;

  constructor() { }

  ngOnInit() {
  }

}
