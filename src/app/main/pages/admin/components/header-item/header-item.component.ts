import { BaseCategoryStateModel } from '../../../../services/+categories/base-category.models';
import { Store } from '@ngxs/store';
import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryOrchestratorService } from 'src/app/main/services/+categories/orchestrator.service';
import { BaseCategoryState } from 'src/app/main/services/+categories/base-category.state';
import { BaseCategoryService } from 'src/app/main/services/+categories/base-category.service';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.scss']
})
export class HeaderItemComponent implements OnInit {

  private internalCategoryName: string;
  categoryState$: Observable<BaseCategoryStateModel>;
  categoryService: BaseCategoryService;

  @ViewChild('bodyContent')
  bodyContent: TemplateRef<any>;

  @Input()
  set categoryName(value: string) {
    // debugger;
    this.internalCategoryName = value;
    this.categoryService = this.service.loadCategoryServiceByName(value);
    this.categoryState$ = this.categoryService.state$;

  }

  constructor(private store: Store, private service: CategoryOrchestratorService) { }

  ngOnInit(): void {
  }

}
