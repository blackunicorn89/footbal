import {
  LOADING,
  STOP_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from "../actions/LoginActions"

const getInitialState = () => {
  if (sessionStorage.getItem("loginstate")) {
    let state = JSON.parse(sessionStorage.getItem("loginstate"));
    return state;
  } else {
    return {
      isLogged: false,
      token: "",
      loading: false,
      error: ""
    }
  }
}

const saveToStorage = (state) => {
  localStorage.setItem("loginstate", JSON.stringify(state));
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
      saveToStorage(tempState);
      return tempState;
    default:
      return state;
  }
}

export default loginReducer;