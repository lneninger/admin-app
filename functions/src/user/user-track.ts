// import * as Cors from 'cors';
import * as functions from 'firebase-functions';

// const cors = Cors({ origin: true });


export const userTrack = functions.firestore.document(`auth-users/{userId}`).onWrite(async (change, context) => {


  // if(!change.after.exists){ // deleted
  //   const userData = change.before.data() as any;
  //   const userRole = (await admin.firestore().collection(`/auth/users-roles`).where('userId', '==', userData.userId).limit(1).get()).docs.at(0);

  // }

  //   console.log(`Mapped to model`, data, `original body`, req.body);

  //   //const token = data.source;
  //   let removeResult: any;
  //   if (data.userRoleId) {
  //     removeResult = await admin.firestore().doc(`/auth/users-roles/${data.userRoleId}`).delete();
  //   } else if (data.roleId) {
  //     const userRole = (await admin.firestore().collection(`/auth/users-roles`).where('roleId', '==', data.roleId).limit(1).get()).docs.at(0);
  //     if (userRole) {
  //       removeResult = await admin.firestore().doc(`/auth/users-roles/${userRole.id}`).delete();
  //     }
  //   } else if (data.role) {
  //     const role = (await admin.firestore().collection(`/auth/roles`).where('name', '==', data.role).limit(1).get()).docs.at(0);
  //     if (role) {
  //       const userRole = (await admin.firestore().collection(`/auth/users-roles`).where('roleId', '==', role.id).limit(1).get()).docs.at(0);
  //       if (userRole) {
  //         removeResult = await admin.firestore().doc(`/auth/users-roles/${userRole.id}`).delete();
  //       }
  //     }
  //   }

  //   console.log('Operation result:', removeResult);

  //   res.status(200).json(removeResult);



});
