import { LOGIN, SIGNUP } from '../actions/auth';

const initialState = {
  token: null,
  userId: null
};

const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.idToken,
        userId: action.localId
      };
    case SIGNUP:
      return {
        token: action.idToken,
        userId: action.localId
      };
  };
  return state;
};

export default authReducer;