import { stepButtonClasses } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPlayers } from "../actions/PlayerActions";
import PlayerRow from "./PlayerRow";

const Players = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlayers())
  }, []);


  const  appState = useSelector((state) => state);
  console.log(appState)
 // let articles = appState.news.news.newsArticles.map((article) => {

 /* let players = appState.playerList.map((player) => {

    return (
      < tr key={players.id} >
        <td> {players.image}</td>
        <td> {players.player_name}</td>
        <td> {players.player_number} </td>
        <td> {players.position}</td>
        <td> {players.description}</td>
      </tr >
    )
  })*/

  let players = appState.player.players.players.map((player) => {
    
    return <PlayerRow key={player.id} player={player}/>
})

  return (

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
  )
}

export default Players;
