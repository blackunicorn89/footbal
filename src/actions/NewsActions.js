import { loading, stopLoading, clearState } from "./LoginActions"

// Action constraits
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILED = "FETCH_NEWS_FAILED";

export const getNews = () => {
  return async (dispatch) => {


    // let request = {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json", "Authorization": "Bearer" + token, },
    //   body: ""

    // }
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