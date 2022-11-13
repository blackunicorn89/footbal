import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/LoginActions";

import { useFormik } from 'formik';
import * as yup from 'yup';

import { Grid, Avatar, TextField, Button, Box } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const validationSchema = yup.object({
  email: yup
    .string("")
    .email("Kirjoita hyväksyttävä sähköpostiosoite")
    .required("Pakollinen kenttä"),
  password: yup
    .string("")
    .min(6, "Salasanan on oltava vähintään 6 merkkiä pitkä")
    .required("Pakollinen kenttä."),
});

const LoginPage = () => {

  const dispatch = useDispatch();

  const loginData = useSelector((state) =>
    state.login
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const avatarStyle = { backgroundColor: "red" }
  return (

    <Grid align="center">
      <h2>Kirjaudu sisään</h2>
      <Avatar style={avatarStyle}>
        <LockOutlinedIcon />
      </Avatar>

      <form onSubmit={formik.handleSubmit}>

        <TextField
          id="email"
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
          label="Salasana"
          name="password" value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
          type="password"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" color="primary" variant="contained" margin="normal" fullWidth>Kirjaudu sisään</Button>
      </form>
      <Box item mt={3} sx={{ textAlign: "center", color: "red" }}>{loginData.error}</Box>
    </Grid>
  )
};

export default LoginPage;