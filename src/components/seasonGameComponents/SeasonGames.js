import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeasonGames } from "../../actions/SeasonGameActions";
import SeasonGameRow from "./SeasonGameRow";
import { Grid, Button } from "@mui/material"
import { Link } from "react-router-dom";

const SeasonGames = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeasonGames())
  }, []);


  const appState = useSelector((state) => state);
  console.log("Mikä on appstate")
  console.log(appState)

  let singleGame = appState.seasonGame.seasonGames.map((seasonGame) => {

  
    return (
      <Grid item xs={12} sm={6} md={4} lg={12} key={seasonGame.id}>
        <SeasonGameRow game={seasonGame.games}></SeasonGameRow>
      </Grid >
    )
  })
  return (
    <React.Fragment>
      <Grid align="center" >
        <h2>Kauden pelit</h2>
        {appState.login.admin &&
          <Button color="primary" variant="contained" margin="normal" component={Link} to={"/seasongames/addseasongame"} fullWidth sx={{ padding: 1, margin: 2 }} >Lisää uusi</Button>
        }
      </Grid>
      <Grid container spacing={2} alignItems="center" justify="center">
        {singleGame}
      </Grid>
    </React.Fragment>
  )
}

export default SeasonGames;
