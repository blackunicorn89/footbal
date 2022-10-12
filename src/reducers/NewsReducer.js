import {
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILED,

} from '../actions/NewsActions';


const getInitialState = () => {
  if (localStorage.getItem("newsstate")) {
    let state = JSON.parse(localStorage.getItem("newsstate"));
    return state;
  } else {
    return {
      news: [],
      error: ""
    }
  }
}

const saveToStorage = (state) => {
  localStorage.setItem("newsstate", JSON.stringify(state));
}

const initialState = getInitialState();

const newsReducer = (state = initialState, action) => {
  console.log("newsReducer. Action", action);
  let tempState = {};
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:

      tempState = {
        news: action.news,
        error: ""
      }
      console.log("NEws reducers console.log", tempState.news)
      saveToStorage(tempState);
      return tempState
    case FETCH_NEWS_FAILED:
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

export default newsReducer;