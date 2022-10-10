export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";


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
      console.log(data)
      if (!data) {
        dispatch(loginFailed("Failed to parse login information. Login failed."));
        return
      }
      dispatch(loginSuccess(data.token));
      // dispatch(getNews(data.token));
    } else {
      dispatch(loginFailed("Login failed. Server responded with a status " + response.status + " " + response.statusText));
    }
  }
}

// ACTION CREATORS

export const loading = () => {
  return {
    type: LOADING
  }
}

export const stopLoading = () => {
  return {
    type: STOP_LOADING
  }
}

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  }
}


const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error: error
  }
}