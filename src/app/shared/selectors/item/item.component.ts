import { ISelectorConfig } from 'src/app/shared/selectors/selectors.models';
import { ISelectorConfigItemUserData } from './../selectors.models';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { LabelValueLower } from '../../general.models';
import { ISelectorConfigItem } from '../selectors.models';

@Component({
  selector: 'app-selector-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class SelectorItemComponent implements OnInit {


  @Output() identifierChanged = new EventEmitter<string>();
  @Output() editing = new EventEmitter<boolean>();

  private _config: ISelectorConfig;
  @Input() set config(value: ISelectorConfig) {
    this._config = value;
    this.formatConfig();
  }
  get config() {
    return this._config;
  }


  get itemSelector() {
    if (this._item) {
      return this._config.items.find(selectorItem => selectorItem.identifier === this._item.identifier);
    }
    return null;
  }

  get saveOptions() {
    return !this.item?.isNew ? 'fas fa-save' : 'fas fa-plus';
  }

  private _item: ISelectorConfigItemUserData;
  @Input() set item(value: ISelectorConfigItemUserData) {
    this._item = value;
    this.formatItem();
  }
  get item() {
    return this._item;
  }


  selectors: LabelValueLower[];

  template: TemplateRef<any>;


  @ViewChild('multiSelect', { static: true }) multiSelect: TemplateRef<any>;
  @ViewChild('input', { static: true }) input: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }


  formatItem() {
    this.setTemplate();
  }

  setTemplate() {
    switch (this.itemSelector && this.itemSelector.type) {
      case 'multiSelect':
        this.template = this.multiSelect;
        break;
      case 'input':
        this.template = this.input;
        break;
    }
  }

  formatConfig() {
    if (this.config) {
      this.selectors = (this.config.items || []).map(selectorItem => ({ label: selectorItem.label, value: selectorItem.identifier } as LabelValueLower))
    } else {
      this.selectors = [];
    }
  }



  setEditing(editing?: boolean) {
    this.editing.emit(editing);
  }

  onSelectorChange(identifier) {
    this.formatItem();
    this.identifierChanged.emit(identifier);

  }

}
