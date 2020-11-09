import { BreadcrumbService } from './breadcrumb.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent extends BaseComponent implements OnInit {

  constructor(public service: BreadcrumbService) {
    super();
  }

  ngOnInit(): void {
  }

}
