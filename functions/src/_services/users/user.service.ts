
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

export class UserService {

  async updateUserEntity(userId: string, entityUpdate: any): Promise<void> {
    const userEntity = admin.firestore().collection('/entities').doc(userId);
    if ((await userEntity.get()).exists) {
      userEntity.update(entityUpdate);
    } else {
      await userEntity.set(entityUpdate);
    }
  }

  async getUserEntityByPaymentId(paymentId: string): Promise<FirebaseFirestore.DocumentData> {
    const userEntity = admin.firestore().collection('/entities').where('paymentId', '==', paymentId);
    return (await userEntity.get()).docs[0];
  }

  async updateUserClaims(userRecord: UserRecord, claimsUpdate: any): Promise<boolean> {
    const auth = admin.auth();
    let claims = userRecord.customClaims || {};
    claims = { ...claims, ...claimsUpdate };
    await auth.setCustomUserClaims(userRecord.uid, claims);
    return true;
  }

}
