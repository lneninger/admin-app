import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../error-service';

@Component({
  selector: 'app-error-401',
  templateUrl: './error401.component.html',
  styleUrls: ['./error401.component.scss']
})
export class Error401Component implements OnInit {

    constructor(public errorService: ErrorService) { }

  ngOnInit() {
  }

}
