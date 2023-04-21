import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILED 

} from '../actions/UserActions';

const getInitialState = () => {
  if (sessionStorage.getItem("userstate")) {
    let state = JSON.parse(sessionStorage.getItem("userstate"));
    return state;
  } else {
    return {
      users:[],
      error: ""
    }
  }
}

const saveToStorage = (state) => {
  sessionStorage.setItem("userstate", JSON.stringify(state));
}

const initialState = getInitialState();

const userReducer = (state = initialState, action) => {
  console.log("userReducer. Action", action);
  let tempState = {};
  switch (action.type) {

    case FETCH_USERS_SUCCESS:
      tempState = {
        users: action.users,
        error: ""
      }
      saveToStorage(tempState);
      return tempState

    case FETCH_USERS_FAILED:
      tempState = {
        ...state,
        error: action.error
      }
      saveToStorage(tempState);
      return tempState;

    case REGISTER_SUCCESS:
      tempState = {
        ...state,
        error: ""
      }
      saveToStorage(tempState);
      return tempState;

    case REGISTER_FAILED:
      tempState = {
        ...state,
        error: action.error
      }
      saveToStorage(tempState);
      return tempState;

    case EDIT_USER_SUCCESS:
      tempState = {
        ...state,
        error: ""
      }
      saveToStorage(tempState);
      return tempState;

    case EDIT_USER_FAILED:
      tempState = {
        ...state,
        error: action.error
      }
      saveToStorage(tempState);
      return tempState;

    case REMOVE_USER_SUCCESS:
      tempState = {
        ...state,
        error: ""
      }
      saveToStorage(tempState);
      return tempState;

    case REMOVE_USER_FAILED:
      tempState = {
        ...state,
        error: action.error
      }
      saveToStorage(tempState)
      return tempState;

    default:
      return state;
  }
}

export default userReducer;