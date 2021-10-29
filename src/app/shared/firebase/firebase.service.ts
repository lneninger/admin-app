import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class FirebaseService {
  firestore: AngularFirestore;
  auth: AngularFireAuth;

  constructor(
    firestore: AngularFirestore,
    auth: AngularFireAuth
  ) {
    this.firestore = firestore;
    this.auth = auth;
  }
}
