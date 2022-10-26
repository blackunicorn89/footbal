import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editPlayer } from "../../actions/PlayerActions"; 
import { Box, Grid, Paper, TextField, Button } from "@mui/material"

const EditPlayer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const id = useParams()
  
    const player = useSelector((state) =>
      state.player.players.players.find((player => player.id === id.id))
    );

    
    const login = useSelector((state) =>
      state.login
    );

    const [state, setState] = useState({
        image: player.image,
        player_name:player.player_name,
        player_number: player.player_number,
        position: player.position,
		description: player.description
      })
      
      const playerNumber = player.player_number

      console.log("Pelaajan numero : " + playerNumber)

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
        if(player.player_number === state.player_number) {
            console.log("Toisella pelaajalla on jo sama pelinumero");
            return;
        }  
        let player = {
          ...state,
          id: id.id
        }
        dispatch(editPlayer(login, player));
        navigate("/players");
      };

      return (
        <Grid>
          <Paper elevation={10}>
            <Grid align="center">
              <h1>Muokkaa Pelaajaa</h1>
            </Grid>
            <form>
    
              <TextField type="file" label="Kuva" name="image" value={state.image} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
              <TextField type="text" label="Pelaajan nimi" name="player_name" value={state.player_name} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
              <TextField type="number" label="Pelaajan numero" name="player_number" value={state.player_number} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
              <TextField type="text" label="Paikka" name="position" value={state.position} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
              <TextField type="text" label="Kuvaus" name="description" value={state.description} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
    
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
                    <Button type="submit" color="primary" variant="contained" margin="normal" onClick={onSubmit} fullWidth sx={{ padding: 1, margin: 2 }} >Tallenna </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid >
        )
    
}

export default EditPlayer;