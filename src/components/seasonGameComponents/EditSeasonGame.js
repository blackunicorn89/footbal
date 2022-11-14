import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editSeasonGame } from "../../actions/SeasonGameActions";
import { Box, Grid, Paper, TextField, Button, RadioGroup, Radio, FormLabel, FormControlLabel } from "@mui/material"
import SeasonGameGoalMakerRow from "./SeasonGameGoalMakerRow";
import SeasonGamePlayerRow from "./SeasonGamePlayerRow";

const EditSeasonGame = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const id = useParams()
    const appState = useSelector((state) => state);
  
    const seasonGame = useSelector((state) =>
      state.seasonGame.seasonGames.seasonGames.find((seasonGame => seasonGame.id === id.id))
    );

    
    const login = useSelector((state) =>
      state.login
    );

    const [state, setState] = useState({
        
      season_name: seasonGame.season_name,
      active: "true",
      game: seasonGame.game,
      final_result:seasonGame.final_result,
      description:seasonGame.description,
    
      })

      const [currentPlayerState, setPlayerState] = useState({

        currentPlayers: seasonGame.players,

    
      });
    
      const [currenGoalMakerState, setGoalMakerState] = useState({
    
        currentGoalMakers: seasonGame.goal_makers,
    
      });

      const [editedPlayerState, setEditedPlayerState] = useState({

        "players": []

    
      });
    
      const [editedGoalMakerState, setEditedGoalMakerState] = useState({
    
        "goal_makers": []
    
      });
      
      const listOfCurrentPlayers = currentPlayerState.currentPlayers.map((currentPlayer) =>  <li>{currentPlayer}</li>);
      const listOfCurrentGoalMakers = currenGoalMakerState.currentGoalMakers.map((currentGoalMaker) =>  <li>{currentGoalMaker}</li>);

      


     
      const onChange = (event) => {
        setState((state) => {
          return {
            ...state,
            [event.target.name]: event.target.value
          }
        })
      }
      const onPlayerChange = (e) => {
        if (e.target.checked) {
          editedPlayerState.players.push(e.target.value);
        } else {
          editedPlayerState.players.splice(editedPlayerState.players.indexOf(e.target.value), 1);
        }
    
        setEditedPlayerState((editedPlayerState) => {
          return {
            ...editedPlayerState,
          }
        })
    }
  
      const onGoalMakerChange = (e) => {
  
        if (e.target.checked) {
          editedGoalMakerState.goal_makers.push(e.target.value);
        } else {
          editedGoalMakerState.goal_makers.splice(editedGoalMakerState.goal_makers.indexOf(e.target.value), 1);
        }
    
        setEditedGoalMakerState((editedGoalMakerState) => {
          return {
            ...editedGoalMakerState,
          }
        })
      }
    

      const onSubmit = (event) => {
        event.preventDefault();
        let seasonGame = {
          ...state,
          ...editedPlayerState,
          ...editedGoalMakerState,
             id: id.id
        }
        console.log(seasonGame)
        dispatch(editSeasonGame(login, seasonGame));
        navigate("/seasongames");
      };


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
              <h1>Muokkaa kauden pelin tietoja</h1>
            </Grid>
            <form> 
              <TextField type="text" label="Kausi" name="season_name" value={state.season_name} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
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
              <TextField type="text" label="Peli" name="game" value={state.game} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} /> 
              <TextField type="text" label="Tulos" name="final_result" value={state.final_result} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} /> 
              <p>Nykyinen joukkuekokoonpano</p>
              <ul>
                {listOfCurrentPlayers}
              </ul>
              <p>Muokkaa joukkuekokoonpanoa</p>
              {gamePlayers}
              <p>Maalintekijät</p>
              <ul>
                {listOfCurrentGoalMakers}
              </ul>
              <p>Lisää poistaa maalintekijöitä</p>
              {gameGoalMakers}
              <TextField type="text" label="Lisätietoa pelistä" name="description" value={state.description} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
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
        </Grid >
        )
    
}

export default EditSeasonGame;