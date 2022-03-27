import { Directive, OnDestroy } from '@angular/core';
import { AppInitializerService } from './app-initializer/app-initializer.service';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  AppInitializerService = AppInitializerService;

  ngOnDestroy(): void {
  }

}
