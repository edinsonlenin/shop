import { AsyncStorage } from 'react-native';
import { exp } from 'react-native-reanimated';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const logout = () => {
  if (timer) {
    clearTimeout(timer);
  }
  AsyncStorage.removeItem('auth');
  return {type: LOGOUT}
};


const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  }
};

export const authenticate = (token, userId, expirationTime) => {
  return dispatch => {
    console.log(expirationTime);
    dispatch(setLogoutTimer(expirationTime));
    dispatch({
      type: AUTHENTICATE,
      token,
      userId
    });
  };
};

export const signUp = (email, password) => {
  return async dispatch => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7WQZPHIR9qML1lMkeJKVybPU2nADmoSs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify( {
        email: email,
        password: password,
        returnSecureToken: true
      })
    });

    if (!response.ok) {
      const resDataError = await response.json();
      let errorMessage = 'Something was wrong!';
      if (resDataError.error.message === "EMAIL_EXISTS"){
        errorMessage = 'The email exists!';
      } 

      throw new Error(errorMessage);
    }

    const resData = await response.json();
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
    dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn)*1000));
    AsyncStorage.setItem('auth', JSON.stringify({
      token: resData.idToken, 
      userId: resData.localId,
      expirationDate: expirationDate.toISOString()
    }));
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7WQZPHIR9qML1lMkeJKVybPU2nADmoSs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify( {
        email: email,
        password: password,
        returnSecureToken: true
      })
    });

    if (!response.ok) {
      const resDataError = await response.json();
      let errorMessage = 'Something was wrong!';
      if (resDataError.error.message === "INVALID_PASSWORD"){
        errorMessage = 'The password is invalid';
      } else if (resDataError.error.message === "EMAIL_NOT_FOUND") {
        errorMessage = 'Email not found';
      }
      throw new Error(errorMessage);
    }

    const resData = await response.json();
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
    dispatch(authenticate(resData.idToken, resData.localId, parseInt(resData.expiresIn)*1000));
    AsyncStorage.setItem('auth', JSON.stringify({
      token: resData.idToken, 
      userId: resData.localId,
      expirationDate: expirationDate.toISOString()
    }));


  };
};