import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { editNews } from "../actions/NewsActions";
import { Box, Grid, Paper, TextField, Button } from "@mui/material"

const EditArticle = () => {

  const dispatch = useDispatch();
  const id = useParams()

  const article = useSelector((state) =>
    state.news.news.newsArticles.find((article => article.id === id.id))
  );
  const login = useSelector((state) =>
    state.login.token
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
    let editedArticle = state;
    console.log(login)
    dispatch(editNews(editedArticle));
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


          <Grid container>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="flex-start">
                <Button color="secondary" variant="contained" margin="normal" component={Link} to={"/"} fullWidth sx={{ padding: 1, margin: 2 }} >Peruuta</Button>
              </Box>
            </Grid>
            <Grid item xs={4}>

            </Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" color="primary" variant="contained" margin="normal" onClick={onSubmit} fullWidth sx={{ padding: 1, margin: 2 }} >Tallenna </Button>
              </Box>
            </Grid>

          </Grid>


        </form>
      </Paper>
    </Grid >
  )

}
export default EditArticle;
