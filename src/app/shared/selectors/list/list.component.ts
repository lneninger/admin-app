import { ISelectorConfigItem, ISelectorConfigItemUserData } from './../selectors.models';
import { Component, Input, OnInit } from '@angular/core';
import { LabelValueLower } from '../../general.models';
import { ISelectorConfig } from '../selectors.models';

@Component({
  selector: 'app-selector-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SelectorListComponent implements OnInit {

  @Input() config: ISelectorConfig;


  currentSelectors: ISelectorConfigItemUserData[] = [];

  get selectors() {
    return (this.config.items || []).map(item => ({ label: item.label, value: item.identifier } as LabelValueLower))

  }


  ngOnInit(): void {
  }


  setEditing(editing: boolean, item: ISelectorConfigItemUserData) {
    editing = editing != null ? editing : true;
    item.editing = editing;
    if(item.editing == false){
      item.isNew = false;
    }
  }


  identifierChanged(identifier, item: ISelectorConfigItem) {

  }

  newSelector() {
    const item = {
      isNew: true,
      editing: true,
    } as ISelectorConfigItemUserData;

    this.currentSelectors.push(item);
  }
}
