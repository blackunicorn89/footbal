import { stepButtonClasses } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../../actions/PlayerActions";
import PlayerRow from "./PlayerRow";
import addPlayerForm from "./AddPlayer";
import { Grid, Button } from "@mui/material"
import { Link } from "react-router-dom";

const Players = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlayers())
  }, []);


  const  appState = useSelector((state) => state);
  console.log(appState)
 
  

  let singlePlayer = appState.player.players.players.map((player) => {

    return (
    
    <Grid item xs={12} sm={6} md={4} lg={12} key={player.id}>
    <PlayerRow image = {player.image} id={player.id} player_name={player.player_name} position = {player.position} player_number={player.player_number} description={player.description} />
  </Grid >
    )
})

 

  return (


    <React.Fragment>
      <Grid align="center" >
        <h1>Pelaajat</h1>
        <Button color="primary" variant="contained" margin="normal" component={Link} to={"/players/addplayer"} fullWidth sx={{ padding: 1, margin: 2 }} >Lisää uusi</Button>

      </Grid>


    <Grid container spacing={2} alignItems="center" justify="center">
        {singlePlayer}
    </Grid>

    </React.Fragment>
  )
}

export default Players;
