import { MockerService } from './shared/firebase/mocker.service';
import { AuthService } from './main/services/user/auth.service';
import { Store } from '@ngxs/store';
import { Component } from '@angular/core';
import { UserService } from './main/services/user/user.service';
import { NavigationService } from './shared/layout/layout-main/navigation/navigation.service';
import { navigationItems } from './main/main.navigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    navigationService: NavigationService,
    mockerService: MockerService
  ) {
    navigationService.addItem(...navigationItems);

  }
}
