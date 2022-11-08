import {
  FETCH_SEASON_GAME_SUCCESS,
  FETCH_SEASON_GAME_FAILED,
  ADD_SEASON_GAME_SUCCESS,
  ADD_SEASON_GAME_FAILED,
  REMOVE_SEASON_GAME_SUCCESS,
  REMOVE_SEASON_GAME_FAILED,
  EDIT_SEASON_GAME_SUCCESS,
  EDIT_SEASON_GAME_FAILED
  

} from '../actions/SeasonGameActions';


const getInitialState = () => {
  if (localStorage.getItem("seasonGamestate")) {
    let state = JSON.parse(localStorage.getItem("seasonGamestate"));
    return state;
  } else {
    return {
      seasonGames: {seasonGames: []},
      error: ""
    }
  }
}

const saveToStorage = (state) => {
  localStorage.setItem("seasonGamestate", JSON.stringify(state));
}

const initialState = getInitialState();

const seasonGameReducer = (state = initialState, action) => {
  console.log("seasonGameReducer. Action", action);
  let tempState = {};
  switch (action.type) {
    case FETCH_SEASON_GAME_SUCCESS:

      tempState = {
        seasonGames: action.seasonGames,
        error: ""
      }
      console.log("Player reducers console.log", tempState.seasonGames)
      saveToStorage(tempState);
      return tempState
    case FETCH_SEASON_GAME_FAILED:
      tempState = {
        ...state,
        error: action.error
      }
      saveToStorage(tempState);
      return tempState;

    case ADD_SEASON_GAME_SUCCESS:
    tempState = {
      ...state,
      error: ""
    }
    saveToStorage(tempState);
    return tempState

  case ADD_SEASON_GAME_FAILED:
    tempState = {
      ...state,
      error: action.error
    }
    saveToStorage(tempState)
    return tempState

  case REMOVE_SEASON_GAME_SUCCESS:
    tempState = {
      ...state,
      error: ""
    }
    saveToStorage(tempState);
    return tempState;

  case REMOVE_SEASON_GAME_FAILED:
    tempState = {
      ...state,
      error: action.error
    }
    saveToStorage(tempState)
    return tempState;
  case EDIT_SEASON_GAME_SUCCESS:
    tempState = {
      ...state,
      error: ""
    }
    saveToStorage(tempState);
    return tempState;

  case EDIT_SEASON_GAME_FAILED:
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

export default seasonGameReducer;