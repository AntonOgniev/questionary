import axios from 'axios';
import { AUTH_SUCCESS, LOGOUT } from './actionTypes';


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBP73TWvi5bUV6ritj9xPBw3jAbG7PdGXY",
//   authDomain: "antons-quiz.firebaseapp.com",
//   projectId: "antons-quiz",
//   storageBucket: "antons-quiz.appspot.com",
//   messagingSenderId: "565537850525",
//   appId: "1:565537850525:web:d38363aacbb7cb5f408074"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// console.log(app);


export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBP73TWvi5bUV6ritj9xPBw3jAbG7PdGXY';

    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBP73TWvi5bUV6ritj9xPBw3jAbG7PdGXY';
    }
    const response = await axios.post(url, authData);
    const data = response.data;
    console.log(data);
    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000,
    );

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
  };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function autoLogin() {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
            autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000),
        );
      }
    }
  };
}


export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

export function logout() {
  localStorage.clear();
  return {
    type: LOGOUT,
  };
}
