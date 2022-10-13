import { loading, stopLoading, clearState } from "./LoginActions"

// Action constraits
export const FETCH_PLAYERS_SUCCESS = "FETCH_PLAYERS_SUCCESS";
export const FETCH_PLAYERS_FAILED = "FETCH_PLAYERS_FAILED";

export const getPlayers = () => {
  return async (dispatch) => {


    // let request = {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json", "Authorization": "Bearer" + token, },
    //   body: ""

    // }
    dispatch(loading());
    let response = await fetch("/api/players/");

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

//Action Creators

const fetchPlayersSuccess = (playerList) => {
  console.log("player actions console.log", playerList)
  return {
    type: FETCH_PLAYERS_SUCCESS,
    playerList: playerList
  }
}

const fetchPlayersFailed = (error) => {
  return {
    type: FETCH_PLAYERS_FAILED,
    error: error
  }
}