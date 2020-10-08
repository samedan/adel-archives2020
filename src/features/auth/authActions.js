import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
import firebase from'../../app/config/firebase'
import { APP_LOADED } from './../../app/async/asyncReducer';
import { getUserProfile, dataFromSnapshot } from './../../app/firestore/firestoreService';
import { listenToCurrentUserProfile } from './../profiles/profileActions';


// SIGN iN
export function signInUser(user) {
  return {
    type: SIGN_IN_USER,
    payload: user
  }
}

// VERIFY Auth
export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged(user => {
      if(user) {
        dispatch(signInUser(user));
        // Load Profile
        const profileRef = getUserProfile(user.uid);
        profileRef.onSnapshot(snapshot => {
          // console.log(snapshot);
          dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
          dispatch({type:  APP_LOADED});
        })
        
      } else {
        dispatch(signOutUser())
        dispatch({type: APP_LOADED})
      }
    })
  }
}

// SIGN OUT
export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
