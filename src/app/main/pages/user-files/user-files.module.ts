import { NgModule } from '@angular/core';
import { AppUploadModule } from 'src/app/shared/components/app-upload/app-upload.module';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';

import { UserFilesRoutingModule } from './user-files-routing.module';
import { UserFilesComponent } from './user-files.component';


@NgModule({
  declarations: [
    UserFilesComponent
  ],
  imports: [
    LayoutMainCommonModule,
    UserFilesRoutingModule,
    AppUploadModule
  ]
})
export class UserFilesModule { }
