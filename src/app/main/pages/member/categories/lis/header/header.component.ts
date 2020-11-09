import { Component, OnInit } from '@angular/core';
import { ProductCategoryNames } from 'src/app/main/shared/general.models';

@Component({
  selector: 'app-lis-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class LISHeaderComponent implements OnInit {

  categoryName = ProductCategoryNames.LIS;

  constructor() { }

  ngOnInit(): void {
  }

}
