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
import DeleteConfirmation from "../shared/components/DeleteConfirmation";


const SeasonGameRow = (props) => {

  let activeSeason = "false"
  const appState = useSelector((state) => state);
  const SeasonStatus = () => {
    let activeSeason = ""  
    if (props.active) {
      activeSeason = "Kyllä"
    }
    else {
      activeSeason = "Ei"
    }
    
  }
  console.log(SeasonStatus)
  let title = "Kausi: " + props.season
  
  

  if (appState.login.admin) {

    return (


      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto" }}>
        <CardHeader
          action={
            <>
              <Fab sx={{ bgcolor: green[500], marginRight: 1 }} aria-label="edit" size="small" component={Link} to={"/seasons/editSeason/" + props.id} >
                <EditIcon />
              </Fab>
              <DeleteConfirmation removeType="game" id={props.id} header={props.game} title="Haluatko varmasti poistaa kauden?" token={appState.login.token} />
            </>
          }
          title={title}
        />
        <CardContent>
        <Typography variant="body1" component="pre">
            Aktiivinen: {props.active}
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
            Kausi: {SeasonStatus}
        </Typography>  
        <Typography variant="body1" component="pre">
            Aktiivinen: {props.active}
        </Typography>
        </CardContent>
      </Card>
    )
  }
};

export default SeasonGameRow;