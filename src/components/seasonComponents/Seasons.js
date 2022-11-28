import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeasons } from "../../actions/SeasonActions";
import SeasonRow from "./SeasonRow";
import { Grid, Button } from "@mui/material"
import { Link } from "react-router-dom";

const Seasons = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeasons())
  }, []);


  const appState = useSelector((state) => state);
  console.log(appState)

  let singleSeason = appState.season.season.seasons.map((season) => {


    return (
      <Grid item xs={12} sm={6} md={4} lg={12} key={season.id}>
        <SeasonRow id={season.id} season = {season.season_name} active={season.active} />
      </Grid >
    )
  })

  return (
    <React.Fragment>
      <Grid align="center" >
        <h2>Kaudet</h2>
        {appState.login.admin &&
          <Button color="primary" variant="contained" margin="normal" component={Link} to={"/seasons/addseason"} fullWidth sx={{ padding: 1, margin: 2 }} >Lisää uusi kausi</Button>
        }
      </Grid>
      <Grid container spacing={2} alignItems="center" justify="center">
        {singleSeason}
      </Grid>
    </React.Fragment>
  )
}

export default Seasons;
