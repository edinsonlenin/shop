export const SIGNUP = 'SIGNUP';

export const signUp = (mail, password) => {
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

    const resData = await response.json();
    console.log(resData);
    dispatch({type: SIGNUP});
  };
};