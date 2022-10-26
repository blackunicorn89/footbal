import {
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILED,
  ADD_PLAYER_SUCCESS,
  ADD_PLAYER_FAILED,
  REMOVE_PLAYER_SUCCESS,
  REMOVE_PLAYER_FAILED,
  EDIT_PLAYER_SUCCESS,
  EDIT_PLAYER_FAILED
  

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

    case ADD_PLAYER_SUCCESS:
    tempState = {
      ...state,
      error: ""
    }
    saveToStorage(tempState);
    return tempState

  case ADD_PLAYER_FAILED:
    tempState = {
      ...state,
      error: action.error
    }
    saveToStorage(tempState)
    return tempState

  case REMOVE_PLAYER_SUCCESS:
    tempState = {
      ...state,
      error: ""
    }
    saveToStorage(tempState);
    return tempState;

  case REMOVE_PLAYER_FAILED:
    tempState = {
      ...state,
      error: action.error
    }
    saveToStorage(tempState)
    return tempState;
  case EDIT_PLAYER_SUCCESS:
    tempState = {
      ...state,
      error: ""
    }
    saveToStorage(tempState);
    return tempState;

  case EDIT_PLAYER_FAILED:
    tempState = {
      ...state,
      error: action.error
    }
    saveToStorage(tempState)
    return tempState;

  default:
    return state;


  }
}

export default playerReducer;