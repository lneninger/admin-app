import { firstValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/main/services/user/user.service';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';



@Injectable({
  providedIn: 'root'
})
export class MockerService {

  constructor(
    private service: FirebaseService,
    private userService: UserService
  ) {

    setTimeout(async () => {
      await this.initialize();
    });

  }
  /**
   * Initialize mocked firebase emulator
   */
  async initialize() {
    //#region Auth
    const dataMockerFn = this.service.fns.httpsCallable('dataMocker');
    await firstValueFrom(dataMockerFn({}));
  }
}
