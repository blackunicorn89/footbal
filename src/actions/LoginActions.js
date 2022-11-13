import { getNews } from "./NewsActions";
export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const CLEAR_STATE = "CLEAR_STATE";



export const register = (login, values) => {

  return async (dispatch) => {

    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + login.token
      },
      body: JSON.stringify(values)
    }
    dispatch(loading());
    let response = await fetch("/api/users/signup", request)
    if (!response) {
      dispatch(registerFailed("There was an error with the server connection. Register failed."));
      return;
    }
    if (response.ok) {
      dispatch(registerSuccess());
    } else {
      if (response.status === 422) {
        dispatch(registerFailed("Sähköpostiosoite on jo käytössä"));
        dispatch()

      } else {
        dispatch(registerFailed("Register failed. Server responded with a status " + response.status + " " + response.statusText));
      }
    }
  }
};

export const login = (user) => {
  return async (dispatch) => {

    let request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }
    dispatch(loading());
    let response = await fetch("/api/users/login", request)
    if (!response) {
      dispatch(loginFailed("Failed to parse login information. Login failed."))
      return;
    }
    if (response.ok) {
      let data = await response.json();

      if (!data) {
        dispatch(loginFailed("Failed to parse login information. Login failed."));
        return
      }
      dispatch(loginSuccess(data));
      dispatch(getNews());
    } else {
      dispatch(loginFailed("Virheellinen sähköposti tai salasana"));

    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutSuccess())
    dispatch(getNews())
  }
}

// ACTION CREATORS

export const loading = () => {
  return {
    type: LOADING
  }
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING
  }
};

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS
  }
}

export const registerFailed = (error) => {
  return {
    type: REGISTER_FAILED,
    error: error
  }
}

const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    token: data.token,
    admin: data.admin
  }
};


const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error: error
  }
}

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const clearState = () => {
  return {
    type: CLEAR_STATE
  }
};