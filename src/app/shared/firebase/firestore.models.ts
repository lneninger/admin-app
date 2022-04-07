import { QueryDocumentSnapshot } from '@angular/fire/compat/firestore';

export interface IFireStoreDocument<T>{
  id: string;
  data: T;
  $original: QueryDocumentSnapshot<T>
}
