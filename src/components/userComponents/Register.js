import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions/UserActions";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Grid, Paper, TextField, Button, Box, RadioGroup, Radio, FormLabel, FormControlLabel } from "@mui/material"

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
  confirmPassword: yup
    .string()
    .required("pakollinen kenttä")
    .oneOf([yup.ref('password'), null], 'Salasanat eivät täsmää')
});

const Register = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch()
  const login = useSelector((state) =>
    state.login
  );

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      admin: "true"
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(register(login, values));
      console.log(values)
      navigate("/users")
    },
  });

  return (

    <Grid>
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
         <TextField
          id="confirmPassword"
          type="password"
          label="Toista salasana"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <FormLabel id="paakayttaja">Pääkäyttäjä</FormLabel>
        <RadioGroup
          row
          defaultValue={formik.values.admin}
          onChange={formik.handleChange}
          value={formik.values.admin}
        >
        <FormControlLabel name="admin" value="true" control={<Radio /> } label="Kyllä"></FormControlLabel>
        <FormControlLabel name="admin" value="false" control={<Radio /> } label="ei"></FormControlLabel>
        </RadioGroup>

        <Grid container>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="flex-start">
              <Button color="secondary" variant="contained" margin="normal" component={Link} to={"/users"} fullWidth sx={{ padding: 1, margin: 2 }} >Peruuta</Button>
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

export default Register;