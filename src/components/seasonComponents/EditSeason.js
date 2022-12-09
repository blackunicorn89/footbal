import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editSeason } from "../../actions/SeasonActions";
import { Box, Grid, Paper, TextField, Button, RadioGroup, Radio, FormLabel, FormControlLabel } from "@mui/material"
import {  useFormik } from "formik";
import * as yup from "yup";

const EditSeason = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const seasonid = useParams()

    //Parsetaan numeroksi, koska id:n arvo on numero. Parametrinä tuleva seasonid on stringi, jonka vuoksi kauden haku kaatuu
    const id = parseInt(seasonid.id)
  
    const season = useSelector((state) =>
      state.season.season.find((season => season.id === id))
    );

    const login = useSelector((state) => 
      state.login
    );

    const validationSchema = yup.object({
      season_name: yup
        .string("Pakollinen kenttä.")
        .required("Pakollinen kenttä"),
    });

    const formik = useFormik({
      initialValues: {
      id: id,   
      season_name: season.season_name,
      active: true
      },
      validationSchema: validationSchema,
        onSubmit: (values) => {
        dispatch(editSeason(login, values));
        navigate("/seasons");
    },

      })
      
      return (
        <Grid>
          <Paper elevation={10}>
            <Grid align="center">
              <h1>Muokkaa kauden tietoja</h1>
            </Grid>
            <form onSubmit={formik.handleSubmit}> 
            <TextField
             type="text"
             label="Kausi"
             name="season_name"
             value={formik.values.season_name}
             onChange={formik.handleChange}
             error={formik.touched.season_name&& Boolean(formik.errors.season_name)}
             helperText={formik.touched.season_name && formik.errors.season_name}
             margin="normal"
             fullWidth required
             InputLabelProps={{ shrink: true }} /> 
              <FormLabel id="active_form">Aktiivinen kausi:</FormLabel>
              <RadioGroup
                    row
                    aria-labelledby="active_form"
                    defaultValue="true"
                    name="radio-buttons-group"
                    onChange={formik.handleChange}
                    >
                  <FormControlLabel name="active" value="true"  control={<Radio size="small" />} label="Kyllä" />
                  <FormControlLabel name="active" value="false" control={<Radio size="small" />} label="Ei" />
              </RadioGroup>
              <Grid container>
                <Grid item xs={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <Button color="secondary" variant="contained" margin="normal" component={Link} to={"/seasons"} fullWidth sx={{ padding: 1, margin: 2 }} >Peruuta</Button>
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

export default EditSeason;