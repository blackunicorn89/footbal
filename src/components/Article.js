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
import { removeNews } from "../actions/NewsActions";

const Article = (props) => {

  const dispatch = useDispatch();

  const appState = useSelector((state) => state);

  const removeArticle = (id) => {
    dispatch(removeNews(appState.login.token, id))
  };

  return (

    <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto" }}>
      <CardHeader
        action={
          <>
            <Fab sx={{ bgcolor: green[500], marginRight: 1 }} aria-label="edit" size="small" component={Link} to={"/editarticle/" + props.id} >
              <EditIcon />
            </Fab>

            <Fab sx={{ bgcolor: red[500] }} aria-label="delete" size="small" onClick={() => { removeArticle(props.id) }}>
              <DeleteIcon />
            </Fab>
          </>
        }
        title={props.header}
        subheader={props.date} />

      <CardContent>
        {props.content}
      </CardContent>

    </Card>
  )
}
export default Article;