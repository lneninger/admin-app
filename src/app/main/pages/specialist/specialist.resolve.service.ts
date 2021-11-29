import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Specialist } from '../../services/specialist/specialist.models';
import { SpecialistService } from '../../services/specialist/specialist.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialistResolveService implements Resolve<Specialist> {

  constructor(private service: SpecialistService) {

  }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {


    const params = route.params;

    const itemId = route.paramMap.get('id');
    const doc = await this.service.get(itemId);
    const item = doc.data() as Specialist;
    item.id = doc.id;

    return this.service.setCurrentSpecialist(item);


  }
}

