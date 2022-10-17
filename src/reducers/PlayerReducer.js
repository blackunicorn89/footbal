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
      players: {players: []},
      error: ""
    }
  }
}

const saveToStorage = (state) => {
  localStorage.setItem("playerstate", JSON.stringify(state));
}

const initialState = getInitialState();

const playerReducer = (state = initialState, action) => {
  console.log("playerReducer. Action", action);
  let tempState = {};
  switch (action.type) {
    case FETCH_PLAYERS_SUCCESS:

      tempState = {
        players: action.players,
        error: ""
      }
      console.log("Player reducers console.log", tempState.playerList)
      saveToStorage(tempState);
      return tempState
    case FETCH_PLAYERS_FAILED:
      tempState = {
        ...state,
        error: action.error
      }
      saveToStorage(tempState);
      return tempState;

    default:
      return state;
  }
}

export default playerReducer;