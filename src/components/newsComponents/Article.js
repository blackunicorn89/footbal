import React from "react";
import { useSelector } from 'react-redux';
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

const Article = (props) => {

  const appState = useSelector((state) => state);
  let date = new Date(props.date)
  let localDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();

  if (appState.login.admin) {
    return (
      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto" }}>
        <CardHeader
          action={
            <>
              <Fab sx={{ bgcolor: green[500], marginRight: 1 }} aria-label="edit" size="small" component={Link} to={"/editarticle/" + props.id} >
                <EditIcon />
              </Fab>
              <DeleteConfirmation removeType="article" id={props.id} header={props.header} title="Haluatko varmasti poistaa seuraavan uutisen?" token={appState.login.token} />
            </>
          }
          title={props.header}
          subheader={localDate} />
        <CardContent>
          <Typography variant="body2" component="pre">
            {props.content}
          </Typography>
        </CardContent>
      </Card>
    )
  } else {
    return (
      <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto" }}>
        <CardHeader
          title={props.header}
          subheader={localDate} />
        <CardContent>
          <Typography variant="body2" component="pre">
            {props.content}
          </Typography>
        </CardContent>
      </Card>
    )
  }
};
export default Article;