import { stepButtonClasses } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../actions/PlayerActions";

const Players = (props) => {

  const dispatch = useDispatch();

  const appState = useSelector((state) => {
    return {
      playerList: state.player.playerList
    }
  });

  let players = appState.playerList.map((playerList) => {

    return (
      < tr key={players.id} >
        <td> {players.image}</td>
        <td> {players.player_name}</td>
        <td> {players.player_number} </td>
        <td> {players.position}</td>
        <td> {players.description}</td>
      </tr >
    )
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
