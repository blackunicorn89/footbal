import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardHeader,
  Fab,
  IconButton,


} from '@mui/material';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


import CardContent from '@mui/material/CardContent';

const Article = () => {

  const removeArticle = (event) => {
    console.log("Remove Article")
  }

  const editArticle = () => {
    console.log("Edit Article")
  }

  return (

    <Card sx={{ maxWidth: 450 }}>
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
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016" />

      <CardContent>
        Card content
      </CardContent>
    </Card>

  )
}

export default Article;