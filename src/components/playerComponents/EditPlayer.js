import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { editPlayer } from "../../actions/PlayerActions";
import { Box, Grid, TextField, Button } from "@mui/material"

const validationSchema = yup.object({
  player_name: yup
    .string()
    .required('Pakollinen kenttä'),
  player_number: yup
    .number("Kirjoita kelvollinen luku")
    .required("Pakollinen kenttä."),
  position: yup
    .string()
    .required("Pakollinen kenttä."),
  description: yup
    .string()
    .required("Pakollinen kenttä.")
});

const EditPlayer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const playerid = useParams()

  //Parsetaan numeroksi, koska id:n arvo on numero. Parametrinä tuleva playerid on stringi, jonka vuoksi articlen haku kaatuu
  const id = parseInt(playerid.id)

  const player = useSelector((state) =>
    state.player.players.find((player => player.id === id))
  );

  const login = useSelector((state) =>
    state.login
  );

  const formik = useFormik({
    initialValues: {
      image: player.image,
      player_name: player.player_name,
      player_number: player.player_number,
      position: player.position,
      description: player.description
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      dispatch(editPlayer(login, formData, id));
      navigate("/players");
    }
  })

  return (

    <Grid align="center">
      <h2>Muokkaa Pelaajaa</h2>

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
          type="text"
          label="Pelaajan nimi"
          name="player_name"
          value={formik.values.player_name}
          onChange={formik.handleChange}
          error={formik.touched.player_name && Boolean(formik.errors.player_name)}
          helperText={formik.touched.player_name && formik.errors.player_name}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          type="number"
          label="Pelaajan numero"
          name="player_number"
          value={formik.values.player_number}
          onChange={formik.handleChange}
          error={formik.touched.player_number && Boolean(formik.errors.player_number)}
          helperText={formik.touched.player_number && formik.errors.player_number}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="text"
          label="Paikka"
          name="position"
          value={formik.values.position}
          onChange={formik.handleChange}
          error={formik.touched.position && Boolean(formik.errors.position)}
          helperText={formik.touched.position && formik.errors.position}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          type="text"
          label="Kuvaus"
          name="description"
          value={formik.values.description}
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
              <Button color="secondary" variant="contained" margin="normal" component={Link} to={"/players"} fullWidth sx={{ padding: 1, margin: 2 }} >Peruuta</Button>
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
export default EditPlayer;