import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Firestore } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';


@Injectable({ providedIn: 'root' })
export class FirebaseService {

  constructor(
    public firestoreNew: AngularFirestore,
    public firestore: Firestore,
    public authNew: AngularFireAuth,
    public auth: Auth,
    public fnsNew: AngularFireFunctions,
    public fns: Functions

  ) {
  }
}
