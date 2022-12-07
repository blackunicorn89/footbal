import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { editNews } from "../../actions/NewsActions";
import { Box, Grid, TextField, Button } from "@mui/material"

const validationSchema = yup.object({
  header: yup
    .string("Pakollinen kenttä.")
    .required('Pakollinen kenttä'),
  published: yup
    .string()
    .required("Pakollinen kenttä."),
  content: yup
    .string("Uutinen on pakollinen kenttä.")
    .required("Pakollinen kenttä.")
});

const EditArticle = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const arcticleid = useParams()

  //Parsetaan numeroksi, koska id:n arvo on numero. Parametrinä tuleva acticledid on stringi, jonka vuoksi articlen haku kaatuu
  const id = parseInt(arcticleid.id)

  const article = useSelector((state) =>
    state.news.news.find((article => article.id === id))
  );


  const login = useSelector((state) =>
    state.login
  );

  // MUI TEXTFIELD DEFAULT DATE 

  const dateNow = new Date(article.published); // Creating a new date object with the current date and time
  const year = dateNow.getFullYear(); // Getting current year from the created Date object
  const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
  const month = // Setting current Month number from current Date object
    monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 if not to adjust for date input.
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const published =
    dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
      ? `0${dateNow.getUTCDate()}`
      : dateNow.getUTCDate();
  const materialDateInput = `${year}-${month}-${published}`; // combining to format for defaultValue or value attribute of material <TextField>

  // END MUI TEXTFIELD DEFAULT DATE

  const formik = useFormik({
    initialValues: {
      id: id,
      header: article.header,
      published: materialDateInput,
      content: article.content,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      dispatch(editNews(login, values));
      navigate("/");
    },
  });

  return (


    <Grid align="center">
      <h2>Muokkaa uutista</h2>

      <form onSubmit={formik.handleSubmit}>

        <TextField
          type="text"
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
          type="date"
          label="Päivämäärä"
          name="published"
          value={formik.values.published}
          onChange={formik.handleChange}
          error={formik.touched.published && Boolean(formik.errors.published)}
          helperText={formik.touched.published && formik.errors.published}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="text"
          multiline
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
    </Grid >
  )
}
export default EditArticle;
