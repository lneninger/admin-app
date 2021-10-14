import { MaterialImportsModule } from './../../material-imports.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
import { PageComponent } from './page/page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatBadgeModule} from '@angular/material/badge';

import { CustomOverlayModule } from './overlay/overlay.module';

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    MaterialImportsModule,


    CustomOverlayModule



  ],
  exports: [
    CommonModule,
    AppCommonModule,
    MaterialImportsModule,
    CustomOverlayModule,

    PageComponent,
  ]
})
export class LayoutMainCommonModule { }
