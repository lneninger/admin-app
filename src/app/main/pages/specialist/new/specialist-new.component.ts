import { Router, ActivatedRoute } from '@angular/router';
import { SpecialistService } from '../../../services/specialist/specialist.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { AddSpecialistRequest } from 'src/app/main/services/specialist/specialist.models';

@AutoUnsubscribe()
@Component({
  selector: 'app-specialist-new',
  templateUrl: './specialist-new.component.html',
  styleUrls: ['./specialist-new.component.scss']
})
export class SpecialistSettingsComponent extends BaseComponent implements OnInit {


  form = this.createForm();
  saving: boolean;

  constructor(
    breadcrumbService: BreadcrumbService,
    private fmBuilder: FormBuilder,
    private service: SpecialistService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.QUOTES, NavigationItemIds.QUOTE_NEW);
  }

  ngOnInit(): void {
  }

  createForm() {
    return this.fmBuilder.group({
      description: [],
      activateDate: [new Date(), [Validators.required]]
    });
  }


  async onSubmit(event: Event) {
    if (this.form.valid) {
      const request = this.form.getRawValue() as AddSpecialistRequest;
      this.saving = true;
      try {
        const response = await this.service.add(request);
        await this.router.navigate([`app/specialists/${response.id}`]);
      } catch (error) {

      } finally {
        this.saving = false;

      }
    }
  }

  async cancel(event: Event) {
    await this.router.navigate(['../'], { relativeTo: this.route });
  }
}
