import { loading, stopLoading, clearState } from "./LoginActions"

// Action constraits
export const FETCH_SEASON_GAME_SUCCESS = "FETCH_SEASON_GAME_SUCCESS";
export const FETCH_SEASON_GAME_FAILED = "FETCH_SEASON_GAME_FAILED";

export const ADD_SEASON_GAME_SUCCESS = "ADD_SEASON_GAME_SUCCESS";
export const ADD_SEASON_GAME_FAILED = "ADD_PLAYER_FAILED";

export const REMOVE_SEASON_GAME_SUCCESS = "REMOVE_SEASON_GAME_SUCCESS";
export const REMOVE_SEASON_GAME_FAILED = "REMOVE_SEASON_GAME_FAILED";

export const EDIT_SEASON_GAME_SUCCESS = "EDIT_SEASON_GAME_SUCCESS";
export const EDIT_SEASON_GAME_FAILED = "EDIT_SEASON_GAME_FAILED";



// GET Season's games

export const getSeasonGames = () => {
  return async (dispatch) => {


    let request = {
    method: "GET",
    headers: { "Content-Type": "application/json"}
    //   body: ""

    }
    dispatch(loading());
    let response = await fetch("/api/seasongames/", request);
    console.log("response")
    console.log(response)

    dispatch(stopLoading);
    if (!response) {
      dispatch(fetchSeasonGameFailed("There was an error with the connection. Fetching season's games failed."));
      return;
    }
    if (response.ok) {
      let data = await response.json();
      if (!data) {
        dispatch(fetchSeasonGameFailed("Failed to parse season's games information."));
        return
      }
      dispatch(fetchSeasonGameSuccess(data))
    } else {
      dispatch(fetchSeasonGameFailed("Fetching players failed. Server responded with status " + response.status + " " + response.statusText));
    }

  }
};

// ADD PLAYER

/*export const addPlayer = (login, player) => {
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
}*/

// REMOVE SEASON'S GAME

export const removeSeasonGame = (token, id) => {
  return async (dispatch) => {
    let request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    }
    dispatch(loading());
    let response = await fetch("/api/seasongames/" + id, request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(removeSeasonGameFailed("There was an error with the connection. Removing season's game failed."))
      return;
    }
    if (response.ok) {
      dispatch(removeSeasonGameSuccess());
      dispatch(getSeasonGames())
    } else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(removeSeasonGameFailed("Your session has expired. Logging you out!"));
      } else {
        dispatch(removeSeasonGameFailed("Removing season's game failed. Server responded with a status " + response.status + " " + response.statusText))
      }
    }
  };
};

//EDIT PLAYER
/*
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
}; */


//Action Creators

const fetchSeasonGameSuccess = (seasonGames) => {
  console.log("season's games actions console.log", seasonGames)
  return {
    type: FETCH_SEASON_GAME_SUCCESS,
    seasonGames: seasonGames
  }
}

const fetchSeasonGameFailed = (error) => {
  return {
    type: FETCH_SEASON_GAME_FAILED,
    error: error
  }
}

/*const addSeasonGameSuccess = () => {
  return {
      type:ADD_SEASON_GAME_SUCCESS
  }
}

const addSeasonGameFailed = (error) => {
  return {
      type:ADD_SEASON_GAME_FAILED,
      error:error
  }
}
*/
const removeSeasonGameSuccess = () => {
  return {
      type:REMOVE_SEASON_GAME_SUCCESS
  }
}

const removeSeasonGameFailed = (error) => {
  return {
      type:REMOVE_SEASON_GAME_FAILED,
      error:error
  }
}

/*
const editSeasonGameSuccess = () => {
  return {
      type:EDIT_SEASON_GAME_SUCCESS
  }
}

const editSeasonGameFailed = (error) => {
  return {
      type:EDIT_SEASON_GAME_FAILED,
      error:error
  }
}*/