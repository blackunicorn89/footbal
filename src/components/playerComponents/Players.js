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
 
  

  let players = appState.player.players.players.map((player) => {
    
    return <PlayerRow key={player.id} player={player}/>
})

 

  return (


    <React.Fragment>
      <Grid align="center" >
        <h1>Pelaajat</h1>
        <Button color="primary" variant="contained" margin="normal" component={Link} to={"/players/addplayer"} fullWidth sx={{ padding: 1, margin: 2 }} >Lisää uusi</Button>

      </Grid>


      {/*<Grid container spacing={2} alignItems="center" justify="center">
        {articles}
  </Grid>*/}

    


    <table className="table table-striped">
      <thead>
        <tr>
          <th>Kuva</th>  
          <th>Nimi</th>
          <th>Numero</th>
          <th>Paikka</th>
          <th>Kuvaus</th>
        </tr>
      </thead>
      <tbody>
        {players}
      </tbody>
    </table>
    </React.Fragment>
  )
}

export default Players;
