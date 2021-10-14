import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { AddSpecialistRequest, UpdateSpecialistRequest } from 'src/app/main/services/specialist/specialist.models';
import { SpecialistService } from 'src/app/main/services/specialist/specialist.service';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-specialist-update',
  templateUrl: './specialist-update.component.html',
  styleUrls: ['./specialist-update.component.scss']
})
export class SpecialistUpdateComponent implements OnInit {

  form = this.createForm();


  fakeGrowers = [
    {label: 'Grower1', value: '1'},
    {label: 'Grower2', value: '2'},
    {label: 'Grower3', value: '3'},
    {label: 'Grower4', value: '4'},
    {label: 'Grower5', value: '5'},
    {label: 'Grower6', value: '6'},
    {label: 'Grower7', value: '7'},
    {label: 'Grower8', value: '8'},
    {label: 'Grower9', value: '9'},
  ]

  constructor(
    breadcrumbService: BreadcrumbService,
    private fmBuilder: FormBuilder,
    private service: SpecialistService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // debugger;
    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.QUOTES, NavigationItemIds.QUOTE_EDIT);
   }

  async ngOnInit(): Promise<void> {
  }


  createForm() {
    return this.fmBuilder.group({
      description: [],
      grower: [],
      activateDate: [new Date(), [Validators.required]]
    });
  }


  async onSubmit(event: Event) {
    if (this.form.valid) {
      const request = this.form.getRawValue() as UpdateSpecialistRequest;
      try {
        const id = this.service.snapshot.currentSpecialist.id;
        const response = await this.service.update(id, request);
        this.router.navigate([`app/quotes/${id}`]);
      } catch (error) {

      }
    }
  }

}
