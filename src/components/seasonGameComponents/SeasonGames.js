import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSeasonGames } from "../../actions/SeasonGameActions";
import SeasonGameRow from "./SeasonGameRow";
import { Grid, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom";


const SeasonGames = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeasonGames())
  }, []);


  const appState = useSelector((state) => state);
  let games = []
  let seasonGame

  let season = appState.seasonGame.seasonGames.map((season) => {


    if (season.active) {
    games = season.games
  
    return (
      <Grid item xs={12} sm={6} md={4} lg={12} key={season.id}>
        <h1>Kauden {season.season_name} pelit</h1>
      </Grid >
    )
    }
    
  })

  if (games.length === 0) {
    return (
      <Typography variant="body1" component="pre">
        Ei näytettäviä pelejä kaudelle.
    </Typography>
    )
  } 
  else {
  seasonGame = games.map((seasonGame) => {

  
    return (
      <Grid item xs={12} sm={6} md={4} lg={12} key={seasonGame.id}>
        <SeasonGameRow id={seasonGame.id} game={seasonGame.game} played={seasonGame.played} finalresult={seasonGame.final_result}
         players={seasonGame.players} goalmakers = {seasonGame.goal_makers} description={seasonGame.description}></SeasonGameRow>
      </Grid >
    )
    })
  }
  return (
    <React.Fragment>
      <Grid align="center" >
        {appState.login.admin &&
          <Button color="primary" variant="contained" margin="normal" component={Link} to={"/seasongames/addseasongame"} fullWidth sx={{ padding: 1, margin: 2 }} >Lisää uusi</Button>
        }
      {season} 
      </Grid>
      <Grid container spacing={2} alignItems="center" justify="center">
        {seasonGame}
      </Grid>
    </React.Fragment>
  )
}

export default SeasonGames;
