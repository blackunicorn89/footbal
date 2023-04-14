import React from "react";
import {
  TableRow,
  TableCell,
} from '@mui/material';

const SeasonGamePlayerRow = (props) => {

   return (
    <>
      <TableRow key={props.key}>
        <TableCell>{props.plaah}</TableCell>
      </TableRow>
    </>
  )
};

export default SeasonGamePlayerRow;