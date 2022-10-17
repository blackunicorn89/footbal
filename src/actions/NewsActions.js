import { loading, stopLoading, clearState } from "./LoginActions"

// Action constraits
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILED = "FETCH_NEWS_FAILED";

export const EDIT_ARTICLE_SUCCESS = "EDIT_ARTICLE_SUCCESS";
export const EDIT_ARTICLE_FAILED = "EDIT_ARTICLE_FAILED";

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

// EDIT NEWS

export const editNews = (token, article) => {
  return async (dispatch) => {
    let request = {
      method: "PUT",
      headers: { "Content-Type": "application/json" }, //Add bearer
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
      dispatch(editArticleSuccess());
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
}

const editArticleSuccess = () => {
  return {
    type: EDIT_ARTICLE_SUCCESS
  }
}

const editArticleFailed = (error) => {
  return {
    type: EDIT_ARTICLE_FAILED,
    error: error
  }
}