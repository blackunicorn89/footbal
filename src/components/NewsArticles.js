import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../actions/NewsActions";
import Article from "./Article";
import { Grid } from "@mui/material"

const NewsArticles = (props) => {

  const dispatch = useDispatch();

  //USE EFFECT ajetaan ennen renderöintiä. Se  hakee dispatchilla tiedot. Esim pelaajilla dispatch(getPlayers())
  useEffect(() => {
    dispatch(getNews())
  }, []);

  const appState = useSelector((state) => state);
  console.log(appState)

  let articles = appState.news.news.newsArticles.map((article) => {
    return (

      <Grid item xs={12} sm={6} md={4}>
        <Article key={article.id} header={article.header} date={article.date} content={article.content} />
      </Grid >
    )
  })

  return (

    <Grid container spacing={2} alignItems="center" justify="center">
      {articles}
    </Grid>
  )
}

export default NewsArticles;
