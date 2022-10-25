import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Fab,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import { removePlayer } from "../../actions/PlayerActions";

const PlayerRow = (props) => {
 
    const dispatch = useDispatch();

    const appState = useSelector((state) => state);

    const removeSinglePlayer = (id) => {
    dispatch(removePlayer(appState.login.token, id))

  };

  let imgSrc = "http:\\\\localhost:3000\\" + props.image


    return(
 
      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto" }}>
      <CardHeader
        action={
          <>
            <Fab sx={{ bgcolor: green[500], marginRight: 1 }} aria-label="edit" size="small" component={Link} to={"players/editarticle/" + props.id} >
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
        <Typography variant="body2" component="pre">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  )
    
 
}

export default PlayerRow;