import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer } from '../../actions/PlayerActions';
import { Link } from "react-router-dom";
import { Box, Grid, Paper, TextField, Button } from "@mui/material"

const AddPlayerForm = () => {
    const[state, setState] = useState({
        image:"",
        player_name:"",
        player_number:0,
        position:"",
        description:""
    })

    const login = useSelector((state) =>
        state.login
    );

    const dispatch = useDispatch();

    const onChange = (event) => {
        setState((state) => {
            return {
                ...state,
                [event.target.name]:event.target.value
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        let player = {
            ...state
        }
        dispatch (addPlayer(login, player));
        setState({
            image:"",
            player_name:"",
            player_number:0,
            position:"",
            description:""
    
        })
    }

    return (
    <Grid>
      <Paper elevation={10}>
        <Grid align="center">
          <h2>Lisää uusi artikkeli</h2>
        </Grid>
        <form action="/api/news/" method="POST">

          <TextField type="image" label="Kuva" name="header" value={state.image} onChange={onChange} margin="normal" fullWidth required InputLabelProps={{ shrink: true }} />
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



export default AddPlayerForm;