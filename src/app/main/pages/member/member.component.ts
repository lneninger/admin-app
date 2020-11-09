import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { environment } from 'src/environments/environment';
import { NavigationItemIds } from '../../main.navigation';
import { MemberWrapperModel } from '../../services/member/states/member.models';
import { MemberState } from '../../services/member/states/member.state';


@AutoUnsubscribe()
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent extends BaseComponent implements OnInit {


  constructor(private breadcrumbService: BreadcrumbService, private titleService: Title, private route: ActivatedRoute) {
    super();

    const memberWrapper = route.snapshot.data.memberWrapper as MemberWrapperModel;

    this.titleService.setTitle(`${environment.appTitle} - ${memberWrapper.member.fullName}`);

    this.breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.MEMBER);
    this.breadcrumbService.updateItem(NavigationItemIds.MEMBER, {label: memberWrapper.member.fullName});
  }


  ngOnInit() {



  }

}
