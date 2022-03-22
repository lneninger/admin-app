import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService{


  static cloneHard<T>(obj: T): T {
    if (!!obj) {
        return JSON.parse(JSON.stringify(obj)) as T;
    }

    return obj;
}
}
