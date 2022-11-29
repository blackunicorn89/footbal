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

export const addSeason = (login, season) => { 
  return async (dispatch) => {
      let request = {
          method:"POST",
          headers: {"Content-type":"application/json" ,  "Authorization": "Bearer " + login.token},
          body:JSON.stringify(season)
      }
      console.log("REQUEST", request)
      dispatch(loading())
      let response = await fetch("/api/seasons", request);
      dispatch(stopLoading())
      if (!response) {
          dispatch(addSeasonFailed("There was an error with the connection. Adding new season failed"));
          return;
      }
      if (response.ok) {
          dispatch(addSeasonSuccess());
          dispatch(getSeasons());
      }
      else {
          if (response.status === 403) {
              dispatch(clearState());
              dispatch(addSeasonFailed("Your session has expired. Logging you out!"));
          }
          else {
              dispatch(addSeasonFailed("Adding new season failed. Server responded with a status " + response.status + " " + response.statusText));
          }
      }

  }
}

//REMOVE SEASON
export const removeSeason = (token, id) => {
  return async (dispatch) => {
    let request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    }
    dispatch(loading());
    let response = await fetch("/api/seasons/" + id, request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(removeSeasonFailed("There was an error with the connection. Removing season failed."))
      return;
    }
    if (response.ok) {
      dispatch(removeSeasonSuccess());
      dispatch(getSeasons())
    } else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(removeSeasonFailed("Your session has expired. Logging you out!"));
      } else {
        dispatch(removeSeasonFailed("Removing season's game failed. Server responded with a status " + response.status + " " + response.statusText))
      }
    }
  };
};

//EDIT Season's game

export const editSeason = (login, season) => {
  return async (dispatch) => {
    let request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + login.token
      },
      body: JSON.stringify(season)
    }
    dispatch(loading());
    let response = await fetch("/api/seasons/" + season.id, request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(editSeasonFailed("There was problem with connection. Editing season failed"))
      return
    }
    if (response.ok) {
      let data = await response.json();
      dispatch(editSeasonSuccess(data));
      dispatch(getSeasons());
    } else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(editSeasonFailed("Your session has expired. Logging you out!"));
      } else {
        dispatch(editSeasonFailed("Editing season failed. Server responded with status " + response.status + " " + response.statusText));

      }
    }
  };
}; 


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

const addSeasonSuccess = () => {
  return {
      type:ADD_SEASON_SUCCESS
  }
}

const addSeasonFailed = (error) => {
  return {
      type:ADD_SEASON_FAILED,
      error:error
  }
}
const removeSeasonSuccess = () => {
  return {
      type:REMOVE_SEASON_SUCCESS
  }
}

const removeSeasonFailed = (error) => {
  return {
      type:REMOVE_SEASON_FAILED,
      error:error
  }
}


const editSeasonSuccess = () => {
  return {
      type:EDIT_SEASON_SUCCESS
  }
}

const editSeasonFailed = (error) => {
  return {
      type:EDIT_SEASON_FAILED,
      error:error
  }
}
