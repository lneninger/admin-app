import { Injectable } from '@angular/core';
import { first, firstValueFrom, lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/main/services/user/user.service';
import { waitFor } from 'src/app/main/services/utilities';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';



@Injectable({
  providedIn: 'root'
})
export class MockerService {

  constructor(
    private service: FirebaseService
  ) {

    const p = this.initialize();
    waitFor(p);

    // setTimeout(async () => {
    //   await this.initialize();
    // });

  }
  /**
   * Initialize mocked firebase emulator
   */
  async initialize() {
    const dataMockerFn = this.service.fns.httpsCallable('dataMocker');
    await firstValueFrom(dataMockerFn({}));
  }
}
