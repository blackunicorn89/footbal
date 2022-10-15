import React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';

const Article = (props) => {

  const removeArticle = (event) => {
    console.log("Remove Article")
  }

  const editArticle = () => {
    console.log("Edit Article")
  }

  return (

    <Card sx={{ minWidth: 275, maxWidth: 400, }}>
      <CardHeader
        action={
          <>
            <IconButton onClick={editArticle}>
              <Avatar sx={{ bgcolor: green[500], marginRight: 1 }} aria-label="edit">
                <EditIcon />
              </Avatar>
            </IconButton>
            <IconButton onClick={removeArticle}>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="delete" >
                <DeleteIcon />
              </Avatar>
            </IconButton>
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