import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/LoginActions"

import { useFormik } from 'formik';
import * as yup from 'yup';

import { Grid, Paper, Avatar, TextField, Button, Box } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const validationSchema = yup.object({
  email: yup
    .string("")
    .email("Kirjoita hyväksyttävä sähköpostiosoite")
    .required("Pakollinen kenttö"),
  password: yup
    .string("")
    .min(8, "Tarkista salasana")
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


  const paperStyle = { padding: 20, height: "70vh", width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: "red" }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
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
            fullWidth required
          />

          <TextField
            id="password"
            label="Password"
            name="password" value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            type="password" fullWidth required
          />
          <Button type="submit" color="primary" variant="contained" margin="normal" fullWidth>Sign in</Button>
        </form>
        <Box item mt={3} sx={{ textAlign: "center", color: "red" }}>{loginData.error}</Box>
      </Paper>
    </Grid>
  )
};

export default LoginPage;