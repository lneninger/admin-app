import { Injectable } from '@angular/core';
// import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
// import { Firestore } from '@angular/fire/firestore';
// import { Functions } from '@angular/fire/functions';


@Injectable({ providedIn: 'root' })
export class FirebaseService {

  constructor(
    public firestore: AngularFirestore,
    // public firestore: Firestore,
    public auth: AngularFireAuth,
    // public auth: Auth,
    public fns: AngularFireFunctions,
    // public fns: Functions

  ) {
  }
}
