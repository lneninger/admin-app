import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataRetrieverInput, GridData } from 'src/app/shared/grid/grid-config';
import { BaseEndpointService } from '../baseendpoint.service';
import { Specialist, UpdateSpecialistResponse, AddSpecialistRequest, AddSpecialistResponse, ISpecialistItem, UpdateSpecialistRequest } from './specialist.models';
@Injectable({
  providedIn: 'root'
})
export class SpecialistEndpointService extends BaseEndpointService {

  constructor(private firebase: FirebaseService) {
    super('specialists');
  }

  async search(input: DataRetrieverInput) {
    const ref = this.firebase.firestore.collection(this.relativeName).ref;
    return ref.limit(input.pageSize).get();
  }

  async add(request: AddSpecialistRequest) {
    return await this.firebase.firestore.collection(this.relativeName).add(request);
  }

  async update(id:string, request: UpdateSpecialistRequest) {
    return await this.firebase.firestore.collection(this.relativeName).doc(id).update(request);
  }

  async get(id: string) {
    return await this.firebase.firestore.collection(this.relativeName).doc(id).get().toPromise();
  }
}
