import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editSeasonGame } from "../../actions/SeasonGameActions";
import { Box, Grid, Paper, TextField, Button } from "@mui/material"

const EditSeasonGame = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const id = useParams()
  
    const seasonGame = useSelector((state) =>
      //state.player.players.players.find((player => player.id === id.id))
      state.seasonGame.seasonGames.seasonGames.find(seasonGame => seasonGame.id === id.id)
    );

    
    const login = useSelector((state) =>
      state.login
    );

    const [state, setState] = useState({
        
      season_name: seasonGame.season_name,
      active: seasonGame.active,
      game: seasonGame.game,
      final_result:seasonGame.final_result,
      description:seasonGame.description 
      })
      
     
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
          id: id.id
        }
        dispatch(editSeasonGame(login, seasonGame));
        navigate("/seasongames");
      };

      return (
        <Grid>
          <Paper elevation={10}>
            <Grid align="center">
              <h1>Muokkaa kauden tietoja</h1>
            </Grid>
            <form>
    
              {/*<TextField type="file" label="Kuva" name="image" value={state.image} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />*/} 
              <TextField type="text" label="Kausi" name="season_name" value={state.value} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
              <TextField type="text" label="Peli" name="game" value={state.value} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} /> 
              <TextField type="text" label="Tulos" name="final_result" value={state.value} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} /> 
              {/*<TextField type="text" label="Kuvaus" name="description" value={state.description} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />*/}
    
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