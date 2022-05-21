import { FirestoreDocumentMapping } from './../../functions.models';

import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { IUserPaymentMetadata } from '../../../../src/app/main/services/user/user.models';

export class UserService {

  async updateUserEntity(userId: string, entityUpdate: any): Promise<void> {
    const userEntity = admin.firestore().collection('/entities').doc(userId);
    if ((await userEntity.get()).exists) {
      userEntity.update(entityUpdate);
    } else {
      await userEntity.set(entityUpdate);
    }
  }

  async getUserEntityByPaymentId(paymentId: string): Promise<FirestoreDocumentMapping<IUserPaymentMetadata>> {
    const userEntity = admin.firestore().collection('/entities').where('paymentId', '==', paymentId);
    const dbData = (await userEntity.get()).docs[0];
     return ({ id: dbData.id, data: dbData.data() as IUserPaymentMetadata, $original: dbData });
  }

  async updateUserClaims(userRecord: UserRecord, claimsUpdate: any): Promise<boolean> {
    const auth = admin.auth();
    let claims = userRecord.customClaims || {};
    claims = { ...claims, ...claimsUpdate };
    await auth.setCustomUserClaims(userRecord.uid, claims);
    return true;
  }

}
