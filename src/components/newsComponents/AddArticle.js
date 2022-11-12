import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { addNews } from "../../actions/NewsActions";
import { Box, Grid, Paper, TextField, Button } from "@mui/material"

const validationSchema = yup.object({
  header: yup
    .string("Pakollinen kenttä.")
    .required("Pakollinen kenttä"),
  date: yup
    .date("Kirjoita hyväkysyttävä päivämäärä.")
    .required("Pakollinen kenttä."),
  content: yup
    .string("Uutinen on pakollinen kenttä.")
    .required("Pakollinen kenttä.")
});

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

  const formik = useFormik({
    initialValues: {
      header: "",
      date: materialDateInput,
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addNews(login, values));
      navigate("/");
    },
  });

  return (
    <Grid>
      <Paper elevation={10}>
        <Grid align="center">
          <h2>Lisää uusi artikkeli</h2>
        </Grid>
        <form onSubmit={formik.handleSubmit}>

          <TextField
            id="header"
            label="Otsikko"
            name="header"
            value={formik.values.header}
            onChange={formik.handleChange}
            error={formik.touched.header && Boolean(formik.errors.header)}
            helperText={formik.touched.header && formik.errors.header}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}

          />
          <TextField
            id="date"
            type="date"
            label="Päivämäärä"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            multiline
            id="content"
            label="Uutinen"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
            margin="normal"
            fullWidth

            InputLabelProps={{ shrink: true }}
          />

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
                <Button type="submit" color="primary" variant="contained" margin="normal" fullWidth sx={{ padding: 1, margin: 2 }} >Tallenna </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid >
  )
};

export default AddArticle;