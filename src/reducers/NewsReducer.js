import {
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILED,
  ADD_ARTICLE_SUCCESS,
  ADD_ARTICLE_FAILED,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_FAILED

} from '../actions/NewsActions';

const getInitialState = () => {
  if (localStorage.getItem("newsstate")) {
    let state = JSON.parse(localStorage.getItem("newsstate"));
    return state;
  } else {
    return {
      news: { newsArticles: [] },
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
      saveToStorage(tempState);
      return tempState

    case FETCH_NEWS_FAILED:
      tempState = {
        ...state,
        error: action.error
      }
      saveToStorage(tempState);
      return tempState;

    case ADD_ARTICLE_SUCCESS:
      tempState = {
        ...state,
        error: ""
      }
      saveToStorage(tempState);
      return tempState

    case ADD_ARTICLE_FAILED:
      tempState = {
        ...state,
        error: action.error
      }
      saveToStorage(tempState)
      return tempState

    case EDIT_ARTICLE_SUCCESS:
      tempState = {
        ...state,
        error: ""
      }
      saveToStorage(tempState);
      return tempState;

    case EDIT_ARTICLE_FAILED:
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