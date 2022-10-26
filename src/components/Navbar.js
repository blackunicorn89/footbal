import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../actions/LoginActions"

// MUI IMPORTS
import DrawerComp from "./DrawerComp";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Grid, Tabs, Tab, useTheme, Toolbar, Typography, useMediaQuery } from "@mui/material";

const Navbar = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const loginStatus = useSelector((state) =>
    state.login
  );

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(0)

  const logOut = () => {
    dispatch(logout())
  }

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
          <>
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
            <Grid justifyContent={"end"}>

              {loginStatus.admin ?

                <Tab label="Kirjaudu ulos" onClick={logOut} />
                :
                <Tab label="Kirjaudu sisään" component={Link} to={"/login"} />
              }
            </Grid>
          </>
        }
      </Toolbar>
    </React.Fragment>
  )

}
export default Navbar;