import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFilesComponent } from './user-files.component';

const routes: Routes = [{ path: '', component: UserFilesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFilesRoutingModule { }
