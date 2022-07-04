import { Injectable } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({ providedIn: 'root' })
export class FirebaseService {

  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public fns: AngularFireFunctions,
    public  storage: AngularFireStorage,
    public analytics : AngularFireAnalytics
  ) {
  }
}
