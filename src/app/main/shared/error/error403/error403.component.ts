import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../error-service';

@Component({
  selector: 'app-error-403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.scss']
})
export class Error403Component implements OnInit {

    constructor(public errorService: ErrorService) { }

  ngOnInit() {
  }

}
