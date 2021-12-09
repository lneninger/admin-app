import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RouterOutletComponent } from './router-outlet.component';

@NgModule({
  imports: [RouterModule],
  declarations: [
    RouterOutletComponent
  ],
  exports: [
    RouterOutletComponent
  ]
})
export class RouterOutletModule {
}
