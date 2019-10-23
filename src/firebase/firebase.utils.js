import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC1gLm0pina1GFmlUXUCJo7y4eW-QY_7rM",
    authDomain: "crwn-clothing-8d49a.firebaseapp.com",
    databaseURL: "https://crwn-clothing-8d49a.firebaseio.com",
    projectId: "crwn-clothing-8d49a",
    storageBucket: "crwn-clothing-8d49a.appspot.com",
    messagingSenderId: "1091014892653",
    appId: "1:1091014892653:web:11ccf67aaae78166d77364",
    measurementId: "G-2QKYP2S10Y"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
