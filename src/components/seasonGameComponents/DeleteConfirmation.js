import React from 'react';
import { useDispatch } from 'react-redux';
import { removeSeasonGame } from "../../actions/SeasonGameActions";

// MATERIAL UI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';


const DeleteConfirmation = (props) => {

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeArticle = () => {
    dispatch(removeSeasonGame(props.token, props.id))

    handleClose()
  };

  return (
    <React.Fragment>
      <Fab sx={{ bgcolor: red[500] }} aria-label="delete" size="small" onClick={handleClickOpen}>
        <DeleteIcon />
      </Fab>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Haluatko varmasti poistaa seuraavan tuloksen ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">

              {props.header}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Peruuta</Button>
            <Button color="error" onClick={removeArticle} autoFocus>
              Poista
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default DeleteConfirmation;
