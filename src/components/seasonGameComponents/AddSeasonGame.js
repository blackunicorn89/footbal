import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSeasonGame } from '../../actions/SeasonGameActions';
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, Paper, TextField, Button } from "@mui/material"
import SeasonGamePlayerRow from './SeasonGamePlayerRow';

const AddPSeasonGameForm = () => {
  
  const [state, setState] = useState({
    "season_name": "",
		"active": "",
		"game": " ",
		"final_result": "",
		"players": [],
		"goal_makers": [],
		"description": "",
  })

  const login = useSelector((state) =>
    state.login
  );
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const appState = useSelector((state) => state);

  let gamePlayers = appState.player.players.players.map((player) => {

  return (
     <SeasonGamePlayerRow players={player.player_name} />
  )
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
          ...state
        }
        dispatch (addSeasonGame(login, seasonGame));
        setState({
            
          "season_name": "",
          "active": "",
          "game": " ",
          "final_result": "",
          "players": [],
          "goal_makers": [],
          "description": "",
    
        })
      navigate("/seasongames");
    }

    return (
      <form onSubmit={onSubmit}>
               {gamePlayers}            
              <br />
            <input type="submit" value="Add"/>
        </form>

  )



}



export default AddPSeasonGameForm;