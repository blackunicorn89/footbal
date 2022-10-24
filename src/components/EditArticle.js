import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editNews } from "../actions/NewsActions";
import { Box, Grid, Paper, TextField, Button } from "@mui/material"

const EditArticle = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const id = useParams()

  const article = useSelector((state) =>
    state.news.news.newsArticles.find((article => article.id === id.id))
  );

  const login = useSelector((state) =>
    state.login
  );

  // MUI TEXTFIELD DEFAULT DATE 

  const dateNow = new Date(article.date); // Creating a new date object with the current date and time
  const year = dateNow.getFullYear(); // Getting current year from the created Date object
  const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
  const month = // Setting current Month number from current Date object
    monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 if not to adjust for date input.
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const date =
    dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
      ? `0${dateNow.getUTCDate()}`
      : dateNow.getUTCDate();
  const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>

  // END MUI TEXTFIELD DEFAULT DATE

  const [state, setState] = useState({
    header: article.header,
    content: article.content,
    date: materialDateInput
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
    let article = {
      ...state,
      id: id.id
    }
    dispatch(editNews(login, article));
    navigate("/");
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
          <TextField type="text" multiline label="uutinen" name="content" value={state.content} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />

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
