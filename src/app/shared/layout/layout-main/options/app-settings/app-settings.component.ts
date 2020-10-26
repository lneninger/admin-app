import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';



const globalTenants = [
  {
    id: 1,
    name: 'UHC'
  },
  {
    id: 2,
    name: 'EBM'
  },
  {
    id: 3,
    name: 'TESTING'
  }
];

const globalRoles = [
  {
    id: 1,
    name: 'Screener'
  },
  {
    id: 2,
    name: 'Advocate'
  },
  {
    id: 3,
    name: 'Quality Assurance'
  },
  {
    id: 4,
    name: 'Admin'
  }
];

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent implements OnInit {

  globalTenants = globalTenants;
  selectedTenants = [];


  globalRoles = globalRoles;
  userRole: any;

  legacy: string;

  constructor() { }

  ngOnInit() {
    // debugger;
  }

}
