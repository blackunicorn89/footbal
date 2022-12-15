import React from "react";
import {
 FormControlLabel,
 Checkbox,
 TextField
} from '@mui/material';
const SeasonGameGoalMakerRow = (props) => {
  return (
    <>
    <FormControlLabel  control={<Checkbox name="players" size="small" value={props.goalMakers} onChange={props.onChange} />} label={props.goalMakers}  />
    <TextField
          type="number"
          label="Pisteet" 
          name={props.name}
          value={props.points}
          onChange={props.onChange}
          //error={formik.touched.player_number && Boolean(formik.errors.player_number)}
          //helperText={formik.touched.player_number && formik.errors.player_number}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
        /> 
    <br />
    </>
  )
};

export default SeasonGameGoalMakerRow;