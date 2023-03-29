import React from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Fab,
  Avatar,
} from '@mui/material';
import { green } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import DeleteConfirmation from "../shared/components/DeleteConfirmation";

const UserRow = (props) => {

  const appState = useSelector((state) => state);

  let userFullName = props.firstname + " " + props.lastname

  if (appState.login.admin) {

    return (

      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto" }}>
        <CardHeader
          action={
            <>
              <Fab sx={{ bgcolor: green[500], marginRight: 1 }} aria-label="edit" size="small" component={Link} to={"/users/edituser/" + props.id} >
                <EditIcon />
              </Fab>
              <DeleteConfirmation removeType="user" id={props.id} header={userFullName}  title="Haluatko varmasti poistaa seuraavan pelaajan?" token={appState.login.token} />
            </>
          }
          title={userFullName}
        />
        <CardContent>
          <Typography variant="body1" component="pre">
           sähköpostiosoite: {props.email}
          </Typography>
          {props.admin ? (
            <Typography variant="body1" component="pre">
              admin: kyllä
            </Typography> ) :
            (
            <Typography variant="body1" component="pre" sx={{ marginTop: 3 }} >
              admin: ei
            </Typography> )
          }   
        </CardContent>
      </Card>
    )
  } 
};
export default UserRow;