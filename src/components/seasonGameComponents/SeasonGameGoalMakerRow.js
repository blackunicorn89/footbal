import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  Fab,
  Avatar,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import { removePlayer } from "../../actions/PlayerActions";


const SeasonGameGoalMakerRow = (props) => {

  const dispatch = useDispatch();
  const appState = useSelector((state) => state);
  
  return (
    <><input type="checkbox"
      name="goal_makers"
      id="goal_makers"
      value={props.goalMakers}
      onChange={props.onChange}
      /><label htmlFor="players">{props.goalMakers}</label><br /></>
  )
};

export default SeasonGameGoalMakerRow;