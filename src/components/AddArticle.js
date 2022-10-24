import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addNews } from "../actions/NewsActions";
import { Box, Grid, Paper, TextField, Button } from "@mui/material"

const AddArticle = () => {

  // MUI TEXTFIELD DEFAULT DATE 

  const dateNow = new Date(); // Creating a new date object with the current date and time
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

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = useSelector((state) =>
    state.login
  );

  const [state, setState] = useState({
    header: "",
    date: materialDateInput,
    content: ""

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
    event.preventDefault()
    let article = {
      ...state
    }
    dispatch(addNews(login, article))
    navigate("/");
  };

  return (
    <Grid>
      <Paper elevation={10}>
        <Grid align="center">
          <h2>Lisää uusi artikkeli</h2>
        </Grid>
        <form action="/api/news/" method="POST">

          <TextField type="text" label="Otsikko" name="header" value={state.header} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
          <TextField type="date" label="Päivämäärä" name="date" value={state.date} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
          <TextField multiline label="uutinen" name="content" value={state.content} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />

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
};

export default AddArticle;