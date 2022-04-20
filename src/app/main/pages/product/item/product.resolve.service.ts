import { first, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofActionCompleted, ofActionDispatched, Store } from '@ngxs/store';
import { Observable, combineLatest, firstValueFrom } from 'rxjs';
import { AppStateModel } from 'src/app/app.state';
import { ProductCategoryService } from 'src/app/main/services/product-category/product-category.service';
import { IProductCategory } from 'src/app/main/services/product-category/product-category.models';

@Injectable({
  providedIn: 'root'
})
export class QuoteResolveService implements Resolve<IProductCategory> {

  constructor(private service: ProductCategoryService) {

  }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {


    const params = route.params;

    const itemId = route.paramMap.get('id');
    const obj = await firstValueFrom(this.service.get(itemId));

    return this.service.setCurrent(obj);

    // return new Observable(observer => {
    //   this.actions$
    //   .pipe(ofActionCompleted(ProcessTelephonyParamsAction), switchMap(_ => {
    //     debugger;
    //     return this.store.dispatch(new GetMemberAction(route.paramMap.get('id')));
    //   }), tap(data => {
    //     debugger
    //     observer.next(data);
    //   }
    //     ));
    // });

  }
}

