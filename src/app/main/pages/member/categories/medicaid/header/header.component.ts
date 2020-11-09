import { Component, OnInit } from '@angular/core';
import { ProductCategoryNames } from 'src/app/main/shared/general.models';

@Component({
  selector: 'app-medicaid-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class MedicaidHeaderComponent implements OnInit {

  categoryName = ProductCategoryNames.Medicaid;

  constructor() { }

  ngOnInit(): void {
  }

}
