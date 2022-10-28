import { loading, stopLoading, clearState } from "./LoginActions"

// Action constraits
export const FETCH_PLAYERS_SUCCESS = "FETCH_PLAYERS_SUCCESS";
export const FETCH_PLAYERS_FAILED = "FETCH_PLAYERS_FAILED";

export const ADD_PLAYER_SUCCESS = "ADD_PLAYER_SUCCESS";
export const ADD_PLAYER_FAILED = "ADD_PLAYER_FAILED";

export const REMOVE_PLAYER_SUCCESS = "REMOVE_PLAYER_SUCCESS";
export const REMOVE_PLAYER_FAILED = "REMOVE_PLAYER_FAILED";

export const EDIT_PLAYER_SUCCESS = "EDIT_PLAYER_SUCCESS";
export const EDIT_PLAYER_FAILED = "EDIT_PLAYER_FAILED";



// GET PLAYERS

export const getPlayers = () => {
  return async (dispatch) => {


    let request = {
    method: "GET",
    headers: { "Content-Type": "application/json"}
    //   body: ""

    }
    dispatch(loading());
    let response = await fetch("/api/players/", request);
    console.log("response")
    console.log(response)

    dispatch(stopLoading);
    if (!response) {
      dispatch(fetchPlayersFailed("There was an error with the connection. Fetching players failed."));
      return;
    }
    if (response.ok) {
      let data = await response.json();
      if (!data) {
        dispatch(fetchPlayersFailed("Failed to parse players' information."));
        return
      }
      dispatch(fetchPlayersSuccess(data))
    } else {
      dispatch(fetchPlayersFailed("Fetching players failed. Server responded with status " + response.status + " " + response.statusText));
    }

  }
};

// ADD PLAYER

export const addPlayer = (login, player) => {
  return async (dispatch) => {
      let request = {
          method:"POST",
          headers: {"Content-type":"multipart/form-data;boundary=player" ,  "Authorization": "Bearer " + login.token},
          //body:JSON.stringify(player)
      }
      console.log("REQUEST", request)
      dispatch(loading())
      let response = await fetch("/api/players", request);
      dispatch(stopLoading())
      if (!response) {
          dispatch(addPlayerFailed("There was an error with the connection. Adding new player failed"));
          return;
      }
      if (response.ok) {
          dispatch(addPlayerSuccess());
          dispatch(getPlayers());
      }
      else {
          if (response.status === 403) {
              dispatch(clearState());
              dispatch(addPlayerFailed("Your session has expired. Logging you out!"));
          }
          else {
              dispatch(addPlayerFailed("Adding new item failed. Server responded with a status " + response.status + " " + response.statusText));
          }
      }

  }
}

// REMOVE PLAYER

export const removePlayer = (token, id) => {
  return async (dispatch) => {
    let request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    }
    dispatch(loading());
    let response = await fetch("/api/players/" + id, request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(removePlayerFailed("There was an error with the connection. Removing player failed."))
      return;
    }
    if (response.ok) {
      dispatch(removePlayerSuccess());
      dispatch(getPlayers())
    } else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(removePlayerFailed("Your session has expired. Logging you out!"));
      } else {
        dispatch(removePlayerFailed("Removing player failed. Server responded with a status " + response.status + " " + response.statusText))
      }
    }
  };
};

//EDIT PLAYER
export const editPlayer = (login, player) => {
  return async (dispatch) => {
    let request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + login.token
      },
      body: JSON.stringify(player)
    }
    dispatch(loading());
    let response = await fetch("/api/players/" + player.id, request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(editPlayerFailed("There was propblem with connection. Editing player failed"))
      return
    }
    if (response.ok) {
      let data = await response.json();
      dispatch(editPlayerSuccess(data));
      dispatch(getPlayers());
    } else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(editPlayerFailed("Your session has expired. Logging you out!"));
      } else {
        dispatch(editPlayerFailed("Editing player failed. Server responded with status " + response.status + " " + response.statusText));

      }
    }
  };
};


//Action Creators

const fetchPlayersSuccess = (players) => {
  console.log("player actions console.log", players)
  return {
    type: FETCH_PLAYERS_SUCCESS,
    players: players
  }
}

const fetchPlayersFailed = (error) => {
  return {
    type: FETCH_PLAYERS_FAILED,
    error: error
  }
}

const addPlayerSuccess = () => {
  return {
      type:ADD_PLAYER_SUCCESS
  }
}

const addPlayerFailed = (error) => {
  return {
      type:ADD_PLAYER_FAILED,
      error:error
  }
}

const removePlayerSuccess = () => {
  return {
      type:REMOVE_PLAYER_SUCCESS
  }
}

const removePlayerFailed = (error) => {
  return {
      type:REMOVE_PLAYER_FAILED,
      error:error
  }
}

const editPlayerSuccess = () => {
  return {
      type:EDIT_PLAYER_SUCCESS
  }
}

const editPlayerFailed = (error) => {
  return {
      type:EDIT_PLAYER_FAILED,
      error:error
  }
}