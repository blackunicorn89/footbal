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

  //Tarkistetaan kauden tila. Jos Kauden tila on true, vaihdetaan activeSeasonin tilaksi kyllä. Muuten oletuksena ei.
  let activeSeason = "Ei"
  if (props.active) {
      activeSeason = "Kyllä"  
  }
  const appState = useSelector((state) => state);
  
  let title = "Kausi: " + props.season
  
  

  if (appState.login.admin) {

    return (


      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto" }}>
        <CardHeader
          action={
            <>
              <Fab sx={{ bgcolor: green[500], marginRight: 1 }} aria-label="edit" size="small" component={Link} to={"/seasons/editseason/" + props.id} >
                <EditIcon />
              </Fab>
              <DeleteConfirmation removeType="season" id={props.id} header={props.season} title="Haluatko varmasti poistaa kauden?" token={appState.login.token} />
            </>
          }
          title={title}
        />
        <CardContent>
        <Typography variant="body1" component="pre">
            Aktiivinen: {activeSeason}
          </Typography>
        </CardContent>
      </Card>
    )
  } 
};

export default SeasonGameRow;