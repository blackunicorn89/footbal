import {
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILED,

} from '../actions/PlayerActions';


const getInitialState = () => {
  if (localStorage.getItem("playerstate")) {
    let state = JSON.parse(localStorage.getItem("playerstate"));
    return state;
  } else {
    return {
      playerList: [],
      error: ""
    }
  }
}

const saveToStorage = (state) => {
  localStorage.setItem("playerstate", JSON.stringify(state));
}

const initialState = getInitialState();

const playerReducer = (state = initialState, player) => {
  console.log("playerReducer. Action", player);
  let tempState = {};
  switch (player.type) {
    case FETCH_PLAYERS_SUCCESS:

      tempState = {
        playerList: player.playerList,
        error: ""
      }
      console.log("Player reducers console.log", tempState.playerList)
      saveToStorage(tempState);
      return tempState
    case FETCH_PLAYERS_FAILED:
      tempState = {
        ...state,
        error: player.error
      }
      saveToStorage(tempState);
      return tempState;

    default:
      return state;
  }
}

export default playerReducer;