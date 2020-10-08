import firebase from "../config/firebase";
import { setUserProfileData } from "./firestoreService";
import { toast } from "react-toastify";

// {{}, {}} => [ [{}], {}]
export function firebaseObjectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map((e) =>
      // [id, {stuff1, stuff2}] => [id, stuff1, stuff2 ]
      Object.assign({}, e[1], { id: e[0] })
    );
  }
}

// LOGIN & REGISTER
// SIGN IN with Email
export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}
// SIGN OUT
export function signOutFirebase() {
  return firebase.auth().signOut();
}
// REGISTER with Email
export async function registerInFirebase(creds) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);
    // 'user' coming back from firebase already loggedIn
    await result.user.updateProfile({
      displayName: creds.displayName,
    });
    // write in 'users' userName & email & createdAt
    return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
}
// FACEBOOK
export async function socialLogin(selectedProvider) {
  let provider;
  if (selectedProvider === "facebook") {
    provider = new firebase.auth.FacebookAuthProvider();
  }
  if (selectedProvider === "google") {
    provider = new firebase.auth.GoogleAuthProvider();
  }

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result);
    // check if it's first time login(counts as register)
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error) {
    toast.error(error.message);
  }
}
// CHANGE PASSWORD
export function updateUserPassword(creds) {
  const user = firebase.auth().currentUser;
  console.log(user);
  return user.updatePassword(creds.newPassword1);
}

// PHOTOS
// UPLOAD IMAGE TO Firebase
export function uploadToFirebasestorage(file, filename) {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${user.uid}/user_images/${filename}`).put(file);
}
// DELETE PHOTO from Storage
export function deleteFromFirebaseStorage(filename) {
  const userUid = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);

  // delete from storage
  return photoRef.delete();
}

// COMMENTS
// POST Comment on Chat // REAL TIME DATABASE
export function addEventChatComment(eventId, values) {
  const user = firebase.auth().currentUser;
  const newComment = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId,
  };
  return firebase.database().ref(`chat/${eventId}`).push(newComment);
}
// GET Comments
export function getEventChatRef(eventId) {
  return firebase.database().ref(`chat/${eventId}`).orderByKey();
}

// FEED from Firbase Functions
export function getUserFeedRef() {
  const user = firebase.auth().currentUser;
  return firebase
    .database()
    .ref(`posts/${user.uid}`)
    .orderByKey()
    .limitToLast(5);
}
