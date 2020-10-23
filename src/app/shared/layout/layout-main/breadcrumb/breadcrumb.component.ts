import { BreadcrumbService } from './breadcrumb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(public service: BreadcrumbService) {

  }

  ngOnInit(): void {
  }

}
