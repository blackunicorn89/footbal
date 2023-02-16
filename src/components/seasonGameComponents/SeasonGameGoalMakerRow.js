import React from "react";
import {
 FormControlLabel,
 Checkbox,
 TextField,
 MenuItem
} from '@mui/material';
import { useState } from 'react';
const SeasonGameGoalMakerRow = (props) => {

  /*const[goalState, setGoalState] = useState({
    goals:0,
})
let goalMaker
let player



const onGoalChange = (e) => {
 
  setGoalState((goalState) => {
    return {
        ...goalState,
        [e.target.name]: e.target.value
        
    }
    
})

 


}

const onGoalMakerChange = (e) => {
   
    

    if (e.target.checked) {
      player = e.target.value
     
      //console.log(props.goalArray)
    } else {
      formik.values.goal_makers.splice(formik.values.goal_makers.indexOf(goalMaker), 1);
    }

  }

  goalMaker = {"player": player, "goals": goalState.goals}
  console.log(goalMaker)*/


  return (
    <>

    {props.goalMakers}
    {/*
    <FormControlLabel  control={<Checkbox name="goalmakers" size="small" value={props.goalMakers} onChange={onGoalMakerChange} />} label={props.goalMakers}  />
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
    */}
  </>
  
  )
};

export default SeasonGameGoalMakerRow;