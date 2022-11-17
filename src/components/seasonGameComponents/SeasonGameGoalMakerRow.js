import React from "react";
import {
 FormControlLabel,
 Checkbox
} from '@mui/material';
const SeasonGameGoalMakerRow = (props) => {
  return (
    <>
    <FormControlLabel  control={<Checkbox name="players" size="small" value={props.goalMakers} onChange={props.onChange} />} label={props.goalMakers}  /> 
    <br />
    </>
  )
};

export default SeasonGameGoalMakerRow;