import React from "react";
import {
 FormControlLabel,
 Checkbox,
 TextField
} from '@mui/material';
import { useState } from 'react';
const SeasonGameGoalMakerRow = (props) => {

  const[goalState, setGoalState] = useState({
    goals:"",
})


const onGoalChange = (e) => {

 
  setGoalState((goalState) => {
    return {
        ...goalState,
        [e.target.name]: e.target.value,
    }

    
})
}

  return (
    <>
    <FormControlLabel  control={<Checkbox name="goalmakers" size="small" value={props.goalMakers} onChange={props.onChange} />} label={props.goalMakers}  />
    <br />
    </>
  )
};

export default SeasonGameGoalMakerRow;