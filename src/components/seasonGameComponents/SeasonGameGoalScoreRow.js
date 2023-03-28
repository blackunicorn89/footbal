import React from "react";
import {
 FormControlLabel,
 Checkbox,
 TextField
} from '@mui/material';
import { useState } from 'react';
const SeasonGameGoalScoreRow = (props) => {

  const[goalState, setGoalState] = useState({
    goals:"",
})


const onGoalChange = (e) => {

 
  setGoalState((goalState) => {
    return {
        ...goalState,
        [e.target.name] : e.target.value,
    }

    
})
}



  return (
    <>
    <TextField
          type="number"
          label="Pisteet" 
          name="goals"
          value={goalState.goals}
          onChange={onGoalChange}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
        /> 
    <br />
    </>
  )
};

export default SeasonGameGoalScoreRow;