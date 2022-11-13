import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from "yup";
import { addPlayer } from '../../actions/PlayerActions';
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, TextField, Button } from "@mui/material"

const validationSchema = yup.object({
  player_name: yup
    .string()
    .required("Pakollinen kenttä"),
  player_number: yup
    .number("Kirjoita kelvollinen luku")
    .required("Pakollinen kenttä."),
  position: yup
    .string()
    .required("Pakollinen kenttä"),
  description: yup
    .string()
    .required("Pakollinen kenttä.")
});

const AddPlayerForm = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = useSelector((state) =>
    state.login
  );

  const formik = useFormik({
    initialValues: {
      image: "",
      player_name: "",
      player_number: "",
      position: "",
      description: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("VALUES!", values);
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      console.log("FORMDATA!!!", formData)
      dispatch(addPlayer(login, formData));
      navigate("/players");
    }
  })

  return (

    <Grid align="center">
      <h2>Lisää Pelaaja</h2>

      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">

        <TextField
          id="image"
          type="file"
          label="Kuva"
          name="image"
          onChange={(e) => formik.setFieldValue("image", e.currentTarget.files[0])}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          id="player_name"
          type="text"
          label="Pelaajan nimi"
          name="player_name"
          onChange={formik.handleChange}
          error={formik.touched.player_name && Boolean(formik.errors.player_name)}
          helperText={formik.touched.player_name && formik.errors.player_name}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          id="player_number"
          type="number"
          label="Pelinumero"
          name="player_number"
          onChange={formik.handleChange}
          error={formik.touched.player_number && Boolean(formik.errors.player_number)}
          helperText={formik.touched.player_number && formik.errors.player_number}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          id="position"
          type="text"
          label="Pelipaikka"
          name="position"
          onChange={formik.handleChange}
          error={formik.touched.position && Boolean(formik.errors.position)}
          helperText={formik.touched.position && formik.errors.position}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          id="description"
          type="text"
          label="Kuvaus"
          name="description"
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
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

    </Grid>

  )
}



export default AddPlayerForm;