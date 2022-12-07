import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../actions/NewsActions";
import Article from "./Article";
import { Grid, Button } from "@mui/material"

const NewsArticles = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews())
  }, []); // [dispatch] Voiko laittaa?? 

  const appState = useSelector((state) => state);

  let articles = appState.news.news.map((article) => {
    return (

      <Grid item xs={12} sm={6} md={4} lg={12} key={article.id}>
        <Article id={article.id} header={article.header} date={article.published} content={article.content} />
      </Grid >
    )
  })

  return (
    <React.Fragment>
      <Grid align="center" >
        <h2> Ajankohtaista </h2>
        {appState.login.admin &&
          <Button color="primary" variant="contained" margin="normal" component={Link} to={"/addarticle"} fullWidth sx={{ padding: 1, margin: 2 }} >Lisää uusi</Button>
        }
      </Grid>
      <Grid container spacing={2} alignItems="center" justify="center">
        {articles}
      </Grid>
    </React.Fragment>
  )
}
export default NewsArticles;
