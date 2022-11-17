import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Fab,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import { removeSeasonGame } from "../../actions/SeasonGameActions";
import DeleteConfirmation from "../shared/components/DeleteConfirmation";
import "../../stylsesheets/seasongame.css"


const SeasonGameRow = (props) => {

  const dispatch = useDispatch();
  const appState = useSelector((state) => state);
  let date = new Date(props.date)
  let localDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();


  //ALLA OLEVA SIIRRETTY SHARED/COMPONENTS/DELETECONFIRMATION.JS:SSÄÄÄN VOI EHKÄ POISTAA???
  // const removeSingleSeasonGame = (id) => {
  //   dispatch(removeSeasonGame(appState.login.token, id))

  // };


  const players = props.players
  const listOfPlayers = players.map((player) =>  <li>{player}</li>);

  const goalMakers = props.goalmakers
  const listOfGoalMakers = goalMakers.map((goalMaker) =>  <li>{goalMaker}</li>);

  let title = "Kausi: " + props.season 

  if (appState.login.admin) {

    return (


      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto" }}>
        <CardHeader
          action={
            <>
              <Fab sx={{ bgcolor: green[500], marginRight: 1 }} aria-label="edit" size="small" component={Link} to={"/seasongames/editSeasonGame/" + props.id} >
                <EditIcon />
              </Fab>
              <DeleteConfirmation removeType="game" id={props.id} header={props.game} title="Haluatko varmasti poistaa seuraavan pelin?" token={appState.login.token} />
            </>
          }
          title={title}
        />
        <CardContent>
        <Typography variant="h5" component="pre">
            Peli: {props.game}
          </Typography>  
        <Typography variant="body1" component="pre">
            Pelattu: {localDate}
          </Typography>
          <Typography variant="body1" component="pre">
           Tulos: {props.finalresult}
          </Typography>
          <Typography variant="body1" component="pre">
            Pelaajat:
            <ul>
              {listOfPlayers}
            </ul>     
          </Typography>
          <Typography variant="body1" component="pre">
            Maalintekijät:
            <ul>
            {listOfGoalMakers}  
            </ul>      
          </Typography>
          <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
           
          </Typography>
          <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
            Lisätietoa pelistä: {props.description}
          </Typography>
        </CardContent>
      </Card>
    )
  } else {
    return (
      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto", backgroundColor: "#A60201", color: "#73c6b6" }}>
        <CardHeader
          title={props.season}
        />
        <CardContent>
          <Typography variant="h4" component="pre">

          </Typography>
          <Typography variant="body1" component="pre">
            {props.finalresult}
          </Typography>
          <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
            {props.players}
          </Typography>
        </CardContent>
      </Card>
    )
  }
};

export default SeasonGameRow;