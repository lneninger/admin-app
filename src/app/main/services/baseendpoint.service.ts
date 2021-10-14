import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';





export abstract class BaseEndpointService{

  private mokedBaseUrl = environment.apiBaseUrl;
  private apiBaseUrl = environment.apiBaseUrl;

  get baseUrl(){
    return `${this.apiBaseUrl}${this.relativeName}`;
  }

  get mockedBaseUrl(){
    return `${this.mockedBaseUrl}${this.relativeName}`;
  }

  constructor(protected relativeName: string, private mocked: boolean = true) {

  }

}
