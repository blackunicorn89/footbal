import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSeasonGame } from '../../actions/SeasonGameActions';
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, Paper, TextField, Button } from "@mui/material"
import SeasonGamePlayerRow from './SeasonGamePlayerRow';
import SeasonGameGoalMakerRow from './SeasonGameGoalMakerRow';


const AddPSeasonGameForm = () => {
  
  const [state, setState] = useState({
    "season_name": "",
		"active": "",
		"game": "",
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

  /*const onChange = (event) => {
  
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value
      }
    })

  }*/

  const onChange = (event) => {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    setState((state) => {
      return {
        ...state,
        [name]: value
      }
    })

  }

    const onSubmit = (event) => {
        event.preventDefault();
        let seasonGame = {
          ...state
        }
        console.log(seasonGame)
       // dispatch (addSeasonGame(login, seasonGame));
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

  let gamePlayers = appState.player.players.players.map((player) => {

  return (
     <SeasonGamePlayerRow key={player.id} onChange={onChange} players={player.player_name} />
  )
})

let gameGoalMakers = appState.player.players.players.map((goalMaker) => {

  return (
     <SeasonGameGoalMakerRow key={goalMaker.id} onChange={onChange} goalMakers={goalMaker.player_name} />
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
              <label htmlFor="final_result">Tulos:</label>
              <input type="text"
                    name="final_result"
                    id="final_result"
                    value={state.value}
                    onChange={onChange} />
                    <br />
                    <hr />            
              <p>Pelaajat:</p>
              <input type="checkbox" id="vehicle1" name="players" value="Bike" onChange={onChange} />
              <label htmlFor="vehicle1"> I have a bike</label><br />
              <input type="checkbox" id="vehicle2" name="players" value="Car" onChange={onChange} />
              <label htmlFor="vehicle2"> I have a car</label><br />
              <input type="checkbox" id="vehicle3" name="players" value="Boat" />
              <label htmlFor="vehicle3"> I have a boat</label><br />     
              <br />
              <hr />
              <p>Maalintekijät</p>
              <br />
              <hr />
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