
import { loading, stopLoading, clearState } from "./LoginActions"

// Action constraits
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILED = "FETCH_NEWS_FAILED";

export const ADD_ARTICLE_SUCCESS = "ADD_ARTICLE_SUCCESS";
export const ADD_ARTICLE_FAILED = "ADD_ARTICLE_FAILED";

export const EDIT_ARTICLE_SUCCESS = "EDIT_ARTICLE_SUCCESS";
export const EDIT_ARTICLE_FAILED = "EDIT_ARTICLE_FAILED";

export const REMOVE_ARTICLE_SUCCESS = "REMOVE_ARTICLE_SUCCESS";
export const REMOVE_ARTICLE_FAILED = "REMOVE_ARTICLE_FAILED";


// GET NEWS

export const getNews = () => {
  return async (dispatch) => {

    dispatch(loading());
    let response = await fetch("/api/news");

    dispatch(stopLoading());
    if (!response) {
      dispatch(fetchNewsFailed("There was an error with the connection. Fetching news failed."));
      return;
    }
    if (response.ok) {
      let data = await response.json();
      if (!data) {
        dispatch(fetchNewsFailed("Failed to parse news articles."));
        return
      }
      dispatch(fetchNewsSuccess(data))
    } else {
      dispatch(fetchNewsFailed("Fetching news articles failed. Server responded with status " + response.status + " " + response.statusText));
    }
  }
};


// ADD NEWS

export const addNews = (login, article) => {
  return async (dispatch) => {
    let request = { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + login.token
      },
      body: JSON.stringify(article)
    }
    console.log("REQUEST", request)
    dispatch(loading());
    let response = await fetch("/api/news/", request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(addArticleFailed("There was an error with the connection. Adding new article failed."))
      return;
    }
    if (response.ok) {
      dispatch(addArticleSuccess())
      dispatch(getNews());
    } else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(addArticleFailed("Your session has expired. Logging you out!"))
      } else {
        dispatch(addArticleFailed("Adding new article failed. Server responded with a status " + response.status + " " + response.statusText));
      }
    }
  }
};

// EDIT NEWS

export const editNews = (login, article) => {
  return async (dispatch) => {
    let request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + login.token
      },
      body: JSON.stringify(article)
    }
    dispatch(loading());
    let response = await fetch("/api/news/" + article.id, request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(editArticleFailed("There was propblem with connection. Editing article failed"))
      return
    }
    if (response.ok) {
      let data = await response.json();
      dispatch(editArticleSuccess(data));
      dispatch(getNews());
    } else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(editArticleFailed("Your session has expired. Logging you out!"));
      } else {
        dispatch(editArticleFailed("Editing article failed. Server responded with status " + response.status + " " + response.statusText));

      }
    }
  };
};

// REMOVE NEWS

export const removeNews = (token, id) => {
  return async (dispatch) => {
    let request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    }
    dispatch(loading());
    let response = await fetch("/api/news/" + id, request);
    dispatch(stopLoading());
    if (!response) {
      dispatch(removeArticleFailed("There was an error with the connection. Removing article failed."))
      return;
    }
    if (response.ok) {
      dispatch(removeArticleSuccess());
      dispatch(getNews())
    } else {
      if (response.status === 403) {
        dispatch(clearState());
        dispatch(removeArticleFailed("Your session has expired. Logging you out!"));
      } else {
        dispatch(removeArticleFailed("Removing Article failed. Server responded with a status " + response.status + " " + response.statusText))
      }
    }
  };
};

//Action Creators

const fetchNewsSuccess = (news) => {
  //console.log("News actions console.log", news)
  return {
    type: FETCH_NEWS_SUCCESS,
    news: news
  }
}

const fetchNewsFailed = (error) => {
  return {
    type: FETCH_NEWS_FAILED,
    error: error
  }
};

const addArticleSuccess = () => {
  return {
    type: ADD_ARTICLE_SUCCESS
  }
};

const addArticleFailed = (error) => {
  return {
    type: ADD_ARTICLE_FAILED,
    error: error
  }
};

const editArticleSuccess = () => {
  return {
    type: EDIT_ARTICLE_SUCCESS,
    error: ""
  }
};

const editArticleFailed = (error) => {
  return {
    type: EDIT_ARTICLE_FAILED,
    error: error
  }
};

const removeArticleSuccess = () => {
  return {
    type: REMOVE_ARTICLE_SUCCESS
  }
};

const removeArticleFailed = (error) => {
  return {
    type: REMOVE_ARTICLE_FAILED,
    error: error
  }
};