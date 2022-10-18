import { alertTitleClasses } from "@mui/material";
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Grid, Paper, Avatar, TextField, Button } from "@mui/material"

const EditArticle = () => {

  const dispatch = useDispatch();
  const id = useParams()

  const article = useSelector((state) =>
    state.news.news.newsArticles.find((article => article.id === id.id))
  );

  const [state, setState] = useState({
    header: article.header,
    content: article.content,
    date: article.date
  })

  const onChange = (event) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value
      }
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(state)
  };


  return (

    <Grid>
      <Paper elevation={10}>
        <Grid align="center">
          <h2>Muokkaa</h2>
        </Grid>
        <form action="/api/news" method="put">

          <TextField type="text" label="Otsikko" name="header" value={state.header} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
          <TextField type="date" label="Päivämäärä" name="date" value={state.date} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
          <TextField type="text" label="uutinen" name="content" value={state.content} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
          <Button type="submit" color="primary" variant="contained" margin="normal" onClick={onSubmit} fullWidth>Tallenna</Button>

        </form>
      </Paper>
    </Grid>


  )

}

export default EditArticle;
