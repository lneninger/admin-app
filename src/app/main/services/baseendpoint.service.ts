import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';





export abstract class BaseEndpointService{

  private apiBaseUrl = environment.apiBaseUrl;

  get baseUrl(){
    return `${this.apiBaseUrl}${this.relativeName}`;
  }

  constructor(private relativeName: string) {

  }

}
