import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSeasonGame } from '../../actions/SeasonGameActions';
import { Link, useNavigate } from "react-router-dom";
import {Radio, RadioGroup, FormLabel, FormControlLabel, Box, Grid, Paper, TextField, Button, getCircularProgressUtilityClass } from "@mui/material"
import SeasonGamePlayerRow from './SeasonGamePlayerRow';
import SeasonGameGoalMakerRow from './SeasonGameGoalMakerRow';


const AddPSeasonGameForm = () => {
  
  const [state, setState] = useState({
    "season_name": "",
		"active": "active",
		"game": "",
		"final_result": "",
		"description": ""
  })

  const [playerState, setPlayerState] = useState({

    "players": []

  });

  const [goalMakerState, setGoalMakerState] = useState({

    "goal_makers": []

  });

  const onPlayerChange = (e) => {
      if (e.target.checked) {
        playerState.players.push(e.target.value);
      } else {
        playerState.players.splice(playerState.players.indexOf(e.target.value), 1);
      }
  
      setPlayerState((playerState) => {
        return {
          ...playerState,
        }
      })
  }

    const onGoalMakerChange = (e) => {

      if (e.target.checked) {
        goalMakerState.goal_makers.push(e.target.value);
      } else {
        goalMakerState.goal_makers.splice(goalMakerState.goal_makers.indexOf(e.target.value), 1);
      }
  
      setGoalMakerState((goalMakerState) => {
        return {
          ...goalMakerState,
        }
      })
    }
   
    const login = useSelector((state) =>
    state.login
  );
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const appState = useSelector((state) => state);

  const onChange = (event) => {
  
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value
      }
    })

  }

  const onSubmit = (event) => {
    event.preventDefault();
    let seasonGame = {
      ...state,
      ...playerState,
      ...goalMakerState
    }
    console.log(state.season_name)
    console.log( seasonGame)
    dispatch (addSeasonGame(login, seasonGame));
    setState({
        
      "season_name": "",
      "active": "",
      "game": " ",
      "final_result": "",
      "description": "",

    })
    
    setGoalMakerState({
      "goal_makers": []
    })

    setPlayerState({
      "players": []
    })
    
  navigate("/seasongames");
}

  let gamePlayers = appState.player.players.players.map((player) => {

  return (
     <SeasonGamePlayerRow key={player.id} onChange={onPlayerChange} players={player.player_name} />
  )
})

let gameGoalMakers = appState.player.players.players.map((goalMaker) => {

  return (
     <SeasonGameGoalMakerRow key={goalMaker.id} onChange={onGoalMakerChange} goalMakers={goalMaker.player_name} />
  )
})


 

    return (
      <Grid>
        <Paper elevation={10}>
            <Grid align="center">
              <h1>Lisää uusi peli kauteen</h1>
            </Grid> 
            <form>
            <TextField type="text" label="Kausi" name="season_name" value={state.value} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} /> 
                  {/*<label htmlFor="season_name">Kausi:</label>
                  <input type="text"
                        name="season_name"
                        id="season_name"
                        value={state.value}
                        onChange={onChange} />
                        <br />
                        <hr /> */}
                  <FormLabel id="active_form">Aktiivinen kausi:</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="active_form"
                    defaultValue="true"
                    name="radio-buttons-group"
                    onChange={onChange}
                    >
                  <FormControlLabel name="active" value="true"  control={<Radio size="small" />} label="Kyllä" />
                  <FormControlLabel name="active" value="false" control={<Radio size="small" />} label="Ei" />
              </RadioGroup>
                  {/*<p>Aktiivinen kausi</p>
                    <input type="radio" id="active" name="active" value="true" onChange={onChange} />
                      <label htmlFor="html">Kyllä</label>
                    <input type="radio" id="active" name="active" value="false" onChange={onChange} />
                      <label htmlFor="html">Ei</label>
                      <hr />*/}  
            <TextField type="text" label="Peli" name="game" value={state.value} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />   
                  {/*<label htmlFor="final_result">Peli</label>
                  <input type="text"
                        name="game"
                        id="game"
                        value={state.value}
                        onChange={onChange} />
                        <br />
                      <hr /> / */}
            <TextField type="text" label="Tulos" name="final_result" value={state.value} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />              
                  {/*<label htmlFor="final_result">Tulos:</label>
                  <input type="text"
                        name="final_result"
                        id="final_result"
                        value={state.value}
                        onChange={onChange} />
                        <br />
                    <hr />  */}          
                  <p>Pelaajat:</p>
                  {gamePlayers}
                  <p>Maalintekijät</p>
                  {gameGoalMakers}
                  <TextField type="text" label="Lisätietoa pelistä:" name="description" value={state.value} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
                  {/*<p><label htmlFor="description">Lisätietoa</label></p>
                  <textarea rows="4" cols="50"
                        name="description"
                        id="description"
                        value={state.value}
                        onChange={onChange} />
                        <br />
                  <hr />*/}            
             <Grid container>
                <Grid item xs={4}>
                  <Box display="flex" justifyContent="flex-start">
                    <Button color="secondary" variant="contained" margin="normal" component={Link} to={"/seasongames"} fullWidth sx={{ padding: 1, margin: 2 }} >Peruuta</Button>
                  </Box>
                </Grid>
                <Grid item xs={4}>
    
                </Grid>
                <Grid item xs={4}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button type="submit" color="primary" variant="contained" margin="normal" onClick={onSubmit} fullWidth sx={{ padding: 1, margin: 2 }} >Tallenna </Button>
                  </Box>
                </Grid>
              </Grid>    
            </form>
          </Paper>
        </Grid>
  )
}



export default AddPSeasonGameForm;