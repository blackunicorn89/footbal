import {
  LOADING,
  STOP_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  SESSION_EXPIRED
} from "../actions/LoginActions"

const getInitialState = () => {
  if (sessionStorage.getItem("loginstate")) {
    let state = JSON.parse(sessionStorage.getItem("loginstate"));
    return state;
  } else {
    return {
      isLogged: false,
      token: "",
      admin: false,
      loading: false,
      error: ""
    }
  }
}

const saveToStorage = (state) => {
  sessionStorage.setItem("loginstate", JSON.stringify(state));
}

const initialState = getInitialState();

const loginReducer = (state = initialState, action) => {
  console.log("loginReducer. Action", action);
  let tempState = {};
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        error: ""
      }
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      }
    case LOGIN_SUCCESS:
      tempState = {
        loading: false,
        isLogged: true,
        token: action.token,
        admin: action.admin,
        error: ""
      }
      saveToStorage(tempState);
      return tempState;
    case LOGIN_FAILED:
      tempState = {
        ...state,
        loading: false,
        error: action.error
      }
      return tempState;

    case LOGOUT_SUCCESS:
      sessionStorage.removeItem("loginstate")
      sessionStorage.removeItem("userstate")
      tempState = {
        isLogged: false,
        token: "",
        admin: false,
        loading: false,
        error: ""
      }
      saveToStorage("loginstate")
      return tempState
    case SESSION_EXPIRED:
      sessionStorage.removeItem("loginstate")
      sessionStorage.removeItem("userstate")
      tempState = {
        isLogged: false,
        token: "",
        admin: false,
        loading: false,
        error: ""
      }
      saveToStorage("loginstate")
      return tempState

    default:
      return state;
  }
}

export default loginReducer;