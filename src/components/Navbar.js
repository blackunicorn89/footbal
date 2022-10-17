import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/LoginActions';

// MUI IMPORTS
import DrawerComp from "./DrawerComp";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Grid, Tabs, Tab, useTheme, Toolbar, Typography, useMediaQuery } from "@mui/material";

const Navbar = (props) => {

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(0)

  return (

    <React.Fragment>
      <Toolbar sx={{ backgroundColor: "#A60201", color: "#FFFFFF" }}>
        {isMatch ? <>
          <Typography>
            <SportsSoccerIcon />
          </Typography>
          <DrawerComp />
        </>
          :
          <Grid sx={{ placeItems: "center" }} container>
            <Grid item xs={2}>
              <Typography>
                <SportsSoccerIcon />
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Tabs indicatorColor="secondary" textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                <Tab label="Ajankohtaista" component={Link} to={"/news"} />
                <Tab label="Pelaajat" component={Link} to={"/players"} />
              </Tabs>
            </Grid>
          </Grid>
        }
      </Toolbar>
      <Toolbar />
    </React.Fragment>


  )

}
export default Navbar;