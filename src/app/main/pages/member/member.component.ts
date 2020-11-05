import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadCrumbItem, BreadcrumbService } from 'src/app/shared/layout/layout-main/breadcrumb/breadcrumb.service';
import { environment } from 'src/environments/environment';
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

    this.breadcrumbService.addItem({
      id: 'MEMBER',
      label: memberWrapper.member.fullName, // 'Member',
      routerLink: ['/app/member'],
      icon: 'fa-id-card',
      fontSet: 'far'
    } as BreadCrumbItem);

    this.breadcrumbService.build('HOME', 'MEMBER');
  }


  ngOnInit() {



  }

}
