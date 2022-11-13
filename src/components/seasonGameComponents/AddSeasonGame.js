import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSeasonGame } from '../../actions/SeasonGameActions';
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, Paper, TextField, Button, getCircularProgressUtilityClass } from "@mui/material"
import SeasonGamePlayerRow from './SeasonGamePlayerRow';
import SeasonGameGoalMakerRow from './SeasonGameGoalMakerRow';


const AddPSeasonGameForm = () => {
  
  const [state, setState] = useState({
    "season_name": "",
		"active": "",
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

    let updatedList =goalMakerState.goal_makers;
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

      let updatedList =goalMakerState.goal_makers;
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
      <form onSubmit={onSubmit}>
              <label htmlFor="season_name">Kausi:</label>
              <input type="text"
                    name="season_name"
                    id="season_name"
                    value={state.value}
                    onChange={onChange} />
                    <br />
                    <hr />
              <p>Aktiivinen kausi</p>
                <input type="radio" id="active" name="active" value="true" onChange={onChange} />
                <label htmlFor="html">Kyllä</label>
                <input type="radio" id="active" name="active" value="false" onChange={onChange} />
                <label htmlFor="html">Ei</label>
                <hr />  
              <label htmlFor="final_result">Peli</label>
              <input type="text"
                    name="game"
                    id="game"
                    value={state.value}
                    onChange={onChange} />
                    <br />
                    <hr />              
              <label htmlFor="final_result">Tulos:</label>
              <input type="text"
                    name="final_result"
                    id="final_result"
                    value={state.value}
                    onChange={onChange} />
                    <br />
                    <hr />            
              <p>Pelaajat:</p>
              {gamePlayers}
              <p>Maalintekijät</p>
              {gameGoalMakers}
              <p><label htmlFor="description">Lisätietoa</label></p>
              <textarea rows="4" cols="50"
                    name="description"
                    id="description"
                    value={state.value}
                    onChange={onChange} />
                    <br />
                    <hr />            
            <input type="submit" value="Add"/>
        </form>
  )
}



export default AddPSeasonGameForm;