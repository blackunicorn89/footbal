import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/LoginActions";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Grid, Paper, TextField, Button, Box } from "@mui/material"


const validationSchema = yup.object({
  firstname: yup
    .string("Pakollinen kenttä.")
    .required("Pakollinen kenttä"),
  lastname: yup
    .string("Pakollinen kenttä.")
    .required("Pakollinen kenttä"),
  email: yup
    .string()
    .email("Tarkista sähköpostiosoite")
    .required("Pakollinen kenttä"),
  password: yup
    .string()
    .min(6, "Salanan on oltava vähintään 6 merkkiä pitkä")
    .required("Pakollinen kenttä."),
});

const Register = () => {

  const dispatch = useDispatch()
  const login = useSelector((state) =>
    state.login
  );

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(register(login, values));
    },
  });

  return (

    <Grid>
      <Paper elevation={10}>
        <Grid align="center">
          <h2>Lisää uusi pääkäyttäjä</h2>
        </Grid>
        <form onSubmit={formik.handleSubmit}>

          <TextField
            id="firstname"
            type="text"
            label="Etunimi"
            name="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            id="lastname"
            type="text"
            label="Sukunimi"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            id="email"
            type="email"
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            id="password"
            type="password"
            label="Salasana"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
}

export default Register;