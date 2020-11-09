import { BaseCategoryStateModel } from './../../../../services/+categories/base-category.models';
import { Store } from '@ngxs/store';
import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BaseCategoryState } from 'src/app/main/services/+categories/base-category.service';
import { Observable } from 'rxjs';
import { CategoryOrchestratorService } from 'src/app/main/services/+categories/orchestrator.service';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.scss']
})
export class HeaderItemComponent implements OnInit {

  private internalCategoryName: string;
  categoryState$: Observable<BaseCategoryStateModel>;
  categoryService: BaseCategoryState;

  @ViewChild('bodyContent')
  bodyContent: TemplateRef<any>;

  @Input()
  set categoryName(value: string) {
    this.internalCategoryName = value;
    this.categoryService = this.service.loadCategoryServiceByName(value);
  }

  constructor(private store: Store, private service: CategoryOrchestratorService) { }

  ngOnInit(): void {
  }

}
