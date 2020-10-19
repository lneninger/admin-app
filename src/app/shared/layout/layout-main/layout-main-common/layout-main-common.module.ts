import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAccordion, MatButtonModule, MatCardModule, MatExpansionModule, MatFormField, MatFormFieldModule, MatGridListModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import { PageComponent } from './page/page.component';



@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    MatExpansionModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,



  ],
  exports: [
    CommonModule,
    AppCommonModule,
    MatExpansionModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,


    PageComponent,


  ]
})
export class LayoutMainCommonModule { }
