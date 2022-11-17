import React from "react";
import {
  FormControlLabel,
  Checkbox
} from '@mui/material';

const SeasonGamePlayerRow = (props) => {

   return (
    <>
    <FormControlLabel  control={<Checkbox name="players" size="small" value={props.players} onChange={props.onChange} />} label={props.players}  /> 
    <br />
    </>
  )
};

export default SeasonGamePlayerRow;