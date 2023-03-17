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

export const ADD_GOAL_POINTS_SUCCESS = "ADD_GOAL_POINTS_SUCCESS";
export const ADD_GOAL_POINTS_FAILED = "ADD_GOAL_POINTS_FAILED";

export const DELETE_GOAL_POINTS_SUCCESS = "DELETE_GOAL_POINTS_SUCCESS";
export const DELETE_GOAL_POINTS_FAILED = "DELETE_GOAL_POINTS_FAILED";

export const EDIT_GOAL_POINTS_SUCCESS = "EDIT_GOAL_POINTS_SUCCESS";
export const EDIT_GOAL_POINTS_FAILED = "EDIT_GOAL_POINTS_FAILED";



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

// ADD SEASON'S GAME

export const addSeasonGame = (login, seasonGame) => { 
  return async (dispatch) => {
      let request = {
          method:"POST",
          headers: {"Content-type":"application/json" ,  "Authorization": "Bearer " + login.token},
          body:JSON.stringify(seasonGame)
      }
      console.log("REQUEST", request)
      dispatch(loading())
      let response = await fetch("/api/games", request);
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
    let response = await fetch("/api/games/" + id, request);
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
    let response = await fetch("/api/games/" + seasonGame.id, request);
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
}; 

//Add goal points
export const addGoalPoints = (login, goalPoints) => {
  return async (dispatch) => {
    let request = {
      method: "POST",
      headers: {"Content-type":"application/json" ,  "Authorization": "Bearer " + login.token},
      body:JSON.stringify(goalPoints)
    }
    console.log("REQUEST", request)
    dispatch(loading())
    let response = await fetch("/api/games/addgoalpoints", request);
    dispatch(stopLoading())
    if (!response) {
      dispatch(addGoalPointsFailed("There was an error with the connection. Adding goal points failed"));
      return;
    }
    if (response.ok) {
      dispatch(addGoalPointsSuccess())
    }
    else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(addGoalPointsFailed("Your session has expired. Logging you out!"));
      }
      else {
        dispatch(addGoalPointsFailed("Adding goal points failed. Server responded with a status " + response.status + " " + response.statusText));
      }
    }

  }
}

//Delete goal points
export const deleteGoalPoints = (login, goalPoints) => {
  return async (dispatch) => {
    let request = {
      method: "POST",
      headers: {"Content-type":"application/json" ,  "Authorization": "Bearer " + login.token},
      body:JSON.stringify(goalPoints)
    }
    console.log("REQUEST", request)
    dispatch(loading())
    let response = await fetch("/api/deletegoalpoints", request);
    dispatch(stopLoading())
    if (!response) {
      dispatch(deleteGoalPointsFailed("There was an error with the connection. Deleting goal points failed"));
      return;
    }
    if (response.ok) {
      dispatch(deleteGoalPointsSuccess())
    }
    else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(deleteGoalPointsFailed("Your session has expired. Logging you out!"));
      }
      else {
        dispatch(deleteGoalPointsFailed("Deleting goal points failed. Server responded with a status " + response.status + " " + response.statusText));
      }
    }

  }
}

//Edit goal points
export const editGoalPoints = (login, currentGoalPoints, newGoalPoints) => {
  return async (dispatch) => {
    let request = {
      method: "POST",
      headers: {"Content-type":"application/json" ,  "Authorization": "Bearer " + login.token},
      body:JSON.stringify(currentGoalPoints, newGoalPoints)
    }
    console.log("REQUEST", request)
    dispatch(loading())
    let response = await fetch("/api/editgoalpoints", request);
    dispatch(stopLoading())
    if (!response) {
      dispatch(editGoalPointsFailed("There was an error with the connection. Deleting goal points failed"));
      return;
    }
    if (response.ok) {
      dispatch(editGoalPointsSuccess())
    }
    else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(editGoalPointsFailed("Your session has expired. Logging you out!"));
      }
      else {
        dispatch(editGoalPointsFailed("Deleting goal points failed. Server responded with a status " + response.status + " " + response.statusText));
      }
    }

  }
}

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

const addSeasonGameSuccess = () => {
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
}

const addGoalPointsSuccess = () => {
  return {
    type: ADD_GOAL_POINTS_SUCCESS
  }
}

const addGoalPointsFailed = (error) => {
  return {
    type: ADD_GOAL_POINTS_FAILED,
    error: error
  }
}

const deleteGoalPointsSuccess = () => {
  return {
    type: DELETE_GOAL_POINTS_SUCCESS
  }
}

const deleteGoalPointsFailed = (error) => {
  return {
    type: DELETE_GOAL_POINTS_FAILED,
    error: error
  }
}

const editGoalPointsSuccess = () => {
  return {
    type: EDIT_GOAL_POINTS_SUCCESS
  }
}

const editGoalPointsFailed = (error) => {
  return {
    type: EDIT_GOAL_POINTS_FAILED,
    error: error
  }
}
