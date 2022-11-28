import { loading, stopLoading, clearState } from "./LoginActions"

// Action constraits
export const FETCH_SEASON_SUCCESS = "FETCH_SEASON_SUCCESS";
export const FETCH_SEASON_FAILED = "FETCH_SEASON_FAILED";

export const ADD_SEASON_SUCCESS = "ADD_SEASON_SUCCESS";
export const ADD_SEASON_FAILED = "ADD_SEASON_FAILED";

export const REMOVE_SEASON_SUCCESS = "REMOVE_SEASON_SUCCESS";
export const REMOVE_SEASON_FAILED = "REMOVE_SEASON_FAILED";

export const EDIT_SEASON_SUCCESS = "EDIT_SEASON_SUCCESS";
export const EDIT_SEASON_FAILED = "EDIT_SEASON_FAILED";



// GET Season's games

export const getSeasons = () => {
  return async (dispatch) => {


    let request = {
    method: "GET",
    headers: { "Content-Type": "application/json"}
    //   body: ""

    }
    dispatch(loading());
    let response = await fetch("/api/seasons/", request);
    console.log("response")
    console.log(response)

    dispatch(stopLoading);
    if (!response) {
      dispatch(fetchSeasonsFailed("There was an error with the connection. Fetching seasons failed."));
      return;
    }
    if (response.ok) {
      let data = await response.json();
      if (!data) {
        dispatch(fetchSeasonsFailed("Failed to parse seasons information."));
        return
      }
      dispatch(fetchSeasonsSuccess(data))
    } else {
      dispatch(fetchSeasonsFailed("Fetching season failed. Server responded with status " + response.status + " " + response.statusText));
    }

  }
};

// ADD SEASON'S GAME

/*export const addSeasonGame = (login, seasonGame) => { 
  return async (dispatch) => {
      let request = {
          method:"POST",
          headers: {"Content-type":"application/json" ,  "Authorization": "Bearer " + login.token},
          body:JSON.stringify(seasonGame)
      }
      console.log("REQUEST", request)
      dispatch(loading())
      let response = await fetch("/api/seasongames", request);
      dispatch(stopLoading())
      if (!response) {
          dispatch(addSeasonGameFailed("There was an error with the connection. Adding new game to season failed"));
          return;
      }
      if (response.ok) {
          dispatch(addSeasonGameSuccess());
          dispatch(getSeasonGames());
      }
      else {
          if (response.status === 403) {
              dispatch(clearState());
              dispatch(addSeasonGameFailed("Your session has expired. Logging you out!"));
          }
          else {
              dispatch(addSeasonGameFailed("Adding new game to season failed. Server responded with a status " + response.status + " " + response.statusText));
          }
      }

  }
}

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

//EDIT Season's game

export const editSeasonGame = (login, seasonGame) => {
  return async (dispatch) => {
    let request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + login.token
      },
      body: JSON.stringify(seasonGame)
    }
    dispatch(loading());
    let response = await fetch("/api/seasongames/" + seasonGame.id, request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(editSeasonGameFailed("There was problem with connection. Editing season's game failed"))
      return
    }
    if (response.ok) {
      let data = await response.json();
      dispatch(editSeasonGameSuccess(data));
      dispatch(getSeasonGames());
    } else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(editSeasonGameFailed("Your session has expired. Logging you out!"));
      } else {
        dispatch(editSeasonGameFailed("Editing season's game failed. Server responded with status " + response.status + " " + response.statusText));

      }
    }
  };
}; */


//Action Creators

const fetchSeasonsSuccess = (season) => {
  console.log("season actions console.log", season)
  return {
    type: FETCH_SEASON_SUCCESS,
    season: season
  }
}

const fetchSeasonsFailed = (error) => {
  return {
    type: FETCH_SEASON_FAILED,
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
