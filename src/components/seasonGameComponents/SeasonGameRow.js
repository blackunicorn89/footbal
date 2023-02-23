import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Fab,
} from '@mui/material';
import { green } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import {ListItem, ListItemText} from "@mui/material";
import DeleteConfirmation from "../shared/components/DeleteConfirmation";
import "../../stylsesheets/seasongame.css"

const SeasonGameRow = (props) => {

  const appState = useSelector((state) => state);
  let date = new Date(props.played)
  let localDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
  
  const game = props.game
  const finalresult = props.finalresult 
  const players = props.players
  const goalmakers = props.goalmakers 
  

  const listOfPlayers = players.map((player) => <ListItemText>{player.name}</ListItemText>);
 
  const goalmaker = goalmakers.map((goalmaker) => <ListItemText>{goalmaker.name}, pisteet {goalmaker.points}</ListItemText>)

  
  let title = game

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
        <Typography variant="body1" component="pre">
            Pelattu: {localDate}
          </Typography>
          <Typography variant="body1" component="pre">
           Tulos: {finalresult}
          </Typography>
          <Typography variant="body1" component="pre">
            Pelaajat:
            <ListItem>
              {listOfPlayers}
            </ListItem>     
          </Typography>
          <Typography variant="body1" component="pre">
            Maalintekijät:
            <ListItem>
              {goalmaker}
            </ListItem>
          </Typography>
          <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
          </Typography>
          <Typography variant="body1" component="pre" >
            Lisätietoa pelistä: {props.description}
          </Typography>
        </CardContent>
      </Card>
    )
  } else {
    return (
      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto" }}>
        <CardHeader
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
              {goalmaker}
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
  }
};

export default SeasonGameRow;