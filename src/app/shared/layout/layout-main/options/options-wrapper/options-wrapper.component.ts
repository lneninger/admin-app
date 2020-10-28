import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-options-wrapper',
  templateUrl: './options-wrapper.component.html',
  styleUrls: ['./options-wrapper.component.scss']
})
export class OptionsWrapperComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
