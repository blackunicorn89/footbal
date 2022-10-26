import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Fab,
  Avatar,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { removePlayer } from "../../actions/PlayerActions";
import { padding } from "@mui/system";

const PlayerRow = (props) => {
 
    const dispatch = useDispatch();

    const appState = useSelector((state) => state);

    const removeSinglePlayer = (id) => {
    dispatch(removePlayer(appState.login.token, id))

  };

  let img = "http:\\\\localhost:3000\\" + props.image


    return(
 
      <Card  sx={{ minWidth: 275, maxWidth: "md", margin: "auto", backgroundColor: "#A60201", color: "white"}}>
      <CardHeader
        action={
          <>
            <Fab sx={{ bgcolor: green[500], marginRight: 1 }} aria-label="edit" size="small" component={Link} to={"/players/editplayer" + props.id} >
              <EditIcon />
            </Fab>

            <Fab sx={{ bgcolor: red[500] }} aria-label="delete" size="small" onClick={() => { removeSinglePlayer(props.id) }}>
              <DeleteIcon />
            </Fab>
          </>
        }
        title={props.player_name}
         />
      <CardContent>
      <Avatar src={img} alt={props.player_name} variant="square"  sx={{ width: 70, height: 70, marginBottom:3 }}></Avatar>
        <Typography variant="h4" component="pre">
          {props.player_number}
        </Typography>
        <Typography variant="body1" component="pre" sx={{ marginTop:3 }} >
         {props.description}
        </Typography>
      </CardContent>
    </Card>
  )
    
 
}

export default PlayerRow;