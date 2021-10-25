// import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as faker from 'faker';


console.log('Running');

// initialization
const projectId = 'firebase-adminsys-20210823';
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
const app = admin.initializeApp({
    projectId: "firebase-adminsys-20210823",
    storageBucket: "firebase-adminsys-20210823.appspot.com",
 });

const db = admin.firestore();

const seedUsers = async () => {
  await admin.auth(app).createUser({
    email: 'lneninger@hotmail.com',
    emailVerified: false,
    phoneNumber: '+17865154022',
    password: '123123',
    displayName: 'Leonardo Neninger',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false
   })
}

// seed function
function getSeedData() {
  try {
    [...Array(10).keys()].map(() =>
      db.collection('events').add({
        author_name: faker.name.firstName() + '' + faker.name.lastName(),
        author_profile_pic: faker.image.imageUrl(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        address: {
          addr_1: faker.address.streetAddress(),
          addr_2: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zipCode: faker.address.zipCode()
        }
      })
    );
    console.log('database seed was successful');
  } catch (error) {
    console.log(error, 'database seed failed');
  }
}

seedUsers();
getSeedData();
