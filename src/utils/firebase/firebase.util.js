import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBA1KWb41NxBcVIhJBfPp4WZoFkBHTIiRk",
  authDomain: "crwn-clothing-db-efc8a.firebaseapp.com",
  projectId: "crwn-clothing-db-efc8a",
  storageBucket: "crwn-clothing-db-efc8a.appspot.com",
  messagingSenderId: "74476126435",
  appId: "1:74476126435:web:ccd9e3d48bb067d49e05d6",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db,'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,email,createdAt
      });
    }catch(err){
      console.log(err.message);
    }
  }
  return userDocRef;
}