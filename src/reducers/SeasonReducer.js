import {
  FETCH_SEASON_SUCCESS,
  FETCH_SEASON_FAILED,
  ADD_SEASON_SUCCESS,
  ADD_SEASON_FAILED,
  REMOVE_SEASON_SUCCESS,
  REMOVE_SEASON_FAILED,
  EDIT_SEASON_SUCCESS,
  EDIT_SEASON_FAILED
  

} from '../actions/SeasonActions';


const getInitialState = () => {
  if (localStorage.getItem("seasonstate")) {
    let state = JSON.parse(localStorage.getItem("seasonstate"));
    return state;
  } else {
    return {
      season: [],
      error: ""
    }
  }
}

const saveToStorage = (state) => {
  localStorage.setItem("seasonstate", JSON.stringify(state));
}

const initialState = getInitialState();

const seasonReducer = (state = initialState, action) => {
  console.log("seasonReducer. Action", action);
  let tempState = {};
  switch (action.type) {
    case FETCH_SEASON_SUCCESS:

      tempState = {
        season: action.season,
        error: ""
      }
      console.log("Season reducers console.log", tempState.season)
      saveToStorage(tempState);
      return tempState
    case FETCH_SEASON_FAILED:
      tempState = {
        ...state,
        error: action.error
      }
      saveToStorage(tempState);
      return tempState;

    case ADD_SEASON_SUCCESS:
    tempState = {
      ...state,
      error: ""
    }
    saveToStorage(tempState);
    return tempState

  case ADD_SEASON_FAILED:
    tempState = {
      ...state,
      error: action.error
    }
    saveToStorage(tempState)
    return tempState

  case REMOVE_SEASON_SUCCESS:
    tempState = {
      ...state,
      error: ""
    }
    saveToStorage(tempState);
    return tempState;

  case REMOVE_SEASON_FAILED:
    tempState = {
      ...state,
      error: action.error
    }
    saveToStorage(tempState)
    return tempState;
  case EDIT_SEASON_SUCCESS:
    tempState = {
      ...state,
      error: ""
    }
    saveToStorage(tempState);
    return tempState;

  case EDIT_SEASON_FAILED:
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

export default seasonReducer;