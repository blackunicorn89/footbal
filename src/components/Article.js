import React from "react";
import { useSelector, useDispatch } from 'react-redux';
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

const Article = (props) => {

  const appState = useSelector((state) => state);
  console.log("Article state", appState.login.token)
  const removeArticle = (id) => {
    console.log("Remove Article")
  }

  const editArticle = (id) => {
    console.log("Edit Article", id)
  }

  return (

    <Card sx={{ minWidth: 275, maxWidth: "md", margin: "auto" }}>
      <CardHeader
        action={
          <>
            <Fab sx={{ bgcolor: green[500], marginRight: 1 }} aria-label="edit" size="small" onClick={() => { editArticle(props.id) }}>
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